import React, { useState } from 'react';
import {
  ShieldCheck,
  Filter,
  AlertTriangle,
  Info,
  Calendar,
  Layers,
  ArrowUpRight,
  TrendingDown,
  Clock,
  FileSpreadsheet
} from 'lucide-react';
import { performanceAuditNotice, sampleRecommendations } from '../data/performanceData';
import AnimatedTabs from '../components/AnimatedTabs';
import SpotlightCard from '../components/SpotlightCard';
import GlowingBadge from '../components/GlowingBadge';

export default function PerformancePage() {
  const [segmentFilter, setSegmentFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const segments = ['All', 'Stock Cash', 'Index Options', 'Stock Futures', 'Commodities'];
  const statuses = ['All', 'Active', 'Target 1 Achieved', 'Stop-Loss Triggered', 'Closed / Target 1 Met'];

  const filteredData = sampleRecommendations.filter((row) => {
    const matchesSegment = segmentFilter === 'All' || row.segment === segmentFilter;
    const matchesStatus = statusFilter === 'All' || row.status === statusFilter;
    return matchesSegment && matchesStatus;
  });

  return (
    <div>
      {/* 1. HERO HEADER */}
      <section className="section bg-dark">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow emerald">Audit Architecture</span>
            <h1 className="section-title" style={{ color: '#ffffff' }}>
              Historical Track Record & Verification Framework
            </h1>
            <p className="section-description" style={{ color: '#cbd5e1' }}>
              A transparent, audited record of research recommendations. Grounded in documented publication timestamps, predefined stop-loss triggers, and honest realization status.
            </p>
          </div>

          {/* Audit Metrics Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            {performanceAuditNotice.statDisclosures.map((stat, idx) => (
              <SpotlightCard key={idx} style={{ padding: 18, textAlign: 'center', background: 'rgba(255,255,255,0.03)' }}>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>
                  {stat.label}
                </div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#f8fafc' }}>
                  {stat.value}
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* 2. STATUTORY DISCLOSURE & DEMO NOTICE */}
      <section style={{ background: '#09111c', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '20px 0' }}>
        <div className="container">
          <div className="compliance-banner">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, color: '#f59e0b', marginBottom: 6 }}>
              <AlertTriangle size={18} />
              <span>{performanceAuditNotice.title}</span>
            </div>
            <p style={{ marginBottom: 6 }}>{performanceAuditNotice.notice}</p>
            <p style={{ fontSize: '0.75rem', color: '#94a3b8', fontStyle: 'italic' }}>
              *Statutory Warning: Past performance is not indicative of future returns. Securities trading involves market risk including the potential loss of capital. Unhedged derivative trading carries severe leverage risk.
            </p>
          </div>
        </div>
      </section>

      {/* 3. PERFORMANCE LOG & FILTERS */}
      <section className="section bg-light">
        <div className="container">
          {/* Controls Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 24, background: '#ffffff', padding: 20, borderRadius: 12, border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0f172a' }}>
                Filter Segment:
              </span>
              <AnimatedTabs
                tabs={segments}
                activeTab={segmentFilter}
                onChange={setSegmentFilter}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0f172a' }}>
                Status:
              </span>
              <select
                className="form-select"
                style={{ padding: '6px 12px', fontSize: '0.8125rem', width: 'auto' }}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                {statuses.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Data Table */}
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Segment</th>
                  <th>Instrument & Horizon</th>
                  <th>Action</th>
                  <th>Entry Level</th>
                  <th>Stop-Loss</th>
                  <th>Target Progression</th>
                  <th>Exit / Realization</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((row) => (
                  <tr key={row.id}>
                    <td>
                      <div style={{ fontSize: '0.8125rem', color: '#f8fafc', fontWeight: 600 }}>{row.id}</div>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{row.date}</div>
                    </td>
                    <td>
                      <span className="badge badge-gray">{row.segment}</span>
                    </td>
                    <td>
                      <div style={{ fontWeight: 700, color: '#00e5ff' }}>{row.instrument}</div>
                      <div style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>{row.horizon}</div>
                    </td>
                    <td>
                      <span style={{ fontWeight: 600, color: row.type.includes('BUY') ? '#10b981' : '#f43f5e' }}>
                        {row.type}
                      </span>
                    </td>
                    <td className="tabular-numbers" style={{ fontWeight: 600 }}>{row.entryPrice}</td>
                    <td className="tabular-numbers" style={{ color: '#f43f5e' }}>{row.stopLoss}</td>
                    <td className="tabular-numbers">
                      <div style={{ color: '#10b981' }}>T1: {row.target1}</div>
                      <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>T2: {row.target2}</div>
                    </td>
                    <td className="tabular-numbers" style={{ fontWeight: 600, color: '#f8fafc' }}>
                      {row.exitPrice}
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          row.statusType === 'target-met'
                            ? 'badge-emerald'
                            : row.statusType === 'sl-hit'
                            ? 'badge-rose'
                            : 'badge-cyan'
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Rationale Disclosure Accordion / Info Box */}
          <div style={{ marginTop: 24, background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 24 }}>
            <h3 style={{ fontSize: '1rem', color: '#0f172a', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Info size={16} style={{ color: '#00b4d8' }} />
              <span>Audit Methodology & Disclosures for Historical Records</span>
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, fontSize: '0.8125rem', color: '#475569', lineHeight: 1.6 }}>
              <div>
                <strong>1. Timestamp Integrity:</strong> Every research alert is recorded with microsecond server-time verification and transmitted synchronously across client channels.
              </div>
              <div>
                <strong>2. Stop-loss Enforcement:</strong> A trade is marked "Stop-loss Triggered" if the low (for longs) touches the stop level during live market hours, irrespective of end-of-day recovery.
              </div>
              <div>
                <strong>3. Realization Calculation:</strong> Performance is benchmarked against official National Stock Exchange (NSE) or Multi Commodity Exchange (MCX) volume-weighted average prices (VWAP).
              </div>
              <div>
                <strong>4. No Cherry-Picking:</strong> 100% of published alerts are documented in the audit ledger, including losses and scratch trades.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
