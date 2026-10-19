import React, { useRef, useState } from 'react';

export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(0, 229, 255, 0.15)',
  borderColor = 'rgba(0, 229, 255, 0.3)',
  style = {},
  onClick
}) {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`spotlight-card ${className}`}
      style={{
        position: 'relative',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-light)',
        background: 'var(--bg-white)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-sm)',
        transition: 'border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease',
        ...style
      }}
    >
      {/* Content wrapper */}
      <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
    </div>
  );
}
