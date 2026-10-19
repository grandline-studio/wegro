import React, { useState } from 'react';
import {
  Shield,
  Target,
  BookOpen,
  Users,
  Building2,
  ArrowRight,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileCheck,
  Copy,
  Check,
  ChevronDown,
  ExternalLink,
  Scale,
  TrendingUp,
  BarChart3,
  Layers,
  Award,
  Clock,
  MapPin,
  Mail,
  Phone,
  Sparkles,
  Cpu
} from 'lucide-react';
import { companyConfig } from '../data/companyConfig';
import SpotlightCard from '../components/SpotlightCard';
import GlowingBadge from '../components/GlowingBadge';
import NumberTicker from '../components/NumberTicker';

export default function AboutPage({ navigate }) {
  const [activeGate, setActiveGate] = useState(0);
  const [copiedKey, setCopiedKey] = useState(null);
  const [openFaq, setOpenFaq] = useState(0);

  const handleNav = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2000);
  };

  const funnelGates = [
    {
      gateId: "GATE 01",
      title: "Macro & Systemic Liquidity Screening",
      summary: "Quantitative monitoring of foreign & domestic institutional flows, RBI policy stance, yield curves, and cross-asset volatility parity.",
      badge: "Macro Liquidity",
      metrics: [
        { label: "Institutional Flow Monitor", desc: "FII vs DII 20-day rolling cumulative absorption ratio" },
        { label: "Sovereign Yield Spread", desc: "India 10Y G-Sec vs US Treasury 10Y yield differential" },
        { label: "Currency Parity", desc: "USD/INR implied volatility and FX reserve cover stability" },
        { label: "Sector Rotation Index", desc: "Relative momentum analysis across 14 Nifty sectoral indices" }
      ],
      rejectionTrigger: "Disqualification if the broader index trades in an institutional distribution phase or systemic liquidity contraction.",
      outputAudit: "Generates daily institutional market regime score (Risk-On / Defensive / Neutral)."
    },
    {
      gateId: "GATE 02",
      title: "Forensic Fundamental & Balance Sheet Audit",
      summary: "In-depth forensic audit of cash flow statements, promoter pledge dynamics, working capital cycles, and accounting health.",
      badge: "Fundamental Health",
      metrics: [
        { label: "Altman Z-Score", desc: "Target > 2.80 confirming minimal credit or bankruptcy probability" },
        { label: "Piotroski 9-Point Score", desc: "Minimum threshold of ≥ 7 for operational efficiency and profitability" },
        { label: "Free Cash Flow Yield", desc: "Consistent positive CFO/EV yield across past 3 fiscal cycles" },
        { label: "Promoter Pledge & Ownership", desc: "Disqualification if promoter pledge exceeds 5% of holding" }
      ],
      rejectionTrigger: "Instant rejection for auditor qualifications, aggressive revenue recognition, or related-party transactions.",
      outputAudit: "Produces documented fundamental equity valuation thesis and fair value target corridor."
    },
    {
      gateId: "GATE 03",
      title: "Quantitative & Options Volatility Architecture",
      summary: "Multi-timeframe market structure mapping, volume distribution profiles (VPVR), Implied Volatility skew, and Open Interest buildup.",
      badge: "Derivatives & Structure",
      metrics: [
        { label: "Volume Profile (VPVR)", desc: "High Volume Nodes (HVN) and Point of Control (POC) identification" },
        { label: "Implied Volatility Rank (IVR)", desc: "Current IV relative to 52-week historical distribution" },
        { label: "Open Interest (OI) Dynamics", desc: "Put-Call Ratio (PCR) shifts and institutional strike concentrations" },
        { label: "Market Breadth (AD Line)", desc: "Advance/Decline confirmation across equal-weighted indices" }
      ],
      rejectionTrigger: "Rejection if bid-ask spread exceeds 0.15% or if derivative strike liquidity falls below threshold.",
      outputAudit: "Defines mathematically precise execution triggers, entry windows, and invalidation points."
    },
    {
      gateId: "GATE 04",
      title: "Risk Committee Sign-off & Mathematical Invalidation",
      summary: "Independent analytical oversight mandating non-negotiable stop-losses, position sizing constraints, and statutory conflict audits.",
      badge: "Capital Preservation",
      metrics: [
        { label: "Risk-to-Reward Ratio", desc: "Strict requirement: minimum 1:2.5 potential payoff profile" },
        { label: "Trade Risk Allocation", desc: "Pre-set position sizing ceiling capping portfolio exposure at 2.0%" },
        { label: "Volatility ATR Stop-Loss", desc: "Stop-loss calibrated against Average True Range, never arbitrary" },
        { label: "Conflict Audit Clearance", desc: "Mandatory check verifying zero personal analyst or affiliate holding" }
      ],
      rejectionTrigger: "Immediate veto if risk-reward ratio is sub-optimal or if conflict disclosure checklist is incomplete.",
      outputAudit: "Final verified research release with statutory disclosures published to subscriber terminal."
    }
  ];

  const faqItems = [
    {
      question: "What is WeGro's official regulatory status with SEBI?",
      answer: "WeGro Research Analysts Private Limited operates under the regulatory purview of the Securities and Exchange Board of India (SEBI) under the SEBI (Research Analysts) Regulations, 2014 with Registration Number INH000008093 and BSE Membership Number 5422. All published research reports, model portfolios, and market analysis adhere strictly to Chapter III regulations regarding independence, conflict disclosures, and qualifications."
    },
    {
      question: "Does WeGro manage client funds, handle demat credentials, or offer PMS?",
      answer: "No. WeGro does NOT offer Portfolio Management Services (PMS), discretionary asset management, or account handling under any circumstance. We never accept investor trading deposits, never request trading passwords or OTPs, and never trade on behalf of clients. You maintain 100% custody of your capital in your own brokerage account and execute trades at your sole discretion."
    },
    {
      question: "How does WeGro ensure its research recommendations are free from conflict of interest?",
      answer: "Under SEBI (Research Analysts) Regulations, 2014, our analysts and associates are legally barred from trading in the securities they cover for 30 days prior to and 5 days post publication. Furthermore, WeGro receives zero kickbacks, transaction-based brokerage cuts, or listing fees from corporations. Our sole revenue source is transparent, fee-only subscription dues from our subscribers."
    },
    {
      question: "What is your mathematical approach to Stop-Loss and risk management?",
      answer: "Every single trade recommendation generated by WeGro is issued with a pre-defined mathematical invalidation price (Stop-Loss) before entry. We never use arbitrary round numbers; stop-losses are calculated using multi-timeframe volatility metrics (ATR), structural support/resistance zones, and liquidity nodes. If the market invalidates the analytical thesis, subscribers are advised to exit cleanly without averaging down."
    },
    {
      question: "How can clients resolve grievances or escalate questions?",
      answer: "WeGro has a structured 4-tier Investor Grievance Redressal framework. Clients can email our dedicated Compliance Desk directly at support@wegro.in or escalate to our Compliance Officer at our Mumbai registered office. Additionally, investors have direct access to the SEBI SCORES portal (scores.sebi.gov.in) and the SMART ODR platform (smartodr.in) for independent dispute resolution."
    }
  ];

  return (
    <div className="about-page-root">
      {/* =========================================================================
          SECTION 1: HERO HEADER — LUXURY OBSIDIAN / TEAL AESTHETIC WITH METRICS
          ========================================================================= */}
      <section
        className="section"
        style={{
          position: 'relative',
          paddingTop: 'calc(var(--space-20) + 20px)',
          paddingBottom: 'var(--space-20)',
          background: 'var(--bg-canvas)'
        }}
      >
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-header" style={{ maxWidth: 960, margin: '0 auto', textAlign: 'center' }}>
            <div style={{ marginBottom: 18, display: 'inline-flex', justifyContent: 'center' }}>
              <GlowingBadge variant="cyan" icon={Shield}>
                SEBI Registered Research Analyst · INH000008093
              </GlowingBadge>
            </div>

            <h1
              className="section-title"
              style={{
                color: 'var(--text-dark-primary)',
                fontSize: 'clamp(2.1rem, 4.2vw, 3.4rem)',
                lineHeight: 1.15,
                fontWeight: 800,
                letterSpacing: '-0.02em',
                marginBottom: 20
              }}
            >
              Independent Research. Pure Mathematics. <br />
              <span style={{ color: 'var(--brand-primary)' }}>Zero Conflicting Interests.</span>
            </h1>

            <p
              className="section-description"
              style={{
                color: 'var(--text-dark-secondary)',
                fontSize: 'clamp(1rem, 1.2vw, 1.1875rem)',
                lineHeight: 1.68,
                maxWidth: 820,
                margin: '0 auto 28px auto'
              }}
            >
              WeGro was established to dismantle speculative hype and predatory advisory practices in Indian capital markets. We deliver institutional-grade fundamental models, quantitative options architecture, and audited risk parameters to retail and professional market participants.
            </p>

            {/* Credential Copy Pills */}
            <div className="credential-pill-group" style={{ justifyContent: 'center' }}>
              <button
                type="button"
                className="credential-pill"
                onClick={() => handleCopy(companyConfig.sebiRegistrationNumber, 'sebi')}
                title="Click to copy SEBI Registration Number"
                aria-label="Copy SEBI Registration Number"
              >
                <span className="badge-tag">SEBI RA</span>
                <span>{companyConfig.sebiRegistrationNumber}</span>
                {copiedKey === 'sebi' ? <Check size={14} style={{ color: '#94B9AF' }} /> : <Copy size={14} style={{ opacity: 0.6 }} />}
              </button>

              <button
                type="button"
                className="credential-pill"
                onClick={() => handleCopy(companyConfig.bseMembershipNumber, 'bse')}
                title="Click to copy BSE Membership Number"
                aria-label="Copy BSE Membership Number"
              >
                <span className="badge-tag">BSE RA</span>
                <span>BASL ID: {companyConfig.bseMembershipNumber}</span>
                {copiedKey === 'bse' ? <Check size={14} style={{ color: '#94B9AF' }} /> : <Copy size={14} style={{ opacity: 0.6 }} />}
              </button>

              <button
                type="button"
                className="credential-pill"
                onClick={() => handleCopy(companyConfig.cinNumber, 'cin')}
                title="Click to copy Corporate Identity Number"
                aria-label="Copy Corporate Identity Number"
              >
                <span className="badge-tag">CIN</span>
                <span>{companyConfig.cinNumber}</span>
                {copiedKey === 'cin' ? <Check size={14} style={{ color: '#94B9AF' }} /> : <Copy size={14} style={{ opacity: 0.6 }} />}
              </button>
            </div>
          </div>

          {/* 4-Item Transparent Metrics Stats Bar */}
          <div className="about-hero-stats">
            <div className="about-stat-item">
              <div className="about-stat-num">
                <NumberTicker value={100} suffix="%" />
              </div>
              <div className="about-stat-label">Fee-Only Advisory</div>
              <div className="about-stat-sub">Zero kickbacks, broker rebates, or hidden volume incentives.</div>
            </div>

            <div className="about-stat-item">
              <div className="about-stat-num">
                <NumberTicker value={4} suffix="-Stage" />
              </div>
              <div className="about-stat-label">Analytical Pipeline</div>
              <div className="about-stat-sub">Macro, fundamental, volatility, and risk committee sign-off gates.</div>
            </div>

            <div className="about-stat-item">
              <div className="about-stat-num">
                <NumberTicker value={2.5} prefix="1:" suffix="+" />
              </div>
              <div className="about-stat-label">Minimum Risk-Reward</div>
              <div className="about-stat-sub">Strict mathematical cutoff before any recommendation is published.</div>
            </div>

            <div className="about-stat-item">
              <div className="about-stat-num">
                <NumberTicker value={0} suffix=" PMS" />
              </div>
              <div className="about-stat-label">Full Custody Retention</div>
              <div className="about-stat-sub">Clients retain 100% control of their own demat and trading accounts.</div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: STATUTORY COMPLIANCE & VERIFICATION DIRECTORY BANNER
          ========================================================================= */}
      <section style={{ background: '#080705', borderBottom: '1px solid rgba(148, 185, 175, 0.18)', padding: '16px 0' }}>
        <div className="container">
          <div className="compliance-banner" style={{ background: 'rgba(18, 16, 13, 0.9)', borderColor: 'rgba(148, 185, 175, 0.25)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#f59e0b', fontWeight: 700, fontSize: '0.875rem' }}>
                <AlertTriangle size={18} />
                <span>Statutory Regulatory Accreditation & Verification Channels</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                <a
                  href={companyConfig.officialPortals.sebiScores}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="legal-stat-link"
                  style={{ color: '#94B9AF', display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.8125rem', textDecoration: 'none' }}
                >
                  <span>SEBI SCORES Portal</span>
                  <ExternalLink size={13} />
                </a>
                <a
                  href={companyConfig.officialPortals.smartOdr}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="legal-stat-link"
                  style={{ color: '#94B9AF', display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.8125rem', textDecoration: 'none' }}
                >
                  <span>SMART ODR Dispute Portal</span>
                  <ExternalLink size={13} />
                </a>
                <button
                  type="button"
                  onClick={() => handleNav('/disclosures')}
                  style={{ background: 'transparent', border: 'none', color: '#94B9AF', fontSize: '0.8125rem', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  View Statutory Disclosures
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: CORE PHILOSOPHY & PILLARS OF INDEPENDENCE
          ========================================================================= */}
      <section className="section bg-white">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', maxWidth: 840, margin: '0 auto 48px auto' }}>
            <span className="section-eyebrow dark" style={{ color: '#702632' }}>The WeGro Doctrine</span>
            <h2 className="section-title" style={{ color: '#080705' }}>
              Built for Serious Capital. Grounded in Integrity.
            </h2>
            <p className="section-description" style={{ color: 'rgba(8, 7, 5, 0.72)' }}>
              We reject the speculative narrative that equates active trading with gambling. Our operational architecture rests on three non-negotiable pillars of financial discipline.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 28 }}>
            {/* Pillar 1 */}
            <SpotlightCard
              style={{
                background: '#FFFFFA',
                border: '1px solid rgba(8, 7, 5, 0.1)',
                padding: '36px 32px',
                borderRadius: 'var(--radius-lg)'
              }}
              spotlightColor="rgba(148, 185, 175, 0.2)"
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  background: 'rgba(112, 38, 50, 0.08)',
                  color: '#702632',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 20
                }}
              >
                <Target size={26} />
              </div>
              <h3 style={{ fontSize: '1.3125rem', fontWeight: 800, color: '#080705', marginBottom: 12 }}>
                I. Capital Preservation First
              </h3>
              <p style={{ color: 'rgba(8, 7, 5, 0.72)', fontSize: '0.9375rem', lineHeight: 1.68 }}>
                Mathematical compounding is impossible without defensive risk parameters. An investor who mitigates severe drawdowns during macro corrections does not have to engage in desperate recovery trades to outpace benchmark indices.
              </p>
            </SpotlightCard>

            {/* Pillar 2 */}
            <SpotlightCard
              style={{
                background: '#FFFFFA',
                border: '1px solid rgba(8, 7, 5, 0.1)',
                padding: '36px 32px',
                borderRadius: 'var(--radius-lg)'
              }}
              spotlightColor="rgba(148, 185, 175, 0.2)"
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  background: 'rgba(148, 185, 175, 0.18)',
                  color: '#284e45',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 20
                }}
              >
                <Cpu size={26} />
              </div>
              <h3 style={{ fontSize: '1.3125rem', fontWeight: 800, color: '#080705', marginBottom: 12 }}>
                II. Mathematical Determinism
              </h3>
              <p style={{ color: 'rgba(8, 7, 5, 0.72)', fontSize: '0.9375rem', lineHeight: 1.68 }}>
                Subjective intuition and emotional bias are systematically replaced with structured models: forensic balance-sheet health scores, volatility surfaces, Open Interest profiles, and pre-calculated invalidation levels.
              </p>
            </SpotlightCard>

            {/* Pillar 3 */}
            <SpotlightCard
              style={{
                background: '#FFFFFA',
                border: '1px solid rgba(8, 7, 5, 0.1)',
                padding: '36px 32px',
                borderRadius: 'var(--radius-lg)'
              }}
              spotlightColor="rgba(148, 185, 175, 0.2)"
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  background: 'rgba(145, 47, 64, 0.1)',
                  color: '#912F40',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 20
                }}
              >
                <Scale size={26} />
              </div>
              <h3 style={{ fontSize: '1.3125rem', fontWeight: 800, color: '#080705', marginBottom: 12 }}>
                III. Fiduciary Independence
              </h3>
              <p style={{ color: 'rgba(8, 7, 5, 0.72)', fontSize: '0.9375rem', lineHeight: 1.68 }}>
                We work exclusively for our subscribers. We do not distribute financial products for commissions, we receive zero broker volume rebates, and our analysts are legally barred from trading against research calls.
              </p>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: INTERACTIVE 4-STAGE RESEARCH & VERIFICATION FUNNEL
          ========================================================================= */}
      <section className="section bg-light" style={{ borderTop: '1px solid rgba(8, 7, 5, 0.08)', borderBottom: '1px solid rgba(8, 7, 5, 0.08)' }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', maxWidth: 840, margin: '0 auto 40px auto' }}>
            <span className="section-eyebrow dark" style={{ color: '#702632' }}>Analytical Rigor</span>
            <h2 className="section-title" style={{ color: '#080705' }}>
              The 4-Stage Research & Verification Funnel
            </h2>
            <p className="section-description" style={{ color: 'rgba(8, 7, 5, 0.72)' }}>
              Before any recommendation is transmitted to subscribers, it must pass through four distinct analytical checkpoints to eliminate subjective bias and false positives. Click any gate below to inspect its criteria.
            </p>
          </div>

          {/* Interactive Gate Tabs */}
          <div className="funnel-tabs-nav" role="tablist" aria-label="Research Gates Navigation">
            {funnelGates.map((gate, index) => {
              const isActive = activeGate === index;
              return (
                <button
                  key={gate.gateId}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`funnel-tab-btn ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveGate(index)}
                >
                  <div className="funnel-tab-gate">{gate.gateId}</div>
                  <div className="funnel-tab-title">{gate.title}</div>
                </button>
              );
            })}
          </div>

          {/* Active Gate Inspection Panel */}
          {(() => {
            const current = funnelGates[activeGate];
            return (
              <div className="funnel-display-card">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14, marginBottom: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.8125rem',
                        fontWeight: 700,
                        color: 'var(--brand-primary)',
                        background: 'var(--brand-primary-soft)',
                        padding: '4px 10px',
                        borderRadius: 6
                      }}
                    >
                      {current.gateId}
                    </span>
                    <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-dark-primary)' }}>
                      {current.title}
                    </h3>
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: 'var(--brand-primary)',
                      background: 'var(--brand-primary-soft)',
                      padding: '4px 12px',
                      borderRadius: 9999,
                      border: '1px solid var(--brand-primary-border)'
                    }}
                  >
                    {current.badge}
                  </div>
                </div>

                <p style={{ color: 'var(--text-dark-secondary)', fontSize: '1rem', lineHeight: 1.6, maxWidth: 980 }}>
                  {current.summary}
                </p>

                {/* Quantitative Metrics Grid */}
                <div className="funnel-metrics-grid">
                  {current.metrics.map((m, i) => (
                    <div key={i} className="funnel-metric-box">
                      <div className="funnel-metric-title">{m.label}</div>
                      <div className="funnel-metric-desc">{m.desc}</div>
                    </div>
                  ))}
                </div>

                {/* Audit & Rejection Rules */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: 16, marginTop: 24, paddingTop: 20, borderTop: '1px solid rgba(148, 185, 175, 0.15)' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <XCircle size={18} style={{ color: '#ef4444', flexShrink: 0, marginTop: 2 }} />
                    <div>
                      <strong style={{ color: '#ef4444', fontSize: '0.8125rem', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                        Disqualification Criterion:
                      </strong>
                      <p style={{ color: 'rgba(255, 255, 250, 0.72)', fontSize: '0.8125rem', marginTop: 2, lineHeight: 1.5 }}>
                        {current.rejectionTrigger}
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <CheckCircle2 size={18} style={{ color: '#94B9AF', flexShrink: 0, marginTop: 2 }} />
                    <div>
                      <strong style={{ color: '#94B9AF', fontSize: '0.8125rem', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                        Verified Pipeline Output:
                      </strong>
                      <p style={{ color: 'rgba(255, 255, 250, 0.72)', fontSize: '0.8125rem', marginTop: 2, lineHeight: 1.5 }}>
                        {current.outputAudit}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: FIDUCIARY COMMITMENTS VS PRACTICES WE BAN
          ========================================================================= */}
      <section className="section bg-white">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', maxWidth: 840, margin: '0 auto 48px auto' }}>
            <span className="section-eyebrow dark" style={{ color: '#702632' }}>Radical Transparency</span>
            <h2 className="section-title" style={{ color: '#080705' }}>
              The WeGro Standard: Contrasting Integrity
            </h2>
            <p className="section-description" style={{ color: 'rgba(8, 7, 5, 0.72)' }}>
              In an industry troubled by misleading guarantees and unregistered tipsters, our standard is defined as much by what we refuse to do as by what we do.
            </p>
          </div>

          <div className="fiduciary-comparison-grid">
            {/* Left: What We Stand For */}
            <div className="fiduciary-card-standard">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: 'rgba(148, 185, 175, 0.25)',
                    color: '#284e45'
                  }}
                >
                  <CheckCircle2 size={18} />
                </span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#080705' }}>
                  What We Stand For (The WeGro Code)
                </h3>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'rgba(8, 7, 5, 0.7)', lineHeight: 1.6 }}>
                Every advisory process is governed by documented research methodology, risk-adjusted parameters, and SEBI statutory mandates.
              </p>

              <ul className="fiduciary-list">
                <li className="fiduciary-list-item">
                  <CheckCircle2 size={16} style={{ color: '#284e45', flexShrink: 0, marginTop: 3 }} />
                  <div>
                    <strong>100% Fee-Based Transparent Subscriptions</strong>
                    <p>Clients pay an upfront flat subscription fee. Zero hidden deductions or surprise costs.</p>
                  </div>
                </li>

                <li className="fiduciary-list-item">
                  <CheckCircle2 size={16} style={{ color: '#284e45', flexShrink: 0, marginTop: 3 }} />
                  <div>
                    <strong>Pre-Defined Invalidation (Stop-Loss) on Every Call</strong>
                    <p>No recommendation is ever broadcast without a mathematically verified exit level.</p>
                  </div>
                </li>

                <li className="fiduciary-list-item">
                  <CheckCircle2 size={16} style={{ color: '#284e45', flexShrink: 0, marginTop: 3 }} />
                  <div>
                    <strong>100% Demat & Trading Account Custody</strong>
                    <p>You execute all orders directly with your own broker. We never touch investor funds.</p>
                  </div>
                </li>

                <li className="fiduciary-list-item">
                  <CheckCircle2 size={16} style={{ color: '#284e45', flexShrink: 0, marginTop: 3 }} />
                  <div>
                    <strong>Audited Research Track Records & Disclosures</strong>
                    <p>Transparent historical performance logs showing both profit targets and stopped-out positions.</p>
                  </div>
                </li>

                <li className="fiduciary-list-item">
                  <CheckCircle2 size={16} style={{ color: '#284e45', flexShrink: 0, marginTop: 3 }} />
                  <div>
                    <strong>Documented Conflict of Interest Declarations</strong>
                    <p>Quarterly regulatory audits certifying that analysts hold zero personal stake in recommended equities.</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Right: What We Strictly Prohibit */}
            <div className="fiduciary-card-banned">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: 'rgba(145, 47, 64, 0.15)',
                    color: '#912F40'
                  }}
                >
                  <XCircle size={18} />
                </span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#080705' }}>
                  Practices Strictly Banned at WeGro
                </h3>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'rgba(8, 7, 5, 0.7)', lineHeight: 1.6 }}>
                Common toxic retail practices that erode investor wealth and compromise analytical independence are strictly barred.
              </p>

              <ul className="fiduciary-list">
                <li className="fiduciary-list-item">
                  <XCircle size={16} style={{ color: '#912F40', flexShrink: 0, marginTop: 3 }} />
                  <div>
                    <strong>Zero Demat Handling or Profit-Sharing Schemes</strong>
                    <p>Handling client trading accounts or taking percentage cuts of profit is unethical and illegal without PMS licensing.</p>
                  </div>
                </li>

                <li className="fiduciary-list-item">
                  <XCircle size={16} style={{ color: '#912F40', flexShrink: 0, marginTop: 3 }} />
                  <div>
                    <strong>No "Guaranteed Returns" or "Sure-Shot Jackpot" Hype</strong>
                    <p>Markets are probabilistic. Anyone promising guaranteed profits in securities trading is misrepresenting facts.</p>
                  </div>
                </li>

                <li className="fiduciary-list-item">
                  <XCircle size={16} style={{ color: '#912F40', flexShrink: 0, marginTop: 3 }} />
                  <div>
                    <strong>No Broker Turnover Rebates or Kickbacks</strong>
                    <p>We accept zero compensation from brokers for generating trading turnover or churn.</p>
                  </div>
                </li>

                <li className="fiduciary-list-item">
                  <XCircle size={16} style={{ color: '#912F40', flexShrink: 0, marginTop: 3 }} />
                  <div>
                    <strong>No Shadow Trading (Front-Running)</strong>
                    <p>Strict internal blackout windows ensure zero analyst trades prior to research distribution.</p>
                  </div>
                </li>

                <li className="fiduciary-list-item">
                  <XCircle size={16} style={{ color: '#912F40', flexShrink: 0, marginTop: 3 }} />
                  <div>
                    <strong>No High-Pressure Tele-Marketing or Unsolicited Spam</strong>
                    <p>We respect client privacy and do not engage in aggressive push sales or cold call lists.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: LEADERSHIP & RESEARCH DESK GOVERNANCE
          ========================================================================= */}
      <section className="section bg-light" style={{ borderTop: '1px solid rgba(8, 7, 5, 0.08)' }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', maxWidth: 840, margin: '0 auto 48px auto' }}>
            <span className="section-eyebrow dark" style={{ color: '#702632' }}>Governance Bench</span>
            <h2 className="section-title" style={{ color: '#080705' }}>
              Research Leadership & Compliance Officers
            </h2>
            <p className="section-description" style={{ color: 'rgba(8, 7, 5, 0.72)' }}>
              Our research desk is governed by qualified market analysts holding mandated National Institute of Securities Markets (NISM) certifications and seasoned capital market experience.
            </p>
          </div>

          <div className="analyst-grid">
            {/* Analyst 1: Head of Research */}
            <div className="analyst-card">
              <div className="analyst-cert-badge">
                <Award size={12} />
                <span>NISM Series XV · Research Analyst</span>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#080705', marginBottom: 4 }}>
                Head of Equity Strategy & Research
              </h3>
              <div style={{ fontSize: '0.8125rem', color: '#702632', fontWeight: 600, marginBottom: 14 }}>
                Desk Focus: Macro Valuation & Mid-Cap Forensic Discovery
              </div>
              <p style={{ fontSize: '0.875rem', color: 'rgba(8, 7, 5, 0.72)', lineHeight: 1.6, marginBottom: 16, flexGrow: 1 }}>
                Over 14 years of Indian capital markets experience spanning institutional equity coverage, forensic accounting models, corporate governance audits, and capex cycle forecasting.
              </p>
              <div style={{ fontSize: '0.75rem', color: 'rgba(8, 7, 5, 0.55)', borderTop: '1px solid rgba(8, 7, 5, 0.08)', paddingTop: 12 }}>
                Chartered Financial Analyst (CFA) Charterholder · SEBI RA Compliance Sign-off
              </div>
            </div>

            {/* Analyst 2: Derivatives Specialist */}
            <div className="analyst-card">
              <div className="analyst-cert-badge">
                <Award size={12} />
                <span>NISM Series VIII · Equity Derivatives</span>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#080705', marginBottom: 4 }}>
                Chief Quantitative & Derivatives Strategist
              </h3>
              <div style={{ fontSize: '0.8125rem', color: '#702632', fontWeight: 600, marginBottom: 14 }}>
                Desk Focus: Options Greeks, Volatility Surfaces & OI Skew
              </div>
              <p style={{ fontSize: '0.875rem', color: 'rgba(8, 7, 5, 0.72)', lineHeight: 1.6, marginBottom: 16, flexGrow: 1 }}>
                Specializing in quantitative options volatility arbitrage, delta-neutral spreads, gamma scalping matrices, and institutional order-flow distribution on Nifty & Bank Nifty.
              </p>
              <div style={{ fontSize: '0.75rem', color: 'rgba(8, 7, 5, 0.55)', borderTop: '1px solid rgba(8, 7, 5, 0.08)', paddingTop: 12 }}>
                B.Tech (Computer Science) & FRM (Certified Financial Risk Manager)
              </div>
            </div>

            {/* Analyst 3: Principal & Compliance Officer */}
            <div className="analyst-card">
              <div className="analyst-cert-badge">
                <Shield size={12} />
                <span>Principal Officer & Compliance</span>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#080705', marginBottom: 4 }}>
                Principal & Regulatory Compliance Officer
              </h3>
              <div style={{ fontSize: '0.8125rem', color: '#702632', fontWeight: 600, marginBottom: 14 }}>
                Desk Focus: Statutory Adherence & Investor Grievance
              </div>
              <p style={{ fontSize: '0.875rem', color: 'rgba(8, 7, 5, 0.72)', lineHeight: 1.6, marginBottom: 16, flexGrow: 1 }}>
                Oversees comprehensive adherence to SEBI RA Regulations 2014, conflict-of-interest monitoring, compliance filing, and rapid resolution of subscriber inquiries.
              </p>
              <div style={{ fontSize: '0.75rem', color: 'rgba(8, 7, 5, 0.55)', borderTop: '1px solid rgba(8, 7, 5, 0.08)', paddingTop: 12 }}>
                Company Secretary (CS) & LLB · Direct Escalation Desk: support@wegro.in
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: CORPORATE INFRASTRUCTURE & DUAL-OFFICE NETWORK
          ========================================================================= */}
      <section className="section" style={{ background: 'var(--bg-subtle)', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', maxWidth: 840, margin: '0 auto 48px auto' }}>
            <span className="section-eyebrow" style={{ color: 'var(--brand-primary)', background: 'var(--brand-primary-soft)', border: '1px solid var(--brand-primary-border)' }}>
              Physical Footprint
            </span>
            <h2 className="section-title" style={{ color: 'var(--text-dark-primary)', marginTop: 8 }}>
              Dual Corporate Infrastructure & Desks
            </h2>
            <p className="section-description" style={{ color: 'var(--text-dark-secondary)' }}>
              We maintain full physical presence with our registered headquarters in Mumbai for regulatory administration and our quantitative analytical research hub in Bengaluru.
            </p>
          </div>

          <div className="office-grid">
            {/* Registered Office (Mumbai) */}
            <div className="office-box">
              <div>
                <div className="office-box-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--brand-primary-soft)', color: 'var(--brand-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Building2 size={20} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-dark-primary)', margin: 0 }}>
                        {companyConfig.offices.registeredOffice.title}
                      </h3>
                      <span style={{ fontSize: '0.75rem', color: 'var(--brand-primary)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                        Mumbai, Maharashtra · Statutory HQ
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="office-copy-btn"
                    onClick={() => handleCopy(companyConfig.offices.registeredOffice.address, 'mumbai')}
                    title="Copy full address"
                  >
                    {copiedKey === 'mumbai' ? <Check size={12} /> : <Copy size={12} />}
                    <span>{copiedKey === 'mumbai' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, color: 'var(--text-dark-secondary)', fontSize: '0.9375rem', lineHeight: 1.6, marginBottom: 20 }}>
                  <MapPin size={18} style={{ color: 'var(--brand-primary)', flexShrink: 0, marginTop: 4 }} />
                  <div>{companyConfig.offices.registeredOffice.address}</div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.8125rem', color: 'var(--text-dark-muted)', borderTop: '1px solid var(--border-light)', paddingTop: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Clock size={14} style={{ color: 'var(--brand-primary)' }} />
                    <span>Compliance Desk: Monday – Friday (9:00 AM – 5:00 PM IST)</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Mail size={14} style={{ color: 'var(--brand-primary)' }} />
                    <span>Statutory Escalations: {companyConfig.contact.email}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Principal Place of Business (Bengaluru) */}
            <div className="office-box">
              <div>
                <div className="office-box-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--brand-secondary-soft)', color: 'var(--brand-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Building2 size={20} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-dark-primary)', margin: 0 }}>
                        {companyConfig.offices.principalPlace.title}
                      </h3>
                      <span style={{ fontSize: '0.75rem', color: 'var(--brand-secondary)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                        Bengaluru, Karnataka · Research Lab
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="office-copy-btn"
                    onClick={() => handleCopy(companyConfig.offices.principalPlace.address, 'blr')}
                    title="Copy full address"
                  >
                    {copiedKey === 'blr' ? <Check size={12} /> : <Copy size={12} />}
                    <span>{copiedKey === 'blr' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, color: 'var(--text-dark-secondary)', fontSize: '0.9375rem', lineHeight: 1.6, marginBottom: 20 }}>
                  <MapPin size={18} style={{ color: 'var(--brand-primary)', flexShrink: 0, marginTop: 4 }} />
                  <div>{companyConfig.offices.principalPlace.address}</div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.8125rem', color: 'var(--text-dark-muted)', borderTop: '1px solid var(--border-light)', paddingTop: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Clock size={14} style={{ color: 'var(--brand-primary)' }} />
                    <span>Advisory Desk: {companyConfig.contact.supportHours}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Phone size={14} style={{ color: 'var(--brand-primary)' }} />
                    <span>Desk Line: {companyConfig.contact.phone}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: INVESTOR DUE DILIGENCE & FREQUENTLY ASKED QUESTIONS
          ========================================================================= */}
      <section className="section bg-white">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', maxWidth: 840, margin: '0 auto 48px auto' }}>
            <span className="section-eyebrow dark" style={{ color: '#702632' }}>Due Diligence</span>
            <h2 className="section-title" style={{ color: '#080705' }}>
              Investor Inquiries & Regulatory Clarity
            </h2>
            <p className="section-description" style={{ color: 'rgba(8, 7, 5, 0.72)' }}>
              Transparent answers regarding our research operations, legal boundaries, and investor protection safeguards.
            </p>
          </div>

          <div className="about-faq-list">
            {faqItems.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className={`about-faq-item ${isOpen ? 'open' : ''}`}>
                  <button
                    type="button"
                    className="about-faq-question"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    aria-expanded={isOpen}
                  >
                    <span>{item.question}</span>
                    <ChevronDown size={18} className="about-faq-icon" />
                  </button>

                  {isOpen && (
                    <div className="about-faq-answer">
                      <p>{item.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 9: INSTITUTIONAL CLOSING BANNER / ACTION DESK
          ========================================================================= */}
      <section
        className="section"
        style={{
          borderTop: '1px solid var(--border-light)',
          background: 'var(--bg-canvas)',
          padding: '80px 0'
        }}
      >
        <div className="container">
          <div
            style={{
              background: 'var(--bg-white)',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-xl)',
              padding: 'clamp(32px, 5vw, 64px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              boxShadow: 'var(--shadow-md)'
            }}
          >
            <GlowingBadge variant="cyan" icon={Sparkles}>
              Start With Research Discipline
            </GlowingBadge>

            <h2
              style={{
                fontSize: 'clamp(1.8rem, 3.2vw, 2.75rem)',
                fontWeight: 800,
                color: 'var(--text-dark-primary)',
                margin: '20px 0 16px 0',
                lineHeight: 1.2
              }}
            >
              Ready to Upgrade Your Capital to Institutional Standards?
            </h2>

            <p
              style={{
                color: 'var(--text-dark-secondary)',
                fontSize: 'clamp(0.9375rem, 1.1vw, 1.125rem)',
                maxWidth: 720,
                lineHeight: 1.65,
                marginBottom: 36
              }}
            >
              Explore our seven structured research desks spanning Equity Cash, Index Derivatives, and Commodity hedging. Or connect directly with our advisory desk for suitability evaluation.
            </p>

            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
              <button
                type="button"
                onClick={() => handleNav('/services')}
                className="btn btn-primary"
                style={{ padding: '14px 28px', fontSize: '1rem', fontWeight: 700 }}
              >
                <span>Explore Research Desks</span>
                <ArrowRight size={18} />
              </button>

              <button
                type="button"
                onClick={() => handleNav('/pricing')}
                className="btn btn-outline"
                style={{
                  padding: '14px 28px',
                  fontSize: '1rem',
                  fontWeight: 600,
                  borderColor: 'var(--border-light)',
                  color: 'var(--text-dark-primary)',
                  background: 'var(--bg-white)'
                }}
              >
                <span>Subscription Plans</span>
              </button>

              <button
                type="button"
                onClick={() => handleNav('/contact')}
                className="btn btn-secondary"
                style={{ padding: '14px 28px', fontSize: '1rem', fontWeight: 600 }}
              >
                <span>Contact Advisory Desk</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 10: STATUTORY RISK WARNING FOOTER NOTICE
          ========================================================================= */}
      <section style={{ background: 'var(--bg-subtle)', padding: '24px 0', borderTop: '1px solid var(--border-light)' }}>
        <div className="container">
          <div style={{ maxWidth: 960, margin: '0 auto', textAlign: 'center' }}>
            <p style={{ color: 'var(--text-dark-muted)', fontSize: '0.75rem', lineHeight: 1.6, margin: 0 }}>
              <strong style={{ color: 'var(--text-dark-secondary)' }}>Standard Statutory Disclaimer: </strong>
              {companyConfig.riskDisclosure}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
