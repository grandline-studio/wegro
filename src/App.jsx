import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import PricingPage from './pages/PricingPage';
import LegalPage from './pages/LegalPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname || '/');

  // Sync with browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update document title for SEO & navigation
  useEffect(() => {
    const path = currentPath.toLowerCase().replace(/\/$/, '') || '/';
    if (path === '/') {
      document.title = 'WeGro — Your Search Ends With Our Research | SEBI Registered Research Analyst';
    } else if (path === '/about') {
      document.title = 'About Us — WeGro Research Analysts';
    } else if (path === '/services') {
      document.title = 'Services — WeGro Research Analysts';
    } else if (path === '/pricing') {
      document.title = 'Pricing & Advisory Subscriptions — WeGro';
    } else if (path === '/complaints') {
      document.title = 'Complaint Board & Grievance Redressal — WeGro';
    } else if (path === '/disclosures') {
      document.title = 'Regulatory Disclosures — WeGro';
    } else if (path === '/investor-charter') {
      document.title = 'Investor Charter — WeGro';
    } else if (path === '/odr') {
      document.title = 'Online Dispute Resolution (ODR) — WeGro';
    } else if (path === '/terms') {
      document.title = 'Terms & Conditions — WeGro';
    } else if (path === '/privacy-policy') {
      document.title = 'Privacy Policy — WeGro';
    } else if (path === '/refund-cancellation') {
      document.title = 'Refund & Cancellation Policy — WeGro';
    } else if (path === '/service-delivery') {
      document.title = 'Service Delivery Policy — WeGro';
    } else {
      document.title = 'Page Not Found — WeGro';
    }
  }, [currentPath]);

  // Clean navigation helper
  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Route matching
  const renderCurrentPage = () => {
    const cleanPath = currentPath.toLowerCase().replace(/\/$/, '') || '/';

    if (cleanPath === '/') {
      return <HomePage navigate={navigate} />;
    }
    if (cleanPath === '/about') {
      return <AboutPage navigate={navigate} />;
    }
    if (cleanPath === '/services') {
      return <ServicesPage navigate={navigate} />;
    }
    if (cleanPath === '/pricing') {
      return <PricingPage navigate={navigate} />;
    }
    if (cleanPath === '/complaints') {
      return <LegalPage currentSlug="complaints" navigate={navigate} />;
    }

    // Legal / Regulatory Pages
    const legalSlugs = [
      'disclosures',
      'investor-charter',
      'odr',
      'terms',
      'privacy-policy',
      'refund-cancellation',
      'service-delivery'
    ];
    const matchLegal = legalSlugs.find((slug) => cleanPath === `/${slug}`);
    if (matchLegal) {
      return <LegalPage currentSlug={matchLegal} navigate={navigate} />;
    }

    // 404
    return <NotFoundPage navigate={navigate} />;
  };

  return (
    <div className="app-root">
      {/* 1. Navigation Bar (Header) */}
      <Navbar currentPath={currentPath} navigate={navigate} />

      {/* Main Content Area */}
      <main id="main-content" tabIndex="-1">
        {renderCurrentPage()}
      </main>

      {/* 6. Footer Section */}
      <Footer navigate={navigate} />
    </div>
  );
}
