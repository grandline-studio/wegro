import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  Clock,
  Briefcase,
  HelpCircle,
  FileText,
  Sparkles,
  Layers,
  Table,
  ShieldCheck,
  ChevronDown,
  Phone,
  ExternalLink,
  Target
} from 'lucide-react';
import { servicesData } from '../data/servicesData';
import { companyConfig } from '../data/companyConfig';
import AnimatedTabs from '../components/AnimatedTabs';
import GlowingBadge from '../components/GlowingBadge';
import ServiceModal from '../components/ServiceModal';

export default function ServicesPage({ onSelectService, navigate }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModalService, setActiveModalService] = useState(null);
  const [openFaq, setOpenFaq] = useState(0);

  const categories = [
    'All',
    'Equity Cash',
    'Derivatives (F&O)',
    'Commodities',
    'Hybrid & Multi-Asset'
  ];

  const filteredServices = selectedCategory === 'All'
    ? servicesData
    : servicesData.filter((s) => s.category === selectedCategory);

  const handleNav = (path) => {
    if (navigate) {
      navigate(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleEnquireService = (service) => {
    if (onSelectService) {
      onSelectService(service);
    } else {
      setActiveModalService(service);
    }
  };

  const faqItems = [
    {
      question: "How are research calls transmitted during active market hours?",
      answer: "Recommendations are simultaneously broadcast across three secure conduits: our Web Client Terminal, enterprise SMS delivery, and dedicated private Telegram channel. Each alert specifies the exact scrip symbol, trade direction, limit entry range, dual targets, and non-negotiable stop-loss level before market open or during live market liquidity hours."
    },
    {
      question: "Does WeGro manage client funds, handle demat accounts, or offer PMS?",
      answer: "No. Under no circumstance does WeGro take custody of client capital, ask for brokerage trading credentials, or provide discretionary trade execution. We are an independent, fee-only Research Analyst entity. You maintain 100% control of your trading funds with your existing broker and execute orders at your own discretion."
    },
    {
      question: "Are Stop-Loss (invalidation) levels mandatory on every single recommendation?",
      answer: "Yes, 100% of our recommendations contain a strict mathematical invalidation point (Stop-Loss) calculated using multi-timeframe ATR metrics and structural support/resistance zones. Capital preservation is the core pillar of our research doctrine; we never advise averaging down on losing trades."
    },
    {
      question: "What is your refund and subscription cancellation framework?",
      answer: "In compliance with SEBI Research Analyst guidelines, subscriptions are fee-only and non-discretionary. Detailed cancellation terms, service delivery timelines, and escalation matrices are documented in our statutory Service Delivery Policy and Refund & Cancellation Policy available in our compliance directory."
    }
  ];

  return (
    <div className="services-page-root">
      {/* =========================================================================
          SECTION 1: HERO HEADER WITH ANIMATED TABS (LAPTOP OPTIMIZED)
          ========================================================================= */}
      <section
        className="section bg-dark"
        style={{
          position: 'relative',
          paddingTop: 'calc(var(--space-20) + 16px)',
          paddingBottom: 'var(--space-16)',
          background: 'var(--bg-canvas)'
        }}
      >
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-header" style={{ maxWidth: 920, margin: '0 auto', textAlign: 'center' }}>
            <div style={{ marginBottom: 16, display: 'inline-flex', justifyContent: 'center' }}>
              <GlowingBadge variant="cyan" icon={Layers}>
                Seven Institutional Research Desks · SEBI Registered
              </GlowingBadge>
            </div>

            <h1
              className="section-title"
              style={{
                color: 'var(--text-dark-primary)',
                fontSize: 'clamp(2.1rem, 4vw, 3.25rem)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                lineHeight: 1.15,
                marginBottom: 18
              }}
            >
              Structured Financial Research Services
            </h1>

            <p
              className="section-description"
              style={{
                color: 'var(--text-dark-secondary)',
                fontSize: 'clamp(1rem, 1.15vw, 1.125rem)',
                lineHeight: 1.68,
                maxWidth: 780,
                margin: '0 auto 28px auto'
              }}
            >
              Comprehensive, non-discretionary market intelligence engineered for disciplined equity investors, derivatives traders, and commodity hedgers.
            </p>

            {/* Filter Tabs & Active Counter */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
              <AnimatedTabs
                tabs={categories}
                activeTab={selectedCategory}
                onChange={setSelectedCategory}
              />
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--brand-primary)',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  fontWeight: 600
                }}
              >
                Showing {filteredServices.length} of {servicesData.length} Research Desks
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: STATUTORY ADVISORY SCOPE BANNER
          ========================================================================= */}
      <section style={{ background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border-light)', padding: '16px 0' }}>
        <div className="container">
          <div className="compliance-banner">
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, flex: 1, minWidth: 300 }}>
                <AlertTriangle size={18} style={{ color: '#B45309', flexShrink: 0, marginTop: 3 }} />
                <div>
                  <strong style={{ color: '#B45309', fontSize: '0.875rem', display: 'block', marginBottom: 4 }}>
                    Non-Discretionary Research Scope & Suitability Guidelines
                  </strong>
                  <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--text-dark-secondary)', lineHeight: 1.55 }}>
                    WeGro provides research reports, quantitative strategies, and trade level invalidations. WeGro does NOT offer Portfolio Management Services (PMS), discretionary trading, or profit-sharing accounts. Subscriptions are strictly fee-based. Derivatives and leveraged products are not suitable for all investors.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12, alignSelf: 'center' }}>
                <button
                  type="button"
                  onClick={() => handleNav('/disclosures')}
                  style={{
                    background: 'var(--brand-primary-soft)',
                    border: '1px solid var(--brand-primary-border)',
                    color: 'var(--brand-primary)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    padding: '6px 14px',
                    borderRadius: 6,
                    cursor: 'pointer',
                    textDecoration: 'none',
                    whiteSpace: 'nowrap'
                  }}
                >
                  Statutory Disclosures →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: SERVICES DIRECTORY — 2-COLUMN LAPTOP OPTIMIZED CARDS
          ========================================================================= */}
      <section className="section bg-light" style={{ padding: '60px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {filteredServices.map((service, index) => {
              const deskNumber = `DESK 0${index + 1}/07`;
              const isHighRisk = service.riskLevel.toLowerCase().includes('high');

              return (
                <div key={service.id} className="service-spotlight-card">
                  <div className="service-card-columns">
                    {/* Left Column: Core Identity, Specs & Actions */}
                    <div className="service-card-left">
                      <div>
                        {/* Micro Badges Top Row */}
                        <div className="service-badge-row">
                          <span className="service-segment-badge">{service.segment}</span>
                          <span className="service-category-badge">{service.badge}</span>
                          <span className="service-desk-id">{deskNumber}</span>
                        </div>

                        {/* Title & Headline */}
                        <h2 className="service-title">{service.name}</h2>
                        <div className="service-headline">{service.headline}</div>

                        {/* Narrative Description */}
                        <p className="service-desc">{service.shortDesc}</p>

                        {/* Execution Horizon & Suitability Specs Box */}
                        <div className="service-specs-box">
                          <div className="service-spec-item">
                            <Clock size={16} style={{ color: '#702632', flexShrink: 0, marginTop: 2 }} />
                            <div>
                              <strong>Holding Horizon: </strong>
                              <span>{service.holdingPeriod}</span>
                            </div>
                          </div>
                          <div className="service-spec-item">
                            <Target size={16} style={{ color: '#284e45', flexShrink: 0, marginTop: 2 }} />
                            <div>
                              <strong>Ideal Profile: </strong>
                              <span>{service.suitability}</span>
                            </div>
                          </div>
                        </div>

                        {/* Pricing Microcopy */}
                        <div className="service-pricing-note">
                          Advisory Policy: {service.pricingNote}
                        </div>
                      </div>

                      {/* Interactive Buttons (Laptop Grid) */}
                      <div className="service-actions-row">
                        <button
                          type="button"
                          onClick={() => handleEnquireService(service)}
                          className="btn btn-primary btn-shimmer"
                          style={{ padding: '12px 22px', fontSize: '0.9375rem', fontWeight: 700 }}
                        >
                          <span>Enquire Desk</span>
                          <ArrowRight size={16} />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleNav('/pricing')}
                          className="btn btn-outline"
                          style={{
                            padding: '12px 20px',
                            fontSize: '0.9375rem',
                            fontWeight: 600,
                            borderColor: 'rgba(112, 38, 50, 0.35)',
                            color: '#080705'
                          }}
                        >
                          <span>View Pricing Plans</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleEnquireService(service)}
                          className="btn btn-secondary"
                          style={{ padding: '12px 18px', fontSize: '0.875rem' }}
                        >
                          <span>Desk Factsheet</span>
                        </button>
                      </div>
                    </div>

                    {/* Right Column: Deliverables & Risk Assessment (Divided on Laptop) */}
                    <div className="service-card-right">
                      {/* Deliverables Checklist */}
                      <div className="service-deliverables-wrap">
                        <div className="service-deliverables-header">
                          <FileText size={18} style={{ color: '#702632' }} />
                          <span>Included Research Deliverables</span>
                        </div>

                        <ul className="service-deliverables-list">
                          {service.keyDeliverables.map((item, idx) => (
                            <li key={idx} className="service-deliverable-item">
                              <CheckCircle2 size={16} style={{ color: '#284e45', flexShrink: 0, marginTop: 3 }} />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Risk Assessment Box */}
                      <div>
                        <div className={`service-risk-card ${isHighRisk ? 'risk-high' : 'risk-moderate'}`}>
                          <div className="service-risk-header">
                            <ShieldAlert size={16} />
                            <span>Risk Assessment: {service.riskLevel}</span>
                          </div>
                          <p className="service-risk-text">{service.riskNote}</p>
                        </div>

                        {/* Helpline Prompt */}
                        <div className="service-helpline-note" style={{ marginTop: 14 }}>
                          <Phone size={13} style={{ color: '#702632' }} />
                          <span>Advisory Suitability Desk: {companyConfig.contact.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: INSTITUTIONAL DESK PARAMETER COMPARISON MATRIX (LAPTOP FEATURE)
          ========================================================================= */}
      <section className="section bg-white" style={{ borderTop: '1px solid rgba(8, 7, 5, 0.08)' }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', maxWidth: 840, margin: '0 auto 40px auto' }}>
            <span className="section-eyebrow dark" style={{ color: '#702632' }}>Side-by-Side Evaluation</span>
            <h2 className="section-title" style={{ color: '#080705' }}>
              Institutional Desk Comparison Matrix
            </h2>
            <p className="section-description" style={{ color: 'rgba(8, 7, 5, 0.72)' }}>
              Compare holding horizons, risk classifications, and instrument coverage across all seven advisory desks at a glance.
            </p>
          </div>

          <div className="service-table-container">
            <table className="service-table" aria-label="Research Desks Comparison Table">
              <thead>
                <tr>
                  <th>Desk Name</th>
                  <th>Asset Class</th>
                  <th>Target Horizon</th>
                  <th>Risk Profile</th>
                  <th>Execution Style</th>
                  <th>Suitability Action</th>
                </tr>
              </thead>
              <tbody>
                {servicesData.map((s) => {
                  const isHigh = s.riskLevel.toLowerCase().includes('high');
                  return (
                    <tr key={s.id}>
                      <td>
                        <strong style={{ color: '#080705', display: 'block', fontSize: '0.9375rem' }}>{s.name}</strong>
                        <span style={{ fontSize: '0.75rem', color: '#702632' }}>{s.badge}</span>
                      </td>
                      <td>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: '#284e45' }}>
                          {s.segment}
                        </span>
                      </td>
                      <td>{s.holdingPeriod}</td>
                      <td>
                        <span
                          style={{
                            display: 'inline-block',
                            padding: '3px 8px',
                            borderRadius: 4,
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            fontFamily: 'var(--font-mono)',
                            background: isHigh ? 'rgba(145, 47, 64, 0.1)' : 'rgba(148, 185, 175, 0.2)',
                            color: isHigh ? '#912F40' : '#284e45'
                          }}
                        >
                          {s.riskLevel}
                        </span>
                      </td>
                      <td style={{ fontSize: '0.8125rem' }}>{s.headline}</td>
                      <td>
                        <button
                          type="button"
                          onClick={() => handleEnquireService(s)}
                          style={{
                            background: 'transparent',
                            border: '1px solid rgba(112, 38, 50, 0.3)',
                            color: '#702632',
                            borderRadius: 6,
                            padding: '6px 12px',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            cursor: 'pointer'
                          }}
                        >
                          Enquire
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: DUE DILIGENCE & SERVICE DELIVERY FREQUENTLY ASKED QUESTIONS
          ========================================================================= */}
      <section className="section bg-light" style={{ borderTop: '1px solid rgba(8, 7, 5, 0.08)' }}>
        <div className="container" style={{ maxWidth: 960 }}>
          <div className="section-header" style={{ textAlign: 'center', marginBottom: 40 }}>
            <span className="section-eyebrow dark" style={{ color: '#702632' }}>Clarity First</span>
            <h2 className="section-title" style={{ color: '#080705' }}>
              Service Delivery & Operational FAQs
            </h2>
            <p className="section-description" style={{ color: 'rgba(8, 7, 5, 0.72)' }}>
              Transparent answers regarding alert transmissions, execution custody, and statutory investor safeguards.
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
          SECTION 6: CLOSING CONVERSION DESK
          ========================================================================= */}
      <section
        className="section"
        style={{
          borderTop: '1px solid var(--border-light)',
          padding: '72px 0',
          background: 'var(--bg-canvas)'
        }}
      >
        <div className="container">
          <div
            style={{
              background: 'var(--bg-white)',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-xl)',
              padding: 'clamp(32px, 5vw, 56px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              boxShadow: 'var(--shadow-md)'
            }}
          >
            <GlowingBadge variant="cyan" icon={Sparkles}>
              Structured Advisory Access
            </GlowingBadge>

            <h2
              style={{
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                fontWeight: 800,
                color: 'var(--text-dark-primary)',
                margin: '18px 0 14px 0',
                lineHeight: 1.2
              }}
            >
              Need Guidance Selecting the Right Research Desk?
            </h2>

            <p
              style={{
                color: 'var(--text-dark-secondary)',
                fontSize: 'clamp(0.9375rem, 1.1vw, 1.0625rem)',
                maxWidth: 680,
                lineHeight: 1.65,
                marginBottom: 32
              }}
            >
              Our advisory desk is available to evaluate your investment horizon, risk appetite, and portfolio allocation requirements before subscribing.
            </p>

            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
              <button
                type="button"
                onClick={() => handleNav('/pricing')}
                className="btn btn-primary"
                style={{ padding: '14px 26px', fontSize: '0.9375rem', fontWeight: 700 }}
              >
                <span>View Subscription Plans</span>
                <ArrowRight size={16} />
              </button>

              <button
                type="button"
                onClick={() => handleNav('/contact')}
                className="btn btn-outline"
                style={{
                  padding: '14px 26px',
                  fontSize: '0.9375rem',
                  fontWeight: 600,
                  borderColor: 'var(--border-light)',
                  color: 'var(--text-dark-primary)',
                  background: 'var(--bg-white)'
                }}
              >
                <span>Contact Advisory Desk</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Service Enquiry Modal */}
      {activeModalService && (
        <ServiceModal
          service={activeModalService}
          onClose={() => setActiveModalService(null)}
        />
      )}
    </div>
  );
}
