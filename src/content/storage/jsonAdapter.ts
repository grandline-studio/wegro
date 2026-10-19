import { StorageAdapter } from './types';
import {
  SiteContent,
  ComplaintBoardData,
  LeadItem,
  AuditLogEntry,
  AdminUser,
  PolicyPage
} from '../schema';
import {
  defaultSiteContent,
  defaultComplaintBoardData,
  defaultLeads,
  defaultAdminUser
} from '../seedData';

// In-memory fallback if file system is not accessible
let memoryDb = {
  siteContent: defaultSiteContent,
  complaintBoard: defaultComplaintBoardData,
  leads: [...defaultLeads],
  auditLogs: [] as AuditLogEntry[],
  adminUsers: [defaultAdminUser]
};

// Check if running in Node.js environment
const isNode = typeof window === 'undefined' && typeof process !== 'undefined' && process.versions?.node;

let fs: any = null;
let path: any = null;
let dbDir: string = '';

if (isNode) {
  try {
    fs = await import('fs/promises');
    path = await import('path');
    dbDir = path.resolve(process.cwd(), 'data', 'db');
  } catch (err) {
    // fs not available
  }
}

async function ensureDir(dir: string) {
  if (fs && dir) {
    try {
      await fs.mkdir(dir, { recursive: true });
    } catch (e) {
      // already exists
    }
  }
}

async function readJsonFile<T>(filename: string, fallback: T): Promise<T> {
  if (isNode && fs && dbDir) {
    try {
      await ensureDir(dbDir);
      const filePath = path.join(dbDir, filename);
      const data = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(data);
    } catch (e) {
      return fallback;
    }
  }

  // Browser environment fallback (localStorage)
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      const stored = window.localStorage.getItem(`wegro_db_${filename}`);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      // fallback
    }
  }

  return fallback;
}

async function writeJsonFile<T>(filename: string, data: T): Promise<void> {
  if (isNode && fs && dbDir) {
    try {
      await ensureDir(dbDir);
      const filePath = path.join(dbDir, filename);
      await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
      return;
    } catch (e) {
      console.error(`Error writing ${filename}:`, e);
    }
  }

  // Browser environment fallback (localStorage)
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      window.localStorage.setItem(`wegro_db_${filename}`, JSON.stringify(data));
    } catch (e) {
      // fallback
    }
  }
}

export class JsonStorageAdapter implements StorageAdapter {
  async getSiteContent(): Promise<SiteContent> {
    const data = await readJsonFile<SiteContent>('site_content.json', defaultSiteContent);
    memoryDb.siteContent = data;
    return data;
  }

  async saveSiteContent(content: SiteContent, user: { id: string; username: string }): Promise<void> {
    const previous = await this.getSiteContent();
    await writeJsonFile('site_content.json', content);
    memoryDb.siteContent = content;

    await this.logAudit({
      userId: user.id,
      username: user.username,
      action: 'UPDATE_SITE_CONTENT',
      target: 'site_content',
      previousValue: previous,
      newValue: content
    });
  }

  async getComplaintBoard(): Promise<ComplaintBoardData> {
    const data = await readJsonFile<ComplaintBoardData>('complaint_data.json', defaultComplaintBoardData);
    memoryDb.complaintBoard = data;
    return data;
  }

  async saveComplaintBoard(
    data: ComplaintBoardData,
    user: { id: string; username: string },
    isPublish = false
  ): Promise<void> {
    const previous = await this.getComplaintBoard();
    const toSave: ComplaintBoardData = {
      ...data,
      isPublished: isPublish ? true : data.isPublished,
      lastPublishedAt: isPublish ? new Date().toISOString() : data.lastPublishedAt,
      publishedBy: isPublish ? user.username : data.publishedBy
    };

    await writeJsonFile('complaint_data.json', toSave);
    memoryDb.complaintBoard = toSave;

    await this.logAudit({
      userId: user.id,
      username: user.username,
      action: isPublish ? 'PUBLISH_COMPLAINTS' : 'SAVE_DRAFT_COMPLAINTS',
      target: 'complaint_data',
      previousValue: previous,
      newValue: toSave
    });
  }

  async getLeads(): Promise<LeadItem[]> {
    const data = await readJsonFile<LeadItem[]>('leads.json', defaultLeads);
    memoryDb.leads = data;
    return data;
  }

  async saveLead(lead: LeadItem): Promise<void> {
    const leads = await this.getLeads();
    const updated = [lead, ...leads];
    await writeJsonFile('leads.json', updated);
    memoryDb.leads = updated;
  }

  async updateLead(
    id: string,
    updates: Partial<LeadItem>,
    user: { id: string; username: string }
  ): Promise<void> {
    const leads = await this.getLeads();
    const idx = leads.findIndex((l) => l.id === id);
    if (idx === -1) return;

    const previous = leads[idx];
    leads[idx] = { ...previous, ...updates };

    await writeJsonFile('leads.json', leads);
    memoryDb.leads = leads;

    await this.logAudit({
      userId: user.id,
      username: user.username,
      action: 'UPDATE_LEAD',
      target: `lead:${id}`,
      previousValue: previous,
      newValue: leads[idx]
    });
  }

  async getPolicyPages(): Promise<Record<string, PolicyPage>> {
    const content = await this.getSiteContent();
    return content.policies || defaultSiteContent.policies;
  }

  async savePolicyPage(
    slug: string,
    page: PolicyPage,
    user: { id: string; username: string }
  ): Promise<void> {
    const content = await this.getSiteContent();
    const previous = content.policies?.[slug];
    const policies = { ...(content.policies || defaultSiteContent.policies), [slug]: page };
    content.policies = policies;

    await this.saveSiteContent(content, user);

    await this.logAudit({
      userId: user.id,
      username: user.username,
      action: 'UPDATE_POLICY_PAGE',
      target: `policy:${slug}`,
      previousValue: previous,
      newValue: page
    });
  }

  async deletePolicyPage(slug: string, user: { id: string; username: string }): Promise<void> {
    const content = await this.getSiteContent();
    const previous = content.policies?.[slug];
    if (content.policies) {
      delete content.policies[slug];
      await this.saveSiteContent(content, user);

      await this.logAudit({
        userId: user.id,
        username: user.username,
        action: 'DELETE_POLICY_PAGE',
        target: `policy:${slug}`,
        previousValue: previous,
        newValue: null
      });
    }
  }

  async getAuditLogs(filter?: {
    limit?: number;
    action?: string;
    username?: string;
  }): Promise<AuditLogEntry[]> {
    let logs = await readJsonFile<AuditLogEntry[]>('audit_log.json', memoryDb.auditLogs);
    if (filter?.action) {
      logs = logs.filter((l) => l.action.includes(filter.action!));
    }
    if (filter?.username) {
      logs = logs.filter((l) => l.username.toLowerCase() === filter.username!.toLowerCase());
    }
    if (filter?.limit) {
      logs = logs.slice(0, filter.limit);
    }
    return logs;
  }

  async logAudit(entry: Omit<AuditLogEntry, 'id' | 'timestamp'>): Promise<void> {
    const logs = await this.getAuditLogs();
    const newEntry: AuditLogEntry = {
      ...entry,
      id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toISOString()
    };
    const updated = [newEntry, ...logs].slice(0, 500); // retain last 500 actions
    await writeJsonFile('audit_log.json', updated);
    memoryDb.auditLogs = updated;
  }

  async getAdminUserByUsername(username: string): Promise<AdminUser | null> {
    const users = await readJsonFile<AdminUser[]>('admin_users.json', [defaultAdminUser]);
    const user = users.find((u) => u.username.toLowerCase() === username.toLowerCase());
    return user || null;
  }

  async updateAdminPassword(
    userId: string,
    newHash: string,
    user: { id: string; username: string }
  ): Promise<void> {
    const users = await readJsonFile<AdminUser[]>('admin_users.json', [defaultAdminUser]);
    const idx = users.findIndex((u) => u.id === userId || u.username === user.username);
    if (idx !== -1) {
      users[idx].passwordHash = newHash;
      users[idx].mustChangePassword = false;
      await writeJsonFile('admin_users.json', users);

      await this.logAudit({
        userId: user.id,
        username: user.username,
        action: 'CHANGE_PASSWORD',
        target: `user:${user.username}`,
        previousValue: '***',
        newValue: '***'
      });
    }
  }
}
