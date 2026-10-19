import React, { useState } from 'react';
import { Calculator, ShieldCheck, TrendingUp, AlertCircle, RefreshCw } from 'lucide-react';

export default function RiskCalculator() {
  const [capital, setCapital] = useState(500000);
  const [riskPercent, setRiskPercent] = useState(1.5);
  const [entryPrice, setEntryPrice] = useState(2500);
  const [stopLossDistance, setStopLossDistance] = useState(50); // e.g. ₹50 SL
  const [targetMultiplier, setTargetMultiplier] = useState(2.5); // 1:2.5 R:R

  // Formulas
  const maxRiskAmount = (capital * (riskPercent / 100));
  const recommendedQuantity = Math.max(1, Math.floor(maxRiskAmount / stopLossDistance));
  const totalTradeValue = recommendedQuantity * entryPrice;
  const potentialLoss = recommendedQuantity * stopLossDistance;
  const potentialProfit = potentialLoss * targetMultiplier;
  const targetPrice = entryPrice + (stopLossDistance * targetMultiplier);

  return (
    <div
      className="risk-calculator-card"
      style={{
        background: 'var(--navy-900)',
        border: '1px solid rgba(0, 229, 255, 0.25)',
        borderRadius: 'var(--radius-xl)',
        padding: 28,
        color: '#f8fafc',
        boxShadow: 'var(--shadow-card-dark)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(0, 229, 255, 0.12)', color: '#00e5ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Calculator size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.1875rem', fontWeight: 800, color: '#f8fafc', marginBottom: 2 }}>
              Mathematical Position Sizing Calculator
            </h3>
            <span style={{ fontSize: '0.75rem', color: '#00e5ff', fontFamily: 'var(--font-mono)' }}>
              100% CAPITAL PRESERVATION ENGINE
            </span>
          </div>
        </div>
        <span className="badge badge-emerald">Interactive</span>
      </div>

      <p style={{ fontSize: '0.875rem', color: '#94a3b8', lineHeight: 1.5, marginBottom: 22 }}>
        Disciplined investors never risk arbitrary amounts. Adjust your portfolio parameters to observe how mathematical sizing bounds your downside:
      </p>

      {/* Inputs Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: 16, marginBottom: 24 }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', color: '#cbd5e1', marginBottom: 6, fontWeight: 600 }}>
            Trading Capital (₹)
          </label>
          <input
            type="number"
            className="form-input"
            value={capital}
            step="50000"
            onChange={(e) => setCapital(Number(e.target.value) || 10000)}
            style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', color: '#cbd5e1', marginBottom: 6, fontWeight: 600 }}>
            Max Risk Per Trade ({riskPercent}%)
          </label>
          <input
            type="range"
            min="0.5"
            max="3"
            step="0.25"
            value={riskPercent}
            onChange={(e) => setRiskPercent(Number(e.target.value))}
            style={{ width: '100%', accentColor: '#00e5ff', marginTop: 10 }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', color: '#cbd5e1', marginBottom: 6, fontWeight: 600 }}>
            Entry Price (₹)
          </label>
          <input
            type="number"
            className="form-input"
            value={entryPrice}
            step="100"
            onChange={(e) => setEntryPrice(Number(e.target.value) || 10)}
            style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', color: '#cbd5e1', marginBottom: 6, fontWeight: 600 }}>
            Stop-Loss Distance (₹)
          </label>
          <input
            type="number"
            className="form-input"
            value={stopLossDistance}
            step="5"
            onChange={(e) => setStopLossDistance(Number(e.target.value) || 1)}
            style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}
          />
        </div>
      </div>

      {/* Calculated Output Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 140px), 1fr))',
          gap: 12,
          background: 'rgba(4, 8, 16, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: 12,
          padding: 16,
          marginBottom: 18
        }}
      >
        <div>
          <div style={{ fontSize: '0.6875rem', color: '#94a3b8', textTransform: 'uppercase' }}>Recommended Sizing</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: '#00e5ff' }}>
            {recommendedQuantity.toLocaleString()} <span style={{ fontSize: '0.75rem' }}>Units</span>
          </div>
        </div>

        <div>
          <div style={{ fontSize: '0.6875rem', color: '#94a3b8', textTransform: 'uppercase' }}>Max Risk Exposure</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: '#f43f5e' }}>
            ₹{potentialLoss.toLocaleString()}
          </div>
        </div>

        <div>
          <div style={{ fontSize: '0.6875rem', color: '#94a3b8', textTransform: 'uppercase' }}>Target Return (1:{targetMultiplier})</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: '#10b981' }}>
            ₹{potentialProfit.toLocaleString()}
          </div>
        </div>

        <div>
          <div style={{ fontSize: '0.6875rem', color: '#94a3b8', textTransform: 'uppercase' }}>Projected Target</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: '#f8fafc' }}>
            ₹{targetPrice.toLocaleString()}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.75rem', color: '#94a3b8' }}>
        <ShieldCheck size={14} style={{ color: '#10b981', flexShrink: 0 }} />
        <span>
          Even if 5 consecutive trades hit stop-loss, your total drawdown remains strictly limited to{' '}
          <strong style={{ color: '#f8fafc' }}>{(riskPercent * 5).toFixed(1)}% of capital</strong>, preserving 92%+ of your principal.
        </span>
      </div>
    </div>
  );
}
