import React from 'react';

export default function GlowingBadge({
  children,
  variant = 'cyan', // 'cyan' | 'emerald' | 'amber'
  icon: Icon
}) {
  const colorMap = {
    cyan: {
      text: '#1C3F35',
      bg: 'rgba(28, 63, 53, 0.08)',
      border: 'rgba(28, 63, 53, 0.22)',
      dot: '#1C3F35'
    },
    emerald: {
      text: '#15803D',
      bg: 'rgba(21, 128, 61, 0.08)',
      border: 'rgba(21, 128, 61, 0.22)',
      dot: '#15803D'
    },
    amber: {
      text: '#B45309',
      bg: 'rgba(180, 83, 9, 0.08)',
      border: 'rgba(180, 83, 9, 0.22)',
      dot: '#B45309'
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
        textTransform: 'uppercase'
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
