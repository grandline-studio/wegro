import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { companyConfig } from '../data/companyConfig';

export default function Navbar({ currentPath, navigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 880) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavClick = (e, path) => {
    e.preventDefault();
    navigate(path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCtaClick = (e) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (currentPath === '/') {
      const el = document.getElementById('lead-form-section') || document.querySelector('form');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById('lead-form-section') || document.querySelector('form');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <header className="floating-navbar-wrapper" role="banner" aria-label="Main Navigation">
      <nav className="liquid-glass-nav" aria-label="Primary Menu">
        <div className="liquid-glass-inner">
          {/* Logo on Left */}
          <a
            href="/"
            onClick={(e) => handleNavClick(e, '/')}
            className="brand-logo-link"
            aria-label={`${companyConfig.name} Homepage`}
          >
            <img
              src="/wegrow_logo.png"
              alt={`${companyConfig.name} Logo`}
              className="brand-emblem"
            />
            <div className="brand-text-wrap">
              <span className="brand-name">
                We<span>Gro</span>
              </span>
              <span className="brand-subtext">Research Analysts</span>
            </div>
          </a>

          {/* Core Menu Links: Home, About, Services, Pricing, Complaint Board */}
          <ul className="liquid-nav-links">
            {companyConfig.navigation.map((item) => {
              const isActive = currentPath === item.path;
              return (
                <li key={item.path}>
                  <a
                    href={item.path}
                    onClick={(e) => handleNavClick(e, item.path)}
                    className={`liquid-nav-link ${isActive ? 'active' : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Right Glossy Glass CTA Button */}
          <button
            type="button"
            onClick={handleCtaClick}
            className="liquid-nav-cta"
            aria-label="Request Callback"
          >
            <span>Request Callback</span>
            <ArrowRight size={13} />
          </button>

          {/* Mobile Liquid Glass Hamburger Toggle */}
          <button
            type="button"
            className="liquid-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Floating Liquid Glass Mobile Drawer */}
        <div className={`liquid-mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
          {companyConfig.navigation.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <a
                key={item.path}
                href={item.path}
                onClick={(e) => handleNavClick(e, item.path)}
                className={`liquid-mobile-link ${isActive ? 'active' : ''}`}
              >
                {item.label}
              </a>
            );
          })}
          <div style={{ paddingTop: 8, borderTop: '1px solid rgba(255, 255, 255, 0.08)', marginTop: 4 }}>
            <button
              type="button"
              onClick={handleCtaClick}
              className="btn btn-primary btn-glossy"
              style={{ width: '100%', justifyContent: 'center', padding: '10px 16px', fontSize: '0.875rem' }}
            >
              <span>Request Callback</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
