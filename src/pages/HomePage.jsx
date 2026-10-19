import React, { useState } from 'react';
import {
  ArrowRight,
  ShieldCheck,
  Award,
  Users,
  Compass,
  CheckCircle2,
  AlertCircle,
  Clock,
  TrendingUp,
  Activity,
  HeartHandshake
} from 'lucide-react';
import { companyConfig } from '../data/companyConfig';

export default function HomePage({ navigate }) {
  // Lead Generation Form State
  const [leadForm, setLeadForm] = useState({
    name: '',
    mobile: '',
    email: '',
    productName: 'Stock Cash',
    panNumber: '',
    dob: ''
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const productOptions = [
    'Stock Cash',
    'Basic F&O',
    'Commodities Pack',
    'Equity Exclusive',
    'F&O Exclusive',
    'Commodity Exclusive',
    'Equity Combo'
  ];

  const handleNav = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLeadSubmit = (e) => {
    e.preventDefault();

    if (!leadForm.name.trim() || !leadForm.mobile.trim() || !leadForm.email.trim()) {
      setFormError('Please fill in your Name, Mobile Number, and Email Address.');
      return;
    }

    setFormError('');
    setFormSubmitting(true);

    setTimeout(() => {
      setFormSubmitting(false);
      setFormSubmitted(true);
    }, 700);
  };

  return (
    <div className="home-page-root">
      {/* =========================================================================
          SECTION 2: HERO SECTION / MAIN BANNER WITH LEAD GENERATION FORM (LIGHT THEME)
          ========================================================================= */}
      <section
        id="lead-form-section"
        className="section-lg"
        style={{
          position: 'relative',
          background: 'var(--bg-canvas)',
          borderBottom: '1px solid var(--border-light)'
        }}
      >
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="hero-grid">
            {/* Left: Main Headings */}
            <div>
              <div
                className="section-eyebrow"
                style={{
                  background: 'var(--brand-primary-soft)',
                  color: 'var(--brand-primary)',
                  border: '1px solid var(--brand-primary-border)',
                  marginBottom: 18,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  flexWrap: 'wrap',
                  lineHeight: 1.4,
                  maxWidth: '100%',
                  fontWeight: 700
                }}
              >
                <Activity size={14} style={{ color: 'var(--brand-primary)', flexShrink: 0 }} />
                <span>SEBI Registered Research Analyst • INH000008093</span>
              </div>


              <h1 className="section-title" style={{ color: '#080705', lineHeight: 1.18, marginBottom: 20 }}>
                {companyConfig.heroHeadline}
              </h1>

              <p style={{ color: 'rgba(8, 7, 5, 0.72)', fontSize: '1.1875rem', lineHeight: 1.65, marginBottom: 32, maxWidth: 560 }}>
                {companyConfig.heroSubheadline}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, fontSize: '0.875rem', color: 'var(--text-dark-secondary)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--brand-primary)' }} />
                  <span style={{ fontWeight: 600 }}>BSE Member: {companyConfig.bseMembershipNumber}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--brand-secondary)' }} />
                  <span style={{ fontWeight: 600 }}>Disciplined Risk:Reward</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--brand-primary)' }} />
                  <span style={{ fontWeight: 600 }}>Analysis & Data Backed</span>
                </div>
              </div>

            </div>

            {/* Right: Lead Generation Form Card (Luxury Elevated Light Card) */}
            <div>
              <div
                className="card-light"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid rgba(8, 7, 5, 0.09)',
                  borderRadius: 20,
                  padding: 32,
                  boxShadow: '0 20px 45px -10px rgba(8, 7, 5, 0.08), 0 4px 16px rgba(8, 7, 5, 0.03)'
                }}
              >
                <h2 style={{ fontSize: '1.35rem', color: '#080705', marginBottom: 6, fontWeight: 700 }}>
                  Request a Research Callback
                </h2>
                <p style={{ fontSize: '0.8125rem', color: 'rgba(8, 7, 5, 0.65)', marginBottom: 20 }}>
                  Connect directly with our research desk to discuss our service offerings.
                </p>

                {formSubmitted ? (
                  <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10b981', padding: 24, borderRadius: 12, textAlign: 'center' }}>
                    <CheckCircle2 size={40} style={{ color: '#10b981', margin: '0 auto 12px auto' }} />
                    <h3 style={{ color: '#080705', fontSize: '1.1875rem', marginBottom: 6, fontWeight: 700 }}>
                      Callback Request Received
                    </h3>
                    <p style={{ color: 'rgba(8, 7, 5, 0.72)', fontSize: '0.875rem', lineHeight: 1.5, marginBottom: 16 }}>
                      Thank you, <strong>{leadForm.name}</strong>. Our research advisory team will contact you regarding <strong>{leadForm.productName}</strong>.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setFormSubmitted(false);
                        setLeadForm({
                          name: '',
                          mobile: '',
                          email: '',
                          productName: 'Stock Cash',
                          panNumber: '',
                          dob: ''
                        });
                      }}
                      className="btn btn-sm btn-secondary"
                    >
                      Submit Another Request
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleLeadSubmit}>
                    {formError && (
                      <div style={{ background: 'rgba(244, 63, 94, 0.1)', border: '1px solid #f43f5e', color: '#9f1239', padding: '8px 12px', borderRadius: 8, fontSize: '0.8125rem', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
                        <AlertCircle size={15} />
                        <span>{formError}</span>
                      </div>
                    )}

                    {/* Name */}
                    <div className="form-group" style={{ marginBottom: 12 }}>
                      <label className="form-label" style={{ fontSize: '0.75rem', color: '#080705', fontWeight: 600 }}>Full Name *</label>
                      <input
                        type="text"
                        required
                        className="form-input"
                        placeholder="e.g. Anand Kumar"
                        value={leadForm.name}
                        onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                        style={{ background: '#F8FAF9', border: '1px solid rgba(8, 7, 5, 0.12)', color: '#080705', padding: '9px 14px', fontSize: '0.875rem' }}
                      />
                    </div>

                    {/* Mobile & Email */}
                    <div className="hero-form-row" style={{ marginBottom: 12 }}>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label" style={{ fontSize: '0.75rem', color: '#080705', fontWeight: 600 }}>Mobile Number *</label>
                        <input
                          type="tel"
                          required
                          className="form-input"
                          placeholder="98XXXXXXXX"
                          value={leadForm.mobile}
                          onChange={(e) => setLeadForm({ ...leadForm, mobile: e.target.value })}
                          style={{ background: '#F8FAF9', border: '1px solid rgba(8, 7, 5, 0.12)', color: '#080705', padding: '9px 14px', fontSize: '0.875rem' }}
                        />
                      </div>

                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label" style={{ fontSize: '0.75rem', color: '#080705', fontWeight: 600 }}>Email Address *</label>
                        <input
                          type="email"
                          required
                          className="form-input"
                          placeholder="anand@example.com"
                          value={leadForm.email}
                          onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                          style={{ background: '#F8FAF9', border: '1px solid rgba(8, 7, 5, 0.12)', color: '#080705', padding: '9px 14px', fontSize: '0.875rem' }}
                        />
                      </div>
                    </div>

                    {/* Product Name Dropdown */}
                    <div className="form-group" style={{ marginBottom: 12 }}>
                      <label className="form-label" style={{ fontSize: '0.75rem', color: '#080705', fontWeight: 600 }}>Product Name</label>
                      <select
                        className="form-select"
                        value={leadForm.productName}
                        onChange={(e) => setLeadForm({ ...leadForm, productName: e.target.value })}
                        style={{ background: '#F8FAF9', border: '1px solid rgba(8, 7, 5, 0.12)', color: '#080705', padding: '9px 14px', fontSize: '0.875rem' }}
                      >
                        {productOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* PAN Card & Date of Birth */}
                    <div className="hero-form-row" style={{ marginBottom: 18 }}>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label" style={{ fontSize: '0.75rem', color: '#080705', fontWeight: 600 }}>PAN Card Number</label>
                        <input
                          type="text"
                          className="form-input"
                          placeholder="ABCDE1234F"
                          maxLength="10"
                          value={leadForm.panNumber}
                          onChange={(e) => setLeadForm({ ...leadForm, panNumber: e.target.value.toUpperCase() })}
                          style={{ background: '#F8FAF9', border: '1px solid rgba(8, 7, 5, 0.12)', color: '#080705', padding: '9px 14px', fontSize: '0.875rem', textTransform: 'uppercase' }}
                        />
                      </div>

                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label" style={{ fontSize: '0.75rem', color: '#080705', fontWeight: 600 }}>Date of Birth</label>
                        <input
                          type="date"
                          className="form-input"
                          value={leadForm.dob}
                          onChange={(e) => setLeadForm({ ...leadForm, dob: e.target.value })}
                          style={{ background: '#F8FAF9', border: '1px solid rgba(8, 7, 5, 0.12)', color: '#080705', padding: '9px 14px', fontSize: '0.875rem' }}
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={formSubmitting}
                      className="btn btn-primary"
                      style={{ width: '100%', justifyContent: 'center', padding: '13px 20px', fontSize: '0.95rem' }}
                    >
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontWeight: 600 }}>
                        {formSubmitting ? 'Submitting Request...' : 'Request a callback'}
                        {!formSubmitting && <ArrowRight size={16} />}
                      </span>
                    </button>

                    {/* Small Disclaimer Text Underneath Button */}
                    <div style={{ marginTop: 12, textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-dark-muted)', lineHeight: 1.45 }}>
                      By submitting this form, you agree to our{' '}
                      <a href="/terms" onClick={(e) => { e.preventDefault(); handleNav('/terms'); }} style={{ color: 'var(--brand-primary)', textDecoration: 'underline', fontWeight: 600 }}>
                        Terms & Conditions
                      </a>
                      ,{' '}
                      <a href="/privacy-policy" onClick={(e) => { e.preventDefault(); handleNav('/privacy-policy'); }} style={{ color: 'var(--brand-primary)', textDecoration: 'underline', fontWeight: 600 }}>
                        Privacy Policy
                      </a>
                      , and{' '}
                      <a href="/disclosures" onClick={(e) => { e.preventDefault(); handleNav('/disclosures'); }} style={{ color: 'var(--brand-primary)', textDecoration: 'underline', fontWeight: 600 }}>
                        Disclosures
                      </a>
                      .
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: CORE STATS / HIGHLIGHTS BAR (MINIMAL LIGHT THEME)
          ========================================================================= */}
      <section style={{ background: 'var(--bg-subtle)', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)', padding: '36px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 32, alignItems: 'center' }}>
            {/* Highlight 1 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 50, height: 50, borderRadius: 12, background: 'var(--brand-primary-soft)', color: 'var(--brand-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Award size={26} />
              </div>
              <div>
                <p style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--text-dark-primary)', lineHeight: 1.35 }}>
                  Over 40 years of combined corporate experience
                </p>
              </div>
            </div>

            {/* Highlight 2 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 50, height: 50, borderRadius: 12, background: 'var(--brand-secondary-soft)', color: 'var(--brand-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <HeartHandshake size={26} />
              </div>
              <div>
                <p style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--text-dark-primary)', lineHeight: 1.35 }}>
                  Committed to serve our customers, going the extra mile
                </p>
              </div>
            </div>

            {/* Highlight 3 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 50, height: 50, borderRadius: 12, background: 'var(--brand-primary-soft)', color: 'var(--brand-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Clock size={26} />
              </div>
              <div>
                <p style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--text-dark-primary)', lineHeight: 1.35 }}>
                  Regular Updates from us in a structured format and routine
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: ABOUT SECTION ("About WeGro")
          ========================================================================= */}
      <section className="section" style={{ background: 'var(--bg-canvas)' }}>
        <div className="container">
          <div style={{ maxWidth: 840, margin: '0 auto', textAlign: 'center' }}>
            <span
              className="section-eyebrow"
              style={{
                background: 'var(--brand-primary-soft)',
                color: 'var(--brand-primary)',
                border: '1px solid var(--brand-primary-border)'
              }}
            >
              Corporate Background
            </span>
            <h2 className="section-title" style={{ marginTop: 8, marginBottom: 20, color: 'var(--text-dark-primary)' }}>
              About WeGro
            </h2>
            <p style={{ fontSize: '1.125rem', color: 'var(--text-dark-secondary)', lineHeight: 1.8, marginBottom: 32 }}>
              WeGro is a SEBI-certified Research Analyst firm (Registration No: INH000008093) and BSE Member (Membership No: 5422). Built on the foundational pillars of quantitative analytical depth, institutional-grade data scrutiny, and uncompromising risk management, WeGro delivers structured, objective, and timely market intelligence across Indian Equities, Derivatives (F&O), and Commodities to assist investors and business leaders in making informed, disciplined financial decisions.
            </p>
            <div>
              <button
                type="button"
                onClick={() => handleNav('/about')}
                className="btn btn-lg btn-primary"
                style={{
                  padding: '14px 28px',
                  cursor: 'pointer'
                }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontWeight: 700 }}>
                  KNOW MORE ABOUT WEGRO
                  <ArrowRight size={18} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: KEY VALUE PILLARS / FEATURE GRID (4 CARDS)
          ========================================================================= */}
      <section className="section" style={{ background: 'var(--bg-elevated)', borderTop: '1px solid var(--border-light)' }}>
        <div className="container">
          <div className="section-header">
            <span
              className="section-eyebrow"
              style={{
                background: 'var(--brand-primary-soft)',
                color: 'var(--brand-primary)',
                border: '1px solid var(--brand-primary-border)'
              }}
            >
              Core Strengths
            </span>
            <h2 className="section-title" style={{ color: 'var(--text-dark-primary)' }}>Key Value Pillars</h2>
            <p className="section-description" style={{ color: 'var(--text-dark-secondary)' }}>
              Our operations and research philosophy are anchored upon four foundational principles that guide every market recommendation.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: 24 }}>
            {/* Pillar 1: Research */}
            <div className="card-light" style={{ padding: 28, background: 'var(--bg-white)', border: '1px solid var(--border-light)' }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--brand-primary-soft)', color: 'var(--brand-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                <TrendingUp size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: 8, color: 'var(--text-dark-primary)' }}>
                Research
              </h3>
              <p style={{ fontSize: '0.9375rem', color: 'var(--text-dark-secondary)', lineHeight: 1.6 }}>
                Backed by analysis and data. Every recommendation undergoes rigorous fundamental and technical evaluation before transmission.
              </p>
            </div>

            {/* Pillar 2: Customer Focus */}
            <div className="card-light" style={{ padding: 28, background: 'var(--bg-white)', border: '1px solid var(--border-light)' }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--brand-secondary-soft)', color: 'var(--brand-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                <Users size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: 8, color: 'var(--text-dark-primary)' }}>
                Customer Focus
              </h3>
              <p style={{ fontSize: '0.9375rem', color: 'var(--text-dark-secondary)', lineHeight: 1.6 }}>
                Meeting financial objectives. We orient our communication, support, and syllabus toward the distinct goals and risk profiles of our clients.
              </p>
            </div>

            {/* Pillar 3: Risk Management */}
            <div className="card-light" style={{ padding: 28, background: 'var(--bg-white)', border: '1px solid var(--border-light)' }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--brand-primary-soft)', color: 'var(--brand-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                <ShieldCheck size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: 8, color: 'var(--text-dark-primary)' }}>
                Risk Management
              </h3>
              <p style={{ fontSize: '0.9375rem', color: 'var(--text-dark-secondary)', lineHeight: 1.6 }}>
                Robust risk management plan. Non-negotiable stop-loss discipline and structured risk:reward ratios to prioritize capital preservation.
              </p>
            </div>

            {/* Pillar 4: Vibrancy */}
            <div className="card-light" style={{ padding: 28, background: 'var(--bg-white)', border: '1px solid var(--border-light)' }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--brand-secondary-soft)', color: 'var(--brand-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                <Compass size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: 8, color: 'var(--text-dark-primary)' }}>
                Vibrancy
              </h3>
              <p style={{ fontSize: '0.9375rem', color: 'var(--text-dark-secondary)', lineHeight: 1.6 }}>
                Young and energetic employee base. An agile, tech-driven research bench constantly monitoring live market dynamics and regulatory standards.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
