import React, { useState } from 'react';
import { X, CheckCircle, AlertCircle, ShieldAlert, ArrowRight } from 'lucide-react';

export default function ServiceModal({ service, onClose }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    tradingExperience: '1-3 years',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!service) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setError('Please provide your name, valid email, and contact number.');
      return;
    }
    setError('');
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 700);
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close modal dialog"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div style={{ marginBottom: 20 }}>
          <span className="badge badge-cyan" style={{ marginBottom: 8 }}>
            {service.segment}
          </span>
          <h2 id="modal-title" style={{ fontSize: '1.65rem', marginBottom: 6 }}>
            {service.name}
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9375rem' }}>
            {service.headline}
          </p>
        </div>

        {/* Content Tabs / Body */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: 16, borderRadius: 10, border: '1px solid rgba(255,255,255,0.06)' }}>
            <h4 style={{ fontSize: '0.875rem', color: '#00e5ff', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>
              Suitability & Profile
            </h4>
            <p style={{ fontSize: '0.875rem', color: '#cbd5e1', lineHeight: 1.5 }}>
              {service.suitability}
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '0.9375rem', color: '#f8fafc', marginBottom: 10 }}>
              Included Research Deliverables:
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {service.keyDeliverables.map((item, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: '0.875rem', color: '#94a3b8' }}>
                  <CheckCircle size={16} style={{ color: '#10b981', flexShrink: 0, marginTop: 2 }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div style={{ background: 'rgba(244,63,94,0.08)', padding: 14, borderRadius: 10, border: '1px solid rgba(244,63,94,0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#f43f5e', fontSize: '0.8125rem', fontWeight: 700, marginBottom: 4 }}>
              <ShieldAlert size={16} />
              <span>Risk Classification: {service.riskLevel}</span>
            </div>
            <p style={{ fontSize: '0.8125rem', color: '#fda4af', lineHeight: 1.5 }}>
              {service.riskNote}
            </p>
          </div>

          <div style={{ fontSize: '0.8125rem', color: '#64748b', fontStyle: 'italic' }}>
            Pricing policy: {service.pricingNote}
          </div>
        </div>

        {/* Enquiry Form */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 20 }}>
          <h3 style={{ fontSize: '1.125rem', marginBottom: 12 }}>
            Submit Research Interest for {service.name}
          </h3>

          {submitted ? (
            <div style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid #10b981', padding: 20, borderRadius: 10, textAlign: 'center' }}>
              <CheckCircle size={36} style={{ color: '#10b981', margin: '0 auto 10px auto' }} />
              <h4 style={{ color: '#f8fafc', marginBottom: 6 }}>Enquiry Received Successfully</h4>
              <p style={{ color: '#cbd5e1', fontSize: '0.875rem' }}>
                Thank you for your interest in <strong>{service.name}</strong>. Our research advisory desk will review your profile and reach out via email/phone within 1 business day.
              </p>
              <div style={{ marginTop: 12, fontSize: '0.75rem', color: '#94a3b8', fontFamily: 'monospace' }}>
                Reference ID: WG-{Math.floor(100000 + Math.random() * 900000)}
              </div>
              <button
                type="button"
                onClick={onClose}
                className="btn btn-sm btn-secondary"
                style={{ marginTop: 14 }}
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {error && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(244,63,94,0.1)', color: '#f43f5e', padding: '8px 12px', borderRadius: 6, fontSize: '0.8125rem', marginBottom: 12 }}>
                  <AlertCircle size={14} />
                  <span>{error}</span>
                </div>
              )}

              <div className="form-group" style={{ marginBottom: 12 }}>
                <label className="form-label" style={{ fontSize: '0.8125rem' }}>Full Legal Name *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  placeholder="e.g. Rahul Sharma"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.8125rem' }}>Email Address *</label>
                  <input
                    type="email"
                    required
                    className="form-input"
                    placeholder="name@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.8125rem' }}>Mobile (10-digit) *</label>
                  <input
                    type="tel"
                    required
                    className="form-input"
                    placeholder="98XXXXXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: 16 }}>
                <label className="form-label" style={{ fontSize: '0.8125rem' }}>Market Experience</label>
                <select
                  className="form-select"
                  value={formData.tradingExperience}
                  onChange={(e) => setFormData({ ...formData, tradingExperience: e.target.value })}
                >
                  <option value="Beginner (< 1 year)">Beginner (&lt; 1 year)</option>
                  <option value="1-3 years">Intermediate (1-3 years)</option>
                  <option value="3+ years">Experienced (&gt; 3 years)</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                {submitting ? 'Submitting Enquiry...' : 'Request Service Syllabus & Details'}
                {!submitting && <ArrowRight size={16} />}
              </button>

              <div style={{ marginTop: 10, fontSize: '0.75rem', color: '#64748b', textAlign: 'center' }}>
                We respect your privacy. No PAN or bank credentials are required for public inquiries.
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
