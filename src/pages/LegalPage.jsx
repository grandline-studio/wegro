import React from 'react';
import {
  Scale,
  ShieldAlert,
  ExternalLink,
  FileText,
  AlertTriangle,
  Building,
  Mail,
  Phone,
  CheckCircle2
} from 'lucide-react';
import { legalPagesData } from '../data/legalData';
import { companyConfig } from '../data/companyConfig';

export default function LegalPage({ currentSlug, navigate }) {
  const currentPolicy = legalPagesData[currentSlug] || legalPagesData['disclosures'];

  const legalNavItems = [
    { slug: 'disclosures', label: 'Disclosures & Ownership' },
    { slug: 'investor-charter', label: 'Investor Charter' },
    { slug: 'complaints', label: 'Grievance & Complaints' },
    { slug: 'odr', label: 'Smart ODR Portal' },
    { slug: 'terms', label: 'Terms & Conditions' },
    { slug: 'privacy-policy', label: 'Privacy Policy' },
    { slug: 'refund-cancellation', label: 'Refund & Cancellation' },
    { slug: 'service-delivery', label: 'Service Delivery' },
  ];

  const handlePolicyChange = (slug) => {
    navigate(`/${slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      {/* 1. HERO HEADER */}
      <section className="section bg-dark">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow cyan">Compliance & Governance</span>
            <h1 className="section-title" style={{ color: '#ffffff' }}>
              {currentPolicy.title}
            </h1>
            <p className="section-description" style={{ color: '#cbd5e1' }}>
              {currentPolicy.subtitle}
            </p>
          </div>

          {/* Quick Legal Navigation Bar */}
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 8 }}>
            {legalNavItems.map((item) => (
              <button
                key={item.slug}
                type="button"
                onClick={() => handlePolicyChange(item.slug)}
                className={`btn btn-sm ${currentSlug === item.slug ? 'btn-primary' : 'btn-secondary'}`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. DRAFT COMPLIANCE NOTICE */}
      <section style={{ background: '#09111c', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '16px 0' }}>
        <div className="container">
          <div className="compliance-banner">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, color: '#f59e0b', marginBottom: 4 }}>
              <AlertTriangle size={16} />
              <span>Statutory Compliance Draft: For Demonstration and Legal Review</span>
            </div>
            This document represents a structured regulatory draft aligned with the SEBI (Research Analysts) Regulations, 2014 and SEBI master circulars. All corporate identifiers, addresses, and registration numbers are placeholders pending formal certificate issuance.
          </div>
        </div>
      </section>

      {/* 3. POLICY CONTENT */}
      <section className="section bg-white">
        <div className="container-narrow">
          {/* Statutory Links Box for Complaints and ODR */}
          {(currentSlug === 'complaints' || currentSlug === 'odr') && (
            <div style={{ background: '#f0fdfa', border: '1px solid #99f6e4', borderRadius: 12, padding: 24, marginBottom: 36 }}>
              <h3 style={{ fontSize: '1.125rem', color: '#0f766e', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                <ExternalLink size={18} />
                <span>Official Regulatory Redressal Portals (SEBI Mandated)</span>
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#115e59', lineHeight: 1.6, marginBottom: 16 }}>
                If your grievance remains unaddressed through our internal escalation channels within 30 days, you have the statutory right to escalate directly to the regulator:
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a
                  href={companyConfig.officialPortals.sebiScores}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-primary"
                >
                  <span>Launch SEBI SCORES Portal</span>
                  <ExternalLink size={14} />
                </a>
                <a
                  href={companyConfig.officialPortals.smartOdr}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-outline-dark"
                >
                  <span>Launch SMART ODR Portal</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          )}

          {/* Policy Sections */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {currentPolicy.sections.map((sec, idx) => (
              <div key={idx} style={{ borderBottom: idx < currentPolicy.sections.length - 1 ? '1px solid #f1f5f9' : 'none', paddingBottom: 24 }}>
                <h2 style={{ fontSize: '1.25rem', color: '#0f172a', marginBottom: 14 }}>
                  {sec.heading}
                </h2>
                <div style={{ color: '#334155', fontSize: '0.9375rem', lineHeight: 1.75, whiteSpace: 'pre-line' }}>
                  {sec.content}
                </div>
              </div>
            ))}
          </div>

          {/* Compliance Contact Box */}
          <div style={{ marginTop: 40, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: 24 }}>
            <h3 style={{ fontSize: '1rem', color: '#0f172a', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Scale size={18} style={{ color: '#00b4d8' }} />
              <span>Compliance & Grievance Officer Details</span>
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: 14, fontSize: '0.8125rem', color: '#475569' }}>
              <div>
                <strong>Compliance Officer:</strong> {companyConfig.complianceOfficer?.name || 'Mr. Ramesh Sharma, CS'}
              </div>
              <div>
                <strong>Official Email:</strong> {companyConfig.complianceOfficer?.email || 'compliance@wegro.in'}
              </div>
              <div>
                <strong>Direct Desk:</strong> {companyConfig.complianceOfficer?.phone || '+91 80 4718 5556'}
              </div>
              <div>
                <strong>Regulatory Status:</strong> {companyConfig.regulatoryStatus || 'SEBI Registered Research Analyst (INH000008093)'}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
