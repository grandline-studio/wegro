import React from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  FileSpreadsheet,
  Lock,
  Clock,
  Target,
  Sparkles,
  ShieldAlert,
  Zap,
  Award,
  HelpCircle
} from 'lucide-react';
import { servicesData } from '../data/servicesData';
import { companyConfig } from '../data/companyConfig';
import { openConsultationModal } from '../components/ConsultationLauncher';

export default function PricingPage({ navigate }) {
  const handleNav = (path) => {
    if (navigate) {
      navigate(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const plans = [
    {
      id: "starter-equity-cash",
      name: "Starter Equity Cash",
      price: "₹4,999",
      period: "/ Month",
      badge: "Cash Intraday",
      popular: false,
      tagline: "Precision momentum intraday cash recommendations for disciplined equity traders.",
      features: [
        "1-2 intraday cash calls daily",
        "Real-time WhatsApp & Telegram delivery",
        "Stop-loss & target trailing alerts",
        "Basic portfolio review",
        "Standard support"
      ],
      idealFor: "Active cash traders seeking disciplined position sizing without overnight leverage risk.",
      ctaLabel: "Subscribe to Starter Equity"
    },
    {
      id: "pro-fo-derivatives",
      name: "Pro F&O Derivatives",
      price: "₹9,999",
      period: "/ Month",
      badge: "Most Popular",
      popular: true,
      tagline: "Greeks-engineered option strategies and stock futures momentum setups for derivatives traders.",
      features: [
        "Nifty & BankNifty index options",
        "Stock futures & momentum trade ideas",
        "Option buying & selling strategies",
        "1-on-1 risk management guidance",
        "Dedicated relationship manager"
      ],
      idealFor: "Traders who understand derivatives risk, option Greeks, and margin discipline.",
      ctaLabel: "Subscribe to Pro F&O"
    },
    {
      id: "hni-wealth-swing-vip",
      name: "HNI Wealth & Swing VIP",
      price: "₹24,999",
      period: "/ Quarter",
      badge: "VIP Institutional",
      popular: false,
      tagline: "Full multi-segment research desk covering Equity, Derivatives, and MCX Commodities.",
      features: [
        "Full multi-segment coverage (Equity + F&O + MCX)",
        "High-conviction swing trade ideas",
        "Quarterly multibagger research reports",
        "Priority telephonic analyst consultation",
        "SEBI-compliant investor protection"
      ],
      idealFor: "HNIs and working professionals building medium-term compounding wealth across asset classes.",
      ctaLabel: "Subscribe to VIP Wealth"
    }
  ];

  const feePrinciples = [
    {
      icon: ShieldAlert,
      title: "Research-Only Advisory",
      description: "Fees are charged only for research services, never against promised returns.",
      highlight: "Zero Assured Return Guarantee"
    },
    {
      icon: FileSpreadsheet,
      title: "Statutory GST Invoicing",
      description: "GST invoice issued for every payment made to the official account/UPI ID.",
      highlight: "18% GST • Formal Tax Invoice"
    },
    {
      icon: Lock,
      title: "Designated Secure Channels",
      description: "Payments are accepted only via the designated secure fast payment channels.",
      highlight: "Official Corporate Banking & UPI"
    },
    {
      icon: ShieldCheck,
      title: "Transparent Complaint Redressal",
      description: "Grievances on billing are tracked through the dedicated complaint status system.",
      highlight: "Trackable Redressal & SCORES"
    }
  ];

  const rateCardData = [
    {
      id: "equity-cash-intraday",
      desk: "Equity Cash & Intraday Growth",
      badge: "High Conviction",
      horizon: "Intraday (Same Day)",
      frequency: "1-2 Calls / Day",
      tenures: {
        monthly: "₹ 15,000",
        quarterly: "₹ 39,000",
        annual: "₹ 1,20,000"
      },
      deliverables: "Entry zone, stop-loss, dual targets, trailing alerts, weekly watchlist",
      channel: "SMS / Telegram / Terminal"
    },
    {
      id: "fo-derivatives-strategy",
      desk: "F&O Derivatives Strategy",
      badge: "Index & Stock Options",
      horizon: "Intraday to Weekly (1-5 Days)",
      frequency: "2-3 Setups / Expiry",
      tenures: {
        monthly: "₹ 20,000",
        quarterly: "₹ 52,000",
        annual: "₹ 1,60,000"
      },
      deliverables: "Index option ideas with Greeks rationale, futures setups, expiry risk frameworks",
      channel: "SMS / Telegram / Terminal"
    },
    {
      id: "commodity-mcx-advisory",
      desk: "Commodity & MCX Advisory",
      badge: "Gold, Silver & Crude",
      horizon: "Evening Session & Swing (1-3 Days)",
      frequency: "Daily Evening Calls",
      tenures: {
        monthly: "₹ 18,000",
        quarterly: "₹ 46,000",
        annual: "₹ 1,45,000"
      },
      deliverables: "MCX futures calls, macro context, inventory alerts, cross-asset notes",
      channel: "SMS / Telegram / Terminal"
    },
    {
      id: "swing-wealth-portfolio",
      desk: "Swing & Wealth Creation Portfolio",
      badge: "Positional · 2-12 Weeks",
      horizon: "Positional (2-12 Weeks)",
      frequency: "2-4 Ideas / Month",
      tenures: {
        monthly: "₹ 12,000",
        quarterly: "₹ 32,000",
        annual: "₹ 99,000"
      },
      deliverables: "Quarterly multibagger reports, fundamental + technical thesis notes, portfolio review",
      channel: "Research PDF / Email / Terminal"
    }
  ];

  return (
    <div className="pricing-page-root">
      {/* 1. HERO HEADER */}
      <section className="section" style={{ background: 'var(--bg-canvas)', paddingTop: 'calc(var(--space-20) + 16px)', paddingBottom: 'var(--space-12)' }}>
        <div className="container">
          <div className="section-header" style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center' }}>
            <div style={{ marginBottom: 16, display: 'inline-flex', justifyContent: 'center' }}>
              <span className="section-eyebrow" style={{ color: 'var(--brand-primary)', background: 'var(--brand-primary-soft)', border: '1px solid var(--brand-primary-border)' }}>
                Advisory Fee Schedule · SEBI Registered Research Analyst
              </span>
            </div>
            <h1 className="section-title" style={{ color: 'var(--text-dark-primary)', fontSize: 'clamp(2.1rem, 4vw, 3.25rem)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: 18 }}>
              Research Plans & Subscription Packages
            </h1>
            <p className="section-description" style={{ color: 'var(--text-dark-secondary)', fontSize: 'clamp(1rem, 1.15vw, 1.125rem)', lineHeight: 1.68, maxWidth: 780, margin: '0 auto' }}>
              Transparent, fee-based research subscriptions. In strict compliance with SEBI Research Analyst regulations, fees are charged only for independent research services, never against promised returns.
            </p>
          </div>
        </div>
      </section>

      {/* 2. STATUTORY DISCLOSURE BANNER */}
      <section style={{ background: 'var(--bg-subtle)', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)', padding: '16px 0' }}>
        <div className="container">
          <div className="compliance-banner">
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <AlertTriangle size={18} style={{ color: '#B45309', flexShrink: 0, marginTop: 2 }} />
              <div>
                <strong style={{ color: '#B45309', fontSize: '0.875rem', display: 'block', marginBottom: 4 }}>
                  SEBI Advisory Fee Compliance & Direct Remittance Notice
                </strong>
                <p style={{ margin: 0, color: 'var(--text-dark-secondary)', fontSize: '0.8125rem', lineHeight: 1.55 }}>
                  All advisory charges are strictly fixed subscription fees billed via verifiable banking channels (NEFT / RTGS / IMPS) to WeGro corporate accounts. Payments to individual accounts or cash are strictly prohibited. 18% GST is invoiced statutorily with formal onboarding agreements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THREE FEATURED SUBSCRIPTION PLANS */}
      <section className="section" style={{ background: 'var(--bg-canvas)', padding: '56px 0 40px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 28, alignItems: 'stretch' }}>
            {plans.map((plan) => (
              <div
                key={plan.id}
                className="card-light"
                style={{
                  padding: '36px 30px',
                  background: 'var(--bg-white)',
                  border: plan.popular ? '2px solid #702632' : '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-xl)',
                  boxShadow: plan.popular ? '0 12px 36px rgba(112, 38, 50, 0.12)' : 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative'
                }}
              >
                {/* Most Popular Floating Pill */}
                {plan.popular && (
                  <div
                    style={{
                      position: 'absolute',
                      top: -14,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: '#702632',
                      color: '#ffffff',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      fontFamily: 'var(--font-mono)',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      padding: '4px 16px',
                      borderRadius: 9999,
                      boxShadow: '0 4px 12px rgba(112, 38, 50, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6
                    }}
                  >
                    <Sparkles size={12} />
                    <span>Most Popular</span>
                  </div>
                )}

                {/* Badge & Segment */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 700,
                      color: plan.popular ? '#702632' : 'var(--brand-primary)',
                      background: plan.popular ? 'rgba(112, 38, 50, 0.08)' : 'var(--brand-primary-soft)',
                      padding: '4px 10px',
                      borderRadius: 6,
                      border: plan.popular ? '1px solid rgba(112, 38, 50, 0.2)' : '1px solid var(--brand-primary-border)'
                    }}
                  >
                    {plan.badge}
                  </span>
                  <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-dark-muted)' }}>
                    SEBI Regulated
                  </span>
                </div>

                {/* Plan Title */}
                <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-dark-primary)', marginBottom: 8, lineHeight: 1.25 }}>
                  {plan.name}
                </h2>

                <p style={{ color: 'var(--text-dark-secondary)', fontSize: '0.875rem', lineHeight: 1.5, marginBottom: 20 }}>
                  {plan.tagline}
                </p>

                {/* Price Display */}
                <div style={{ padding: '16px 0', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)', marginBottom: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                    <span style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-dark-primary)', fontFamily: 'var(--font-mono)', letterSpacing: '-0.03em' }}>
                      {plan.price}
                    </span>
                    <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-dark-secondary)' }}>
                      {plan.period}
                    </span>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-dark-muted)', fontFamily: 'var(--font-mono)', display: 'block', marginTop: 4 }}>
                    + 18% GST · Tax invoice provided
                  </span>
                </div>

                {/* Ideal Profile */}
                <div style={{ background: 'var(--bg-subtle)', borderRadius: 8, padding: '10px 12px', marginBottom: 20, border: '1px solid var(--border-light)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.72rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-dark-primary)', textTransform: 'uppercase', marginBottom: 4 }}>
                    <Target size={13} style={{ color: 'var(--brand-primary)' }} />
                    <span>Target Profile</span>
                  </div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text-dark-secondary)', lineHeight: 1.45 }}>
                    {plan.idealFor}
                  </div>
                </div>

                {/* Features List */}
                <div style={{ marginBottom: 24, flex: 1 }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-dark-muted)', marginBottom: 12, fontFamily: 'var(--font-mono)' }}>
                    Included Features
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, margin: 0, padding: 0 }}>
                    {plan.features.map((feat, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.875rem', color: 'var(--text-dark-secondary)', lineHeight: 1.45 }}>
                        <CheckCircle2 size={16} style={{ color: plan.popular ? '#702632' : 'var(--brand-primary)', flexShrink: 0, marginTop: 2 }} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action CTA */}
                <button
                  type="button"
                  onClick={() => openConsultationModal(plan.name)}
                  className={`btn ${plan.popular ? 'btn-primary' : 'btn-outline'}`}
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    padding: '14px 20px',
                    fontSize: '0.9375rem',
                    fontWeight: 700,
                    ...(plan.popular ? { background: '#702632', borderColor: '#702632', color: '#ffffff' } : {})
                  }}
                >
                  <span>{plan.ctaLabel}</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEE & REFUND PRINCIPLES SECTION */}
      <section className="section bg-light" style={{ borderTop: '1px solid var(--border-light)', padding: '72px 0' }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', maxWidth: 840, margin: '0 auto 48px auto' }}>
            <span className="section-eyebrow dark" style={{ color: '#702632' }}>Compliance & Fair Practice</span>
            <h2 className="section-title" style={{ color: '#080705', fontSize: 'clamp(1.75rem, 3vw, 2.35rem)', fontWeight: 800 }}>
              Fee & Refund Principles
            </h2>
            <p className="section-description" style={{ color: 'rgba(8, 7, 5, 0.72)', maxWidth: 700, margin: '0 auto' }}>
              We operate strictly under statutory SEBI Research Analyst guidelines to protect investor capital and maintain complete billing transparency.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: 24 }}>
            {feePrinciples.map((principle, index) => {
              const IconComponent = principle.icon;
              return (
                <div
                  key={index}
                  className="card-light"
                  style={{
                    padding: '30px 24px',
                    background: 'var(--bg-white)',
                    border: '1px solid var(--border-light)',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: 'var(--shadow-sm)',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 12,
                      background: 'rgba(112, 38, 50, 0.08)',
                      color: '#702632',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 18
                    }}
                  >
                    <IconComponent size={24} />
                  </div>

                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 700,
                      color: '#702632',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      marginBottom: 8
                    }}
                  >
                    {principle.highlight}
                  </span>

                  <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--text-dark-primary)', marginBottom: 10 }}>
                    {principle.title}
                  </h3>

                  <p style={{ fontSize: '0.875rem', color: 'var(--text-dark-secondary)', lineHeight: 1.6, margin: 0 }}>
                    {principle.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. SEPARATE ADVISORY DESKS RATE CARD BREAKDOWN TABLE */}
      <section className="section bg-white" style={{ borderTop: '1px solid var(--border-light)', padding: '64px 0' }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', maxWidth: 840, margin: '0 auto 36px auto' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '4px 12px', background: 'rgba(112, 38, 50, 0.08)', borderRadius: 20, color: '#702632', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700, marginBottom: 14 }}>
              <FileSpreadsheet size={14} />
              <span>Transparent Rate Card Matrix</span>
            </div>
            <h2 className="section-title" style={{ color: 'var(--text-dark-primary)', fontSize: 'clamp(1.75rem, 3vw, 2.35rem)', fontWeight: 800 }}>
              Advisory Verticals Rate Card & Schedule
            </h2>
            <p className="section-description" style={{ color: 'var(--text-dark-secondary)' }}>
              Detailed rate card across holding horizons and execution tenures for institutional and multi-segment subscribers.
            </p>
          </div>

          <div className="service-table-container">
            <table className="service-table" aria-label="Advisory Rate Card Breakdown Table">
              <thead>
                <tr>
                  <th>Advisory Vertical</th>
                  <th>Target Horizon</th>
                  <th>Monthly</th>
                  <th>Quarterly</th>
                  <th>Annual</th>
                  <th>Transmission Channel</th>
                  <th>Onboarding</th>
                </tr>
              </thead>
              <tbody>
                {rateCardData.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <strong style={{ color: '#080705', display: 'block', fontSize: '0.9375rem' }}>
                        {item.desk}
                      </strong>
                      <span style={{ fontSize: '0.75rem', color: '#702632', fontFamily: 'var(--font-mono)' }}>
                        {item.badge}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.8125rem', color: 'var(--text-dark-secondary)' }}>
                        {item.horizon}
                      </span>
                    </td>
                    <td>
                      <strong style={{ color: '#080705', fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>
                        {item.tenures.monthly}
                      </strong>
                      <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-dark-muted)' }}>+ 18% GST</span>
                    </td>
                    <td>
                      <strong style={{ color: '#080705', fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>
                        {item.tenures.quarterly}
                      </strong>
                      <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-dark-muted)' }}>+ 18% GST</span>
                    </td>
                    <td>
                      <strong style={{ color: '#284e45', fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>
                        {item.tenures.annual}
                      </strong>
                      <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-dark-muted)' }}>Best Value</span>
                    </td>
                    <td>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-dark-secondary)' }}>
                        {item.channel}
                      </span>
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => openConsultationModal(item.desk)}
                        style={{
                          background: 'var(--brand-primary)',
                          color: '#ffffff',
                          border: 'none',
                          borderRadius: 6,
                          padding: '6px 12px',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        Enquire Desk
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Rate Card Footnote */}
          <div style={{ marginTop: 24, padding: 20, background: 'var(--bg-subtle)', borderRadius: 10, border: '1px solid var(--border-light)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-dark-primary)', marginBottom: 6 }}>
              <Lock size={15} style={{ color: 'var(--brand-primary)' }} />
              <span>Statutory Rate Card Terms & Direct Remittance Compliance</span>
            </div>
            <ul style={{ margin: 0, paddingLeft: 20, fontSize: '0.8125rem', color: 'var(--text-dark-secondary)', lineHeight: 1.6 }}>
              <li>Fees are non-refundable once advisory access is granted as per our Service Delivery Policy.</li>
              <li>GST at 18% is billed statutorily on all invoices in compliance with Ministry of Finance guidelines.</li>
              <li>Subscriptions require completion of mandatory KYC and Risk Profiling before research access is activated.</li>
              <li>Payment must be made directly from the subscriber's bank account to WeGro Research Private Limited via RTGS/NEFT/IMPS.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 6. CLOSING CONSULTATION BANNER */}
      <section className="section bg-light" style={{ padding: '60px 0', borderTop: '1px solid var(--border-light)' }}>
        <div className="container" style={{ maxWidth: 840, textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.875rem', fontWeight: 800, color: 'var(--text-dark-primary)', marginBottom: 12 }}>
            Need Custom Advisory or Institutional Portfolio Review?
          </h2>
          <p style={{ color: 'var(--text-dark-secondary)', fontSize: '1rem', lineHeight: 1.65, marginBottom: 28 }}>
            Speak directly with our senior research team to evaluate asset suitability, capital allocation sizing, and customized onboarding timelines.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => openConsultationModal('Advisory Consultation')}
              className="btn btn-primary"
              style={{ padding: '14px 28px', fontSize: '0.9375rem', fontWeight: 700 }}
            >
              <span>Schedule Advisory Callback</span>
              <ArrowRight size={16} />
            </button>
            <button
              type="button"
              onClick={() => handleNav('/services')}
              className="btn btn-outline"
              style={{ padding: '14px 26px', fontSize: '0.9375rem', fontWeight: 600, borderColor: 'var(--border-light)', color: 'var(--text-dark-primary)', background: 'var(--bg-white)' }}
            >
              <span>Explore Services Syllabus</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}


