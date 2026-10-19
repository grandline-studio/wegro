import React from 'react';

export default function GlowingBadge({
  children,
  variant = 'cyan', // 'cyan' | 'emerald' | 'amber'
  icon: Icon
}) {
  const colorMap = {
    cyan: {
      text: '#00e5ff',
      bg: 'rgba(0, 229, 255, 0.08)',
      border: 'rgba(0, 229, 255, 0.25)',
      dot: '#00e5ff',
      glow: 'rgba(0, 229, 255, 0.6)'
    },
    emerald: {
      text: '#10b981',
      bg: 'rgba(16, 185, 129, 0.08)',
      border: 'rgba(16, 185, 129, 0.25)',
      dot: '#10b981',
      glow: 'rgba(16, 185, 129, 0.6)'
    },
    amber: {
      text: '#f59e0b',
      bg: 'rgba(245, 158, 11, 0.08)',
      border: 'rgba(245, 158, 11, 0.25)',
      dot: '#f59e0b',
      glow: 'rgba(245, 158, 11, 0.6)'
    }
  };

  const c = colorMap[variant] || colorMap.cyan;

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '5px 14px',
        borderRadius: 9999,
        background: c.bg,
        border: `1px solid ${c.border}`,
        color: c.text,
        fontSize: '0.8125rem',
        fontWeight: 600,
        fontFamily: 'var(--font-mono)',
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        boxShadow: `0 0 16px ${c.bg}`
      }}
    >
      <span style={{ position: 'relative', display: 'flex', width: 8, height: 8 }}>
        <span
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: c.dot,
            opacity: 0.75,
            animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite'
          }}
        />
        <span
          style={{
            position: 'relative',
            borderRadius: '50%',
            width: 8,
            height: 8,
            background: c.dot
          }}
        />
      </span>
      {Icon && <Icon size={13} style={{ marginRight: -2 }} />}
      <span>{children}</span>
    </div>
  );
}
