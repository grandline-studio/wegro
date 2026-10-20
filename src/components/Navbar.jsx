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
              src="/wegrow_emblem.png"
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

          {/* Right Glossy Glass CTA Button with Liquid Light Beam */}
          <button
            type="button"
            onClick={handleCtaClick}
            className="liquid-nav-cta"
            aria-label="Request Callback"
          >
            <span className="liquid-cta-shine" aria-hidden="true" />
            <span className="liquid-cta-content">
              <span>Request Callback</span>
              <ArrowRight size={13} className="liquid-cta-arrow" />
            </span>
          </button>

          {/* Mobile Liquid Glass Hamburger Toggle */}
          <button
            type="button"
            className={`liquid-mobile-toggle ${mobileMenuOpen ? 'is-active' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            <span className="liquid-toggle-bar liquid-toggle-bar--top" />
            <span className="liquid-toggle-bar liquid-toggle-bar--bottom" />
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
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
              </a>
            );
          })}
          <div className="liquid-mobile-drawer-footer">
            <button
              type="button"
              onClick={handleCtaClick}
              className="liquid-nav-cta liquid-nav-cta--mobile"
            >
              <span className="liquid-cta-shine" aria-hidden="true" />
              <span className="liquid-cta-content">
                <span>Request Advisory Callback</span>
                <ArrowRight size={14} />
              </span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
