import React, { useState, useEffect } from 'react';
import { Save, Plus, Trash2, ArrowUp, ArrowDown, UserCheck, Shield, CheckCircle2, AlertCircle } from 'lucide-react';
import { defaultSiteContent, defaultComplaintBoardData } from '../../content/seedData';
import { getStorageAdapter } from '../../content/storage';

export default function ComplianceOfficerEditor({ currentUser }) {
  const [officer, setOfficer] = useState(defaultSiteContent.global.complianceOfficer);
  const [escalations, setEscalations] = useState(defaultComplaintBoardData.escalationMatrix);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const storage = getStorageAdapter();
        const site = await storage.getSiteContent();
        const complaints = await storage.getComplaintBoard();
        if (site?.global?.complianceOfficer) {
          setOfficer(site.global.complianceOfficer);
        }
        if (complaints?.escalationMatrix) {
          setEscalations(complaints.escalationMatrix);
        }
      } catch (e) {
        console.error('Error loading compliance officer details:', e);
      }
    };
    load();
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleOfficerChange = (field, value) => {
    setOfficer((prev) => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);
  };

  const handleEscalationChange = (idx, field, value) => {
    setEscalations((prev) => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], [field]: value };
      return copy;
    });
    setHasUnsavedChanges(true);
  };

  const handleMoveEscalation = (idx, direction) => {
    const targetIdx = idx + direction;
    if (targetIdx < 0 || targetIdx >= escalations.length) return;
    setEscalations((prev) => {
      const copy = [...prev];
      const temp = copy[idx];
      copy[idx] = copy[targetIdx];
      copy[targetIdx] = temp;
      return copy;
    });
    setHasUnsavedChanges(true);
  };

  const handleSave = async () => {
    try {
      const storage = getStorageAdapter();
      
      // Update site content compliance officer
      const site = await storage.getSiteContent();
      const updatedSite = {
        ...site,
        global: { ...site.global, complianceOfficer: officer }
      };
      await storage.saveSiteContent(updatedSite, currentUser || { id: 'admin', username: 'admin' });

      // Update complaint board escalation matrix & compliance officer name
      const complaints = await storage.getComplaintBoard();
      const updatedComplaints = {
        ...complaints,
        header: { ...complaints.header, complianceOfficerName: officer.name },
        escalationMatrix: escalations
      };
      await storage.saveComplaintBoard(updatedComplaints, currentUser || { id: 'admin', username: 'admin' }, false);

      // Save local storage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('wegro_db_site_content.json', JSON.stringify(updatedSite));
        window.localStorage.setItem('wegro_db_complaint_data.json', JSON.stringify(updatedComplaints));
      }

      setHasUnsavedChanges(false);
      showToast('Compliance Officer details and escalation matrix successfully updated!', 'success');
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
            Grievance & Compliance Officer
          </h1>
          <p style={{ fontSize: '0.8125rem', color: 'rgba(8, 7, 5, 0.65)', margin: '4px 0 0 0' }}>
            Configure designated statutory grievance officer and the 4-tier escalation steps.
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
            <span>Save Officer & Matrix</span>
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))', gap: 20 }}>
        {/* Compliance Officer Profile */}
        <div style={{ background: '#FFFFFA', borderRadius: 16, border: '1px solid rgba(8, 7, 5, 0.1)', padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18, borderBottom: '1px solid #e7e2da', paddingBottom: 12 }}>
            <UserCheck size={20} style={{ color: '#702632' }} />
            <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#080705', margin: 0 }}>
              Designated Compliance Officer Profile
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: 4 }}>
                Full Legal Name *
              </label>
              <input
                type="text"
                value={officer.name}
                onChange={(e) => handleOfficerChange('name', e.target.value)}
                style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #ccc', fontWeight: 600 }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: 4 }}>
                Designation / Statutory Title *
              </label>
              <input
                type="text"
                value={officer.title}
                onChange={(e) => handleOfficerChange('title', e.target.value)}
                style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #ccc' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: 4 }}>
                Compliance Desk Direct Email *
              </label>
              <input
                type="email"
                value={officer.email}
                onChange={(e) => handleOfficerChange('email', e.target.value)}
                style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #ccc' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: 4 }}>
                Direct Contact Phone *
              </label>
              <input
                type="text"
                value={officer.phone}
                onChange={(e) => handleOfficerChange('phone', e.target.value)}
                style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #ccc' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: 4 }}>
                Physical Compliance Desk Address *
              </label>
              <textarea
                rows={3}
                value={officer.address}
                onChange={(e) => handleOfficerChange('address', e.target.value)}
                style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #ccc', fontSize: '0.8125rem' }}
              />
            </div>
          </div>
        </div>

        {/* 4-Tier Internal Escalation Matrix */}
        <div style={{ background: '#FFFFFA', borderRadius: 16, border: '1px solid rgba(8, 7, 5, 0.1)', padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18, borderBottom: '1px solid #e7e2da', paddingBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Shield size={20} style={{ color: '#702632' }} />
              <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#080705', margin: 0 }}>
                Escalation Hierarchy Steps
              </h2>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {escalations.map((step, idx) => (
              <div
                key={idx}
                style={{
                  background: '#FAF6F0',
                  borderRadius: 10,
                  border: '1px solid #e7e2da',
                  padding: 14
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, background: '#702632', color: '#FFFFFA', padding: '2px 8px', borderRadius: 6 }}>
                      {step.level}
                    </span>
                    <input
                      type="text"
                      value={step.title}
                      onChange={(e) => handleEscalationChange(idx, 'title', e.target.value)}
                      style={{ fontWeight: 700, fontSize: '0.875rem', padding: '3px 8px', borderRadius: 6, border: '1px solid #ccc' }}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: 4 }}>
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleMoveEscalation(idx, -1)}
                      style={{ padding: 4, borderRadius: 4, border: '1px solid #ccc', background: '#fff', cursor: idx === 0 ? 'not-allowed' : 'pointer' }}
                    >
                      <ArrowUp size={12} />
                    </button>
                    <button
                      type="button"
                      disabled={idx === escalations.length - 1}
                      onClick={() => handleMoveEscalation(idx, 1)}
                      style={{ padding: 4, borderRadius: 4, border: '1px solid #ccc', background: '#fff', cursor: idx === escalations.length - 1 ? 'not-allowed' : 'pointer' }}
                    >
                      <ArrowDown size={12} />
                    </button>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 8, marginBottom: 8 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.625rem', fontWeight: 700, color: '#666' }}>Designated Authority</label>
                    <input
                      type="text"
                      value={step.authority}
                      onChange={(e) => handleEscalationChange(idx, 'authority', e.target.value)}
                      style={{ width: '100%', padding: '4px 6px', borderRadius: 4, border: '1px solid #ccc', fontSize: '0.75rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.625rem', fontWeight: 700, color: '#666' }}>Email</label>
                    <input
                      type="email"
                      value={step.email}
                      onChange={(e) => handleEscalationChange(idx, 'email', e.target.value)}
                      style={{ width: '100%', padding: '4px 6px', borderRadius: 4, border: '1px solid #ccc', fontSize: '0.75rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.625rem', fontWeight: 700, color: '#666' }}>SLA Target</label>
                    <input
                      type="text"
                      value={step.sla}
                      onChange={(e) => handleEscalationChange(idx, 'sla', e.target.value)}
                      style={{ width: '100%', padding: '4px 6px', borderRadius: 4, border: '1px solid #ccc', fontSize: '0.75rem' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.625rem', fontWeight: 700, color: '#666' }}>Scope Summary</label>
                  <input
                    type="text"
                    value={step.summary}
                    onChange={(e) => handleEscalationChange(idx, 'summary', e.target.value)}
                    style={{ width: '100%', padding: '4px 6px', borderRadius: 4, border: '1px solid #ccc', fontSize: '0.75rem' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
