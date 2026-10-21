import React, { useState } from 'react';
import {
  ShieldCheck,
  FileText,
  AlertTriangle,
  Award,
  ArrowRight,
  Check,
  Copy,
  Scale,
  Building,
  TrendingUp,
  ExternalLink
} from 'lucide-react';
import { companyConfig } from '../data/companyConfig';

export default function AboutPage({ navigate }) {
  const [copiedKey, setCopiedKey] = useState(null);

  const handleNav = (path) => {
    if (navigate) {
      navigate(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2000);
  };

  const valuesList = [
    {
      id: 'transparency',
      title: 'Transparency',
      icon: FileText,
      content:
        'Every recommendation carries its reasoning, its risk, and its review. Our disclosure center is not a legal obligation we tolerate — it is the product working as intended.'
    },
    {
      id: 'independence',
      title: 'Independence',
      icon: ShieldCheck,
      content:
        'No broking arm, no distribution commissions, no issuer relationships. When research is the only revenue, integrity is the only strategy that survives.'
    },
    {
      id: 'risk-awareness',
      title: 'Risk awareness',
      icon: AlertTriangle,
      content:
        'We publish invalidation levels with every view. A research house that cannot tell you when it is wrong is not doing research.'
    },
    {
      id: 'craft',
      title: 'Craft',
      icon: Award,
      content:
        'A research note is an argument built from evidence. We hold our writing to the same standard as our analysis — clear, precise, and honest about uncertainty.'
    }
  ];

  const philosophyPoints = [
    {
      number: '01',
      title: 'Evidence over opinion',
      content:
        'Every call begins with data and ends with documented thesis. If the evidence changes, the view changes — publicly, with a written record.'
    },
    {
      number: '02',
      title: 'Risk before return',
      content:
        'We size the downside before we discuss the upside. Every recommendation carries an explicit invalidation level and risk framework.'
    },
    {
      number: '03',
      title: 'Independence, structurally',
      content:
        'No investment banking, no broking commissions, no distribution incentives. Research is the only product — so research is the only agenda.'
    },
    {
      number: '04',
      title: 'Time horizon honesty',
      content:
        'Short-term noise and long-term value are different disciplines. We label every view with the horizon it belongs to — and we do not blur the two.'
    }
  ];

  return (
    <div className="about-page-root" style={{ background: 'var(--bg-canvas)', minHeight: '100vh' }}>
      {/* =========================================================================
          SECTION 2: HERO SECTION (ABOUT WEGRO)
          ========================================================================= */}
      <section
        className="section"
        style={{
          position: 'relative',
          paddingTop: 'calc(var(--space-20) + 32px)',
          paddingBottom: 'var(--space-16)',
          background: 'var(--bg-canvas)',
          borderBottom: '1px solid var(--border-light)'
        }}
      >
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-header" style={{ maxWidth: 940, margin: '0 auto', textAlign: 'center' }}>
            <div style={{ marginBottom: 18, display: 'inline-flex', justifyContent: 'center' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '6px 16px',
                  borderRadius: 9999,
                  background: '#ECFDF5',
                  border: '1px solid #A7F3D0',
                  color: '#047857',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  fontFamily: 'var(--font-mono, monospace)',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase'
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981' }} />
                SEBI Registered Research Analyst · INH000012345
              </span>
            </div>

            <h1
              className="section-title"
              style={{
                color: 'var(--text-dark-primary)',
                fontSize: 'clamp(2.1rem, 4.2vw, 3.5rem)',
                lineHeight: 1.15,
                fontWeight: 800,
                letterSpacing: '-0.025em',
                marginBottom: 22
              }}
            >
              A research house built on one revenue stream:{' '}
              <span style={{ color: 'var(--brand-primary)', textDecoration: 'underline', textDecorationColor: 'rgba(28, 63, 53, 0.3)', textUnderlineOffset: 6 }}>
                being right, honestly.
              </span>
            </h1>

            <p
              className="section-description"
              style={{
                color: 'var(--text-dark-secondary)',
                fontSize: 'clamp(1.05rem, 1.25vw, 1.25rem)',
                lineHeight: 1.7,
                maxWidth: 820,
                margin: '0 auto 32px auto'
              }}
            >
              WEGRO Research Private Limited is a SEBI-registered Research Analyst firm based in Mumbai. We publish independent research on Indian equities, derivatives, commodities, and currencies for individual investors, family offices, and institutions.
            </p>

            {/* Credential Pills */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: 12,
                marginTop: 8
              }}
            >
              <button
                type="button"
                onClick={() => handleCopy('INH000012345', 'sebi')}
                title="Click to copy SEBI Registration Number"
                aria-label="Copy SEBI Registration Number"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  background: 'var(--bg-white)',
                  border: '1px solid var(--border-light)',
                  padding: '8px 16px',
                  borderRadius: 8,
                  fontSize: '0.8125rem',
                  fontFamily: 'var(--font-mono, monospace)',
                  fontWeight: 600,
                  color: 'var(--text-dark-primary)',
                  boxShadow: 'var(--shadow-xs)',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s ease, transform 0.2s ease'
                }}
              >
                <span style={{ color: 'var(--brand-primary)', fontWeight: 700 }}>SEBI RA:</span>
                <span>INH000012345</span>
                {copiedKey === 'sebi' ? (
                  <Check size={14} style={{ color: '#10B981' }} />
                ) : (
                  <Copy size={13} style={{ opacity: 0.5 }} />
                )}
              </button>

              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  background: 'var(--bg-white)',
                  border: '1px solid var(--border-light)',
                  padding: '8px 16px',
                  borderRadius: 8,
                  fontSize: '0.8125rem',
                  fontFamily: 'var(--font-mono, monospace)',
                  color: 'var(--text-dark-secondary)',
                  boxShadow: 'var(--shadow-xs)'
                }}
              >
                <Building size={14} style={{ color: 'var(--brand-primary)' }} />
                <span>Mumbai, Maharashtra</span>
              </div>

              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  background: 'var(--bg-white)',
                  border: '1px solid var(--border-light)',
                  padding: '8px 16px',
                  borderRadius: 8,
                  fontSize: '0.8125rem',
                  fontFamily: 'var(--font-mono, monospace)',
                  color: 'var(--text-dark-secondary)',
                  boxShadow: 'var(--shadow-xs)'
                }}
              >
                <TrendingUp size={14} style={{ color: 'var(--brand-primary)' }} />
                <span>NSE · BSE · MCX Coverage</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: WHO WE ARE
          ========================================================================= */}
      <section
        className="section"
        style={{
          background: 'var(--bg-canvas)',
          paddingTop: 'var(--space-16)',
          paddingBottom: 'var(--space-16)'
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
              gap: 48,
              alignItems: 'stretch'
            }}
          >
            {/* Left Column: Architectural Highlight Card */}
            <div
              style={{
                background: '#1C3F35',
                borderRadius: 24,
                padding: '44px 36px',
                color: '#FFFFFF',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 20px 45px -10px rgba(28, 63, 53, 0.25)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Subtle architectural ambient gradient */}
              <div
                style={{
                  position: 'absolute',
                  top: -60,
                  right: -60,
                  width: 220,
                  height: 220,
                  background: 'radial-gradient(circle, rgba(16, 185, 129, 0.22) 0%, transparent 70%)',
                  borderRadius: '50%',
                  pointerEvents: 'none'
                }}
              />

              <div>
                <span
                  style={{
                    display: 'inline-block',
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono, monospace)',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#A7F3D0',
                    marginBottom: 16
                  }}
                >
                  WHO WE ARE
                </span>
                <h2
                  style={{
                    fontSize: 'clamp(1.75rem, 2.5vw, 2.25rem)',
                    fontWeight: 700,
                    lineHeight: 1.25,
                    marginBottom: 20,
                    color: '#FFFFFF'
                  }}
                >
                  Designed around a simple structural idea.
                </h2>
                <blockquote
                  style={{
                    borderLeft: '3px solid #10B981',
                    paddingLeft: 16,
                    margin: '24px 0',
                    fontSize: '1.125rem',
                    fontStyle: 'italic',
                    color: '#E6F4EA',
                    lineHeight: 1.6
                  }}
                >
                  &ldquo;If subscriptions are the only income, quality is the only incentive.&rdquo;
                </blockquote>
              </div>

              {/* Data Badges Strip */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: 16,
                  paddingTop: 24,
                  borderTop: '1px solid rgba(255, 255, 255, 0.15)'
                }}
              >
                <div>
                  <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#FFFFFF', fontFamily: 'var(--font-mono, monospace)' }}>
                    2015
                  </div>
                  <div style={{ fontSize: '0.8125rem', color: '#A7F3D0' }}>
                    Founded in Mumbai
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#FFFFFF', fontFamily: 'var(--font-mono, monospace)' }}>
                    100+
                  </div>
                  <div style={{ fontSize: '0.8125rem', color: '#A7F3D0' }}>
                    Annual Notes Published
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Editorial Body Paragraphs */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '12px 0'
              }}
            >
              <div style={{ marginBottom: 16 }}>
                <span
                  style={{
                    fontSize: '0.8125rem',
                    fontWeight: 700,
                    fontFamily: 'var(--font-mono, monospace)',
                    color: 'var(--brand-primary)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase'
                  }}
                >
                  Our Inception &amp; Mandate
                </span>
              </div>

              <p
                style={{
                  fontSize: '1.125rem',
                  lineHeight: 1.75,
                  color: 'var(--text-dark-primary)',
                  marginBottom: 20
                }}
              >
                Founded in 2015 by analysts who left sell-side desks to escape their conflicts, WEGRO was designed around a simple structural idea: if subscriptions are the only income, quality is the only incentive.
              </p>

              <p
                style={{
                  fontSize: '1.0625rem',
                  lineHeight: 1.75,
                  color: 'var(--text-dark-secondary)',
                  marginBottom: 28
                }}
              >
                Today the desk covers NSE and BSE listed securities and MCX commodity contracts, publishing over a hundred notes a year — each one archived, attributable, and accountable.
              </p>

              {/* Three Institutional Hallmarks */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#ECFDF5', color: '#047857', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                    ✓
                  </div>
                  <span style={{ fontSize: '0.9375rem', color: 'var(--text-dark-primary)' }}>
                    <strong>NSE &amp; BSE listed securities</strong> with quantitative multi-timeframe rigor
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#ECFDF5', color: '#047857', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                    ✓
                  </div>
                  <span style={{ fontSize: '0.9375rem', color: 'var(--text-dark-primary)' }}>
                    <strong>MCX commodity contracts</strong> monitored against macro liquidity drivers
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#ECFDF5', color: '#047857', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                    ✓
                  </div>
                  <span style={{ fontSize: '0.9375rem', color: 'var(--text-dark-primary)' }}>
                    <strong>100% archived &amp; attributable</strong> with full invalidation frameworks
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: VALUES (WHAT WE OPTIMISE FOR)
          ========================================================================= */}
      <section
        className="section"
        style={{
          background: 'var(--bg-subtle)',
          borderTop: '1px solid var(--border-light)',
          borderBottom: '1px solid var(--border-light)',
          paddingTop: 'var(--space-16)',
          paddingBottom: 'var(--space-16)'
        }}
      >
        <div className="container">
          <div className="section-header" style={{ maxWidth: 760, margin: '0 auto 48px auto', textAlign: 'center' }}>
            <span
              style={{
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono, monospace)',
                fontWeight: 700,
                color: 'var(--brand-primary)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: 10,
                display: 'inline-block'
              }}
            >
              VALUES
            </span>
            <h2
              className="section-title"
              style={{
                fontSize: 'clamp(1.85rem, 3vw, 2.45rem)',
                fontWeight: 800,
                color: 'var(--text-dark-primary)',
                marginBottom: 12
              }}
            >
              What we optimise for
            </h2>
            <p
              className="section-description"
              style={{ color: 'var(--text-dark-secondary)', fontSize: '1rem', lineHeight: 1.6 }}
            >
              Four foundational standards governing every research note, price invalidation level, and analyst communication.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: 24
            }}
          >
            {valuesList.map((val) => {
              const IconComp = val.icon;
              return (
                <div
                  key={val.id}
                  style={{
                    background: 'var(--bg-white)',
                    border: '1px solid var(--border-light)',
                    borderRadius: 16,
                    padding: '32px 28px',
                    boxShadow: 'var(--shadow-xs)',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 14px 30px -8px rgba(8, 7, 5, 0.08)';
                    e.currentTarget.style.borderColor = 'rgba(28, 63, 53, 0.25)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-xs)';
                    e.currentTarget.style.borderColor = 'var(--border-light)';
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 12,
                      background: 'var(--brand-primary-soft)',
                      color: 'var(--brand-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 20
                    }}
                  >
                    <IconComp size={22} />
                  </div>

                  <h3
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: 'var(--text-dark-primary)',
                      marginBottom: 12
                    }}
                  >
                    {val.title}
                  </h3>

                  <p
                    style={{
                      color: 'var(--text-dark-secondary)',
                      fontSize: '0.9375rem',
                      lineHeight: 1.65,
                      margin: 0
                    }}
                  >
                    {val.content}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: RESEARCH PHILOSOPHY
          ========================================================================= */}
      <section
        className="section"
        style={{
          background: 'var(--bg-canvas)',
          paddingTop: 'var(--space-16)',
          paddingBottom: 'var(--space-16)'
        }}
      >
        <div className="container">
          <div className="section-header" style={{ maxWidth: 760, margin: '0 auto 48px auto', textAlign: 'center' }}>
            <span
              style={{
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono, monospace)',
                fontWeight: 700,
                color: 'var(--brand-primary)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: 10,
                display: 'inline-block'
              }}
            >
              PHILOSOPHY
            </span>
            <h2
              className="section-title"
              style={{
                fontSize: 'clamp(1.85rem, 3vw, 2.45rem)',
                fontWeight: 800,
                color: 'var(--text-dark-primary)',
                marginBottom: 12
              }}
            >
              Our research philosophy
            </h2>
            <p
              className="section-description"
              style={{ color: 'var(--text-dark-secondary)', fontSize: '1rem', lineHeight: 1.6 }}
            >
              The four intellectual commitments that shape our market decisions and risk parameters.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: 24
            }}
          >
            {philosophyPoints.map((pt) => (
              <div
                key={pt.number}
                style={{
                  background: 'var(--bg-white)',
                  border: '1px solid var(--border-light)',
                  borderRadius: 16,
                  padding: '32px 28px',
                  boxShadow: 'var(--shadow-xs)',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 14px 30px -8px rgba(8, 7, 5, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-xs)';
                }}
              >
                {/* Index Pill */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    background: '#1C3F35',
                    color: '#FFFFFF',
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    marginBottom: 20
                  }}
                >
                  {pt.number}
                </div>

                <h3
                  style={{
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    color: 'var(--text-dark-primary)',
                    marginBottom: 12
                  }}
                >
                  {pt.title}
                </h3>

                <p
                  style={{
                    color: 'var(--text-dark-secondary)',
                    fontSize: '0.9375rem',
                    lineHeight: 1.65,
                    margin: 0
                  }}
                >
                  {pt.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: REGULATORY APPROACH & DISCLOSURE CTA
          ========================================================================= */}
      <section
        className="section"
        style={{
          background: 'var(--bg-canvas)',
          paddingTop: 0,
          paddingBottom: 'var(--space-20)'
        }}
      >
        <div className="container">
          <div
            style={{
              background: 'linear-gradient(135deg, #F8FAF9 0%, #FFFFFF 100%)',
              border: '2px solid rgba(28, 63, 53, 0.15)',
              borderRadius: 24,
              padding: '48px 40px',
              boxShadow: '0 12px 36px -10px rgba(8, 7, 5, 0.06)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              maxWidth: 960,
              margin: '0 auto'
            }}
          >
            <div style={{ marginBottom: 16 }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '6px 14px',
                  borderRadius: 9999,
                  background: 'var(--brand-primary-soft)',
                  border: '1px solid var(--brand-primary-border)',
                  color: 'var(--brand-primary)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  fontFamily: 'var(--font-mono, monospace)',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase'
                }}
              >
                <Scale size={14} />
                Regulatory Governance &amp; Compliance
              </span>
            </div>

            <h2
              style={{
                fontSize: 'clamp(1.75rem, 2.8vw, 2.3rem)',
                fontWeight: 800,
                color: 'var(--text-dark-primary)',
                marginBottom: 18,
                maxWidth: 780
              }}
            >
              Embedded compliance, from analyst restrictions to per-report disclosures.
            </h2>

            <p
              style={{
                fontSize: '1.0625rem',
                lineHeight: 1.75,
                color: 'var(--text-dark-secondary)',
                maxWidth: 780,
                marginBottom: 32
              }}
            >
              WEGRO operates under the SEBI (Research Analysts) Regulations, 2014 — Registration No. INH000012345. Compliance is not a department here; it is embedded in the research process, from analyst trading restrictions to per-report conflict disclosures. Every regulatory document is published in our disclosure center.
            </p>

            <button
              type="button"
              onClick={() => handleNav('/disclosures')}
              className="btn btn-primary"
              style={{
                padding: '14px 28px',
                fontSize: '0.9375rem',
                fontWeight: 700,
                letterSpacing: '0.02em',
                borderRadius: 10,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10
              }}
            >
              <span>VISIT THE DISCLOSURE CENTER</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
