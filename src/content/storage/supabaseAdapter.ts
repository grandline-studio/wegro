import { StorageAdapter } from './types';
import {
  SiteContent,
  ComplaintBoardData,
  LeadItem,
  AuditLogEntry,
  AdminUser,
  PolicyPage
} from '../schema';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

export class SupabaseStorageAdapter implements StorageAdapter {
  private client: SupabaseClient;

  constructor(supabaseUrl: string, supabaseAnonKey: string) {
    this.client = createClient(supabaseUrl, supabaseAnonKey);
  }

  async getSiteContent(): Promise<SiteContent> {
    const { data, error } = await this.client
      .from('site_content')
      .select('data')
      .eq('id', 'primary')
      .single();

    if (error || !data) {
      throw new Error(`Failed to load site content from Supabase: ${error?.message}`);
    }
    return data.data as SiteContent;
  }

  async saveSiteContent(content: SiteContent, user: { id: string; username: string }): Promise<void> {
    const previous = await this.getSiteContent().catch(() => null);
    const { error } = await this.client
      .from('site_content')
      .upsert({ id: 'primary', data: content, updated_at: new Date().toISOString() });

    if (error) {
      throw new Error(`Failed to save site content to Supabase: ${error.message}`);
    }

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
    const { data, error } = await this.client
      .from('complaint_data')
      .select('data')
      .eq('id', 'primary')
      .single();

    if (error || !data) {
      throw new Error(`Failed to load complaint board from Supabase: ${error?.message}`);
    }
    return data.data as ComplaintBoardData;
  }

  async saveComplaintBoard(
    data: ComplaintBoardData,
    user: { id: string; username: string },
    isPublish = false
  ): Promise<void> {
    const previous = await this.getComplaintBoard().catch(() => null);
    const toSave: ComplaintBoardData = {
      ...data,
      isPublished: isPublish ? true : data.isPublished,
      lastPublishedAt: isPublish ? new Date().toISOString() : data.lastPublishedAt,
      publishedBy: isPublish ? user.username : data.publishedBy
    };

    const { error } = await this.client
      .from('complaint_data')
      .upsert({ id: 'primary', data: toSave, updated_at: new Date().toISOString() });

    if (error) {
      throw new Error(`Failed to save complaint board to Supabase: ${error.message}`);
    }

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
    const { data, error } = await this.client
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch leads: ${error.message}`);
    }
    return (data || []).map((row) => ({
      id: row.id,
      name: row.name,
      mobile: row.mobile,
      email: row.email,
      productName: row.product_name,
      panNumber: row.pan_number,
      dob: row.dob,
      message: row.message,
      consentGiven: row.consent_given,
      consentTimestamp: row.consent_timestamp,
      status: row.status,
      internalNotes: row.internal_notes,
      createdAt: row.created_at
    }));
  }

  async saveLead(lead: LeadItem): Promise<void> {
    const { error } = await this.client.from('leads').insert({
      id: lead.id,
      name: lead.name,
      mobile: lead.mobile,
      email: lead.email,
      product_name: lead.productName,
      pan_number: lead.panNumber,
      dob: lead.dob,
      message: lead.message,
      consent_given: lead.consentGiven,
      consent_timestamp: lead.consentTimestamp,
      status: lead.status,
      internal_notes: lead.internalNotes,
      created_at: lead.createdAt
    });

    if (error) {
      throw new Error(`Failed to insert lead: ${error.message}`);
    }
  }

  async updateLead(
    id: string,
    updates: Partial<LeadItem>,
    user: { id: string; username: string }
  ): Promise<void> {
    const { error } = await this.client
      .from('leads')
      .update({
        status: updates.status,
        internal_notes: updates.internalNotes
      })
      .eq('id', id);

    if (error) {
      throw new Error(`Failed to update lead: ${error.message}`);
    }

    await this.logAudit({
      userId: user.id,
      username: user.username,
      action: 'UPDATE_LEAD',
      target: `lead:${id}`,
      previousValue: null,
      newValue: updates
    });
  }

  async getPolicyPages(): Promise<Record<string, PolicyPage>> {
    const content = await this.getSiteContent();
    return content.policies || {};
  }

  async savePolicyPage(
    slug: string,
    page: PolicyPage,
    user: { id: string; username: string }
  ): Promise<void> {
    const content = await this.getSiteContent();
    const previous = content.policies?.[slug];
    content.policies = { ...(content.policies || {}), [slug]: page };
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
    if (content.policies) {
      const previous = content.policies[slug];
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
    let query = this.client
      .from('audit_log')
      .select('*')
      .order('timestamp', { ascending: false });

    if (filter?.action) {
      query = query.ilike('action', `%${filter.action}%`);
    }
    if (filter?.username) {
      query = query.eq('username', filter.username);
    }
    if (filter?.limit) {
      query = query.limit(filter.limit);
    }

    const { data, error } = await query;
    if (error) {
      throw new Error(`Failed to fetch audit logs: ${error.message}`);
    }
    return (data || []).map((row) => ({
      id: row.id,
      userId: row.user_id,
      username: row.username,
      action: row.action,
      target: row.target,
      previousValue: row.previous_value,
      newValue: row.new_value,
      timestamp: row.timestamp,
      ipAddress: row.ip_address
    }));
  }

  async logAudit(entry: Omit<AuditLogEntry, 'id' | 'timestamp'>): Promise<void> {
    await this.client.from('audit_log').insert({
      id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      user_id: entry.userId,
      username: entry.username,
      action: entry.action,
      target: entry.target,
      previous_value: entry.previousValue,
      new_value: entry.newValue,
      timestamp: new Date().toISOString()
    });
  }

  async getAdminUserByUsername(username: string): Promise<AdminUser | null> {
    const { data, error } = await this.client
      .from('admin_users')
      .select('*')
      .ilike('username', username)
      .single();

    if (error || !data) return null;
    return {
      id: data.id,
      username: data.username,
      passwordHash: data.password_hash,
      mustChangePassword: data.must_change_password,
      role: data.role,
      createdAt: data.created_at,
      lastLoginAt: data.last_login_at
    };
  }

  async updateAdminPassword(
    userId: string,
    newHash: string,
    user: { id: string; username: string }
  ): Promise<void> {
    const { error } = await this.client
      .from('admin_users')
      .update({
        password_hash: newHash,
        must_change_password: false
      })
      .eq('id', userId);

    if (error) {
      throw new Error(`Failed to update password: ${error.message}`);
    }

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
