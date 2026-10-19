import React, { useState, useEffect } from 'react';
import { Save, Plus, Trash2, ArrowUp, ArrowDown, CheckCircle2, AlertCircle, Building, ShieldCheck, Mail, Phone, MapPin, Link2 } from 'lucide-react';
import { defaultSiteContent } from '../../content/seedData';
import { getStorageAdapter } from '../../content/storage';

export default function NavFooterEditor({ currentUser }) {
  const [globalContent, setGlobalContent] = useState(defaultSiteContent.global);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const storage = getStorageAdapter();
        const loaded = await storage.getSiteContent();
        if (loaded?.global) {
          setGlobalContent(loaded.global);
        }
      } catch (e) {
        console.error('Error loading global content:', e);
      }
    };
    load();
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleUpdate = (field, value) => {
    setGlobalContent((prev) => {
      const copy = { ...prev };
      const parts = field.split('.');
      let target = copy;
      for (let i = 0; i < parts.length - 1; i++) {
        if (!target[parts[i]]) target[parts[i]] = {};
        target = target[parts[i]];
      }
      target[parts[parts.length - 1]] = value;
      setHasUnsavedChanges(true);
      return copy;
    });
  };

  const handleSave = async () => {
    try {
      const storage = getStorageAdapter();
      const currentSite = await storage.getSiteContent();
      const updatedSite = { ...currentSite, global: globalContent };
      await storage.saveSiteContent(updatedSite, currentUser || { id: 'admin', username: 'admin' });

      if (typeof window !== 'undefined') {
        window.localStorage.setItem('wegro_db_site_content.json', JSON.stringify(updatedSite));
      }

      setHasUnsavedChanges(false);
      showToast('Navigation, corporate registrations, and footer details updated!', 'success');
    } catch (e) {
      showToast('Error saving: ' + e.message, 'error');
    }
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
            Navigation, Footer & Corporate Identity
          </h1>
          <p style={{ fontSize: '0.8125rem', color: 'rgba(8, 7, 5, 0.65)', margin: '4px 0 0 0' }}>
            Edit regulatory registration numbers, registered & principal office addresses, support contacts, and the universal risk warning.
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
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))', gap: 20 }}>
        {/* Section A: Statutory Regulatory Registrations */}
        <div style={{ background: '#FFFFFA', borderRadius: 16, border: '1px solid rgba(8, 7, 5, 0.1)', padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18, borderBottom: '1px solid #e7e2da', paddingBottom: 12 }}>
            <ShieldCheck size={20} style={{ color: '#702632' }} />
            <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#080705', margin: 0 }}>
              Regulatory Credentials
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: 4 }}>
                SEBI Registration Number (RA)
              </label>
              <input
                type="text"
                value={globalContent.sebiRegistrationNumber}
                onChange={(e) => handleUpdate('sebiRegistrationNumber', e.target.value)}
                style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #ccc', fontFamily: 'var(--font-mono)' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: 4 }}>
                BSE / BASL Membership ID
              </label>
              <input
                type="text"
                value={globalContent.bseMembershipNumber}
                onChange={(e) => handleUpdate('bseMembershipNumber', e.target.value)}
                style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #ccc', fontFamily: 'var(--font-mono)' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: 4 }}>
                Corporate Identity Number (CIN)
              </label>
              <input
                type="text"
                value={globalContent.cinNumber}
                onChange={(e) => handleUpdate('cinNumber', e.target.value)}
                style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #ccc', fontFamily: 'var(--font-mono)' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: 4 }}>
                Full Legal Entity Name
              </label>
              <input
                type="text"
                value={globalContent.legalName}
                onChange={(e) => handleUpdate('legalName', e.target.value)}
                style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #ccc' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: 4 }}>
                Footer Regulatory Badge Subtitle
              </label>
              <input
                type="text"
                value={globalContent.regulatoryStatus}
                onChange={(e) => handleUpdate('regulatoryStatus', e.target.value)}
                style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #ccc' }}
              />
            </div>
          </div>
        </div>

        {/* Section B: Universal Risk Warning */}
        <div style={{ background: '#FFFFFA', borderRadius: 16, border: '1px solid rgba(8, 7, 5, 0.1)', padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18, borderBottom: '1px solid #e7e2da', paddingBottom: 12 }}>
            <AlertCircle size={20} style={{ color: '#b91c1c' }} />
            <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#080705', margin: 0 }}>
              Universal Risk Warning (Single Source)
            </h2>
          </div>

          <p style={{ fontSize: '0.8125rem', color: 'rgba(8,7,5,0.65)', lineHeight: 1.5, marginBottom: 14 }}>
            This text is stored once and automatically injected across the site footer, page disclaimers, and regulatory disclosures.
          </p>

          <textarea
            rows={7}
            value={globalContent.riskWarning}
            onChange={(e) => handleUpdate('riskWarning', e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: 8,
              border: '1px solid rgba(8, 7, 5, 0.2)',
              background: '#FAF6F0',
              fontSize: '0.8125rem',
              lineHeight: 1.6,
              boxSizing: 'border-box'
            }}
          />

          <div style={{ marginTop: 14 }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: 4 }}>
              Brand Tagline / Institutional Quote
            </label>
            <textarea
              rows={3}
              value={globalContent.tagline}
              onChange={(e) => handleUpdate('tagline', e.target.value)}
              style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #ccc', fontSize: '0.8125rem' }}
            />
          </div>
        </div>

        {/* Section C: Office Addresses */}
        <div style={{ background: '#FFFFFA', borderRadius: 16, border: '1px solid rgba(8, 7, 5, 0.1)', padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18, borderBottom: '1px solid #e7e2da', paddingBottom: 12 }}>
            <Building size={20} style={{ color: '#702632' }} />
            <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#080705', margin: 0 }}>
              Corporate Office Addresses
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: 4 }}>
                Registered Office Title
              </label>
              <input
                type="text"
                value={globalContent.offices.registeredOffice.title}
                onChange={(e) => handleUpdate('offices.registeredOffice.title', e.target.value)}
                style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #ccc' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: 4 }}>
                Registered Office Full Address (Mumbai)
              </label>
              <textarea
                rows={3}
                value={globalContent.offices.registeredOffice.address}
                onChange={(e) => handleUpdate('offices.registeredOffice.address', e.target.value)}
                style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #ccc', fontSize: '0.8125rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: 4 }}>
                Principal Place of Business Title
              </label>
              <input
                type="text"
                value={globalContent.offices.principalPlace.title}
                onChange={(e) => handleUpdate('offices.principalPlace.title', e.target.value)}
                style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #ccc' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: 4 }}>
                Principal Place of Business Full Address (Bengaluru)
              </label>
              <textarea
                rows={3}
                value={globalContent.offices.principalPlace.address}
                onChange={(e) => handleUpdate('offices.principalPlace.address', e.target.value)}
                style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #ccc', fontSize: '0.8125rem' }}
              />
            </div>
          </div>
        </div>

        {/* Section D: Contact & Portals */}
        <div style={{ background: '#FFFFFA', borderRadius: 16, border: '1px solid rgba(8, 7, 5, 0.1)', padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18, borderBottom: '1px solid #e7e2da', paddingBottom: 12 }}>
            <Mail size={20} style={{ color: '#702632' }} />
            <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#080705', margin: 0 }}>
              Contact Desks & Regulatory Links
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: 4 }}>
                Primary Support Email
              </label>
              <input
                type="email"
                value={globalContent.contact.email}
                onChange={(e) => handleUpdate('contact.email', e.target.value)}
                style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #ccc' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: 4 }}>
                Primary Support Phone Numbers
              </label>
              <input
                type="text"
                value={globalContent.contact.phone}
                onChange={(e) => handleUpdate('contact.phone', e.target.value)}
                style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #ccc' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: 4 }}>
                Operating & Support Hours
              </label>
              <input
                type="text"
                value={globalContent.contact.supportHours}
                onChange={(e) => handleUpdate('contact.supportHours', e.target.value)}
                style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #ccc' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: 4 }}>
                SEBI SCORES Portal URL
              </label>
              <input
                type="text"
                value={globalContent.officialPortals.sebiScores}
                onChange={(e) => handleUpdate('officialPortals.sebiScores', e.target.value)}
                style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #ccc' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: 4 }}>
                SMART ODR Dispute Portal URL
              </label>
              <input
                type="text"
                value={globalContent.officialPortals.smartOdr}
                onChange={(e) => handleUpdate('officialPortals.smartOdr', e.target.value)}
                style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #ccc' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
