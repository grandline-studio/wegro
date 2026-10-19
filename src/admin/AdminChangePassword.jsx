import React, { useState } from 'react';
import { KeyRound, ShieldCheck, AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { AuthService } from '../content/auth/authService';

export default function AdminChangePassword({ user, onPasswordChanged, isForced = false }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (newPassword.length < 8) {
      setError('New password must be at least 8 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New password and confirm password do not match.');
      return;
    }

    if (newPassword === currentPassword) {
      setError('New password must be different from the current password.');
      return;
    }

    setLoading(true);

    try {
      await AuthService.changePassword(user.username, currentPassword, newPassword);
      setSuccess('Password successfully updated! Your account is now secured.');
      
      // Update local storage user object
      const stored = window.localStorage.getItem('wegro_admin_user');
      if (stored) {
        const u = JSON.parse(stored);
        u.mustChangePassword = false;
        window.localStorage.setItem('wegro_admin_user', JSON.stringify(u));
      }

      setTimeout(() => {
        onPasswordChanged();
      }, 1200);
    } catch (err) {
      setError(err.message || 'Failed to update password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: 520,
        margin: '0 auto',
        padding: '32px 24px'
      }}
    >
      <div
        style={{
          background: '#FFFFFA',
          borderRadius: 20,
          border: '1px solid rgba(8, 7, 5, 0.12)',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
          padding: '36px 32px'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              background: isForced ? 'rgba(239, 68, 68, 0.1)' : 'rgba(148, 185, 175, 0.2)',
              color: isForced ? '#b91c1c' : '#284e45',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 14px auto'
            }}
          >
            <KeyRound size={26} />
          </div>

          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#080705', marginBottom: 6 }}>
            {isForced ? 'Mandatory Password Setup' : 'Change Admin Password'}
          </h2>

          <p style={{ fontSize: '0.8125rem', color: 'rgba(8, 7, 5, 0.65)', lineHeight: 1.5 }}>
            {isForced
              ? 'This is your first login with the default temporary credentials. For regulatory security compliance, you must establish a new, strong password before accessing the dashboard.'
              : 'Update your administrator password regularly to maintain institutional security.'}
          </p>
        </div>

        {error && (
          <div
            style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid #ef4444',
              color: '#991b1b',
              padding: '10px 14px',
              borderRadius: 8,
              fontSize: '0.8125rem',
              marginBottom: 18,
              display: 'flex',
              alignItems: 'flex-start',
              gap: 8
            }}
          >
            <AlertCircle size={16} style={{ flexShrink: 0, marginTop: 2 }} />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div
            style={{
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid #10b981',
              color: '#065f46',
              padding: '10px 14px',
              borderRadius: 8,
              fontSize: '0.8125rem',
              marginBottom: 18,
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}
          >
            <CheckCircle2 size={16} style={{ flexShrink: 0 }} />
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Current Password */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#080705', marginBottom: 6 }}>
              Current Password *
            </label>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password"
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: 8,
                border: '1px solid rgba(8, 7, 5, 0.16)',
                background: '#FBF8F5',
                fontSize: '0.875rem',
                color: '#080705',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* New Password */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#080705', marginBottom: 6 }}>
              New Password (minimum 8 characters) *
            </label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new strong password"
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: 8,
                border: '1px solid rgba(8, 7, 5, 0.16)',
                background: '#FBF8F5',
                fontSize: '0.875rem',
                color: '#080705',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Confirm Password */}
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#080705', marginBottom: 6 }}>
              Confirm New Password *
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter new password"
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: 8,
                border: '1px solid rgba(8, 7, 5, 0.16)',
                background: '#FBF8F5',
                fontSize: '0.875rem',
                color: '#080705',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px 20px',
              borderRadius: 10,
              background: '#702632',
              color: '#FFFFFA',
              fontWeight: 700,
              fontSize: '0.9375rem',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              boxShadow: '0 4px 12px rgba(112, 38, 50, 0.25)'
            }}
          >
            <span>{loading ? 'Updating Password...' : 'Save & Secure Account'}</span>
            {!loading && <ArrowRight size={16} />}
          </button>
        </form>
      </div>
    </div>
  );
}
