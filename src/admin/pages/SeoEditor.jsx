import React, { useState, useEffect } from 'react';
import { Save, Globe, CheckCircle2, AlertCircle } from 'lucide-react';
import { defaultSiteContent } from '../../content/seedData';
import { getStorageAdapter } from '../../content/storage';

export default function SeoEditor({ currentUser }) {
  const [seoPages, setSeoPages] = useState(defaultSiteContent.seo.pages);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const storage = getStorageAdapter();
        const site = await storage.getSiteContent();
        if (site?.seo?.pages) {
          setSeoPages(site.seo.pages);
        }
      } catch (e) {
        console.error('Error loading SEO settings:', e);
      }
    };
    load();
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleFieldChange = (pagePath, field, value) => {
    setSeoPages((prev) => ({
      ...prev,
      [pagePath]: {
        ...(prev[pagePath] || { title: '', description: '' }),
        [field]: value
      }
    }));
    setHasUnsavedChanges(true);
  };

  const handleSave = async () => {
    try {
      const storage = getStorageAdapter();
      const site = await storage.getSiteContent();
      const updatedSite = { ...site, seo: { pages: seoPages } };
      await storage.saveSiteContent(updatedSite, currentUser || { id: 'admin', username: 'admin' });

      if (typeof window !== 'undefined') {
        window.localStorage.setItem('wegro_db_site_content.json', JSON.stringify(updatedSite));
      }

      setHasUnsavedChanges(false);
      showToast('Search Engine Optimization (SEO) & Meta tags updated!', 'success');
    } catch (e) {
      showToast('Error saving SEO: ' + e.message, 'error');
    }
  };

  const pagesList = [
    { path: '/', label: 'Home Page (/)' },
    { path: '/about', label: 'About Us (/about)' },
    { path: '/services', label: 'Services Syllabus (/services)' },
    { path: '/pricing', label: 'Pricing Plans (/pricing)' },
    { path: '/contact', label: 'Contact Desks (/contact)' },
    { path: '/complaints', label: 'Complaint Board (/complaints)' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {toast && (
        <div
          style={{
            position: 'fixed',
            top: 24,
            right: 24,
            zIndex: 9999,
            background: toast.type === 'error' ? '#ef4444' : '#10b981',
            color: '#FFFFFA',
            padding: '12px 20px',
            borderRadius: 10,
            boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            fontWeight: 700,
            fontSize: '0.875rem'
          }}
        >
          {toast.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Top Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
          background: '#FFFFFA',
          padding: '16px 22px',
          borderRadius: 14,
          border: '1px solid rgba(8, 7, 5, 0.1)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
        }}
      >
        <div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#080705', margin: 0 }}>
            Accessibility & SEO Metadata
          </h1>
          <p style={{ fontSize: '0.8125rem', color: 'rgba(8, 7, 5, 0.65)', margin: '4px 0 0 0' }}>
            Customize per-page meta title tags, meta descriptions, and search index directives.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {hasUnsavedChanges && (
            <span style={{ fontSize: '0.75rem', background: '#fee2e2', color: '#991b1b', border: '1px solid #fca5a5', padding: '3px 10px', borderRadius: 999, fontWeight: 700 }}>
              Unsaved Changes
            </span>
          )}
          <button
            type="button"
            onClick={handleSave}
            style={{
              padding: '9px 20px',
              borderRadius: 8,
              background: '#702632',
              color: '#FFFFFA',
              fontWeight: 700,
              fontSize: '0.875rem',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              boxShadow: '0 2px 8px rgba(112, 38, 50, 0.25)'
            }}
          >
            <Save size={15} />
            <span>Save SEO Tags</span>
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {pagesList.map((p) => {
          const pageSeo = seoPages[p.path] || { title: '', description: '', keywords: '' };

          return (
            <div
              key={p.path}
              style={{
                background: '#FFFFFA',
                borderRadius: 14,
                border: '1px solid rgba(8, 7, 5, 0.1)',
                padding: 20
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14, borderBottom: '1px solid #e7e2da', paddingBottom: 8 }}>
                <Globe size={18} style={{ color: '#702632' }} />
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#080705', margin: 0 }}>
                  {p.label}
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700 }}>Meta Page Title Tag</label>
                    <span style={{ fontSize: '0.6875rem', color: pageSeo.title.length > 60 ? '#b91c1c' : '#15803d' }}>
                      {pageSeo.title.length}/60 chars (Recommended)
                    </span>
                  </div>
                  <input
                    type="text"
                    value={pageSeo.title}
                    onChange={(e) => handleFieldChange(p.path, 'title', e.target.value)}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #ccc', fontSize: '0.875rem' }}
                  />
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700 }}>Meta Description</label>
                    <span style={{ fontSize: '0.6875rem', color: pageSeo.description.length > 160 ? '#b91c1c' : '#15803d' }}>
                      {pageSeo.description.length}/160 chars (Recommended)
                    </span>
                  </div>
                  <textarea
                    rows={2}
                    value={pageSeo.description}
                    onChange={(e) => handleFieldChange(p.path, 'description', e.target.value)}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #ccc', fontSize: '0.8125rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: 4 }}>
                    Target SEO Keywords (Comma-separated)
                  </label>
                  <input
                    type="text"
                    value={pageSeo.keywords || ''}
                    placeholder="SEBI Registered Research Analyst, Stock Market Advisory, Mumbai..."
                    onChange={(e) => handleFieldChange(p.path, 'keywords', e.target.value)}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #ccc', fontSize: '0.8125rem' }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
