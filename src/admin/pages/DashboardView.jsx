import React, { useState, useEffect } from 'react';
import {
  Users,
  ShieldCheck,
  FileText,
  Clock,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  ExternalLink,
  Edit3,
  Calendar,
  Layers,
  CheckCircle2
} from 'lucide-react';
import { getStorageAdapter } from '../../content/storage';

export default function DashboardView({ navigateTo, currentUser }) {
  const [stats, setStats] = useState({
    totalLeads: 0,
    newLeads: 0,
    complaintMonth: 'October 2026',
    complaintPending: 0,
    complaintPublished: true,
    lastPublishedAt: null,
    recentLogs: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const storage = getStorageAdapter();
        const leads = await storage.getLeads();
        const complaints = await storage.getComplaintBoard();
        const logs = await storage.getAuditLogs({ limit: 6 });

        const newLeads = leads.filter((l) => l.status === 'New').length;
        const totalPending = complaints.section1.rows.reduce(
          (acc, r) => acc + (parseInt(r.totalPending, 10) || 0),
          0
        );

        setStats({
          totalLeads: leads.length,
          newLeads,
          complaintMonth: complaints.header.monthEnding,
          complaintPending: totalPending,
          complaintPublished: complaints.isPublished,
          lastPublishedAt: complaints.lastPublishedAt,
          recentLogs: logs
        });
      } catch (err) {
        console.error('Error loading dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Welcome Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #1e2022 0%, #080705 100%)',
          color: '#FFFFFA',
          padding: '28px 32px',
          borderRadius: 20,
          border: '1px solid rgba(148, 185, 175, 0.2)',
          boxShadow: '0 12px 30px rgba(0,0,0,0.15)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16
        }}
      >
        <div>
          <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', color: '#94B9AF', letterSpacing: '0.06em', fontWeight: 700 }}>
            Regulatory Compliance & Content Control
          </div>
          <h1 style={{ fontSize: '1.65rem', fontWeight: 800, marginTop: 4, marginBottom: 6 }}>
            Welcome back, {currentUser?.username || 'Administrator'}
          </h1>
          <p style={{ color: 'rgba(255, 255, 250, 0.7)', fontSize: '0.875rem', margin: 0, maxWidth: 640 }}>
            Manage SEBI statutory filings, public website copy, advisory syllabus, regulatory policies, and investor callback leads in real-time.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button
            type="button"
            onClick={() => navigateTo('complaints')}
            style={{
              padding: '10px 18px',
              borderRadius: 10,
              background: '#702632',
              color: '#FFFFFA',
              fontWeight: 700,
              fontSize: '0.875rem',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              boxShadow: '0 4px 12px rgba(112, 38, 50, 0.3)'
            }}
          >
            <ShieldCheck size={16} />
            <span>Edit Complaint Board</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: 18 }}>
        {/* Card 1: Leads */}
        <div
          onClick={() => navigateTo('leads')}
          style={{
            background: '#FFFFFA',
            borderRadius: 16,
            border: '1px solid rgba(8, 7, 5, 0.1)',
            padding: 22,
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            cursor: 'pointer',
            transition: 'transform 0.2s, box-shadow 0.2s'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(8,7,5,0.6)', textTransform: 'uppercase' }}>
              Investor Leads
            </span>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(148, 185, 175, 0.2)', color: '#284e45', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#080705', fontFamily: 'var(--font-mono)' }}>
            {stats.totalLeads}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', marginTop: 6, color: '#16a34a', fontWeight: 700 }}>
            <span>{stats.newLeads} pending callback review</span>
            <ArrowRight size={12} />
          </div>
        </div>

        {/* Card 2: Complaint Board Cycle */}
        <div
          onClick={() => navigateTo('complaints')}
          style={{
            background: '#FFFFFA',
            borderRadius: 16,
            border: '1px solid rgba(8, 7, 5, 0.1)',
            padding: 22,
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            cursor: 'pointer'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(8,7,5,0.6)', textTransform: 'uppercase' }}>
              Filing Cycle
            </span>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(112, 38, 50, 0.12)', color: '#702632', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Calendar size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#080705' }}>
            {stats.complaintMonth}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', marginTop: 6, color: stats.complaintPending > 0 ? '#b91c1c' : '#16a34a', fontWeight: 700 }}>
            <span>{stats.complaintPending} total pending complaints</span>
            <ArrowRight size={12} />
          </div>
        </div>

        {/* Card 3: Publishing Status */}
        <div
          onClick={() => navigateTo('complaints')}
          style={{
            background: '#FFFFFA',
            borderRadius: 16,
            border: '1px solid rgba(8, 7, 5, 0.1)',
            padding: 22,
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            cursor: 'pointer'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(8,7,5,0.6)', textTransform: 'uppercase' }}>
              Filing Status
            </span>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: stats.complaintPublished ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)', color: stats.complaintPublished ? '#047857' : '#b45309', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: stats.complaintPublished ? '#047857' : '#b45309' }}>
            {stats.complaintPublished ? 'Published & Active' : 'Draft Pending'}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'rgba(8,7,5,0.6)', marginTop: 6 }}>
            {stats.lastPublishedAt ? `Updated ${new Date(stats.lastPublishedAt).toLocaleDateString()}` : 'No publication date'}
          </div>
        </div>

        {/* Card 4: Quick Action */}
        <div
          onClick={() => navigateTo('site-content')}
          style={{
            background: '#FFFFFA',
            borderRadius: 16,
            border: '1px solid rgba(8, 7, 5, 0.1)',
            padding: 22,
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            cursor: 'pointer'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(8,7,5,0.6)', textTransform: 'uppercase' }}>
              Site Content
            </span>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(14, 165, 233, 0.12)', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Edit3 size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#080705' }}>
            5 Public Pages
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', marginTop: 6, color: '#0284c7', fontWeight: 700 }}>
            <span>Edit copy, stats & sections</span>
            <ArrowRight size={12} />
          </div>
        </div>
      </div>

      {/* Quick Launchpad & Recent Audit Activity Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: 20 }}>
        {/* Quick Launchpad Links */}
        <div
          style={{
            background: '#FFFFFA',
            borderRadius: 16,
            border: '1px solid rgba(8, 7, 5, 0.1)',
            padding: 24,
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
          }}
        >
          <h2 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#080705', marginBottom: 16 }}>
            Admin Management Shortcuts
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <button
              type="button"
              onClick={() => navigateTo('complaints')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                borderRadius: 10,
                border: '1px solid #e7e2da',
                background: '#FAF6F0',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              <div>
                <strong style={{ fontSize: '0.875rem', color: '#080705', display: 'block' }}>Complaint Board (Statutory Filing)</strong>
                <span style={{ fontSize: '0.75rem', color: 'rgba(8,7,5,0.6)' }}>Section 1 Table, Trend Analysis, Audit Reports</span>
              </div>
              <ChevronRight size={16} style={{ color: '#702632' }} />
            </button>

            <button
              type="button"
              onClick={() => navigateTo('leads')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                borderRadius: 10,
                border: '1px solid #e7e2da',
                background: '#FAF6F0',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              <div>
                <strong style={{ fontSize: '0.875rem', color: '#080705', display: 'block' }}>Investor Callback Leads</strong>
                <span style={{ fontSize: '0.75rem', color: 'rgba(8,7,5,0.6)' }}>View requests, update status, export CSV</span>
              </div>
              <ChevronRight size={16} style={{ color: '#702632' }} />
            </button>

            <button
              type="button"
              onClick={() => navigateTo('policies')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                borderRadius: 10,
                border: '1px solid #e7e2da',
                background: '#FAF6F0',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              <div>
                <strong style={{ fontSize: '0.875rem', color: '#080705', display: 'block' }}>Regulatory Policy Documents</strong>
                <span style={{ fontSize: '0.75rem', color: 'rgba(8,7,5,0.6)' }}>Disclosures, Investor Charter, ODR, Terms</span>
              </div>
              <ChevronRight size={16} style={{ color: '#702632' }} />
            </button>

            <button
              type="button"
              onClick={() => navigateTo('nav-footer')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                borderRadius: 10,
                border: '1px solid #e7e2da',
                background: '#FAF6F0',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              <div>
                <strong style={{ fontSize: '0.875rem', color: '#080705', display: 'block' }}>Navigation & Office Registrations</strong>
                <span style={{ fontSize: '0.75rem', color: 'rgba(8,7,5,0.6)' }}>SEBI/BSE IDs, office addresses, universal risk warning</span>
              </div>
              <ChevronRight size={16} style={{ color: '#702632' }} />
            </button>
          </div>
        </div>

        {/* Recent Activity Log */}
        <div
          style={{
            background: '#FFFFFA',
            borderRadius: 16,
            border: '1px solid rgba(8, 7, 5, 0.1)',
            padding: 24,
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h2 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#080705', margin: 0 }}>
              Recent Audit Log
            </h2>
            <button
              type="button"
              onClick={() => navigateTo('activity-log')}
              style={{ background: 'transparent', border: 'none', color: '#702632', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
            >
              View Full Trail →
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {stats.recentLogs.length === 0 ? (
              <div style={{ color: 'rgba(8,7,5,0.5)', fontSize: '0.8125rem', padding: '16px 0', textAlign: 'center' }}>
                No recent activity recorded.
              </div>
            ) : (
              stats.recentLogs.map((log) => (
                <div
                  key={log.id}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 10,
                    padding: '8px 0',
                    borderBottom: '1px solid rgba(8,7,5,0.06)',
                    fontSize: '0.8125rem'
                  }}
                >
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#702632', marginTop: 5, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div>
                      <strong style={{ color: '#080705' }}>{log.username}</strong>:{' '}
                      <span style={{ color: '#702632', fontFamily: 'var(--font-mono)' }}>{log.action}</span> on {log.target}
                    </div>
                    <div style={{ fontSize: '0.6875rem', color: 'rgba(8,7,5,0.5)', marginTop: 2 }}>
                      {new Date(log.timestamp).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ChevronRight({ size = 16, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
      <path d="m9 18 6-6-6-6"/>
    </svg>
  );
}
