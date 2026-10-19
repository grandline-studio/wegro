import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ShieldCheck,
  Send,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Building
} from 'lucide-react';
import { companyConfig } from '../data/companyConfig';
import { servicesData } from '../data/servicesData';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    serviceInterest: 'Stock Cash',
    experienceLevel: '1-3 years',
    message: '',
    privacyConsent: true
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [referenceId, setReferenceId] = useState('');

  const validatePhone = (p) => {
    // Basic Indian 10-digit mobile validation
    const cleaned = p.replace(/\D/g, '');
    return cleaned.length === 10;
  };

  const validateEmail = (e) => {
    return /\S+@\S+\.\S+/.test(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.fullName.trim()) {
      setErrorMsg('Please enter your full legal name.');
      return;
    }
    if (!validateEmail(formData.email)) {
      setErrorMsg('Please provide a valid email address.');
      return;
    }
    if (!validatePhone(formData.phone)) {
      setErrorMsg('Please enter a valid 10-digit Indian mobile number.');
      return;
    }
    if (!formData.privacyConsent) {
      setErrorMsg('Please consent to our privacy policy to proceed.');
      return;
    }

    setErrorMsg('');
    setLoading(true);

    // Simulate async submission
    setTimeout(() => {
      setLoading(false);
      setReferenceId(`WG-ENQ-${Math.floor(100000 + Math.random() * 900000)}`);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div>
      {/* 1. HERO HEADER */}
      <section className="section bg-dark">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow cyan">Connect with Research Desk</span>
            <h1 className="section-title" style={{ color: '#ffffff' }}>
              Speak with Our Advisory Analysts
            </h1>
            <p className="section-description" style={{ color: '#cbd5e1' }}>
              Have questions regarding our research methodology, risk-reward parameters, or service syllabus? Submit an inquiry below.
            </p>
          </div>
        </div>
      </section>

      {/* 2. CONTACT CONTENT & FORM */}
      <section className="section bg-light">
        <div className="container">
          <div className="contact-grid">
            {/* Left: Contact Info & Operational Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div className="card-light contact-card-info">
                <h2 style={{ fontSize: '1.25rem', marginBottom: 16, color: '#0f172a' }}>
                  Official Communications Desk
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 18, fontSize: '0.875rem' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: '#f0fdfa', color: '#00b4d8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Mail size={18} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: '#0f172a' }}>Research Inquiries</div>
                      <a href={`mailto:${companyConfig.contact.primaryEmail}`} style={{ color: '#0284c7' }}>
                        {companyConfig.contact.primaryEmail}
                      </a>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Response within 24 business hours</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: '#f0fdfa', color: '#00b4d8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Phone size={18} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: '#0f172a' }}>Advisory Desk Telephone</div>
                      <div style={{ color: '#0f172a', fontFamily: 'monospace' }}>
                        {companyConfig.contact.phone}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                        {companyConfig.contact.supportHours}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: '#f0fdfa', color: '#00b4d8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Building size={18} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: '#0f172a' }}>Registered Corporate Office</div>
                      <div style={{ color: '#475569', lineHeight: 1.5 }}>
                        {companyConfig.registeredOffice.addressLine1},<br />
                        {companyConfig.registeredOffice.addressLine2}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: 2 }}>
                        {companyConfig.registeredOffice.note}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: '#f0fdfa', color: '#00b4d8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Clock size={18} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: '#0f172a' }}>Operational Schedule</div>
                      <div style={{ color: '#475569' }}>
                        Active trading days: Monday through Friday (Cash & F&O)<br />
                        Evening Session: MCX Commodities Desk until 11:30 PM IST
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Safety Notice */}
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#0f172a', fontWeight: 700, marginBottom: 6, fontSize: '0.875rem' }}>
                  <ShieldCheck size={18} style={{ color: '#10b981' }} />
                  <span>Public Inquiry Privacy Guarantee</span>
                </div>
                <p style={{ fontSize: '0.8125rem', color: '#64748b', lineHeight: 1.55 }}>
                  WeGrow adheres strictly to Indian DPDP principles. We never request sensitive identifiers like PAN, Aadhaar, bank OTPs, or demat credentials on public contact forms.
                </p>
              </div>
            </div>

            {/* Right: Interactive Form */}
            <div className="card-light contact-card-form">
              <h2 style={{ fontSize: '1.45rem', marginBottom: 6, color: '#0f172a' }}>
                Service Inquiry & Suitability Check
              </h2>
              <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: 24 }}>
                Provide your details to receive service information, risk disclosures, and research subscription guidelines.
              </p>

              {submitted ? (
                <div style={{ background: '#f0fdf4', border: '1px solid #86efac', padding: 28, borderRadius: 12, textAlign: 'center' }}>
                  <CheckCircle2 size={44} style={{ color: '#16a34a', margin: '0 auto 14px auto' }} />
                  <h3 style={{ color: '#14532d', fontSize: '1.25rem', marginBottom: 8 }}>
                    Inquiry Lodged Successfully
                  </h3>
                  <p style={{ color: '#166534', fontSize: '0.9375rem', lineHeight: 1.6, marginBottom: 16 }}>
                    Thank you, <strong>{formData.fullName}</strong>. Your inquiry for <strong>{formData.serviceInterest}</strong> has been registered. Our NISM-certified advisory desk will contact you at <strong>{formData.email}</strong> within 1 trading day.
                  </p>
                  <div style={{ background: '#ffffff', padding: '10px 16px', borderRadius: 8, display: 'inline-block', border: '1px dashed #16a34a', fontFamily: 'monospace', fontWeight: 700, color: '#14532d', fontSize: '0.875rem', marginBottom: 20 }}>
                    Inquiry Reference: {referenceId}
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          fullName: '',
                          email: '',
                          phone: '',
                          serviceInterest: 'Stock Cash',
                          experienceLevel: '1-3 years',
                          message: '',
                          privacyConsent: true
                        });
                      }}
                      className="btn btn-outline-dark"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {errorMsg && (
                    <div style={{ background: '#fff1f2', border: '1px solid #fecdd3', color: '#be123c', padding: '10px 14px', borderRadius: 8, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
                      <AlertCircle size={16} />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="form-group">
                    <label className="form-label">Full Legal Name *</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Vikramaditya Singhania"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                  </div>

                  <div className="contact-form-row">
                    <div className="form-group">
                      <label className="form-label">Email Address *</label>
                      <input
                        type="email"
                        className="form-input"
                        placeholder="vikram@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Mobile Number (10 Digits) *</label>
                      <input
                        type="tel"
                        className="form-input"
                        placeholder="98XXXXXXXX"
                        maxLength="10"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="contact-form-row">
                    <div className="form-group">
                      <label className="form-label">Primary Service Interest</label>
                      <select
                        className="form-select"
                        value={formData.serviceInterest}
                        onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                      >
                        {servicesData.map((s) => (
                          <option key={s.id} value={s.name}>
                            {s.name} ({s.segment})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Trading Experience</label>
                      <select
                        className="form-select"
                        value={formData.experienceLevel}
                        onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                      >
                        <option value="Beginner (< 1 yr)">Beginner (&lt; 1 yr)</option>
                        <option value="1-3 years">Intermediate (1-3 yrs)</option>
                        <option value="3+ years">Experienced (&gt; 3 yrs)</option>
                        <option value="Institutional">Institutional / Corporate</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Specific Query or Requirements (Optional)</label>
                    <textarea
                      rows="3"
                      className="form-textarea"
                      placeholder="Tell us about your portfolio allocation goals, risk preference, or specific market segment questions..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: 22 }}>
                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: '0.8125rem', color: '#64748b', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={formData.privacyConsent}
                        onChange={(e) => setFormData({ ...formData, privacyConsent: e.target.checked })}
                        style={{ marginTop: 2 }}
                      />
                      <span>
                        I consent to WeGrow Financial Research contacting me regarding research publications, risk guidelines, and service syllabus. I acknowledge that WeGrow does not provide guaranteed return schemes.
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-lg btn-primary"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    {loading ? 'Transmitting Enquiry...' : 'Submit Research Enquiry'}
                    {!loading && <Send size={18} />}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
