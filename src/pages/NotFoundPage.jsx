import React from 'react';
import { Compass, ArrowRight, Home } from 'lucide-react';

export default function NotFoundPage({ navigate }) {
  const handleNav = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="section-lg bg-dark" style={{ minHeight: '65vh', display: 'flex', alignItems: 'center' }}>
      <div className="container-narrow" style={{ textAlign: 'center' }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(0,229,255,0.1)', color: '#00e5ff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' }}>
          <Compass size={32} />
        </div>

        <h1 style={{ fontSize: '3rem', fontWeight: 800, color: '#f8fafc', marginBottom: 12 }}>
          404
        </h1>
        <h2 style={{ fontSize: '1.5rem', color: '#cbd5e1', marginBottom: 16 }}>
          Requested Research Page Not Located
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '1rem', maxWidth: 480, margin: '0 auto 28px auto', lineHeight: 1.6 }}>
          The market research route or resource you requested may have moved or is not yet indexed. Please return to the homepage or explore our services directory.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => handleNav('/')}
            className="btn btn-primary"
          >
            <Home size={16} />
            <span>Return to Homepage</span>
          </button>
          <button
            type="button"
            onClick={() => handleNav('/services')}
            className="btn btn-secondary"
          >
            <span>Browse Services</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
