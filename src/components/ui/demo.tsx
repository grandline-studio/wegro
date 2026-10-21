import React, { useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  FileText,
  BarChart2,
  TrendingUp,
  Receipt,
  Star,
  Lock,
  Layers,
  Sparkles,
  Zap
} from "lucide-react";
import LiveMarketTicker from "@/components/LiveMarketTicker";

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

// ── Authentic Institutional Research Setups (Zero AI Slop) ──
const RESEARCH_SEGMENTS = {
  cash: {
    id: "cash",
    label: "Equity Cash",
    badge: "MOMENTUM BREAKOUT",
    instrument: "NSE: LARSEN & TOUBRO (LT)",
    strategy: "Daily Volume & Structure Breakout",
    horizon: "3 to 7 Trading Days",
    entryZone: "₹3,620.00 – ₹3,635.00",
    stopLoss: "₹3,560.00 (Strict 1.6%)",
    targets: "T1: ₹3,750 | T2: ₹3,840",
    riskReward: "1:2.35 Target Ratio",
    chips: ["Volume Expansion", "Dual Targets", "Predefined Stop Loss"],
    memoNote: "Order Protocol: Predefined SL logged before market open. Never average a losing trade.",
    refNumber: "WEGRO-EQ-2026-881"
  },
  fno: {
    id: "fno",
    label: "Index F&O",
    badge: "HEDGED SPREAD",
    instrument: "NSE: NIFTY 50 (Weekly Expiry)",
    strategy: "Bull Call Spread (Defined Risk)",
    horizon: "Weekly Expiry (3 Days)",
    entryZone: "22,700 CE Buy / 22,950 CE Sell",
    stopLoss: "Max Risk Capped to ₹48.00 Net Debit",
    targets: "Max Payout: ₹125.00 (Net ₹77.00)",
    riskReward: "1:2.60 Risk-Reward",
    chips: ["Delta 0.54 Greeks Hedged", "Defined Risk Cap", "Zero Naked Exposure"],
    memoNote: "Derivatives Mandate: Strictly zero unhedged naked options. Greeks balanced against theta decay.",
    refNumber: "WEGRO-FNO-2026-419"
  },
  mcx: {
    id: "mcx",
    label: "Commodities MCX",
    badge: "MACRO TREND",
    instrument: "MCX: GOLD MINI (100g)",
    strategy: "Macro Trend Accumulation on Dip",
    horizon: "5 to 12 Trading Days",
    entryZone: "₹78,150 – ₹78,240 / 10g",
    stopLoss: "₹77,580 (Defined Volatility Band)",
    targets: "T1: ₹79,200 | T2: ₹79,850",
    riskReward: "1:2.18 Target Ratio",
    chips: ["Macro Dollar Correlation", "Trailing Exit Matrix", "Physical Demand Spec"],
    memoNote: "Bullion Rule: Position sizing strictly locked against portfolio margin reserves.",
    refNumber: "WEGRO-MCX-2026-104"
  }
};

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
  avatars = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80",
    "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=120&h=120&q=80"
  ]
}: HeroProps) {
  const [activeSegment, setActiveSegment] = useState<"cash" | "fno" | "mcx">("cash");
  const currentSetup = RESEARCH_SEGMENTS[activeSegment];

  // Render authentic hand-drawn red accent underline
  const renderHeadline = () => {
    if (headline.includes("our research")) {
      const parts = headline.split("our research");
      return (
        <>
          {parts[0]}
          <span className="hero-v2-title-highlight">
            our research
            <svg
              className="hero-v2-hand-drawn-underline"
              viewBox="0 0 285 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M 4 14 C 42 18, 98 12, 148 15 C 196 17, 242 13, 281 18"
                stroke="#DC2626"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
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
    <section className="hero-v2-section" aria-label="Hero Introduction">
      <div className="hero-v2-container">
        <div className="hero-v2-grid">

          {/* ═════════════════════════════════════════════════════════════════
              LEFT COLUMN: Institutional Research Desk (Concept A)
              ═════════════════════════════════════════════════════════════════ */}
          <div className="hero-v2-showcase">

            {/* ── Top Official Registration Badges ── */}
            <div className="hero-v2-reg-strip">
              <div className="hero-v2-reg-badge">
                <span className="hero-v2-satellite-pulse" />
                <ShieldCheck size={13} className="hero-v2-satellite-icon" />
                <span>SEBI RA: INH000008093</span>
              </div>
              <div className="hero-v2-reg-badge">
                <span>BSE Member: 5422</span>
              </div>
              <div className="hero-v2-reg-badge hero-v2-reg-badge--green">
                <CheckCircle2 size={12} style={{ color: '#047857' }} />
                <span>100% Demat Custody</span>
              </div>
            </div>

            {/* ── Main Research Advisory Note Card ── */}
            <div className="hero-v2-brief-card">

              {/* Card Header with Physical Ink Stamp */}
              <div className="hero-v2-brief-header">
                <div className="hero-v2-brief-header-left">
                  <div className="hero-v2-brief-icon-wrap">
                    <FileText size={17} style={{ color: '#1C3F35' }} />
                  </div>
                  <div>
                    <div className="hero-v2-brief-title">
                      Research Advisory Note
                    </div>
                    <div className="hero-v2-brief-meta">
                      WeGro Desk · Mumbai IST · Ref #{currentSetup.refNumber}
                    </div>
                  </div>
                </div>

                {/* Handcrafted Analyst Desk Ink Stamp */}
                <div className="hero-v2-analyst-stamp" title="SEBI Registered Quantitative Research Desk">
                  <div className="hero-v2-stamp-inner">
                    <span className="hero-v2-stamp-top">WEGRO DESK</span>
                    <span className="hero-v2-stamp-center">AUTHENTICATED</span>
                    <span className="hero-v2-stamp-bottom">MUMBAI · SEBI RA</span>
                  </div>
                </div>
              </div>

              {/* ── Interactive Segment Switcher ── */}
              <div className="hero-v2-segment-tabs" role="tablist" aria-label="Advisory Verticals">
                {(Object.keys(RESEARCH_SEGMENTS) as Array<keyof typeof RESEARCH_SEGMENTS>).map((key) => {
                  const seg = RESEARCH_SEGMENTS[key];
                  const isActive = activeSegment === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveSegment(key)}
                      className={`hero-v2-segment-tab ${isActive ? 'active' : ''}`}
                    >
                      <span className="hero-v2-segment-tab-dot" />
                      <span>{seg.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Divider */}
              <div className="hero-v2-brief-divider" />

              {/* ── Research Detail Rows (Tabular Precision) ── */}
              <div className="hero-v2-brief-rows">
                <div className="hero-v2-brief-row">
                  <span className="hero-v2-brief-row-label">Instrument</span>
                  <span className="hero-v2-brief-row-val hero-v2-brief-row-val--mono">
                    {currentSetup.instrument}
                  </span>
                </div>

                <div className="hero-v2-brief-row">
                  <span className="hero-v2-brief-row-label">Strategy Setup</span>
                  <span className="hero-v2-brief-row-val">
                    {currentSetup.strategy}
                  </span>
                </div>

                <div className="hero-v2-brief-row">
                  <span className="hero-v2-brief-row-label">Entry Zone</span>
                  <span className="hero-v2-brief-row-val hero-v2-brief-row-val--mono">
                    {currentSetup.entryZone}
                  </span>
                </div>

                <div className="hero-v2-brief-row">
                  <span className="hero-v2-brief-row-label">Predefined Stop Loss</span>
                  <span className="hero-v2-brief-row-val hero-v2-brief-row-val--mono hero-v2-brief-row-val--sl">
                    {currentSetup.stopLoss}
                  </span>
                </div>

                <div className="hero-v2-brief-row">
                  <span className="hero-v2-brief-row-label">Dual Target Levels</span>
                  <span className="hero-v2-brief-row-val hero-v2-brief-row-val--mono hero-v2-brief-row-val--target">
                    {currentSetup.targets}
                  </span>
                </div>

                <div className="hero-v2-brief-row">
                  <span className="hero-v2-brief-row-label">Risk : Reward Ratio</span>
                  <span className="hero-v2-brief-row-val hero-v2-brief-row-val--green">
                    <Star size={11} style={{ display: 'inline', marginRight: 4 }} />
                    {currentSetup.riskReward}
                  </span>
                </div>

                <div className="hero-v2-brief-row">
                  <span className="hero-v2-brief-row-label">Execution Horizon</span>
                  <span className="hero-v2-brief-row-val">
                    {currentSetup.horizon}
                  </span>
                </div>
              </div>

              {/* ── Handcrafted Analyst Desk Memo ── */}
              <div className="hero-v2-desk-memo">
                <div className="hero-v2-desk-memo-header">
                  <span className="hero-v2-desk-memo-pin">📌</span>
                  <span className="hero-v2-desk-memo-tag">ANALYST RISK DIRECTIVE</span>
                </div>
                <p className="hero-v2-desk-memo-text">
                  "{currentSetup.memoNote}"
                </p>
              </div>

              {/* Metric Chips */}
              <div className="hero-v2-brief-chips">
                {currentSetup.chips.map((chip, idx) => (
                  <div key={idx} className={`hero-v2-chip ${idx === 2 ? 'hero-v2-chip--green' : ''}`}>
                    {idx === 0 && <BarChart2 size={12} />}
                    {idx === 1 && <TrendingUp size={12} />}
                    {idx === 2 && <Lock size={11} />}
                    <span>{chip}</span>
                  </div>
                ))}
              </div>

              {/* Analyst Certification Footer */}
              <div className="hero-v2-brief-footer">
                <div className="hero-v2-brief-footer-row">
                  <ShieldCheck size={14} style={{ color: '#047857', flexShrink: 0 }} />
                  <span>Reviewed &amp; approved under SEBI (Research Analysts) Regulations, 2014</span>
                </div>
              </div>
            </div>

            {/* ── Transparent Fixed Advisory & Billing Card ── */}
            <div className="hero-v2-billing-card">
              <div className="hero-v2-billing-header">
                <div className="hero-v2-billing-icon-wrap">
                  <Receipt size={16} className="hero-v2-billing-icon" />
                </div>
                <div className="hero-v2-billing-titles">
                  <div className="hero-v2-billing-heading">
                    Transparent Fixed Advisory &amp; Billing
                  </div>
                  <div className="hero-v2-billing-sub">
                    Direct Official Banking Gateway · Final GST Invoices
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

          {/* ═════════════════════════════════════════════════════════════════
              RIGHT COLUMN: Typographic Hierarchy + CTAs + Live Ticker
              ═════════════════════════════════════════════════════════════════ */}
          <div className="hero-v2-content">

            {/* Eyebrow Badge */}
            {eyebrow && (
              <div className="hero-v2-eyebrow">
                <ShieldCheck size={14} style={{ color: '#1C3F35', flexShrink: 0 }} />
                <span>{eyebrow}</span>
              </div>
            )}

            {/* Main Headline with Hand-Drawn Underline */}
            <h1 className="hero-v2-title">
              {renderHeadline()}
            </h1>

            {/* Subheadline */}
            <p className="hero-v2-sub">
              {subheadline}
            </p>

            {/* Trust Metrics & Social Proof */}
            <div className="hero-v2-trust-row">
              <div className="hero-v2-avatars">
                {avatars.slice(0, 4).map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`Investor ${i + 1}`}
                    loading="lazy"
                  />
                ))}
              </div>

              <div className="hero-v2-stat">
                <div className="hero-v2-stat-num">{metricNumber}</div>
                <div className="hero-v2-stat-label">{metricLabel}</div>
              </div>

              <div className="hero-v2-trust-badge">
                <Star size={13} fill="#047857" style={{ color: '#047857' }} />
                <span>Disciplined 1:2+ R:R</span>
              </div>
            </div>

            {/* CTAs */}
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

            {/* Live Market Coverage Marquee Ticker */}
            <div className="hero-v2-marquee-wrap">
              <span className="hero-v2-marquee-label">
                Market Coverage &amp; Institutional Compliance
              </span>

              <LiveMarketTicker />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
