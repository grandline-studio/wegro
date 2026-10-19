import React from 'react';
import { Shield, Target, BookOpen, Users, Building, ArrowRight, CheckCircle2, AlertTriangle, FileCheck } from 'lucide-react';
import { companyConfig } from '../data/companyConfig';

export default function AboutPage({ navigate }) {
  const handleNav = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      {/* 1. HERO HEADER */}
      <section className="section bg-dark">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow cyan">About WeGrow Financial Research</span>
            <h1 className="section-title" style={{ color: '#ffffff' }}>
              Building Trust Through Independent Market Analysis & Absolute Transparency
            </h1>
            <p className="section-description" style={{ color: '#cbd5e1' }}>
              WeGrow was established with a singular objective: to dismantle the noise and speculative hype in Indian financial markets by providing retail and institutional participants with mathematically disciplined, fundamental, and quantitative research.
            </p>
          </div>
        </div>
      </section>

      {/* 2. STATUTORY DISCLOSURE NOTICE */}
      <section style={{ background: '#09111c', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '16px 0' }}>
        <div className="container">
          <div className="compliance-banner">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, color: '#f59e0b', marginBottom: 4 }}>
              <AlertTriangle size={16} />
              <span>Corporate Identity & Regulatory Transparency</span>
            </div>
            WeGrow is an Indian research advisory entity currently completing its formal registration procedures under the SEBI (Research Analysts) Regulations, 2014. Leadership biographies, corporate identity numbers (CIN), and registration certificates displayed below represent illustrative structures until finalized accreditation is awarded.
          </div>
        </div>
      </section>

      {/* 3. MISSION, VISION & PHILOSOPHY */}
      <section className="section bg-white">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32 }}>
            <div className="card-light" style={{ padding: 32 }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: 'rgba(0,229,255,0.1)', color: '#00b4d8', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                <Target size={22} />
              </div>
              <h2 style={{ fontSize: '1.45rem', marginBottom: 12, color: '#0f172a' }}>Our Core Mission</h2>
              <p style={{ color: '#475569', fontSize: '0.9375rem', lineHeight: 1.65 }}>
                To democratize institutional-grade equity, derivative, and commodity research for Indian investors. We replace ungrounded tips with documented thesis, audited stop-loss rules, and risk-adjusted return expectations.
              </p>
            </div>

            <div className="card-light" style={{ padding: 32 }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: 'rgba(16,185,129,0.1)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                <Shield size={22} />
              </div>
              <h2 style={{ fontSize: '1.45rem', marginBottom: 12, color: '#0f172a' }}>Our Long-Term Vision</h2>
              <p style={{ color: '#475569', fontSize: '0.9375rem', lineHeight: 1.65 }}>
                To become India's most trusted independent research advisor, benchmarked against international standards of fiduciary integrity, conflict-free recommendations, and radical operational transparency.
              </p>
            </div>

            <div className="card-light" style={{ padding: 32 }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: 'rgba(245,158,11,0.1)', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                <BookOpen size={22} />
              </div>
              <h2 style={{ fontSize: '1.45rem', marginBottom: 12, color: '#0f172a' }}>Research Philosophy</h2>
              <p style={{ color: '#475569', fontSize: '0.9375rem', lineHeight: 1.65 }}>
                Capital preservation precedes return generation. A disciplined trader who protects their base capital during bear markets naturally compounds exponential wealth during economic expansions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. METHODOLOGY & QUALITY CONTROL PROCESS */}
      <section className="section bg-light">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow dark">Rigorous Pipeline</span>
            <h2 className="section-title">Our 4-Stage Research & Verification Funnel</h2>
            <p className="section-description">
              Before a single recommendation is transmitted to subscribers, it passes through four discrete analytical gates to eliminate subjective bias.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 24 }}>
              <div style={{ fontFamily: 'monospace', fontSize: '0.8125rem', color: '#00b4d8', fontWeight: 700, marginBottom: 8 }}>GATE 01</div>
              <h3 style={{ fontSize: '1.125rem', marginBottom: 10, color: '#0f172a' }}>Macro & Liquidity Screening</h3>
              <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.6 }}>
                Evaluation of central bank policy, yield curves, FII/DII flow aggregates, and crude oil parity to establish overall market bias.
              </p>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 24 }}>
              <div style={{ fontFamily: 'monospace', fontSize: '0.8125rem', color: '#10b981', fontWeight: 700, marginBottom: 8 }}>GATE 02</div>
              <h3 style={{ fontSize: '1.125rem', marginBottom: 10, color: '#0f172a' }}>Fundamental Health Audit</h3>
              <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.6 }}>
                Rigorous financial statement analysis, free cash flow generation, working capital trends, and corporate governance scrutiny.
              </p>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 24 }}>
              <div style={{ fontFamily: 'monospace', fontSize: '0.8125rem', color: '#f59e0b', fontWeight: 700, marginBottom: 8 }}>GATE 03</div>
              <h3 style={{ fontSize: '1.125rem', marginBottom: 10, color: '#0f172a' }}>Technical & Flow Timing</h3>
              <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.6 }}>
                Multi-timeframe price structure confirmation, volume profile distribution, Open Interest (OI) buildup, and relative strength metrics.
              </p>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 24 }}>
              <div style={{ fontFamily: 'monospace', fontSize: '0.8125rem', color: '#6366f1', fontWeight: 700, marginBottom: 8 }}>GATE 04</div>
              <h3 style={{ fontSize: '1.125rem', marginBottom: 10, color: '#0f172a' }}>Risk Committee Sign-off</h3>
              <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.6 }}>
                Predefined mathematical invalidation level (stop-loss), position sizing ceiling, and conflict of interest check prior to publication.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. LEADERSHIP & RESEARCH TEAM (HONEST PLACEHOLDERS) */}
      <section className="section bg-white">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow dark">Analyst Bench</span>
            <h2 className="section-title">Leadership & Research Governance</h2>
            <p className="section-description">
              Our research desk is driven by seasoned market analysts holding relevant NISM certifications and deep experience in Indian financial markets.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            <div className="card-light" style={{ textAlign: 'center', padding: 28 }}>
              <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#f1f5f9', margin: '0 auto 16px auto', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
                <Users size={32} />
              </div>
              <h3 style={{ fontSize: '1.125rem', marginBottom: 4, color: '#0f172a' }}>
                [Head of Research & Strategy - Placeholder]
              </h3>
              <div style={{ fontSize: '0.8125rem', color: '#0284c7', fontWeight: 600, marginBottom: 12 }}>
                NISM Series XV (Research Analyst) Certified
              </div>
              <p style={{ fontSize: '0.8125rem', color: '#64748b', lineHeight: 1.6 }}>
                12+ years of institutional equity research, focusing on macro economic forecasting, capital goods, and banking sectors.
              </p>
            </div>

            <div className="card-light" style={{ textAlign: 'center', padding: 28 }}>
              <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#f1f5f9', margin: '0 auto 16px auto', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
                <Users size={32} />
              </div>
              <h3 style={{ fontSize: '1.125rem', marginBottom: 4, color: '#0f172a' }}>
                [Chief Derivatives Strategist - Placeholder]
              </h3>
              <div style={{ fontSize: '0.8125rem', color: '#0284c7', fontWeight: 600, marginBottom: 12 }}>
                NISM Series VIII (Equity Derivatives) Certified
              </div>
              <p style={{ fontSize: '0.8125rem', color: '#64748b', lineHeight: 1.6 }}>
                Specialist in quantitative options volatility arbitrage, delta-neutral spreads, and index Open Interest positioning.
              </p>
            </div>

            <div className="card-light" style={{ textAlign: 'center', padding: 28 }}>
              <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#f1f5f9', margin: '0 auto 16px auto', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
                <Users size={32} />
              </div>
              <h3 style={{ fontSize: '1.125rem', marginBottom: 4, color: '#0f172a' }}>
                [Compliance & Principal Officer - Placeholder]
              </h3>
              <div style={{ fontSize: '0.8125rem', color: '#0284c7', fontWeight: 600, marginBottom: 12 }}>
                Regulatory Affairs & Investor Protection
              </div>
              <p style={{ fontSize: '0.8125rem', color: '#64748b', lineHeight: 1.6 }}>
                Ensuring 100% adherence to SEBI research analyst regulations, conflict of interest audits, and statutory reporting standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CORPORATE REGISTRATION & REGISTERED OFFICE */}
      <section className="section bg-dark">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'center' }}>
            <div>
              <span className="section-eyebrow cyan">Corporate Foundation</span>
              <h2 className="section-title" style={{ color: '#ffffff', marginBottom: 16 }}>
                Corporate Governance & Identity
              </h2>
              <p style={{ color: '#cbd5e1', lineHeight: 1.65, marginBottom: 24 }}>
                We believe total transparency is non-negotiable in financial services. When fully certified, all corporate registration records, tax identifiers, and compliance officer direct contact details will be publicly accessible.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, fontSize: '0.875rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, color: '#94a3b8' }}>
                  <Building size={18} style={{ color: '#00e5ff', flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <strong style={{ color: '#f8fafc' }}>Registered Office: </strong>
                    {companyConfig.registeredOffice.addressLine1}, {companyConfig.registeredOffice.addressLine2}
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{companyConfig.registeredOffice.note}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#94a3b8' }}>
                  <FileCheck size={18} style={{ color: '#00e5ff', flexShrink: 0 }} />
                  <div>
                    <strong style={{ color: '#f8fafc' }}>SEBI Status: </strong>
                    {companyConfig.sebiRegistrationNumber}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#94a3b8' }}>
                  <Shield size={18} style={{ color: '#00e5ff', flexShrink: 0 }} />
                  <div>
                    <strong style={{ color: '#f8fafc' }}>Corporate ID: </strong>
                    {companyConfig.cinNumber}
                  </div>
                </div>
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 32 }}>
              <h3 style={{ fontSize: '1.25rem', color: '#f8fafc', marginBottom: 16 }}>
                Looking to Partner with a Disciplined Research Firm?
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '0.9375rem', lineHeight: 1.6, marginBottom: 24 }}>
                Explore our research packages or reach out directly to schedule a preliminary suitability consultation with our advisory desk.
              </p>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => handleNav('/services')}
                  className="btn btn-primary"
                >
                  <span>Explore Services</span>
                  <ArrowRight size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => handleNav('/contact')}
                  className="btn btn-secondary"
                >
                  <span>Contact Research Desk</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
