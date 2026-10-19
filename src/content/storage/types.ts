import {
  SiteContent,
  ComplaintBoardData,
  LeadItem,
  AuditLogEntry,
  AdminUser,
  PolicyPage
} from '../schema';

export interface StorageAdapter {
  // Site Content
  getSiteContent(): Promise<SiteContent>;
  saveSiteContent(content: SiteContent, user: { id: string; username: string }): Promise<void>;

  // Complaint Board
  getComplaintBoard(): Promise<ComplaintBoardData>;
  saveComplaintBoard(
    data: ComplaintBoardData,
    user: { id: string; username: string },
    isPublish?: boolean
  ): Promise<void>;

  // Leads
  getLeads(): Promise<LeadItem[]>;
  saveLead(lead: LeadItem): Promise<void>;
  updateLead(
    id: string,
    updates: Partial<LeadItem>,
    user: { id: string; username: string }
  ): Promise<void>;

  // Policies
  getPolicyPages(): Promise<Record<string, PolicyPage>>;
  savePolicyPage(
    slug: string,
    page: PolicyPage,
    user: { id: string; username: string }
  ): Promise<void>;
  deletePolicyPage(
    slug: string,
    user: { id: string; username: string }
  ): Promise<void>;

  // Audit Logs
  getAuditLogs(filter?: {
    limit?: number;
    action?: string;
    username?: string;
  }): Promise<AuditLogEntry[]>;
  logAudit(entry: Omit<AuditLogEntry, 'id' | 'timestamp'>): Promise<void>;

  // Admin Users
  getAdminUserByUsername(username: string): Promise<AdminUser | null>;
  updateAdminPassword(
    userId: string,
    newHash: string,
    user: { id: string; username: string }
  ): Promise<void>;
}
