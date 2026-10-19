import React, { useState, useEffect } from 'react';
import { Save, Plus, Trash2, FileText, CheckCircle2, AlertCircle, Clock, ExternalLink } from 'lucide-react';
import { defaultSiteContent } from '../../content/seedData';
import { getStorageAdapter } from '../../content/storage';

export default function PolicyPagesEditor({ currentUser }) {
  const [policies, setPolicies] = useState(defaultSiteContent.policies);
  const [selectedSlug, setSelectedSlug] = useState('disclosures');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [newPolicyModal, setNewPolicyModal] = useState(false);
  const [newSlug, setNewSlug] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const storage = getStorageAdapter();
        const site = await storage.getSiteContent();
        if (site?.policies) {
          setPolicies(site.policies);
        }
      } catch (e) {
        console.error('Error loading policies:', e);
      }
    };
    load();
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const currentPolicy = policies[selectedSlug] || Object.values(policies)[0];

  const handleUpdateCurrentPolicy = (updater) => {
    setPolicies((prev) => {
      const copy = { ...prev };
      const updated = typeof updater === 'function' ? updater(copy[selectedSlug]) : updater;
      // Auto-stamp last updated
      const nowMonthYear = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      updated.lastUpdated = `Last Updated: ${nowMonthYear}`;
      copy[selectedSlug] = updated;
      setHasUnsavedChanges(true);
      return copy;
    });
  };

  const handleSave = async () => {
    try {
      const storage = getStorageAdapter();
      const site = await storage.getSiteContent();
      const updatedSite = { ...site, policies };
      await storage.saveSiteContent(updatedSite, currentUser || { id: 'admin', username: 'admin' });

      if (typeof window !== 'undefined') {
        window.localStorage.setItem('wegro_db_site_content.json', JSON.stringify(updatedSite));
      }

      setHasUnsavedChanges(false);
      showToast(`Saved and auto-stamped "${currentPolicy?.title}"!`, 'success');
    } catch (e) {
      showToast('Error saving: ' + e.message, 'error');
    }
  };

  const handleCreatePolicy = () => {
    const slug = newSlug.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-');
    if (!slug || !newTitle.trim()) {
      alert('Please enter a valid policy title and slug.');
      return;
    }

    if (policies[slug]) {
      alert('A policy with this slug already exists.');
      return;
    }

    const newPage = {
      slug,
      title: newTitle.trim(),
      subtitle: 'Official Statutory & Client Agreement Terms',
      lastUpdated: `Last Updated: ${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`,
      sections: [
        {
          heading: '1. Policy Scope & Guidelines',
          content: 'Enter the statutory clauses and policy terms here.'
        }
      ]
    };

    setPolicies((prev) => ({ ...prev, [slug]: newPage }));
    setSelectedSlug(slug);
    setNewPolicyModal(false);
    setNewSlug('');
    setNewTitle('');
    setHasUnsavedChanges(true);
    showToast(`Created new policy page: ${newTitle}!`, 'success');
  };

  const handleDeletePolicy = (slug) => {
    if (Object.keys(policies).length <= 1) {
      alert('Cannot delete the last remaining policy page.');
      return;
    }
    const confirmed = window.confirm(`Are you sure you want to delete "${policies[slug]?.title}"?`);
    if (!confirmed) return;

    setPolicies((prev) => {
      const copy = { ...prev };
      delete copy[slug];
      return copy;
    });

    const remainingSlugs = Object.keys(policies).filter((s) => s !== slug);
    setSelectedSlug(remainingSlugs[0]);
    setHasUnsavedChanges(true);
    showToast('Policy deleted.', 'info');
  };

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
            Policy & Legal Pages Editor
          </h1>
          <p style={{ fontSize: '0.8125rem', color: 'rgba(8, 7, 5, 0.65)', margin: '4px 0 0 0' }}>
            Edit statutory policies, disclosures, charters, and terms. Dates are automatically stamped on save.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => setNewPolicyModal(true)}
            style={{
              padding: '9px 14px',
              borderRadius: 8,
              background: '#F0F9F7',
              border: '1px solid #94B9AF',
              color: '#284e45',
              fontWeight: 700,
              fontSize: '0.8125rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}
          >
            <Plus size={14} />
            <span>Add New Policy</span>
          </button>

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
            <span>Save & Auto-Stamp</span>
          </button>
        </div>
      </div>

      {/* Main Layout: Left Policy List + Right Content Editor */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(220px, 280px) 1fr', gap: 20, alignItems: 'start' }}>
        {/* Left: Policy List Selector */}
        <div style={{ background: '#FFFFFA', borderRadius: 16, border: '1px solid rgba(8, 7, 5, 0.1)', padding: 14 }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'rgba(8,7,5,0.6)', textTransform: 'uppercase', marginBottom: 10, padding: '0 8px' }}>
            All Regulatory Documents
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {Object.keys(policies).map((slug) => {
              const p = policies[slug];
              const isSelected = selectedSlug === slug;
              return (
                <button
                  key={slug}
                  type="button"
                  onClick={() => setSelectedSlug(slug)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 12px',
                    borderRadius: 8,
                    textAlign: 'left',
                    cursor: 'pointer',
                    border: 'none',
                    background: isSelected ? '#FAF6F0' : 'transparent',
                    borderLeft: isSelected ? '3px solid #702632' : '3px solid transparent'
                  }}
                >
                  <div style={{ overflow: 'hidden' }}>
                    <strong style={{ fontSize: '0.8125rem', color: isSelected ? '#702632' : '#080705', display: 'block', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                      {p.title}
                    </strong>
                    <span style={{ fontSize: '0.6875rem', color: 'rgba(8,7,5,0.5)', fontFamily: 'var(--font-mono)' }}>
                      /{slug}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Active Policy Editor */}
        {currentPolicy && (
          <div style={{ background: '#FFFFFA', borderRadius: 16, border: '1px solid rgba(8, 7, 5, 0.1)', padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18, borderBottom: '1px solid #e7e2da', paddingBottom: 12 }}>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#080705', margin: 0 }}>
                  {currentPolicy.title}
                </h2>
                <div style={{ fontSize: '0.75rem', color: '#15803d', fontWeight: 700, marginTop: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Clock size={12} />
                  <span>{currentPolicy.lastUpdated}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 8 }}>
                <a
                  href={`/${currentPolicy.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '6px 12px',
                    borderRadius: 6,
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    color: '#702632',
                    border: '1px solid rgba(112, 38, 50, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4
                  }}
                >
                  <span>View Public Page</span>
                  <ExternalLink size={12} />
                </a>

                <button
                  type="button"
                  onClick={() => handleDeletePolicy(currentPolicy.slug)}
                  style={{
                    padding: '6px 10px',
                    borderRadius: 6,
                    border: '1px solid #fca5a5',
                    background: '#fee2e2',
                    color: '#991b1b',
                    cursor: 'pointer'
                  }}
                  title="Delete Policy"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Title & Subtitle */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: 4 }}>
                    Policy Title *
                  </label>
                  <input
                    type="text"
                    value={currentPolicy.title}
                    onChange={(e) => handleUpdateCurrentPolicy((p) => ({ ...p, title: e.target.value }))}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #ccc', fontWeight: 700 }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: 4 }}>
                    Subtitle / Framework Reference
                  </label>
                  <input
                    type="text"
                    value={currentPolicy.subtitle}
                    onChange={(e) => handleUpdateCurrentPolicy((p) => ({ ...p, subtitle: e.target.value }))}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #ccc' }}
                  />
                </div>
              </div>

              {/* Policy Sections (Clauses) */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <label style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#080705' }}>
                    Policy Clauses & Regulatory Sections
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      handleUpdateCurrentPolicy((p) => ({
                        ...p,
                        sections: [
                          ...p.sections,
                          {
                            heading: `${p.sections.length + 1}. New Clause Heading`,
                            content: 'Enter clause text here.'
                          }
                        ]
                      }));
                    }}
                    style={{
                      padding: '5px 10px',
                      borderRadius: 6,
                      background: '#FAF6F0',
                      border: '1px solid #e7e2da',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4
                    }}
                  >
                    <Plus size={13} />
                    <span>Add Clause</span>
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {currentPolicy.sections.map((sec, secIdx) => (
                    <div
                      key={secIdx}
                      style={{
                        background: '#FAF6F0',
                        borderRadius: 10,
                        border: '1px solid #e7e2da',
                        padding: 16
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                        <input
                          type="text"
                          value={sec.heading}
                          onChange={(e) => {
                            const val = e.target.value;
                            handleUpdateCurrentPolicy((p) => {
                              const s = [...p.sections];
                              s[secIdx].heading = val;
                              return { ...p, sections: s };
                            });
                          }}
                          placeholder="Clause Heading"
                          style={{ width: '80%', padding: '6px 10px', borderRadius: 6, border: '1px solid #ccc', fontWeight: 700, fontSize: '0.875rem' }}
                        />

                        <button
                          type="button"
                          onClick={() => {
                            if (currentPolicy.sections.length <= 1) return;
                            handleUpdateCurrentPolicy((p) => ({
                              ...p,
                              sections: p.sections.filter((_, i) => i !== secIdx)
                            }));
                          }}
                          style={{ background: 'transparent', border: 'none', color: '#b91c1c', cursor: 'pointer' }}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>

                      <textarea
                        rows={4}
                        value={sec.content}
                        onChange={(e) => {
                          const val = e.target.value;
                          handleUpdateCurrentPolicy((p) => {
                            const s = [...p.sections];
                            s[secIdx].content = val;
                            return { ...p, sections: s };
                          });
                        }}
                        placeholder="Clause body paragraph or bullet points"
                        style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid #ccc', fontSize: '0.8125rem', lineHeight: 1.6 }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal: Create New Policy */}
      {newPolicyModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: 20
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: 420,
              background: '#FFFFFA',
              borderRadius: 16,
              padding: 24,
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
            }}
          >
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0 0 14px 0' }}>
              Add New Policy Page
            </h3>

            <div style={{ marginBottom: 12 }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: 4 }}>
                Policy Title *
              </label>
              <input
                type="text"
                value={newTitle}
                placeholder="e.g. Risk Disclosure on Derivatives"
                onChange={(e) => {
                  setNewTitle(e.target.value);
                  setNewSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '-'));
                }}
                style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #ccc' }}
              />
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: 4 }}>
                URL Slug *
              </label>
              <div style={{ display: 'flex', alignItems: 'center', background: '#eee', borderRadius: 8, padding: '0 8px' }}>
                <span style={{ fontSize: '0.8125rem', color: '#666' }}>/</span>
                <input
                  type="text"
                  value={newSlug}
                  onChange={(e) => setNewSlug(e.target.value)}
                  style={{ width: '100%', padding: '8px 4px', border: 'none', background: 'transparent', outline: 'none', fontSize: '0.8125rem' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <button
                type="button"
                onClick={() => setNewPolicyModal(false)}
                style={{ padding: '8px 14px', borderRadius: 8, border: '1px solid #ccc', background: '#fff', cursor: 'pointer', fontWeight: 700, fontSize: '0.8125rem' }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCreatePolicy}
                style={{ padding: '8px 16px', borderRadius: 8, border: 'none', background: '#702632', color: '#fff', cursor: 'pointer', fontWeight: 700, fontSize: '0.8125rem' }}
              >
                Create Page
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
