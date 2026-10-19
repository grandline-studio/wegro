import React from 'react';
import { User, Shield, LogOut, Clock, KeyRound } from 'lucide-react';
import AdminChangePassword from '../AdminChangePassword';

export default function AccountView({ currentUser, onLogout, onPasswordChanged }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Top Header */}
      <div
        style={{
          background: '#FFFFFA',
          padding: '20px 24px',
          borderRadius: 16,
          border: '1px solid rgba(8, 7, 5, 0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: '50%',
              background: '#1e2022',
              color: '#94B9AF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <User size={26} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#080705', margin: 0 }}>
              {currentUser?.username || 'admin'}
            </h1>
            <div style={{ fontSize: '0.8125rem', color: 'rgba(8,7,5,0.6)', marginTop: 2 }}>
              Role: <strong style={{ color: '#702632', textTransform: 'capitalize' }}>{currentUser?.role || 'Superadmin'}</strong> • SEBI RA Compliance Authority
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onLogout}
          style={{
            padding: '9px 18px',
            borderRadius: 8,
            border: '1px solid #fca5a5',
            background: '#fee2e2',
            color: '#991b1b',
            fontWeight: 700,
            fontSize: '0.8125rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6
          }}
        >
          <LogOut size={14} />
          <span>Sign Out</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))', gap: 20, alignItems: 'start' }}>
        {/* Security Session Info */}
        <div style={{ background: '#FFFFFA', borderRadius: 16, border: '1px solid rgba(8, 7, 5, 0.1)', padding: 24 }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#080705', marginBottom: 14 }}>
            Session Security & Protocols
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, fontSize: '0.8125rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <Clock size={16} style={{ color: '#702632', flexShrink: 0, marginTop: 2 }} />
              <div>
                <strong style={{ color: '#080705' }}>Session Idle Timeout: 2 Hours</strong>
                <p style={{ color: 'rgba(8,7,5,0.65)', margin: '2px 0 0 0', lineHeight: 1.5 }}>
                  Sessions automatically expire after 2 hours of inactivity to prevent unauthorized access.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <Shield size={16} style={{ color: '#284e45', flexShrink: 0, marginTop: 2 }} />
              <div>
                <strong style={{ color: '#080705' }}>Brute-Force Rate Limiting</strong>
                <p style={{ color: 'rgba(8,7,5,0.65)', margin: '2px 0 0 0', lineHeight: 1.5 }}>
                  Login attempts are throttled to a maximum of 5 attempts within any 15-minute window.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <KeyRound size={16} style={{ color: '#702632', flexShrink: 0, marginTop: 2 }} />
              <div>
                <strong style={{ color: '#080705' }}>Cryptographic Hashing</strong>
                <p style={{ color: 'rgba(8,7,5,0.65)', margin: '2px 0 0 0', lineHeight: 1.5 }}>
                  All credentials are salt-hashed using bcrypt. Cleartext passwords are never committed or logged.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Change Password Panel */}
        <AdminChangePassword
          user={currentUser}
          onPasswordChanged={onPasswordChanged}
          isForced={false}
        />
      </div>
    </div>
  );
}
