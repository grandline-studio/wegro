import React from 'react';
import { motion } from 'motion/react';

export default function AnimatedTabs({
  tabs,
  activeTab,
  onChange,
  className = ''
}) {
  return (
    <div
      className={`animated-tabs-container ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: 4,
        borderRadius: 9999,
        background: 'var(--bg-subtle)',
        border: '1px solid var(--border-light)',
        position: 'relative',
        gap: 2,
        maxWidth: '100%',
        overflowX: 'auto'
      }}
      role="tablist"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <button
            key={tab}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab)}
            style={{
              position: 'relative',
              padding: '8px 18px',
              borderRadius: 9999,
              fontSize: '0.875rem',
              fontWeight: 600,
              border: 'none',
              background: 'transparent',
              color: isActive ? '#FFFFFF' : 'var(--text-dark-muted)',
              cursor: 'pointer',
              zIndex: 2,
              transition: 'color 0.15s ease',
              whiteSpace: 'nowrap'
            }}
          >
            {isActive && (
              <motion.div
                layoutId="activeTabPill"
                transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: 9999,
                  background: 'var(--brand-primary)',
                  boxShadow: '0 1px 3px rgba(28, 63, 53, 0.2)',
                  zIndex: -1
                }}
              />
            )}
            {tab}
          </button>
        );
      })}
    </div>
  );
}
