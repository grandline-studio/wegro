import React, { useState, useEffect } from 'react';
import { Shield, Lock, User, AlertCircle, ArrowRight, CheckCircle2, KeyRound } from 'lucide-react';
import { AuthService } from '../content/auth/authService';

export default function AdminLogin({ onLoginSuccess, navigate }) {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('wegro@123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rateLimitInfo, setRateLimitInfo] = useState({ allowed: true, remainingAttempts: 5 });

  useEffect(() => {
    // Check initial rate limit status
    const status = AuthService.checkRateLimit('admin');
    setRateLimitInfo(status);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    // Check rate limit
    const rl = AuthService.checkRateLimit(username);
    if (!rl.allowed) {
      setError(`Too many failed login attempts. Please wait ${rl.retryAfterSec || 900} seconds before retrying.`);
      setRateLimitInfo(rl);
      return;
    }

    setLoading(true);

    try {
      const { user, token } = await AuthService.authenticate(username, password);
      
      // Store session token in localStorage / cookie
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('wegro_admin_token', token);
        window.localStorage.setItem('wegro_admin_user', JSON.stringify(user));
        // Also set cookie
        document.cookie = `wegro_session=${token}; path=/; max-age=7200; SameSite=Lax`;
      }

      AuthService.resetRateLimit(username);
      onLoginSuccess(user);
    } catch (err) {
      AuthService.recordFailedAttempt(username);
      const updatedRl = AuthService.checkRateLimit(username);
      setRateLimitInfo(updatedRl);

      const remainingText = updatedRl.remainingAttempts > 0 
        ? ` (${updatedRl.remainingAttempts} attempt${updatedRl.remainingAttempts === 1 ? '' : 's'} remaining)`
        : ' (Account temporarily locked for 15 minutes)';

      setError((err.message || 'Authentication failed.') + remainingText);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#FAF6F0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        fontFamily: 'var(--font-sans, system-ui, sans-serif)',
        color: '#080705'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 440,
          background: '#FFFFFA',
          borderRadius: 20,
          border: '1px solid rgba(8, 7, 5, 0.12)',
          boxShadow: '0 20px 45px -10px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 0, 0, 0.04)',
          padding: '36px 32px',
          boxBoxSizing: 'border-box'
        }}
      >
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: 'linear-gradient(135deg, #1e2022 0%, #080705 100%)',
              color: '#94B9AF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto',
              boxShadow: '0 8px 20px rgba(0,0,0,0.15)'
            }}
          >
            <Shield size={28} />
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#080705', marginBottom: 6 }}>
            WeGro Admin Portal
          </h1>
          <p style={{ fontSize: '0.8125rem', color: 'rgba(8, 7, 5, 0.65)' }}>
            SEBI Regulatory Governance & Public Site Control Desk
          </p>
        </div>

        {/* Development Credentials Banner */}
        <div
          style={{
            background: 'rgba(148, 185, 175, 0.15)',
            border: '1px solid rgba(148, 185, 175, 0.4)',
            borderRadius: 10,
            padding: '10px 14px',
            fontSize: '0.75rem',
            color: '#1e3a34',
            marginBottom: 20,
            lineHeight: 1.5
          }}
        >
          <div style={{ fontWeight: 700, marginBottom: 2, display: 'flex', alignItems: 'center', gap: 6 }}>
            <KeyRound size={13} />
            <span>Default Seed Account (Development)</span>
          </div>
          <div>ID: <code style={{ fontWeight: 700 }}>admin</code> | Password: <code style={{ fontWeight: 700 }}>wegro@123</code></div>
          <div style={{ fontSize: '0.7rem', opacity: 0.8, marginTop: 2 }}>* Mandatory password change will be enforced on first login.</div>
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

        <form onSubmit={handleLogin}>
          {/* Admin ID */}
          <div style={{ marginBottom: 16 }}>
            <label
              style={{
                display: 'block',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#080705',
                marginBottom: 6,
                textTransform: 'uppercase',
                letterSpacing: '0.04em'
              }}
            >
              Admin ID
            </label>
            <div style={{ position: 'relative' }}>
              <User
                size={16}
                style={{
                  position: 'absolute',
                  left: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'rgba(8, 7, 5, 0.4)'
                }}
              />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter admin ID"
                style={{
                  width: '100%',
                  padding: '11px 12px 11px 38px',
                  borderRadius: 10,
                  border: '1px solid rgba(8, 7, 5, 0.16)',
                  background: '#FBF8F5',
                  fontSize: '0.875rem',
                  color: '#080705',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: 22 }}>
            <label
              style={{
                display: 'block',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#080705',
                marginBottom: 6,
                textTransform: 'uppercase',
                letterSpacing: '0.04em'
              }}
            >
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock
                size={16}
                style={{
                  position: 'absolute',
                  left: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'rgba(8, 7, 5, 0.4)'
                }}
              />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                style={{
                  width: '100%',
                  padding: '11px 12px 11px 38px',
                  borderRadius: 10,
                  border: '1px solid rgba(8, 7, 5, 0.16)',
                  background: '#FBF8F5',
                  fontSize: '0.875rem',
                  color: '#080705',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !rateLimitInfo.allowed}
            style={{
              width: '100%',
              padding: '12px 20px',
              borderRadius: 10,
              background: loading ? '#8a3a48' : '#702632',
              color: '#FFFFFA',
              fontWeight: 700,
              fontSize: '0.9375rem',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              boxShadow: '0 4px 12px rgba(112, 38, 50, 0.25)',
              transition: 'background 0.2s'
            }}
          >
            <span>{loading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
            {!loading && <ArrowRight size={16} />}
          </button>
        </form>

        <div style={{ marginTop: 24, textAlign: 'center' }}>
          <button
            type="button"
            onClick={() => navigate('/')}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'rgba(8, 7, 5, 0.6)',
              fontSize: '0.8125rem',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            ← Return to Public Website
          </button>
        </div>
      </div>
    </div>
  );
}
