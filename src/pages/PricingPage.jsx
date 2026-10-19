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
      <section className="section" style={{ background: 'var(--bg-canvas)', paddingTop: 'calc(var(--space-20) + 16px)' }}>
        <div className="container">
          <div className="section-header" style={{ maxWidth: 840, margin: '0 auto', textAlign: 'center' }}>
            <div style={{ marginBottom: 16, display: 'inline-flex', justifyContent: 'center' }}>
              <span className="section-eyebrow" style={{ color: 'var(--brand-primary)', background: 'var(--brand-primary-soft)', border: '1px solid var(--brand-primary-border)' }}>
                Advisory Fee Schedule
              </span>
            </div>
            <h1 className="section-title" style={{ color: 'var(--text-dark-primary)' }}>
              Research Subscription Plans
            </h1>
            <p className="section-description" style={{ color: 'var(--text-dark-secondary)' }}>
              Transparent, fee-based research subscriptions. In compliance with SEBI Research Analyst regulations, we do not operate profit-sharing models or assured return schemes.
            </p>
          </div>
        </div>
      </section>

      {/* 2. STATUTORY DISCLOSURE */}
      <section style={{ background: 'var(--bg-subtle)', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)', padding: '16px 0' }}>
        <div className="container">
          <div className="compliance-banner">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, color: '#B45309', marginBottom: 6 }}>
              <AlertTriangle size={16} />
              <span>SEBI Advisory Fee Compliance Notice</span>
            </div>
            <p style={{ margin: 0, color: 'var(--text-dark-secondary)', fontSize: '0.875rem', lineHeight: 1.55 }}>
              All research fees are charged strictly as fixed advisory subscription charges paid through verifiable banking channels. No payment should ever be transferred to individual bank accounts.
            </p>
          </div>
        </div>
      </section>

      {/* 3. PRICING CARDS */}
      <section className="section" style={{ background: 'var(--bg-canvas)', padding: '56px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 24 }}>
            {servicesData.map((plan) => (
              <div key={plan.id} className="card-light" style={{ padding: 28, background: 'var(--bg-white)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                  <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--brand-primary)', background: 'var(--brand-primary-soft)', padding: '4px 10px', borderRadius: 6, border: '1px solid var(--brand-primary-border)' }}>
                    {plan.segment}
                  </span>
                  <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--text-dark-muted)', background: 'var(--bg-subtle)', padding: '4px 10px', borderRadius: 6, border: '1px solid var(--border-light)' }}>
                    {plan.badge}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.35rem', marginBottom: 8, color: 'var(--text-dark-primary)', fontWeight: 700 }}>
                  {plan.name}
                </h3>

                <p style={{ color: 'var(--text-dark-secondary)', fontSize: '0.875rem', lineHeight: 1.55, marginBottom: 20 }}>
                  {plan.shortDesc}
                </p>

                <div style={{ borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)', padding: '14px 0', marginBottom: 20 }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dark-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>Subscription Terms</div>
                  <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-dark-primary)', marginTop: 2 }}>
                    Fixed Fee Advisory • Direct Banking
                  </div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--brand-primary)', marginTop: 4, fontWeight: 600 }}>
                    {plan.holdingPeriod}
                  </div>
                </div>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24, flex: 1 }}>
                  {plan.keyDeliverables.slice(0, 3).map((item, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: '0.8125rem', color: 'var(--text-dark-secondary)' }}>
                      <CheckCircle2 size={15} style={{ color: 'var(--brand-primary)', flexShrink: 0, marginTop: 2 }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => handleNav('/')}
                  className="btn btn-primary"
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
