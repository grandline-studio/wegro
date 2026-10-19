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
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
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
              color: isActive ? '#040810' : '#cbd5e1',
              cursor: 'pointer',
              zIndex: 2,
              transition: 'color 0.2s ease',
              whiteSpace: 'nowrap'
            }}
          >
            {isActive && (
              <motion.div
                layoutId="activeTabPill"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: 9999,
                  background: 'linear-gradient(135deg, #00e5ff 0%, #00b4d8 100%)',
                  boxShadow: '0 2px 10px rgba(0, 229, 255, 0.4)',
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
