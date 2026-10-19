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
  Layers
} from 'lucide-react';
import { servicesData } from '../data/servicesData';
import { companyConfig } from '../data/companyConfig';
import AnimatedTabs from '../components/AnimatedTabs';
import SpotlightCard from '../components/SpotlightCard';
import GlowingBadge from '../components/GlowingBadge';

export default function ServicesPage({ onSelectService, navigate }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

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

  return (
    <div>
      {/* 1. HERO HEADER WITH ANIMATED TABS */}
      <section className="section bg-dark" style={{ position: 'relative', overflow: 'hidden' }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'radial-gradient(circle at 50% 30%, rgba(0, 229, 255, 0.1) 0%, transparent 60%)',
            pointerEvents: 'none'
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-header">
            <div style={{ marginBottom: 14 }}>
              <GlowingBadge variant="cyan" icon={Layers}>
                Seven Institutional Desks
              </GlowingBadge>
            </div>
            <h1 className="section-title" style={{ color: '#ffffff' }}>
              Structured Financial Research Services
            </h1>
            <p className="section-description" style={{ color: '#cbd5e1' }}>
              Comprehensive, non-discretionary market intelligence designed for disciplined equity investors, derivatives traders, and commodity specialists.
            </p>
          </div>

          {/* Interactive Animated Filter Tabs */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <AnimatedTabs
              tabs={categories}
              activeTab={selectedCategory}
              onChange={setSelectedCategory}
            />
          </div>
        </div>
      </section>

      {/* 2. STATUTORY ADVISORY SCOPE BANNER */}
      <section style={{ background: '#09111c', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '16px 0' }}>
        <div className="container">
          <div className="compliance-banner">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, color: '#f59e0b', marginBottom: 4 }}>
              <AlertTriangle size={16} />
              <span>Non-Discretionary Research Scope & Suitability Guidelines</span>
            </div>
            WeGrow provides research reports, quantitative strategies, and trade level invalidations. WeGrow does NOT offer Portfolio Management Services (PMS), discretionary trading, or profit-sharing accounts. Subscriptions are strictly fee-based. Derivatives and leveraged products are not suitable for all investors.
          </div>
        </div>
      </section>

      {/* 3. SERVICES DIRECTORY GRID WITH SPOTLIGHT CARDS */}
      <section className="section bg-light">
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {filteredServices.map((service) => (
              <SpotlightCard
                key={service.id}
                className="card-light service-card-grid"
                style={{ padding: 32, background: '#ffffff' }}
              >
                {/* Left Column: Core Identity & Suitability */}
                <div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12 }}>
                    <span className="badge badge-cyan">{service.segment}</span>
                    <span className="badge badge-gray">{service.badge}</span>
                  </div>

                  <h2 style={{ fontSize: '1.5rem', marginBottom: 8, color: '#0f172a' }}>
                    {service.name}
                  </h2>

                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0284c7', marginBottom: 14 }}>
                    {service.headline}
                  </div>

                  <p style={{ color: '#475569', fontSize: '0.9375rem', lineHeight: 1.6, marginBottom: 20 }}>
                    {service.shortDesc}
                  </p>

                  <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: 14, marginBottom: 20 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8125rem', color: '#64748b', marginBottom: 6 }}>
                      <Clock size={15} style={{ color: '#00b4d8' }} />
                      <span><strong>Expected Holding Horizon:</strong> {service.holdingPeriod}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6, fontSize: '0.8125rem', color: '#64748b' }}>
                      <Briefcase size={15} style={{ color: '#10b981', flexShrink: 0, marginTop: 2 }} />
                      <span><strong>Ideal Profile:</strong> {service.suitability}</span>
                    </div>
                  </div>

                  {/* Pricing Note */}
                  <div style={{ fontSize: '0.8125rem', color: '#64748b', fontStyle: 'italic', marginBottom: 20 }}>
                    Pricing: {service.pricingNote}
                  </div>

                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      onClick={() => onSelectService && onSelectService(service)}
                      className="btn btn-outline-dark"
                      style={{ flex: 1, minWidth: 130 }}
                    >
                      View Details
                    </button>
                    <button
                      type="button"
                      onClick={() => onSelectService && onSelectService(service)}
                      className="btn btn-primary btn-shimmer"
                      style={{ flex: 1, minWidth: 150 }}
                    >
                      <span>Enquire Now</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>

                {/* Right Column: Key Deliverables & Risk Profile */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div>
                    <h3 style={{ fontSize: '1.0625rem', color: '#0f172a', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <FileText size={18} style={{ color: '#00b4d8' }} />
                      <span>Included Research Deliverables</span>
                    </h3>

                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {service.keyDeliverables.map((item, idx) => (
                        <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.875rem', color: '#334155', lineHeight: 1.5 }}>
                          <CheckCircle2 size={16} style={{ color: '#10b981', flexShrink: 0, marginTop: 3 }} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Risk Profile Card */}
                  <div style={{ background: '#fff1f2', border: '1px solid #fecdd3', borderRadius: 10, padding: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#e11d48', fontSize: '0.875rem', fontWeight: 700, marginBottom: 6 }}>
                      <ShieldAlert size={16} />
                      <span>Risk Assessment: {service.riskLevel}</span>
                    </div>
                    <p style={{ fontSize: '0.8125rem', color: '#9f1239', lineHeight: 1.55 }}>
                      {service.riskNote}
                    </p>
                  </div>

                  {/* Clarification Callout */}
                  <div style={{ fontSize: '0.75rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <HelpCircle size={14} />
                    <span>Have questions about risk suitability? Call our advisory desk at {companyConfig.contact.phone}.</span>
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FREQUENTLY ASKED QUESTIONS */}
      <section className="section bg-white">
        <div className="container-narrow">
          <div className="section-header">
            <span className="section-eyebrow dark">Clarity First</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <SpotlightCard className="card-light" style={{ padding: 22, background: '#ffffff' }}>
              <h3 style={{ fontSize: '1rem', color: '#0f172a', marginBottom: 8 }}>
                How are research recommendations transmitted to subscribers?
              </h3>
              <p style={{ color: '#475569', fontSize: '0.875rem', lineHeight: 1.6 }}>
                Alerts are simultaneously transmitted through our secure Web Client Dashboard, enterprise SMS gateway, and verified private Telegram channel during active market hours (09:15 AM to 03:30 PM IST for Equities/F&O, and extended through 11:30 PM IST for MCX Commodities).
              </p>
            </SpotlightCard>

            <SpotlightCard className="card-light" style={{ padding: 22, background: '#ffffff' }}>
              <h3 style={{ fontSize: '1rem', color: '#0f172a', marginBottom: 8 }}>
                Does WeGrow manage client trading accounts or execute trades?
              </h3>
              <p style={{ color: '#475569', fontSize: '0.875rem', lineHeight: 1.6 }}>
                No. As an independent research firm, we operate strictly in an advisory capacity. We never take custody of client funds, we never ask for demat account passwords, and we do not execute trades on your behalf. You retain full control over your broker account.
              </p>
            </SpotlightCard>

            <SpotlightCard className="card-light" style={{ padding: 22, background: '#ffffff' }}>
              <h3 style={{ fontSize: '1rem', color: '#0f172a', marginBottom: 8 }}>
                Are stop-losses mandatory on all recommendations?
              </h3>
              <p style={{ color: '#475569', fontSize: '0.875rem', lineHeight: 1.6 }}>
                Yes, 100% of our recommendations contain a non-negotiable invalidation level (stop-loss). Capital protection is the primary pillar of our research doctrine.
              </p>
            </SpotlightCard>
          </div>
        </div>
      </section>
    </div>
  );
}
