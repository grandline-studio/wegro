import React from "react";
import {
  ArrowUpRight,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Receipt
} from "lucide-react";
import { Marquee } from "@/demos/ui/marquee";

export interface HeroProps {
  headline?: string;
  subheadline?: string;
  eyebrow?: string;
  metricNumber?: string;
  metricLabel?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  secondaryCtaText?: string;
  onSecondaryCtaClick?: () => void;
  imageSrc?: string;
  imageAlt?: string;
  partners?: string[];
  avatars?: string[];
}

export default function Hero({
  headline = "Your search ends with our research!",
  subheadline = "In-depth market research and quantitative analysis to help you make disciplined, data-backed financial decisions.",
  eyebrow = "SEBI Registered Research Analyst • INH000008093 • BSE Member: 5422",
  metricNumber = "15,000+",
  metricLabel = "Market Participants Guided",
  ctaText = "Request Advisory Consultation",
  onCtaClick,
  secondaryCtaText = "Explore Advisory Services",
  onSecondaryCtaClick,
  partners = [
    "NSE NIFTY 50",
    "BSE SENSEX",
    "SEBI SCORES",
    "SMART ODR",
    "MCX COMMODITIES",
    "STRICT 1:2+ RISK-REWARD",
    "GST INVOICED BILLS",
    "DIRECT BANK SETTLEMENT",
    "ZERO PROFIT SHARING"
  ],
  avatars = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
  ],
}: HeroProps) {
  // Brand emphasis for "our research" with handmade red marker underline
  const renderHeadline = () => {
    if (headline.toLowerCase().includes("our research")) {
      const parts = headline.split(/our research/i);
      return (
        <>
          {parts[0]}
          <span className="hero-v2-title-highlight">
            our research
            {/* Expressive handmade red marker underline with rapid stroke & energetic flick */}
            <svg
              className="hero-v2-hand-drawn-underline"
              viewBox="0 0 280 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              {/* Primary fast handwritten stroke */}
              <path
                d="M 4 14 C 42 10, 95 15, 150 12 C 195 9, 238 13, 276 7"
                stroke="#DC2626"
                strokeWidth="3.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Secondary rapid return sweep with energetic loop / flick */}
              <path
                d="M 12 18 C 55 15, 115 19, 175 16 C 215 14, 252 17, 272 11 C 278 9, 281 12, 277 16 C 271 21, 255 21, 238 20"
                stroke="#EF4444"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.92"
              />
            </svg>
          </span>
          {parts[1] || "!"}
        </>
      );
    }
    return headline;
  };

  return (
    <section className="hero-v2-section">
      <div className="hero-v2-container">
        <div className="hero-v2-grid">
          
          {/* Left Column: Master Shaded Workstation Frame */}
          <div className="hero-v2-showcase">
            {/* 1. Header Bar: SEBI Credentials & Demat Custody */}
            <div className="hero-v2-satellite-top">
              <div className="hero-v2-satellite-top-pill">
                <span className="hero-v2-satellite-pulse" />
                <ShieldCheck size={14} className="hero-v2-satellite-icon" />
                <span className="hero-v2-satellite-top-text">
                  SEBI RA INH000008093 • BSE 5422
                </span>
              </div>
              <span className="hero-v2-satellite-top-sub">
                100% Client Demat Custody
              </span>
            </div>

            {/* 2. Central Workstation Card: NIFTY 50 Quantitative Terminal */}
            <div className="hero-v2-terminal-card">
              {/* Terminal Title Bar */}
              <div className="hero-v2-terminal-header">
                <div className="hero-v2-terminal-dots">
                  <span className="hero-v2-dot hero-v2-dot-red" />
                  <span className="hero-v2-dot hero-v2-dot-amber" />
                  <span className="hero-v2-dot hero-v2-dot-emerald" />
                </div>
                <div className="hero-v2-terminal-title">
                  WEGRO RESEARCH TERMINAL • NSE / BSE
                </div>
                <div className="hero-v2-terminal-status">
                  <span className="hero-v2-live-dot" />
                  <span>ACTIVE</span>
                </div>
              </div>

              {/* Terminal Price & Strategy Overview */}
              <div className="hero-v2-terminal-body">
                <div className="hero-v2-terminal-row">
                  <div>
                    <div className="hero-v2-terminal-symbol">
                      <span className="hero-v2-badge-nse">NSE</span>
                      <strong>NIFTY 50</strong>
                      <span className="hero-v2-segment-tag">Cash & F&O</span>
                    </div>
                    <div className="hero-v2-terminal-strategy">
                      Quantitative Momentum Breakout Setup
                    </div>
                  </div>
                  <div className="hero-v2-terminal-quote">
                    <div className="hero-v2-quote-price">₹24,850.50</div>
                    <div className="hero-v2-quote-change">
                      <TrendingUp size={12} />
                      <span>+182.40 (+0.74%)</span>
                    </div>
                  </div>
                </div>

                {/* Vector SVG Corridor Chart (High-Fidelity 140px viewBox) */}
                <div className="hero-v2-chart-container">
                  <svg
                    viewBox="0 0 460 140"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="hero-v2-chart-svg"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient id="targetGlow" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10B981" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Chart Grid Lines */}
                    <line x1="10" y1="24" x2="450" y2="24" stroke="#1E2E28" strokeDasharray="3 3" />
                    <line x1="10" y1="54" x2="450" y2="54" stroke="#1E2E28" strokeDasharray="3 3" />
                    <line x1="10" y1="84" x2="450" y2="84" stroke="#1E2E28" strokeDasharray="3 3" />
                    <line x1="10" y1="114" x2="450" y2="114" stroke="#1E2E28" strokeDasharray="3 3" />

                    {/* Target 2 Line */}
                    <line x1="20" y1="24" x2="440" y2="24" stroke="#10B981" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.8" />
                    <text x="340" y="20" fill="#34D399" fontSize="9.5" fontWeight="700" fontFamily="monospace">
                      TARGET 2: 25,320
                    </text>

                    {/* Target 1 Line & Shaded Corridor */}
                    <rect x="235" y="24" width="195" height="30" fill="url(#targetGlow)" />
                    <line x1="20" y1="54" x2="440" y2="54" stroke="#10B981" strokeWidth="2" opacity="0.9" />
                    <text x="340" y="50" fill="#10B981" fontSize="9.5" fontWeight="700" fontFamily="monospace">
                      TARGET 1: 25,100
                    </text>

                    {/* Entry Range */}
                    <line x1="20" y1="84" x2="440" y2="84" stroke="#0EA5E9" strokeWidth="1.5" opacity="0.8" />
                    <text x="25" y="80" fill="#38BDF8" fontSize="9.5" fontWeight="600" fontFamily="monospace">
                      ENTRY ZONE: 24,780 – 24,820
                    </text>

                    {/* Stop Loss (Invalidation) */}
                    <line x1="20" y1="118" x2="440" y2="118" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.85" />
                    <text x="25" y="132" fill="#F87171" fontSize="9.5" fontWeight="700" fontFamily="monospace">
                      STRICT STOP-LOSS: 24,650 (-0.68%)
                    </text>

                    {/* Candlesticks */}
                    {/* Candle 1 */}
                    <line x1="60" y1="92" x2="60" y2="110" stroke="#EF4444" strokeWidth="1.5" />
                    <rect x="56" y="96" width="8" height="10" fill="#EF4444" rx="1" />

                    {/* Candle 2 */}
                    <line x1="95" y1="88" x2="95" y2="108" stroke="#10B981" strokeWidth="1.5" />
                    <rect x="91" y="92" width="8" height="9" fill="#10B981" rx="1" />

                    {/* Candle 3 */}
                    <line x1="130" y1="80" x2="130" y2="102" stroke="#10B981" strokeWidth="1.5" />
                    <rect x="126" y="85" width="8" height="11" fill="#10B981" rx="1" />

                    {/* Candle 4 (Consolidation) */}
                    <line x1="165" y1="78" x2="165" y2="96" stroke="#EF4444" strokeWidth="1.5" />
                    <rect x="161" y="82" width="8" height="7" fill="#EF4444" rx="1" />

                    {/* Candle 5 (Breakout trigger) */}
                    <line x1="200" y1="68" x2="200" y2="92" stroke="#10B981" strokeWidth="1.5" />
                    <rect x="196" y="73" width="8" height="14" fill="#10B981" rx="1" />

                    {/* Candle 6 (Expansion) */}
                    <line x1="235" y1="56" x2="235" y2="82" stroke="#10B981" strokeWidth="1.5" />
                    <rect x="231" y="61" width="8" height="15" fill="#10B981" rx="1" />

                    {/* Candle 7 (Current Bar) */}
                    <line x1="270" y1="46" x2="270" y2="72" stroke="#10B981" strokeWidth="1.5" />
                    <rect x="266" y="51" width="8" height="14" fill="#10B981" rx="1" />

                    {/* EMA 20 Trajectory Ribbon */}
                    <path
                      d="M 40 102 Q 110 98, 170 86 T 280 58 T 420 34"
                      stroke="#38BDF8"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      opacity="0.95"
                    />

                    {/* Risk-Reward Tag Pill */}
                    <g transform="translate(138, 5)">
                      <rect x="0" y="0" width="184" height="18" rx="9" fill="#1C3F35" stroke="#34D399" strokeWidth="1" />
                      <text x="92" y="13" fill="#FFFFFF" fontSize="9" fontWeight="700" textAnchor="middle" letterSpacing="0.04em">
                        RISK : REWARD = 1 : 2.45
                      </text>
                    </g>
                  </svg>
                </div>

                {/* 3 Telemetry Metrics */}
                <div className="hero-v2-terminal-footer">
                  <div className="hero-v2-telemetry-col">
                    <span className="hero-v2-telemetry-label">HORIZON</span>
                    <span className="hero-v2-telemetry-val">3–10 Days Swing</span>
                  </div>
                  <div className="hero-v2-telemetry-divider" />
                  <div className="hero-v2-telemetry-col">
                    <span className="hero-v2-telemetry-label">RISK PROTOCOL</span>
                    <span className="hero-v2-telemetry-val">Predefined Stop Loss</span>
                  </div>
                  <div className="hero-v2-telemetry-divider" />
                  <div className="hero-v2-telemetry-col">
                    <span className="hero-v2-telemetry-label">SEBI AUDIT</span>
                    <span className="hero-v2-telemetry-val" style={{ color: '#34D399' }}>100% Verified Log</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Bottom Glass Card: Transparent Payment Structure & Final Bills */}
            <div className="hero-v2-billing-card">
              <div className="hero-v2-billing-header">
                <div className="hero-v2-billing-icon-wrap">
                  <Receipt size={16} className="hero-v2-billing-icon" />
                </div>
                <div className="hero-v2-billing-titles">
                  <div className="hero-v2-billing-heading">
                    Transparent Fixed Advisory & Billing
                  </div>
                  <div className="hero-v2-billing-sub">
                    Direct Official Banking Gateway • Final GST Invoices
                  </div>
                </div>
                <span className="hero-v2-billing-badge">
                  SEBI Fee Mandate
                </span>
              </div>

              <div className="hero-v2-billing-pills">
                <div className="hero-v2-bill-pill">
                  <CheckCircle2 size={13} style={{ color: '#047857', flexShrink: 0 }} />
                  <span>Fixed Fee Only (Zero Profit Sharing)</span>
                </div>
                <div className="hero-v2-bill-pill">
                  <CheckCircle2 size={13} style={{ color: '#047857', flexShrink: 0 }} />
                  <span>100% Demat Control in Your Brokerage</span>
                </div>
                <div className="hero-v2-bill-pill">
                  <CheckCircle2 size={13} style={{ color: '#047857', flexShrink: 0 }} />
                  <span>Official GST Tax Invoice with Every Plan</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Master Typographic Hierarchy */}
          <div className="hero-v2-content">
            
            {/* 1. Eyebrow Badge */}
            {eyebrow && (
              <div className="hero-v2-eyebrow">
                <ShieldCheck size={14} style={{ color: '#1C3F35', flexShrink: 0 }} />
                <span>{eyebrow}</span>
              </div>
            )}

            {/* 2. Main Headline */}
            <h1 className="hero-v2-title">
              {renderHeadline()}
            </h1>

            {/* 3. Subheadline */}
            <p className="hero-v2-sub">
              {subheadline}
            </p>

            {/* 4. Social Proof & Trust Metrics */}
            <div className="hero-v2-trust-row">
              <div className="hero-v2-avatars">
                {avatars.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`Active Participant ${i + 1}`}
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      border: '2.5px solid #FFFFFF',
                      marginRight: -10,
                      boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
                      objectFit: 'cover'
                    }}
                  />
                ))}
              </div>

              <div style={{ width: 1, height: 36, background: '#E3E3DC' }} />

              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{metricNumber}</span>
                <span className="hero-v2-stat-label">{metricLabel}</span>
              </div>

              <div className="hero-v2-trust-badge">
                <CheckCircle2 size={13} style={{ color: '#047857' }} />
                <span>Strict 1:2+ Risk:Reward</span>
              </div>
            </div>

            {/* 5. CTAs */}
            <div className="hero-v2-actions">
              <button
                type="button"
                onClick={onCtaClick}
                className="hero-v2-btn-primary"
              >
                <span>{ctaText}</span>
                <ArrowUpRight size={18} />
              </button>

              {secondaryCtaText && (
                <button
                  type="button"
                  onClick={onSecondaryCtaClick}
                  className="hero-v2-btn-secondary"
                >
                  <span>{secondaryCtaText}</span>
                  <ArrowRight size={16} style={{ color: '#4B5563' }} />
                </button>
              )}
            </div>

            {/* 6. Partner Marquee */}
            <div className="hero-v2-marquee-wrap">
              <span className="hero-v2-marquee-label">
                Market Coverage & Institutional Compliance
              </span>

              <div style={{ position: 'relative', margin: '0 -8px', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 36, background: 'linear-gradient(to right, #FBFBFA, transparent)', zIndex: 10, pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 36, background: 'linear-gradient(to left, #FBFBFA, transparent)', zIndex: 10, pointerEvents: 'none' }} />

                <Marquee className="[--duration:28s]" pauseOnHover repeat={3}>
                  {partners.map((brand, index) => (
                    <div
                      key={`brand_${index}`}
                      style={{
                        margin: '0 10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '9px 20px',
                        borderRadius: 9999,
                        background: '#FFFFFF',
                        border: '1px solid #E3E3DC',
                        color: '#374151',
                        fontWeight: 700,
                        fontSize: '0.8125rem',
                        letterSpacing: '0.03em',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {brand}
                    </div>
                  ))}
                </Marquee>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
