import React, { useState } from 'react';
import { X, Lock, Shield, KeyRound, AlertTriangle, FileText, Bell, CheckCircle } from 'lucide-react';
import { companyConfig } from '../data/companyConfig';

export default function ClientPortalModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'preview'
  const [clientCode, setClientCode] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [demoLoggedIn, setDemoLoggedIn] = useState(false);

  if (!isOpen) return null;

  const handleSimulateLogin = (e) => {
    e.preventDefault();
    if (!clientCode || !password) {
      setAuthError('Please enter client code and password');
      return;
    }
    // Simulation
    setAuthError('');
    setDemoLoggedIn(true);
    setActiveTab('preview');
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="client-portal-title">
      <div className="modal-content" style={{ maxWidth: 680 }} onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close client access modal"
        >
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(0,229,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00e5ff' }}>
            <Lock size={18} />
          </div>
          <div>
            <h2 id="client-portal-title" style={{ fontSize: '1.45rem', marginBottom: 2 }}>
              WeGrow Client Portal
            </h2>
            <span style={{ fontSize: '0.75rem', color: '#00e5ff', fontFamily: 'monospace' }}>
              SECURE RESEARCH ADVISORY INTERFACE
            </span>
          </div>
        </div>

        {/* Tab Toggle */}
        <div style={{ display: 'flex', gap: 8, margin: '20px 0 16px 0', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: 12 }}>
          <button
            type="button"
            className={`btn btn-sm ${activeTab === 'login' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('login')}
          >
            <KeyRound size={14} />
            <span>Subscriber Sign-In</span>
          </button>
          <button
            type="button"
            className={`btn btn-sm ${activeTab === 'preview' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('preview')}
          >
            <Shield size={14} />
            <span>Architecture & Features</span>
          </button>
        </div>

        {activeTab === 'login' && !demoLoggedIn && (
          <div>
            <div className="compliance-banner" style={{ marginBottom: 18 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700, marginBottom: 4, color: '#f59e0b' }}>
                <AlertTriangle size={15} />
                <span>Regulatory Notice — Pre-Launch Architecture</span>
              </div>
              Public onboarding and subscription access will be enabled upon official SEBI Research Analyst registration. For demonstration and architectural review, use sample credentials below.
            </div>

            <form onSubmit={handleSimulateLogin}>
              {authError && (
                <div style={{ color: '#f43f5e', fontSize: '0.8125rem', marginBottom: 12 }}>
                  {authError}
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Client Code / Registered Mobile</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. WG-DEMO-2026 or 98200XXXXX"
                  value={clientCode}
                  onChange={(e) => setClientCode(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Password / PIN</label>
                <input
                  type="password"
                  className="form-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18, fontSize: '0.8125rem', color: '#94a3b8' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                  <input type="checkbox" defaultChecked />
                  <span>Two-Factor Authentication (2FA)</span>
                </label>
                <a href="#reset" onClick={(e) => e.preventDefault()} style={{ color: '#00e5ff' }}>
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <span>Launch Client Dashboard Preview</span>
              </button>

              <div style={{ marginTop: 16, textAlign: 'center', fontSize: '0.75rem', color: '#64748b' }}>
                Protected with 256-Bit TLS Encryption. We never request passwords over phone or SMS.
              </div>
            </form>
          </div>
        )}

        {(activeTab === 'preview' || demoLoggedIn) && (
          <div>
            {demoLoggedIn && (
              <div style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid #10b981', padding: '10px 14px', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, fontSize: '0.875rem', color: '#f8fafc' }}>
                <CheckCircle size={16} style={{ color: '#10b981' }} />
                <span>Simulated Session Active: <strong>Demo Investor Account (WG-88421)</strong></span>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 18 }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#00e5ff', fontSize: '0.8125rem', fontWeight: 700, marginBottom: 4 }}>
                  <FileText size={15} />
                  <span>Real-Time Model Portfolios</span>
                </div>
                <p style={{ fontSize: '0.8125rem', color: '#cbd5e1' }}>
                  Instant access to verified research dossiers, live sector weights, and rebalancing alerts.
                </p>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#10b981', fontSize: '0.8125rem', fontWeight: 700, marginBottom: 4 }}>
                  <Bell size={15} />
                  <span>Instant Broadcast Pipeline</span>
                </div>
                <p style={{ fontSize: '0.8125rem', color: '#cbd5e1' }}>
                  Simultaneous encrypted dispatch through Web Push, SMS, and Telegram Bot hooks.
                </p>
              </div>
            </div>

            <h4 style={{ fontSize: '0.9375rem', color: '#f8fafc', marginBottom: 10 }}>
              Architecture & Security Safeguards:
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, fontSize: '0.8125rem', color: '#94a3b8', marginBottom: 20 }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}>
                <span style={{ color: '#00e5ff' }}>•</span>
                <span><strong>Role-Based Access Control (RBAC):</strong> Clients only access tiers matching their documented risk profile and active subscription.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}>
                <span style={{ color: '#00e5ff' }}>•</span>
                <span><strong>Zero-Storage of Sensitive Banking Data:</strong> Demat account logins, PAN cards, or payment credentials are never stored in browser localStorage or unencrypted DBs.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}>
                <span style={{ color: '#00e5ff' }}>•</span>
                <span><strong>Compliance Audit Logging:</strong> Every published recommendation generates an immutable timestamp hash for SEBI inspection compliance.</span>
              </li>
            </ul>

            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              Close Portal Preview
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
