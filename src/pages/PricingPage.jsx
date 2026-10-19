import React from 'react';
import { CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck } from 'lucide-react';
import { servicesData } from '../data/servicesData';
import { companyConfig } from '../data/companyConfig';

export default function PricingPage({ navigate }) {
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
            <span className="section-eyebrow cyan">Advisory Fee Schedule</span>
            <h1 className="section-title" style={{ color: '#ffffff' }}>
              Research Subscription Plans
            </h1>
            <p className="section-description" style={{ color: '#cbd5e1' }}>
              Transparent, fee-based research subscriptions. In compliance with SEBI Research Analyst regulations, we do not operate profit-sharing models or assured return schemes.
            </p>
          </div>
        </div>
      </section>

      {/* 2. STATUTORY DISCLOSURE */}
      <section style={{ background: '#09111c', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '16px 0' }}>
        <div className="container">
          <div className="compliance-banner">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, color: '#f59e0b', marginBottom: 4 }}>
              <AlertTriangle size={16} />
              <span>SEBI Advisory Fee Compliance Notice</span>
            </div>
            All research fees are charged strictly as fixed advisory subscription charges paid through verifiable banking channels. No payment should ever be transferred to individual bank accounts.
          </div>
        </div>
      </section>

      {/* 3. PRICING CARDS */}
      <section className="section bg-light">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 24 }}>
            {servicesData.map((plan) => (
              <div key={plan.id} className="card-light" style={{ padding: 28, background: '#ffffff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <span className="badge badge-cyan">{plan.segment}</span>
                  <span className="badge badge-gray">{plan.badge}</span>
                </div>

                <h3 style={{ fontSize: '1.35rem', marginBottom: 6, color: '#0f172a' }}>
                  {plan.name}
                </h3>

                <p style={{ color: '#475569', fontSize: '0.875rem', lineHeight: 1.55, marginBottom: 20 }}>
                  {plan.shortDesc}
                </p>

                <div style={{ borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0', padding: '14px 0', marginBottom: 20 }}>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase' }}>Subscription Terms</div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>
                    Fixed Fee Advisory • Direct Banking
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#0284c7', marginTop: 4 }}>
                    {plan.holdingPeriod}
                  </div>
                </div>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24, flex: 1 }}>
                  {plan.keyDeliverables.slice(0, 3).map((item, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: '0.8125rem', color: '#334155' }}>
                      <CheckCircle2 size={15} style={{ color: '#10b981', flexShrink: 0, marginTop: 2 }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => handleNav('/')}
                  className="btn btn-primary btn-shimmer"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <span>Request Callback for {plan.name}</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
