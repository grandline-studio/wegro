import React, { useState, useEffect } from 'react';
import AdminLogin from './AdminLogin';
import AdminChangePassword from './AdminChangePassword';
import AdminLayout from './AdminLayout';

import DashboardView from './pages/DashboardView';
import ComplaintBoardEditor from './pages/ComplaintBoardEditor';
import SiteContentEditor from './pages/SiteContentEditor';
import NavFooterEditor from './pages/NavFooterEditor';
import ComplianceOfficerEditor from './pages/ComplianceOfficerEditor';
import PolicyPagesEditor from './pages/PolicyPagesEditor';
import SeoEditor from './pages/SeoEditor';
import LeadsManager from './pages/LeadsManager';
import ActivityLogView from './pages/ActivityLogView';
import AccountView from './pages/AccountView';

export default function AdminApp({ navigate }) {
  const [user, setUser] = useState(null);
  const [activeView, setActiveView] = useState('dashboard');
  const [loading, setLoading] = useState(true);

  // Enforce noindex for all admin views
  useEffect(() => {
    document.title = 'WeGro Admin Portal — Institutional Governance';
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute('content', 'noindex, nofollow');

    return () => {
      // Revert on unmount
      if (metaRobots) metaRobots.setAttribute('content', 'index, follow');
    };
  }, []);

  // Check stored session
  useEffect(() => {
    const checkSession = () => {
      try {
        const storedUser = window.localStorage.getItem('wegro_admin_user');
        const storedToken = window.localStorage.getItem('wegro_admin_token');
        if (storedUser && storedToken) {
          setUser(JSON.parse(storedUser));
        }
      } catch (e) {
        // invalid
      } finally {
        setLoading(false);
      }
    };
    checkSession();
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem('wegro_admin_user');
    window.localStorage.removeItem('wegro_admin_token');
    document.cookie = 'wegro_session=; path=/; max-age=0';
    setUser(null);
    setActiveView('dashboard');
  };

  const handleLoginSuccess = (loggedInUser) => {
    setUser(loggedInUser);
  };

  const handlePasswordChanged = () => {
    setUser((prev) => (prev ? { ...prev, mustChangePassword: false } : prev));
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FAF6F0' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', color: '#702632', fontWeight: 700 }}>
          Verifying Admin Security Clearance...
        </div>
      </div>
    );
  }

  // 1. Unauthenticated -> Show Login
  if (!user) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} navigate={navigate} />;
  }

  // 2. Forced password change required on first login
  if (user.mustChangePassword) {
    return (
      <div style={{ minHeight: '100vh', background: '#FAF6F0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
        <AdminChangePassword
          user={user}
          onPasswordChanged={handlePasswordChanged}
          isForced={true}
        />
      </div>
    );
  }

  // 3. Authenticated -> Render Layout with active page
  return (
    <AdminLayout
      activeView={activeView}
      onNavigate={setActiveView}
      currentUser={user}
      onLogout={handleLogout}
    >
      {activeView === 'dashboard' && (
        <DashboardView navigateTo={setActiveView} currentUser={user} />
      )}
      {activeView === 'complaints' && (
        <ComplaintBoardEditor currentUser={user} />
      )}
      {activeView === 'site-content' && (
        <SiteContentEditor currentUser={user} />
      )}
      {activeView === 'nav-footer' && (
        <NavFooterEditor currentUser={user} />
      )}
      {activeView === 'compliance-officer' && (
        <ComplianceOfficerEditor currentUser={user} />
      )}
      {activeView === 'policies' && (
        <PolicyPagesEditor currentUser={user} />
      )}
      {activeView === 'seo' && (
        <SeoEditor currentUser={user} />
      )}
      {activeView === 'leads' && (
        <LeadsManager currentUser={user} />
      )}
      {activeView === 'activity-log' && (
        <ActivityLogView />
      )}
      {activeView === 'account' && (
        <AccountView
          currentUser={user}
          onLogout={handleLogout}
          onPasswordChanged={handlePasswordChanged}
        />
      )}
    </AdminLayout>
  );
}
