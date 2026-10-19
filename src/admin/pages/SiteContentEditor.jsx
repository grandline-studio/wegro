import React, { useState, useEffect } from 'react';
import {
  Save,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  FileText,
  Layers,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { contentMap } from '../../content/contentMap';
import { defaultSiteContent } from '../../content/seedData';
import { getStorageAdapter } from '../../content/storage';

export default function SiteContentEditor({ currentUser }) {
  const [content, setContent] = useState(defaultSiteContent);
  const [selectedPageId, setSelectedPageId] = useState('home');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState({});
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(true);

  // Filter contentMap to public content pages (Home, About, Services, Pricing, Contact)
  const editablePages = contentMap.filter((p) => p.id !== 'global' && p.id !== 'complaints' && p.id !== 'policies');

  useEffect(() => {
    const loadContent = async () => {
      try {
        const storage = getStorageAdapter();
        const loaded = await storage.getSiteContent();
        if (loaded) {
          setContent(loaded);
        }
      } catch (e) {
        console.error('Failed to load site content:', e);
      } finally {
        setLoading(false);
      }
    };
    loadContent();
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleFieldChange = (pageId, sectionId, keyPath, value) => {
    setContent((prev) => {
      const copy = JSON.parse(JSON.stringify(prev));
      const pageObj = copy[pageId] || {};

      // Resolve dot notation e.g. "hero.headline"
      const parts = keyPath.split('.');
      let target = pageObj;
      for (let i = 0; i < parts.length - 1; i++) {
        if (!target[parts[i]]) target[parts[i]] = {};
        target = target[parts[i]];
      }
      target[parts[parts.length - 1]] = value;
      copy[pageId] = pageObj;

      setHasUnsavedChanges(true);
      return copy;
    });
  };

  const handleToggleSectionVisibility = (sectionId) => {
    setContent((prev) => {
      const copy = { ...prev };
      copy.sectionVisibility = {
        ...(copy.sectionVisibility || {}),
        [sectionId]: !(copy.sectionVisibility?.[sectionId] ?? true)
      };
      setHasUnsavedChanges(true);
      return copy;
    });
  };

  const handleSave = async () => {
    try {
      const storage = getStorageAdapter();
      await storage.saveSiteContent(content, currentUser || { id: 'admin', username: 'admin' });

      // Save to localStorage for instant local view
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('wegro_db_site_content.json', JSON.stringify(content));
      }

      setHasUnsavedChanges(false);
      showToast('Site content saved and published to public pages!', 'success');
    } catch (e) {
      showToast('Failed to save site content: ' + e.message, 'error');
    }
  };

  const currentPage = editablePages.find((p) => p.id === selectedPageId) || editablePages[0];

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

      {/* Top Controls Bar */}
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
            Site Content Editor
          </h1>
          <p style={{ fontSize: '0.8125rem', color: 'rgba(8, 7, 5, 0.65)', margin: '4px 0 0 0' }}>
            Edit headlines, paragraphs, numbers, buttons, and repeatable cards across public pages.
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
            <span>Save & Publish Content</span>
          </button>
        </div>
      </div>

      {/* Page Tabs */}
      <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }}>
        {editablePages.map((page) => (
          <button
            key={page.id}
            type="button"
            onClick={() => setSelectedPageId(page.id)}
            style={{
              padding: '10px 18px',
              borderRadius: 10,
              fontSize: '0.875rem',
              fontWeight: 700,
              cursor: 'pointer',
              border: selectedPageId === page.id ? '1px solid #702632' : '1px solid rgba(8, 7, 5, 0.12)',
              background: selectedPageId === page.id ? '#702632' : '#FFFFFA',
              color: selectedPageId === page.id ? '#FFFFFA' : '#080705',
              whiteSpace: 'nowrap',
              boxShadow: selectedPageId === page.id ? '0 4px 12px rgba(112, 38, 50, 0.2)' : 'none'
            }}
          >
            {page.name}
          </button>
        ))}
      </div>

      {/* Sections List for Selected Page */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {currentPage.sections.map((section) => {
          const isHidden = content.sectionVisibility?.[section.id] === false;
          const isCollapsed = collapsedSections[section.id];

          return (
            <div
              key={section.id}
              style={{
                background: '#FFFFFA',
                borderRadius: 16,
                border: '1px solid rgba(8, 7, 5, 0.1)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                overflow: 'hidden'
              }}
            >
              {/* Section Header */}
              <div
                style={{
                  padding: '16px 22px',
                  background: '#FAF6F0',
                  borderBottom: isCollapsed ? 'none' : '1px solid #e7e2da',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: 12
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <button
                    type="button"
                    onClick={() =>
                      setCollapsedSections((prev) => ({
                        ...prev,
                        [section.id]: !prev[section.id]
                      }))
                    }
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}
                  >
                    {isCollapsed ? <ChevronRight size={18} /> : <ChevronDown size={18} />}
                  </button>
                  <div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#080705', margin: 0 }}>
                      {section.name}
                    </h3>
                    <p style={{ fontSize: '0.75rem', color: 'rgba(8,7,5,0.6)', margin: '2px 0 0 0' }}>
                      {section.description}
                    </p>
                  </div>
                </div>

                {/* Section Visibility Toggle */}
                {section.canHide !== false && (
                  <button
                    type="button"
                    onClick={() => handleToggleSectionVisibility(section.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: '5px 12px',
                      borderRadius: 6,
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      border: isHidden ? '1px solid #fca5a5' : '1px solid #a7f3d0',
                      background: isHidden ? '#fff1f2' : '#ecfdf5',
                      color: isHidden ? '#991b1b' : '#047857'
                    }}
                  >
                    {isHidden ? <EyeOff size={14} /> : <Eye size={14} />}
                    <span>{isHidden ? 'Section Hidden on Site' : 'Section Visible'}</span>
                  </button>
                )}
              </div>

              {/* Section Fields Body */}
              {!isCollapsed && (
                <div style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {section.fields.map((field) => {
                    // Resolve value
                    const parts = field.key.split('.');
                    let val = content[currentPage.id];
                    for (const p of parts) {
                      val = val?.[p];
                    }

                    return (
                      <div key={field.key}>
                        <label
                          style={{
                            display: 'block',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            color: '#080705',
                            marginBottom: 6,
                            textTransform: 'uppercase',
                            letterSpacing: '0.03em'
                          }}
                        >
                          {field.label}
                        </label>

                        {field.type === 'text' && (
                          <input
                            type="text"
                            value={val || ''}
                            placeholder={field.placeholder}
                            onChange={(e) =>
                              handleFieldChange(currentPage.id, section.id, field.key, e.target.value)
                            }
                            style={{
                              width: '100%',
                              padding: '9px 12px',
                              borderRadius: 8,
                              border: '1px solid rgba(8, 7, 5, 0.16)',
                              background: '#FBF8F5',
                              fontSize: '0.875rem',
                              color: '#080705',
                              boxSizing: 'border-box'
                            }}
                          />
                        )}

                        {field.type === 'textarea' && (
                          <textarea
                            rows={3}
                            value={val || ''}
                            placeholder={field.placeholder}
                            onChange={(e) =>
                              handleFieldChange(currentPage.id, section.id, field.key, e.target.value)
                            }
                            style={{
                              width: '100%',
                              padding: '9px 12px',
                              borderRadius: 8,
                              border: '1px solid rgba(8, 7, 5, 0.16)',
                              background: '#FBF8F5',
                              fontSize: '0.875rem',
                              color: '#080705',
                              boxSizing: 'border-box'
                            }}
                          />
                        )}

                        {field.type === 'number' && (
                          <input
                            type="number"
                            value={val ?? 0}
                            onChange={(e) =>
                              handleFieldChange(
                                currentPage.id,
                                section.id,
                                field.key,
                                parseFloat(e.target.value) || 0
                              )
                            }
                            style={{
                              width: '100%',
                              maxWidth: 180,
                              padding: '9px 12px',
                              borderRadius: 8,
                              border: '1px solid rgba(8, 7, 5, 0.16)',
                              background: '#FBF8F5',
                              fontSize: '0.875rem',
                              color: '#080705',
                              boxSizing: 'border-box'
                            }}
                          />
                        )}

                        {field.type === 'list' && Array.isArray(val) && (
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              gap: 10,
                              background: '#FBF8F5',
                              padding: 14,
                              borderRadius: 10,
                              border: '1px solid #e7e2da'
                            }}
                          >
                            {val.map((item, itemIdx) => (
                              <div
                                key={itemIdx}
                                style={{
                                  display: 'flex',
                                  alignItems: 'flex-start',
                                  gap: 8,
                                  background: '#FFFFFA',
                                  padding: 10,
                                  borderRadius: 8,
                                  border: '1px solid #e7e2da'
                                }}
                              >
                                {typeof item === 'string' ? (
                                  <input
                                    type="text"
                                    value={item}
                                    onChange={(e) => {
                                      const nextList = [...val];
                                      nextList[itemIdx] = e.target.value;
                                      handleFieldChange(currentPage.id, section.id, field.key, nextList);
                                    }}
                                    style={{ flex: 1, padding: '6px 10px', borderRadius: 6, border: '1px solid #ccc', fontSize: '0.8125rem' }}
                                  />
                                ) : (
                                  <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 8 }}>
                                    {Object.keys(item).map((subKey) => (
                                      <div key={subKey}>
                                        <label style={{ display: 'block', fontSize: '0.625rem', fontWeight: 700, color: '#666', textTransform: 'uppercase' }}>
                                          {subKey}
                                        </label>
                                        <input
                                          type="text"
                                          value={item[subKey] || ''}
                                          onChange={(e) => {
                                            const nextList = [...val];
                                            nextList[itemIdx] = { ...item, [subKey]: e.target.value };
                                            handleFieldChange(currentPage.id, section.id, field.key, nextList);
                                          }}
                                          style={{ width: '100%', padding: '4px 6px', borderRadius: 4, border: '1px solid #ccc', fontSize: '0.75rem' }}
                                        />
                                      </div>
                                    ))}
                                  </div>
                                )}

                                <button
                                  type="button"
                                  onClick={() => {
                                    const nextList = val.filter((_, i) => i !== itemIdx);
                                    handleFieldChange(currentPage.id, section.id, field.key, nextList);
                                  }}
                                  style={{ padding: 4, borderRadius: 4, border: '1px solid #fca5a5', background: '#fee2e2', color: '#991b1b', cursor: 'pointer' }}
                                  title="Remove Item"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            ))}

                            <button
                              type="button"
                              onClick={() => {
                                const defaultNewItem = field.itemSchema
                                  ? field.itemSchema.reduce((acc, curr) => ({ ...acc, [curr.key]: '' }), {})
                                  : 'New item';
                                const nextList = [...val, defaultNewItem];
                                handleFieldChange(currentPage.id, section.id, field.key, nextList);
                              }}
                              style={{
                                padding: '6px 12px',
                                borderRadius: 6,
                                border: '1px dashed #702632',
                                background: '#fff',
                                color: '#702632',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 6
                              }}
                            >
                              <Plus size={13} />
                              <span>Add New Item</span>
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
