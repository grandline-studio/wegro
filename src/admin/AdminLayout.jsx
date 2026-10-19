import React, { useState } from 'react';
import {
  LayoutDashboard,
  ShieldAlert,
  Edit,
  Navigation,
  UserCheck,
  FileText,
  Search,
  Users,
  History,
  User,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Shield,
  ChevronRight
} from 'lucide-react';

export default function AdminLayout({
  activeView,
  onNavigate,
  currentUser,
  onLogout,
  children
}) {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: '1. Dashboard', icon: LayoutDashboard },
    { id: 'complaints', label: '2. Complaint Board', icon: ShieldAlert, badge: 'Core' },
    { id: 'site-content', label: '3. Site Content', icon: Edit },
    { id: 'nav-footer', label: '4. Navigation & Footer', icon: Navigation },
    { id: 'compliance-officer', label: '5. Compliance Officer', icon: UserCheck },
    { id: 'policies', label: '6. Policy Pages', icon: FileText },
    { id: 'seo', label: '7. Accessibility & SEO', icon: Search },
    { id: 'leads', label: '8. Investor Leads', icon: Users },
    { id: 'activity-log', label: '9. Activity Log', icon: History },
    { id: 'account', label: '10. Account & Security', icon: User }
  ];

  const handleSelectNav = (id) => {
    onNavigate(id);
    setMobileDrawerOpen(false);
  };

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: '#FAF6F0',
        fontFamily: 'var(--font-sans, system-ui, sans-serif)',
        color: '#080705'
      }}
    >
      {/* Mobile Drawer Overlay */}
      {mobileDrawerOpen && (
        <div
          onClick={() => setMobileDrawerOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 9998
          }}
        />
      )}

      {/* =========================================================
          LEFT SIDEBAR (DESKTOP & MOBILE DRAWER)
          ========================================================= */}
      <aside
        style={{
          width: 270,
          background: '#FFFFFA',
          borderRight: '1px solid rgba(8, 7, 5, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          zIndex: 9999,
          transform: mobileDrawerOpen ? 'translateX(0)' : undefined,
          transition: 'transform 0.25s ease'
        }}
        className={mobileDrawerOpen ? 'drawer-open' : 'desktop-sidebar'}
      >
        {/* Brand Header */}
        <div
          style={{
            padding: '24px 20px',
            borderBottom: '1px solid rgba(8, 7, 5, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <img
              src="/wegrow_emblem.png"
              alt="WeGro Emblem"
              style={{ width: 36, height: 24, objectFit: 'contain' }}
            />
            <div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#080705', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                We<span style={{ color: '#702632' }}>Gro</span>
              </div>
              <div style={{ fontSize: '0.625rem', fontFamily: 'var(--font-mono)', color: 'rgba(8,7,5,0.6)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Admin Portal
              </div>
            </div>
          </div>

          {/* Close button on mobile */}
          <button
            type="button"
            onClick={() => setMobileDrawerOpen(false)}
            style={{
              display: 'none',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: '#080705'
            }}
            className="mobile-close-btn"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Items */}
        <nav
          style={{
            padding: '16px 12px',
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            flex: 1,
            overflowY: 'auto'
          }}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelectNav(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  borderRadius: 10,
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  border: 'none',
                  background: isActive ? '#702632' : 'transparent',
                  color: isActive ? '#FFFFFA' : '#080705',
                  transition: 'background 0.15s, color 0.15s'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Icon size={16} style={{ color: isActive ? '#94B9AF' : '#702632' }} />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    style={{
                      fontSize: '0.625rem',
                      fontFamily: 'var(--font-mono)',
                      background: isActive ? '#FFFFFA' : '#FAF6F0',
                      color: isActive ? '#702632' : '#080705',
                      padding: '2px 6px',
                      borderRadius: 4,
                      fontWeight: 800
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom User & Logout Footer */}
        <div
          style={{
            padding: '16px 18px',
            borderTop: '1px solid rgba(8, 7, 5, 0.08)',
            background: '#FAF6F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#080705' }}>
              {currentUser?.username || 'admin'}
            </div>
            <div style={{ fontSize: '0.6875rem', color: 'rgba(8,7,5,0.6)' }}>
              Compliance Superadmin
            </div>
          </div>

          <button
            type="button"
            onClick={onLogout}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: '#991b1b',
              padding: 6,
              borderRadius: 6
            }}
            title="Log Out"
          >
            <LogOut size={16} />
          </button>
        </div>
      </aside>

      {/* =========================================================
          MAIN WORKSPACE AREA
          ========================================================= */}
      <div
        style={{
          flex: 1,
          marginLeft: 270,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0
        }}
        className="main-workspace-wrapper"
      >
        {/* Top Header Bar */}
        <header
          style={{
            height: 64,
            background: '#FFFFFA',
            borderBottom: '1px solid rgba(8, 7, 5, 0.1)',
            padding: '0 28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            zIndex: 100
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            {/* Mobile hamburger menu */}
            <button
              type="button"
              onClick={() => setMobileDrawerOpen(true)}
              style={{
                display: 'none',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: '#080705',
                padding: 4
              }}
              className="mobile-hamburger-btn"
            >
              <Menu size={22} />
            </button>

            <span style={{ fontSize: '0.8125rem', fontFamily: 'var(--font-mono)', color: '#702632', fontWeight: 700 }}>
              SEBI RA: INH000008093 · BSE: 5422
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            {/* View Public Site Link */}
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '6px 14px',
                borderRadius: 8,
                background: '#FAF6F0',
                border: '1px solid #e7e2da',
                fontSize: '0.8125rem',
                fontWeight: 700,
                color: '#080705',
                textDecoration: 'none'
              }}
            >
              <span>View Public Site</span>
              <ExternalLink size={13} />
            </a>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '4px 10px',
                borderRadius: 999,
                background: 'rgba(148, 185, 175, 0.2)',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#284e45'
              }}
            >
              <Shield size={13} />
              <span>Admin Secure</span>
            </div>
          </div>
        </header>

        {/* Content View Container */}
        <main style={{ padding: '28px', flex: 1, minWidth: 0 }}>
          {children}
        </main>
      </div>

      {/* Embedded CSS for Mobile Drawer & Responsive Layout */}
      <style>{`
        @media (max-width: 900px) {
          .desktop-sidebar {
            transform: translateX(-100%);
          }
          .drawer-open {
            transform: translateX(0) !important;
          }
          .main-workspace-wrapper {
            margin-left: 0 !important;
          }
          .mobile-hamburger-btn {
            display: block !important;
          }
          .mobile-close-btn {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
}
