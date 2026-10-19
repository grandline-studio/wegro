import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TrendingUp, TrendingDown, Target, Shield, Zap, Layers, RefreshCw } from 'lucide-react';

const terminalAssets = {
  nifty: {
    name: 'NIFTY 50 INDEX',
    symbol: 'NSE: NIFTY',
    price: '24,865.20',
    change: '+118.40 (+0.48%)',
    isBullish: true,
    setupType: 'Bullish Momentum Breakout',
    timeframe: 'Daily / 75-Min',
    entryZone: '24,820 – 24,850',
    target1: '25,100 (+1.0%)',
    target2: '25,350 (+2.0%)',
    stopLoss: '24,680 (-0.7%)',
    rrRatio: '1 : 2.8',
    rationale: 'Heavy Put writing at 24,700 and 24,800 strikes. Price successfully holding above 20 EMA with expanding institutional volume.',
    candlePoints: [
      { x: 30, o: 65, c: 55, h: 72, l: 52 },
      { x: 70, o: 55, c: 60, h: 68, l: 48 },
      { x: 110, o: 60, c: 45, h: 64, l: 40 },
      { x: 150, o: 45, c: 50, h: 56, l: 42 },
      { x: 190, o: 50, c: 35, h: 54, l: 30 },
      { x: 230, o: 35, c: 40, h: 46, l: 32 },
      { x: 270, o: 40, c: 25, h: 42, l: 22 },
      { x: 310, o: 25, c: 20, h: 30, l: 16 }
    ]
  },
  banknifty: {
    name: 'BANK NIFTY INDEX',
    symbol: 'NSE: BANKNIFTY',
    price: '51,420.75',
    change: '-84.60 (-0.16%)',
    isBullish: false,
    setupType: 'Range Mean-Reversion',
    timeframe: 'Intraday / 15-Min',
    entryZone: '51,380 – 51,410',
    target1: '51,750 (+0.6%)',
    target2: '52,100 (+1.3%)',
    stopLoss: '51,200 (-0.4%)',
    rrRatio: '1 : 2.5',
    rationale: 'Consolidation inside value area low. Credit growth data healthy; awaiting private banking earnings triggers.',
    candlePoints: [
      { x: 30, o: 30, c: 40, h: 48, l: 25 },
      { x: 70, o: 40, c: 35, h: 45, l: 30 },
      { x: 110, o: 35, c: 50, h: 55, l: 32 },
      { x: 150, o: 50, c: 45, h: 54, l: 40 },
      { x: 190, o: 45, c: 60, h: 65, l: 42 },
      { x: 230, o: 60, c: 52, h: 64, l: 48 },
      { x: 270, o: 52, c: 58, h: 62, l: 50 },
      { x: 310, o: 58, c: 54, h: 60, l: 48 }
    ]
  },
  crude: {
    name: 'MCX CRUDE OIL',
    symbol: 'MCX: CRUDEOIL NOV',
    price: '₹5,890 / bbl',
    change: '-42 (-0.71%)',
    isBullish: false,
    setupType: 'Evening Session Pullback',
    timeframe: 'Swing / 4-Hour',
    entryZone: '₹5,910 – ₹5,930',
    target1: '₹5,780 (-2.1%)',
    target2: '₹5,680 (-3.8%)',
    stopLoss: '₹5,990 (+1.2%)',
    rrRatio: '1 : 2.6',
    rationale: 'EIA inventory build higher than consensus. Geopolitical risk premium moderating as shipping routes normalize.',
    candlePoints: [
      { x: 30, o: 20, c: 32, h: 36, l: 18 },
      { x: 70, o: 32, c: 45, h: 50, l: 30 },
      { x: 110, o: 45, c: 38, h: 48, l: 35 },
      { x: 150, o: 38, c: 55, h: 58, l: 36 },
      { x: 190, o: 55, c: 50, h: 62, l: 45 },
      { x: 230, o: 50, c: 65, h: 68, l: 48 },
      { x: 270, o: 65, c: 58, h: 70, l: 55 },
      { x: 310, o: 58, c: 64, h: 66, l: 56 }
    ]
  },
  gold: {
    name: 'MCX GOLD 24K',
    symbol: 'MCX: GOLD DEC',
    price: '₹76,140 / 10g',
    change: '+280 (+0.37%)',
    isBullish: true,
    setupType: 'Structural Bullion Trend',
    timeframe: 'Daily Positional',
    entryZone: '₹75,900 – ₹76,050',
    target1: '₹76,900 (+1.1%)',
    target2: '₹77,600 (+2.0%)',
    stopLoss: '₹75,450 (-0.7%)',
    rrRatio: '1 : 2.7',
    rationale: 'Central bank accumulation and Fed interest rate easing trajectory keeping baseline institutional demand solid.',
    candlePoints: [
      { x: 30, o: 60, c: 50, h: 66, l: 45 },
      { x: 70, o: 50, c: 42, h: 55, l: 38 },
      { x: 110, o: 42, c: 48, h: 50, l: 35 },
      { x: 150, o: 48, c: 32, h: 52, l: 28 },
      { x: 190, o: 32, c: 36, h: 40, l: 28 },
      { x: 230, o: 36, c: 24, h: 38, l: 20 },
      { x: 270, o: 24, c: 28, h: 30, l: 18 },
      { x: 310, o: 28, c: 16, h: 28, l: 14 }
    ]
  }
};

export default function InteractiveTerminal() {
  const [selectedKey, setSelectedKey] = useState('nifty');
  const asset = terminalAssets[selectedKey];

  return (
    <div
      className="interactive-terminal"
      style={{
        background: 'rgba(7, 16, 30, 0.85)',
        border: '1px solid rgba(0, 229, 255, 0.25)',
        borderRadius: 20,
        boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 40px rgba(0, 229, 255, 0.1)',
        overflow: 'hidden',
        backdropFilter: 'blur(16px)'
      }}
    >
      {/* Terminal Title Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 18px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'rgba(4, 8, 16, 0.7)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#f43f5e', display: 'inline-block' }} />
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#f59e0b', display: 'inline-block' }} />
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
          <span style={{ marginLeft: 8, fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#94a3b8' }}>
            WeGrow Intelligence Terminal v3.2
          </span>
        </div>

        {/* Live Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: '#00e5ff' }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00e5ff', animation: 'ping 1.5s infinite' }} />
          <span>CONNECTED • REAL-TIME FEED</span>
        </div>
      </div>

      {/* Asset Switcher Tabs */}
      <div
        style={{
          display: 'flex',
          gap: 6,
          padding: '10px 16px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          background: 'rgba(255, 255, 255, 0.02)',
          overflowX: 'auto'
        }}
      >
        {Object.keys(terminalAssets).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setSelectedKey(k)}
            style={{
              padding: '6px 14px',
              borderRadius: 8,
              border: selectedKey === k ? '1px solid rgba(0, 229, 255, 0.4)' : '1px solid transparent',
              background: selectedKey === k ? 'rgba(0, 229, 255, 0.12)' : 'transparent',
              color: selectedKey === k ? '#00e5ff' : '#94a3b8',
              fontSize: '0.75rem',
              fontWeight: 700,
              fontFamily: 'var(--font-mono)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap'
            }}
          >
            {terminalAssets[k].name.split(' ')[0]}
          </button>
        ))}
      </div>

      {/* Main Terminal Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedKey}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          style={{ padding: 20 }}
        >
          {/* Header Metric */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: '0.8125rem', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
                {asset.symbol}
              </div>
              <div style={{ fontSize: '1.65rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: '#f8fafc' }}>
                {asset.price}
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                  padding: '4px 10px',
                  borderRadius: 6,
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  fontFamily: 'var(--font-mono)',
                  background: asset.isBullish ? 'rgba(16, 185, 129, 0.15)' : 'rgba(244, 63, 94, 0.15)',
                  color: asset.isBullish ? '#10b981' : '#f43f5e',
                  border: `1px solid ${asset.isBullish ? 'rgba(16, 185, 129, 0.3)' : 'rgba(244, 63, 94, 0.3)'}`
                }}
              >
                {asset.isBullish ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {asset.change}
              </span>
              <div style={{ fontSize: '0.6875rem', color: '#64748b', marginTop: 4 }}>
                {asset.setupType}
              </div>
            </div>
          </div>

          {/* SVG Animated Chart Canvas */}
          <div
            style={{
              position: 'relative',
              height: 110,
              width: '100%',
              background: 'rgba(4, 8, 16, 0.5)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: 10,
              padding: '10px 0',
              marginBottom: 16,
              overflow: 'hidden'
            }}
          >
            {/* Grid Lines */}
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '10px 0', opacity: 0.15 }}>
              <div style={{ height: 1, background: '#cbd5e1' }} />
              <div style={{ height: 1, background: '#cbd5e1' }} />
              <div style={{ height: 1, background: '#cbd5e1' }} />
            </div>

            <svg viewBox="0 0 350 90" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
              {/* Moving Average Line */}
              <path
                d="M 30,60 Q 90,52 150,44 T 270,30 T 310,20"
                fill="none"
                stroke="#00e5ff"
                strokeWidth="2"
                strokeDasharray="4 2"
                opacity="0.75"
              />

              {/* Candles */}
              {asset.candlePoints.map((c, idx) => {
                const isGreen = c.c < c.o;
                const color = isGreen ? '#10b981' : '#f43f5e';
                const yTop = Math.min(c.o, c.c);
                const height = Math.max(Math.abs(c.o - c.c), 3);

                return (
                  <g key={idx}>
                    {/* Wick */}
                    <line x1={c.x} y1={c.h} x2={c.x} y2={c.l} stroke={color} strokeWidth="1.5" opacity="0.8" />
                    {/* Body */}
                    <rect
                      x={c.x - 6}
                      y={yTop}
                      width="12"
                      height={height}
                      fill={color}
                      rx="1.5"
                    />
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Actionable Signal Levels Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 8,
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              borderRadius: 10,
              padding: 12,
              marginBottom: 14
            }}
          >
            <div>
              <div style={{ fontSize: '0.6875rem', color: '#94a3b8', textTransform: 'uppercase' }}>Entry Zone</div>
              <div style={{ fontSize: '0.8125rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: '#f8fafc' }}>
                {asset.entryZone}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.6875rem', color: '#94a3b8', textTransform: 'uppercase' }}>Stop-Loss</div>
              <div style={{ fontSize: '0.8125rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: '#f43f5e' }}>
                {asset.stopLoss}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.6875rem', color: '#94a3b8', textTransform: 'uppercase' }}>Target 1</div>
              <div style={{ fontSize: '0.8125rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: '#10b981' }}>
                {asset.target1}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.6875rem', color: '#94a3b8', textTransform: 'uppercase' }}>Risk:Reward</div>
              <div style={{ fontSize: '0.8125rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: '#00e5ff' }}>
                {asset.rrRatio}
              </div>
            </div>
          </div>

          {/* Rationale Snippet */}
          <div style={{ fontSize: '0.75rem', color: '#94a3b8', lineHeight: 1.5, display: 'flex', alignItems: 'flex-start', gap: 6 }}>
            <Zap size={13} style={{ color: '#00e5ff', flexShrink: 0, marginTop: 2 }} />
            <span><strong>Research Rationale:</strong> {asset.rationale}</span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
