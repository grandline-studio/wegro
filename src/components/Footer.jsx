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
            background: 'linear-gradient(135deg, rgba(148, 185, 175, 0.08) 0%, rgba(14, 13, 11, 0.85) 100%)',
            border: '1px solid rgba(148, 185, 175, 0.22)',
            borderRadius: 20,
            padding: '36px 40px',
            marginBottom: 48,
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 16px 36px -6px rgba(0, 0, 0, 0.5), inset 0 1px 1.5px rgba(255, 255, 255, 0.1)'
          }}
        >
          {/* Subtle Ambient Refraction Orb */}
          <div
            style={{
              position: 'absolute',
              top: -60,
              right: -60,
              width: 260,
              height: 260,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(148, 185, 175, 0.18) 0%, transparent 70%)',
              pointerEvents: 'none'
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, position: 'relative', zIndex: 1 }}>
            {/* Logo and SEBI Badge Row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <img
                  src="/wegrow_emblem.png"
                  alt="WeGro Emblem"
                  style={{ width: 44, height: 28, objectFit: 'contain', filter: 'drop-shadow(0 2px 8px rgba(148, 185, 175, 0.4))' }}
                />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FFFFFA', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                    We<span style={{ color: '#94B9AF' }}>Gro</span>
                  </span>
                  <span style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'rgba(255, 255, 250, 0.65)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    Research Analysts
                  </span>
                </div>
              </div>

              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '6px 14px',
                  borderRadius: 999,
                  background: 'rgba(148, 185, 175, 0.12)',
                  border: '1px solid rgba(148, 185, 175, 0.28)',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  color: '#94B9AF',
                  letterSpacing: '0.04em'
                }}
              >
                <span>SEBI REG NO. {companyConfig.sebiRegistrationNumber}</span>
              </div>
            </div>

            {/* Corporate Quote Statement */}
            <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', paddingTop: 6 }}>
              <Quote size={28} style={{ color: '#94B9AF', flexShrink: 0, marginTop: 4, opacity: 0.85 }} />
              <div>
                <p
                  style={{
                    fontSize: 'clamp(1.15rem, 2.2vw, 1.55rem)',
                    fontWeight: 700,
                    color: '#FFFFFA',
                    lineHeight: 1.45,
                    letterSpacing: '-0.02em',
                    maxWidth: 860
                  }}
                >
                  "{companyConfig.tagline}"
                </p>
                <p style={{ fontSize: '0.8125rem', color: 'rgba(255, 255, 250, 0.6)', marginTop: 8 }}>
                  SEBI Registered Research Analyst • INH000008093 | BSE Membership: 5422
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Regulatory Details & Office Addresses Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: 32, marginBottom: 40 }}>
          {/* Regulatory Registrations */}
          <div>
            <h4 className="footer-col-title">Regulatory Details</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.875rem', color: 'rgba(255, 255, 250, 0.78)' }}>
              <div>
                <strong style={{ color: '#FFFFFA' }}>BSE Membership Number: </strong>
                <span className="tabular-numbers" style={{ color: '#94B9AF' }}>{companyConfig.bseMembershipNumber}</span>
              </div>
              <div>
                <strong style={{ color: '#FFFFFA' }}>SEBI Research Analyst Reg No: </strong>
                <span className="tabular-numbers" style={{ color: '#94B9AF' }}>{companyConfig.sebiRegistrationNumber}</span>
              </div>
              <div>
                <strong style={{ color: '#FFFFFA' }}>CIN: </strong>
                <span className="tabular-numbers" style={{ color: '#94B9AF' }}>{companyConfig.cinNumber}</span>
              </div>
              <div style={{ marginTop: 6 }}>
                <strong style={{ color: '#FFFFFA' }}>Entity Name: </strong>
                <span>{companyConfig.legalName}</span>
              </div>
            </div>
          </div>

          {/* Office Addresses */}
          <div>
            <h4 className="footer-col-title">Office Locations</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, fontSize: '0.8125rem', color: 'rgba(255, 255, 250, 0.7)' }}>
              <div>
                <div style={{ color: '#FFFFFA', fontWeight: 700, marginBottom: 3, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <MapPin size={14} style={{ color: '#94B9AF' }} />
                  <span>{companyConfig.offices.registeredOffice.title} (Mumbai)</span>
                </div>
                <div style={{ lineHeight: 1.5 }}>
                  {companyConfig.offices.registeredOffice.address}
                </div>
              </div>

              <div>
                <div style={{ color: '#FFFFFA', fontWeight: 700, marginBottom: 3, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <MapPin size={14} style={{ color: '#912F40' }} />
                  <span>{companyConfig.offices.principalPlace.title} (Bengaluru)</span>
                </div>
                <div style={{ lineHeight: 1.5 }}>
                  {companyConfig.offices.principalPlace.address}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="footer-col-title">Contact Us</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: '0.875rem', color: 'rgba(255, 255, 250, 0.78)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Mail size={16} style={{ color: '#94B9AF' }} />
                <a href={`mailto:${companyConfig.contact.email}`} style={{ color: '#94B9AF' }}>
                  {companyConfig.contact.email}
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Phone size={16} style={{ color: '#94B9AF' }} />
                <span>{companyConfig.contact.phone}</span>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 250, 0.5)', marginTop: 4 }}>
                {companyConfig.contact.supportHours}
              </div>
            </div>
          </div>
        </div>

        {/* Important Links Navigation Block */}
        <div style={{ borderTop: '1px solid rgba(148, 185, 175, 0.14)', paddingTop: 32, marginBottom: 36 }}>
          <h4 className="footer-col-title" style={{ marginBottom: 16 }}>Important Links</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 24px', fontSize: '0.8125rem' }}>
            {companyConfig.importantLinks.map((item, idx) => (
              item.isExternal ? (
                <a
                  key={idx}
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}
                >
                  <span>{item.label}</span>
                  <ExternalLink size={11} />
                </a>
              ) : (
                <a
                  key={idx}
                  href={item.path}
                  onClick={(e) => handleNavClick(e, item.path)}
                  className="footer-link"
                >
                  {item.label}
                </a>
              )
            ))}
          </div>
        </div>

        {/* Mandatory SEBI Statutory Risk Warning & Copyright */}
        <div className="footer-regulatory-box">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#94B9AF', fontWeight: 700, fontSize: '0.875rem', marginBottom: 8 }}>
            <ShieldAlert size={16} style={{ color: '#912F40' }} />
            <span>Standard SEBI Statutory Risk Warning</span>
          </div>
          <p style={{ fontSize: '0.8125rem', color: 'rgba(255, 255, 250, 0.78)', lineHeight: 1.6, marginBottom: 8 }}>
            {companyConfig.riskDisclosure}
          </p>
          <p style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 250, 0.5)', margin: 0 }}>
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
