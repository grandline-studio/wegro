import React, { useState, useEffect } from 'react';
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
  HeartHandshake,
  Play,
  Pause,
  Video,
  Sliders,
  X,
  PhoneCall,
  ChevronRight,
  BarChart3,
  Shield,
  FileCheck
} from 'lucide-react';
import { companyConfig } from '../data/companyConfig';
import { getStorageAdapter } from '../content/storage';
import Hero from '../components/ui/demo';

export default function HomePage({ navigate }) {
  // Hero Showcase Tab State: 'radar' | 'video'
  const [activeHeroTab, setActiveHeroTab] = useState('radar');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);

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

  const checkCooldownActive = () => {
    if (typeof window === 'undefined') return true;
    try {
      // 1. If user previously submitted a lead, suppress for 30 days
      const submittedAt = localStorage.getItem('wegro_lead_submitted_at');
      if (submittedAt) {
        const daysPassed = (Date.now() - parseInt(submittedAt, 10)) / (1000 * 60 * 60 * 24);
        if (daysPassed < 30) return true;
      }

      // 2. If user dismissed the popup, enforce 24-hour quiet cooldown
      const dismissedAt = localStorage.getItem('wegro_lead_popup_dismissed_at');
      if (dismissedAt) {
        const hoursPassed = (Date.now() - parseInt(dismissedAt, 10)) / (1000 * 60 * 60);
        if (hoursPassed < 24) return true;
      }
    } catch (e) {}
    return false;
  };

  const handleCloseModal = () => {
    setIsConsultationModalOpen(false);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('wegro_lead_popup_dismissed_at', Date.now().toString());
        sessionStorage.removeItem('wegro_lead_popup_dismissed');
      } catch (e) {}
    }
  };

  // Pop-up trigger: Fires after person lands and spends 5 to 6 seconds scrolling
  // Cooldown: Suppressed if dismissed within 24h or submitted within 30d
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (checkCooldownActive()) return;

    let hasScrolled = false;
    let scrollTimer = null;

    const onScroll = () => {
      if (window.scrollY > 50 && !hasScrolled) {
        hasScrolled = true;
        // Wait 5.5 seconds (5 to 6 seconds) of scrolling/browsing before showing modal
        scrollTimer = setTimeout(() => {
          if (!checkCooldownActive()) {
            setIsConsultationModalOpen(true);
          }
        }, 5500);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    // Fallback: If user stays on the page browsing without scrolling past 50px, trigger at 6s
    const fallbackTimer = setTimeout(() => {
      if (!checkCooldownActive()) {
        setIsConsultationModalOpen(true);
      }
    }, 6000);

    // Escape key listener to close modal
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleCloseModal();
      }
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('keydown', onKeyDown);
      if (scrollTimer) clearTimeout(scrollTimer);
      if (fallbackTimer) clearTimeout(fallbackTimer);
    };
  }, []);

  const handleLeadSubmit = async (e) => {
    e.preventDefault();

    if (!leadForm.name.trim() || !leadForm.mobile.trim() || !leadForm.email.trim()) {
      setFormError('Please fill in your Name, Mobile Number, and Email Address.');
      return;
    }

    setFormError('');
    setFormSubmitting(true);

    try {
      const storage = getStorageAdapter();
      await storage.saveLead({
        id: `lead-${Date.now()}`,
        name: leadForm.name.trim(),
        mobile: leadForm.mobile.trim(),
        email: leadForm.email.trim(),
        productName: leadForm.productName,
        panNumber: leadForm.panNumber ? leadForm.panNumber.trim().toUpperCase() : '',
        dob: leadForm.dob || '',
        consentGiven: true,
        consentTimestamp: new Date().toISOString(),
        status: 'new',
        createdAt: new Date().toISOString()
      });
    } catch (err) {
      console.warn('Lead local save fallback:', err);
    }

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('wegro_lead_submitted_at', Date.now().toString());
        localStorage.setItem('wegro_lead_popup_dismissed_at', Date.now().toString());
        sessionStorage.removeItem('wegro_lead_popup_dismissed');
      } catch (e) {}
    }

    setFormSubmitting(false);
    setFormSubmitted(true);
  };

  return (
    <div className="home-page-root">
      {/* =========================================================================
          SECTION 2: REDESIGNED INSTITUTIONAL HERO SECTION (SHADCN / TAILWIND 4)
          ========================================================================= */}
      <div id="hero-section">
        <Hero
          headline={companyConfig.heroHeadline}
          subheadline={companyConfig.heroSubheadline}
          eyebrow="SEBI Registered Research Analyst • INH000008093 • BSE Member: 5422"
          metricNumber="15,000+"
          metricLabel="Market Participants Guided"
          ctaText="Request Advisory Consultation"
          onCtaClick={() => setIsConsultationModalOpen(true)}
          secondaryCtaText="Explore Advisory Services"
          onSecondaryCtaClick={() => handleNav('/services')}
          partners={[
            "NSE NIFTY 50",
            "BSE SENSEX",
            "SEBI SCORES",
            "SMART ODR",
            "MCX COMMODITIES",
            "QUANTITATIVE RESEARCH",
            "STRICT 1:2+ RISK-REWARD",
            "GST INVOICED BILLS",
            "DIRECT BANK SETTLEMENT",
            "ZERO PROFIT SHARING"
          ]}
        />
      </div>

      {/* =========================================================================
          CONSULTATION CALLBACK POP-UP MODAL (WITH BLURRED BACKGROUND)
          ========================================================================= */}
      {isConsultationModalOpen && (
        <div
          className="modal-overlay"
          onClick={handleCloseModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="consultation-modal-title"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(8, 7, 5, 0.65)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16
          }}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#FFFFFF',
              border: '1px solid rgba(8, 7, 5, 0.12)',
              color: '#080705',
              boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.3), 0 10px 24px -5px rgba(0, 0, 0, 0.1)',
              borderRadius: 20,
              maxWidth: 580,
              width: '100%',
              padding: '32px 28px',
              position: 'relative'
            }}
          >
            <button
              type="button"
              className="modal-close-btn"
              onClick={handleCloseModal}
              aria-label="Close modal dialog"
              style={{
                position: 'absolute',
                top: 18,
                right: 18,
                background: 'rgba(8, 7, 5, 0.06)',
                border: 'none',
                borderRadius: '50%',
                width: 34,
                height: 34,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#080705',
                transition: 'background 0.15s ease'
              }}
            >
              <X size={18} />
            </button>

            <div style={{ marginBottom: 20 }}>
              <span className="badge badge-cyan" style={{ marginBottom: 8, background: 'var(--brand-primary-soft)', color: 'var(--brand-primary)', border: '1px solid var(--brand-primary-border)' }}>
                SEBI RA Advisory Consultation Desk
              </span>
              <h2 id="consultation-modal-title" style={{ fontSize: '1.45rem', fontWeight: 700, color: '#080705', marginBottom: 6 }}>
                Request a Research Callback
              </h2>
              <p style={{ color: 'rgba(8, 7, 5, 0.65)', fontSize: '0.875rem' }}>
                Connect directly with our research advisory team to discuss service suitability and capital risk parameters.
              </p>
            </div>

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
                    handleCloseModal();
                    setLeadForm({
                      name: '',
                      mobile: '',
                      email: '',
                      productName: 'Stock Cash',
                      panNumber: '',
                      dob: ''
                    });
                  }}
                  className="btn btn-sm btn-primary"
                >
                  Close & Return
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
                  <label className="form-label" style={{ fontSize: '0.75rem', color: '#080705', fontWeight: 600 }}>Advisory Segment</label>
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
                    {formSubmitting ? 'Submitting Request...' : 'Submit Callback Request'}
                    {!formSubmitting && <ArrowRight size={16} />}
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          MINIMIZED FLOATING CONSULTATION PILL (Always available when modal is closed)
          ========================================================================= */}
      {!isConsultationModalOpen && (
        <button
          type="button"
          onClick={() => setIsConsultationModalOpen(true)}
          className="floating-consultation-pill"
          aria-label="Request Research Consultation"
        >
          <span className="floating-pill-dot" />
          <PhoneCall size={14} style={{ color: 'var(--brand-primary)' }} />
          <span>Request Consultation</span>
        </button>
      )}

      {/* =========================================================================
          SECTION 3: CORE STATS / HIGHLIGHTS BAR (MINIMAL LIGHT THEME)
          ========================================================================= */}
      <section style={{ background: 'var(--bg-subtle)', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)', padding: '80px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 48, alignItems: 'center' }}>
            {/* Highlight 1 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
              <div style={{ width: 60, height: 60, borderRadius: 16, background: 'var(--brand-primary-soft)', color: 'var(--brand-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Award size={30} />
              </div>
              <div>
                <p style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-dark-primary)', lineHeight: 1.5 }}>
                  Over 40 years of combined corporate experience
                </p>
              </div>
            </div>

            {/* Highlight 2 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
              <div style={{ width: 60, height: 60, borderRadius: 16, background: 'var(--brand-secondary-soft)', color: 'var(--brand-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <HeartHandshake size={30} />
              </div>
              <div>
                <p style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-dark-primary)', lineHeight: 1.5 }}>
                  Committed to serve our customers, going the extra mile
                </p>
              </div>
            </div>

            {/* Highlight 3 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
              <div style={{ width: 60, height: 60, borderRadius: 16, background: 'var(--brand-primary-soft)', color: 'var(--brand-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Clock size={30} />
              </div>
              <div>
                <p style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-dark-primary)', lineHeight: 1.5 }}>
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
      <section className="section" style={{ background: 'var(--bg-canvas)', padding: '120px 0' }}>
        <div className="container">
          <div style={{ maxWidth: 880, margin: '0 auto', textAlign: 'center' }}>
            <span
              className="section-eyebrow"
              style={{
                background: 'var(--brand-primary-soft)',
                color: 'var(--brand-primary)',
                border: '1px solid var(--brand-primary-border)',
                padding: '7px 20px',
                marginBottom: 20
              }}
            >
              Corporate Background
            </span>
            <h2 className="section-title" style={{ marginTop: 14, marginBottom: 32, color: 'var(--text-dark-primary)' }}>
              About WeGro
            </h2>
            <p style={{ fontSize: '1.1875rem', color: 'var(--text-dark-secondary)', lineHeight: 1.9, marginBottom: 52 }}>
              WeGro is a SEBI-certified Research Analyst firm (Registration No: INH000008093) and BSE Member (Membership No: 5422). Built on the foundational pillars of quantitative analytical depth, institutional-grade data scrutiny, and uncompromising risk management, WeGro delivers structured, objective, and timely market intelligence across Indian Equities, Derivatives (F&O), and Commodities to assist investors and business leaders in making informed, disciplined financial decisions.
            </p>
            <div>
              <button
                type="button"
                onClick={() => handleNav('/about')}
                className="btn btn-lg btn-primary"
                style={{
                  padding: '18px 44px',
                  minHeight: 58,
                  borderRadius: 9999,
                  cursor: 'pointer'
                }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontWeight: 700, fontSize: '0.95rem', letterSpacing: '0.04em' }}>
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
      <section className="section" style={{ background: 'var(--bg-elevated)', borderTop: '1px solid var(--border-light)', padding: '120px 0' }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: 64 }}>
            <span
              className="section-eyebrow"
              style={{
                background: 'var(--brand-primary-soft)',
                color: 'var(--brand-primary)',
                border: '1px solid var(--brand-primary-border)',
                padding: '7px 20px',
                marginBottom: 20
              }}
            >
              Core Strengths
            </span>
            <h2 className="section-title" style={{ color: 'var(--text-dark-primary)', marginTop: 12, marginBottom: 18 }}>Key Value Pillars</h2>
            <p className="section-description" style={{ color: 'var(--text-dark-secondary)', maxWidth: 680, margin: '0 auto', lineHeight: 1.75, fontSize: '1.05rem' }}>
              Our operations and research philosophy are anchored upon four foundational principles that guide every market recommendation.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: 36 }}>
            {/* Pillar 1: Research */}
            <div className="card-light" style={{ padding: '42px 34px', background: 'var(--bg-white)', border: '1px solid var(--border-light)', borderRadius: 24, boxShadow: '0 4px 20px rgba(17, 17, 16, 0.03)' }}>
              <div style={{ width: 58, height: 58, borderRadius: 16, background: 'var(--brand-primary-soft)', color: 'var(--brand-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 26 }}>
                <TrendingUp size={28} />
              </div>
              <h3 style={{ fontSize: '1.35rem', marginBottom: 14, color: 'var(--text-dark-primary)' }}>
                Research
              </h3>
              <p style={{ fontSize: '0.9375rem', color: 'var(--text-dark-secondary)', lineHeight: 1.75 }}>
                Backed by analysis and data. Every recommendation undergoes rigorous fundamental and technical evaluation before transmission.
              </p>
            </div>

            {/* Pillar 2: Customer Focus */}
            <div className="card-light" style={{ padding: '42px 34px', background: 'var(--bg-white)', border: '1px solid var(--border-light)', borderRadius: 24, boxShadow: '0 4px 20px rgba(17, 17, 16, 0.03)' }}>
              <div style={{ width: 58, height: 58, borderRadius: 16, background: 'var(--brand-secondary-soft)', color: 'var(--brand-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 26 }}>
                <Users size={28} />
              </div>
              <h3 style={{ fontSize: '1.35rem', marginBottom: 14, color: 'var(--text-dark-primary)' }}>
                Customer Focus
              </h3>
              <p style={{ fontSize: '0.9375rem', color: 'var(--text-dark-secondary)', lineHeight: 1.75 }}>
                Meeting financial objectives. We orient our communication, support, and syllabus toward the distinct goals and risk profiles of our clients.
              </p>
            </div>

            {/* Pillar 3: Risk Management */}
            <div className="card-light" style={{ padding: '42px 34px', background: 'var(--bg-white)', border: '1px solid var(--border-light)', borderRadius: 24, boxShadow: '0 4px 20px rgba(17, 17, 16, 0.03)' }}>
              <div style={{ width: 58, height: 58, borderRadius: 16, background: 'var(--brand-primary-soft)', color: 'var(--brand-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 26 }}>
                <ShieldCheck size={28} />
              </div>
              <h3 style={{ fontSize: '1.35rem', marginBottom: 14, color: 'var(--text-dark-primary)' }}>
                Risk Management
              </h3>
              <p style={{ fontSize: '0.9375rem', color: 'var(--text-dark-secondary)', lineHeight: 1.75 }}>
                Robust risk management plan. Non-negotiable stop-loss discipline and structured risk:reward ratios to prioritize capital preservation.
              </p>
            </div>

            {/* Pillar 4: Vibrancy */}
            <div className="card-light" style={{ padding: '42px 34px', background: 'var(--bg-white)', border: '1px solid var(--border-light)', borderRadius: 24, boxShadow: '0 4px 20px rgba(17, 17, 16, 0.03)' }}>
              <div style={{ width: 58, height: 58, borderRadius: 16, background: 'var(--brand-secondary-soft)', color: 'var(--brand-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 26 }}>
                <Compass size={28} />
              </div>
              <h3 style={{ fontSize: '1.35rem', marginBottom: 14, color: 'var(--text-dark-primary)' }}>
                Vibrancy
              </h3>
              <p style={{ fontSize: '0.9375rem', color: 'var(--text-dark-secondary)', lineHeight: 1.75 }}>
                Young and energetic employee base. An agile, tech-driven research bench constantly monitoring live market dynamics and regulatory standards.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
