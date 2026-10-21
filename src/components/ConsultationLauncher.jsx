import React, { useState, useEffect, useCallback } from 'react';
import { PhoneCall, X, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { getStorageAdapter } from '../content/storage';

/**
 * Global helper to trigger the consultation modal from any component/page
 */
export function openConsultationModal(productName) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('open-consultation-modal', {
        detail: { productName: productName || undefined }
      })
    );
  }
}

export default function ConsultationLauncher() {
  const [isOpen, setIsOpen] = useState(false);
  const [leadForm, setLeadForm] = useState({
    name: '',
    mobile: '',
    email: '',
    productName: 'Equity Cash & Intraday Growth',
    panNumber: '',
    dob: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const productOptions = [
    'Starter Equity Cash (₹4,999/mo)',
    'Pro F&O Derivatives (₹9,999/mo)',
    'HNI Wealth & Swing VIP (₹24,999/qtr)',
    'Equity Cash & Intraday Growth',
    'F&O Derivatives Strategy',
    'Commodity & MCX Advisory',
    'Swing & Wealth Creation Portfolio'
  ];

  const handleClose = useCallback(() => {
    setIsOpen(false);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('wegro_lead_popup_dismissed_at', Date.now().toString());
        sessionStorage.removeItem('wegro_lead_popup_dismissed');
      } catch (e) {}
    }
  }, []);

  // Listen for global open events & Escape key
  useEffect(() => {
    const handleOpenEvent = (e) => {
      if (e?.detail?.productName) {
        setLeadForm((prev) => ({ ...prev, productName: e.detail.productName }));
      }
      setIsOpen(true);
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    window.addEventListener('open-consultation-modal', handleOpenEvent);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('open-consultation-modal', handleOpenEvent);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleClose]);

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
      console.warn('Lead save fallback:', err);
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

  const handleResetAndClose = () => {
    setFormSubmitted(false);
    handleClose();
    setLeadForm({
      name: '',
      mobile: '',
      email: '',
      productName: 'Equity Cash & Intraday Growth',
      panNumber: '',
      dob: ''
    });
  };

  return (
    <>
      {/* =========================================================================
          1. FLOATING CONSULTATION LAUNCHER (CIRCULAR, DOCKED ON BOTTOM RIGHT)
          ========================================================================= */}
      {!isOpen && (
        <div className="a11y-exempt fixed right-4 sm:right-6 bottom-4 sm:bottom-6 z-[9980] flex items-center">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#1C3F35] text-white shadow-xl hover:shadow-2xl hover:shadow-emerald-950/30 transition-all duration-300 hover:scale-105 active:scale-95 hover:bg-[#142F27] cursor-pointer border border-white/20 select-none focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400 focus-visible:ring-offset-2"
            aria-label="Request Advisory Consultation"
            title="Request Advisory Consultation"
          >
            {/* Live Desk Ping Badge */}
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 ring-2 ring-white"></span>
            </span>

            {/* Phone Icon */}
            <PhoneCall className="h-5 w-5 sm:h-6 sm:w-6 text-white transition-transform duration-300 group-hover:scale-110" />

            {/* Hover Tooltip (Appears to the left of the button) */}
            <span className="pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-1 group-hover:translate-x-0 absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-[#080705] text-white text-xs font-semibold whitespace-nowrap shadow-xl border border-white/10 hidden sm:flex items-center gap-1.5 z-10">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Request Consultation</span>
            </span>
          </button>
        </div>
      )}

      {/* =========================================================================
          2. CONSULTATION CALLBACK POP-UP MODAL (WITH BLURRED BACKGROUND)
          ========================================================================= */}
      {isOpen && (
        <div
          className="modal-overlay"
          onClick={handleClose}
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
              onClick={handleClose}
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
              <span
                className="badge badge-cyan"
                style={{
                  marginBottom: 8,
                  background: 'var(--brand-primary-soft)',
                  color: 'var(--brand-primary)',
                  border: '1px solid var(--brand-primary-border)'
                }}
              >
                SEBI RA Advisory Consultation Desk
              </span>
              <h2
                id="consultation-modal-title"
                style={{ fontSize: '1.45rem', fontWeight: 700, color: '#080705', marginBottom: 6 }}
              >
                Request a Research Callback
              </h2>
              <p style={{ color: 'rgba(8, 7, 5, 0.65)', fontSize: '0.875rem' }}>
                Connect directly with our research advisory team to discuss service suitability and capital risk parameters.
              </p>
            </div>

            {formSubmitted ? (
              <div
                style={{
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid #10b981',
                  padding: 24,
                  borderRadius: 12,
                  textAlign: 'center'
                }}
              >
                <CheckCircle2 size={40} style={{ color: '#10b981', margin: '0 auto 12px auto' }} />
                <h3
                  style={{
                    color: '#080705',
                    fontSize: '1.1875rem',
                    marginBottom: 6,
                    fontWeight: 700
                  }}
                >
                  Callback Request Received
                </h3>
                <p
                  style={{
                    color: 'rgba(8, 7, 5, 0.72)',
                    fontSize: '0.875rem',
                    lineHeight: 1.5,
                    marginBottom: 16
                  }}
                >
                  Thank you, <strong>{leadForm.name}</strong>. Our research advisory team will contact you regarding{' '}
                  <strong>{leadForm.productName}</strong>.
                </p>
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="btn btn-sm btn-primary"
                >
                  Close &amp; Return
                </button>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit}>
                {formError && (
                  <div
                    style={{
                      background: 'rgba(244, 63, 94, 0.1)',
                      border: '1px solid #f43f5e',
                      color: '#9f1239',
                      padding: '8px 12px',
                      borderRadius: 8,
                      fontSize: '0.8125rem',
                      marginBottom: 14,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6
                    }}
                  >
                    <AlertCircle size={15} />
                    <span>{formError}</span>
                  </div>
                )}

                {/* Name */}
                <div className="form-group" style={{ marginBottom: 12 }}>
                  <label
                    className="form-label"
                    style={{ fontSize: '0.75rem', color: '#080705', fontWeight: 600 }}
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="e.g. Anand Kumar"
                    value={leadForm.name}
                    onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                    style={{
                      background: '#F8FAF9',
                      border: '1px solid rgba(8, 7, 5, 0.12)',
                      color: '#080705',
                      padding: '9px 14px',
                      fontSize: '0.875rem'
                    }}
                  />
                </div>

                {/* Mobile & Email */}
                <div className="hero-form-row" style={{ marginBottom: 12 }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label
                      className="form-label"
                      style={{ fontSize: '0.75rem', color: '#080705', fontWeight: 600 }}
                    >
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      className="form-input"
                      placeholder="98XXXXXXXX"
                      value={leadForm.mobile}
                      onChange={(e) => setLeadForm({ ...leadForm, mobile: e.target.value })}
                      style={{
                        background: '#F8FAF9',
                        border: '1px solid rgba(8, 7, 5, 0.12)',
                        color: '#080705',
                        padding: '9px 14px',
                        fontSize: '0.875rem'
                      }}
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label
                      className="form-label"
                      style={{ fontSize: '0.75rem', color: '#080705', fontWeight: 600 }}
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      className="form-input"
                      placeholder="anand@example.com"
                      value={leadForm.email}
                      onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                      style={{
                        background: '#F8FAF9',
                        border: '1px solid rgba(8, 7, 5, 0.12)',
                        color: '#080705',
                        padding: '9px 14px',
                        fontSize: '0.875rem'
                      }}
                    />
                  </div>
                </div>

                {/* Product Name Dropdown */}
                <div className="form-group" style={{ marginBottom: 12 }}>
                  <label
                    className="form-label"
                    style={{ fontSize: '0.75rem', color: '#080705', fontWeight: 600 }}
                  >
                    Advisory Segment
                  </label>
                  <select
                    className="form-select"
                    value={leadForm.productName}
                    onChange={(e) => setLeadForm({ ...leadForm, productName: e.target.value })}
                    style={{
                      background: '#F8FAF9',
                      border: '1px solid rgba(8, 7, 5, 0.12)',
                      color: '#080705',
                      padding: '9px 14px',
                      fontSize: '0.875rem'
                    }}
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
                    <label
                      className="form-label"
                      style={{ fontSize: '0.75rem', color: '#080705', fontWeight: 600 }}
                    >
                      PAN Card Number
                    </label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="ABCDE1234F"
                      maxLength={10}
                      value={leadForm.panNumber}
                      onChange={(e) =>
                        setLeadForm({ ...leadForm, panNumber: e.target.value.toUpperCase() })
                      }
                      style={{
                        background: '#F8FAF9',
                        border: '1px solid rgba(8, 7, 5, 0.12)',
                        color: '#080705',
                        padding: '9px 14px',
                        fontSize: '0.875rem',
                        textTransform: 'uppercase'
                      }}
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label
                      className="form-label"
                      style={{ fontSize: '0.75rem', color: '#080705', fontWeight: 600 }}
                    >
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      className="form-input"
                      value={leadForm.dob}
                      onChange={(e) => setLeadForm({ ...leadForm, dob: e.target.value })}
                      style={{
                        background: '#F8FAF9',
                        border: '1px solid rgba(8, 7, 5, 0.12)',
                        color: '#080705',
                        padding: '9px 14px',
                        fontSize: '0.875rem'
                      }}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="btn btn-primary"
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    padding: '13px 20px',
                    fontSize: '0.95rem'
                  }}
                >
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      fontWeight: 600
                    }}
                  >
                    {formSubmitting ? 'Submitting Request...' : 'Submit Callback Request'}
                    {!formSubmitting && <ArrowRight size={16} />}
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
