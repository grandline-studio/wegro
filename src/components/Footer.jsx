import React from 'react';
import { Mail, Phone, MapPin, ExternalLink, ShieldAlert, Quote } from 'lucide-react';
import { companyConfig } from '../data/companyConfig';

export default function Footer({ navigate }) {
  const handleNavClick = (e, path) => {
    e.preventDefault();
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer" role="contentinfo" aria-label="WeGro Footer">
      <div className="container">
        {/* Top Tagline & Corporate Identity Hero Banner */}
        <div
          style={{
            background: 'var(--bg-white)',
            border: '1px solid var(--border-light)',
            borderRadius: 20,
            padding: '44px 48px',
            marginBottom: 54,
            position: 'relative',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Logo and SEBI Badge Row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <img
                  src="/wegrow_emblem.png"
                  alt="WeGro Emblem"
                  style={{ width: 46, height: 30, objectFit: 'contain' }}
                />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '1.55rem', fontWeight: 800, color: 'var(--text-dark-primary)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                    We<span style={{ color: 'var(--brand-primary)' }}>Gro</span>
                  </span>
                  <span style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--text-dark-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    Research Analysts
                  </span>
                </div>
              </div>

              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '8px 18px',
                  borderRadius: 999,
                  background: 'var(--brand-primary-soft)',
                  border: '1px solid var(--brand-primary-border)',
                  fontSize: '0.78rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--brand-primary)',
                  fontWeight: 600,
                  letterSpacing: '0.04em'
                }}
              >
                <span>SEBI REG NO. {companyConfig.sebiRegistrationNumber}</span>
              </div>
            </div>

            {/* Corporate Quote Statement */}
            <div style={{ display: 'flex', gap: 18, alignItems: 'flex-start', paddingTop: 8 }}>
              <Quote size={26} style={{ color: 'var(--brand-primary)', flexShrink: 0, marginTop: 4 }} />
              <div>
                <p
                  style={{
                    fontSize: 'clamp(1.15rem, 2.2vw, 1.5rem)',
                    fontWeight: 700,
                    color: 'var(--text-dark-primary)',
                    lineHeight: 1.5,
                    letterSpacing: '-0.02em',
                    maxWidth: 880
                  }}
                >
                  "{companyConfig.tagline}"
                </p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-dark-muted)', marginTop: 10 }}>
                  SEBI Registered Research Analyst • INH000008093 | BSE Membership: 5422
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Regulatory Details & Office Addresses Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: 48, marginBottom: 52 }}>
          {/* Regulatory Registrations */}
          <div>
            <h4 className="footer-col-title" style={{ marginBottom: 16 }}>Regulatory Details</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: '0.875rem', color: 'var(--text-dark-secondary)' }}>
              <div>
                <strong style={{ color: 'var(--text-dark-primary)' }}>BSE Membership Number: </strong>
                <span className="tabular-numbers" style={{ color: 'var(--brand-primary)', fontWeight: 600 }}>{companyConfig.bseMembershipNumber}</span>
              </div>
              <div>
                <strong style={{ color: 'var(--text-dark-primary)' }}>SEBI Research Analyst Reg No: </strong>
                <span className="tabular-numbers" style={{ color: 'var(--brand-primary)', fontWeight: 600 }}>{companyConfig.sebiRegistrationNumber}</span>
              </div>
              <div>
                <strong style={{ color: 'var(--text-dark-primary)' }}>CIN: </strong>
                <span className="tabular-numbers" style={{ color: 'var(--brand-primary)', fontWeight: 600 }}>{companyConfig.cinNumber}</span>
              </div>
              <div style={{ marginTop: 6 }}>
                <strong style={{ color: 'var(--text-dark-primary)' }}>Entity Name: </strong>
                <span>{companyConfig.legalName}</span>
              </div>
            </div>
          </div>

          {/* Office Addresses */}
          <div>
            <h4 className="footer-col-title" style={{ marginBottom: 16 }}>Office Locations</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18, fontSize: '0.85rem', color: 'var(--text-dark-secondary)' }}>
              <div>
                <div style={{ color: 'var(--text-dark-primary)', fontWeight: 700, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <MapPin size={15} style={{ color: 'var(--brand-primary)' }} />
                  <span>{companyConfig.offices.registeredOffice.title} (Mumbai)</span>
                </div>
                <div style={{ lineHeight: 1.6 }}>
                  {companyConfig.offices.registeredOffice.address}
                </div>
              </div>

              <div>
                <div style={{ color: 'var(--text-dark-primary)', fontWeight: 700, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <MapPin size={15} style={{ color: 'var(--brand-secondary)' }} />
                  <span>{companyConfig.offices.principalPlace.title} (Bengaluru)</span>
                </div>
                <div style={{ lineHeight: 1.6 }}>
                  {companyConfig.offices.principalPlace.address}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="footer-col-title" style={{ marginBottom: 16 }}>Contact Us</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, fontSize: '0.875rem', color: 'var(--text-dark-secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Mail size={16} style={{ color: 'var(--brand-primary)' }} />
                <a href={`mailto:${companyConfig.contact.email}`} style={{ color: 'var(--brand-primary)', fontWeight: 600, textDecoration: 'none' }}>
                  {companyConfig.contact.email}
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Phone size={16} style={{ color: 'var(--brand-primary)' }} />
                <span style={{ fontWeight: 600 }}>{companyConfig.contact.phone}</span>
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-dark-muted)', marginTop: 4 }}>
                {companyConfig.contact.supportHours}
              </div>
            </div>
          </div>
        </div>

        {/* Important Links Navigation Block with Anti-Misclick Tactile Pills */}
        <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: 40, marginBottom: 44 }}>
          <h4 className="footer-col-title" style={{ marginBottom: 20 }}>Important Links</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px 14px', fontSize: '0.8125rem' }}>
            {companyConfig.importantLinks.map((item, idx) => (
              item.isExternal ? (
                <a
                  key={idx}
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link-pill"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '8px 16px',
                    borderRadius: 10,
                    background: 'var(--bg-white)',
                    border: '1px solid var(--border-light)',
                    color: 'var(--text-dark-secondary)',
                    textDecoration: 'none',
                    fontWeight: 500,
                    transition: 'all 0.15s ease'
                  }}
                >
                  <span>{item.label}</span>
                  <ExternalLink size={12} style={{ color: 'var(--brand-primary)' }} />
                </a>
              ) : (
                <a
                  key={idx}
                  href={item.path}
                  onClick={(e) => handleNavClick(e, item.path)}
                  className="footer-link-pill"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '8px 16px',
                    borderRadius: 10,
                    background: 'var(--bg-white)',
                    border: '1px solid var(--border-light)',
                    color: 'var(--text-dark-secondary)',
                    textDecoration: 'none',
                    fontWeight: 500,
                    transition: 'all 0.15s ease'
                  }}
                >
                  {item.label}
                </a>
              )
            ))}
          </div>
        </div>

        {/* Mandatory SEBI Statutory Risk Warning & Copyright */}
        <div className="footer-regulatory-box">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--brand-primary)', fontWeight: 700, fontSize: '0.875rem', marginBottom: 8 }}>
            <ShieldAlert size={16} style={{ color: 'var(--status-warning)' }} />
            <span>Standard SEBI Statutory Risk Warning</span>
          </div>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-dark-secondary)', lineHeight: 1.6, marginBottom: 8 }}>
            {companyConfig.riskDisclosure}
          </p>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-dark-muted)', margin: 0 }}>
            Disclaimer: Research recommendations provided by {companyConfig.legalName} are based on analysis and data. We do not provide assured return schemes or portfolio management services. Past performance is no guarantee of future returns.
          </p>
        </div>


        {/* Copyright Notice */}
        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} {companyConfig.legalName}. All rights reserved.
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
            SEBI RA Reg: {companyConfig.sebiRegistrationNumber} • BSE Member: {companyConfig.bseMembershipNumber}
          </div>
        </div>
      </div>
    </footer>
  );
}
