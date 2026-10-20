import React from "react";
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
  IndianRupee
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
  const renderHeadline = () => {
    if (headline.toLowerCase().includes("our research")) {
      const parts = headline.split(/our research/i);
      return (
        <>
          {parts[0]}
          <span className="hero-v2-title-highlight">
            our research
            <svg
              className="hero-v2-hand-drawn-underline"
              viewBox="0 0 280 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M 4 14 C 42 10, 95 15, 150 12 C 195 9, 238 13, 276 7"
                stroke="#DC2626"
                strokeWidth="3.6"
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
    <section className="hero-v2-section">
      <div className="hero-v2-container">
        <div className="hero-v2-grid">

          {/* ── LEFT COLUMN: Institutional Credential Showcase ── */}
          <div className="hero-v2-showcase">

            {/* ── Registration Badge Strip ── */}
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

            {/* ── Research Brief Card (Main Visual) ── */}
            <div className="hero-v2-brief-card">
              {/* Card Header */}
              <div className="hero-v2-brief-header">
                <div className="hero-v2-brief-header-left">
                  <div className="hero-v2-brief-icon-wrap">
                    <FileText size={16} style={{ color: '#1C3F35' }} />
                  </div>
                  <div>
                    <div className="hero-v2-brief-title">Research Advisory Note</div>
                    <div className="hero-v2-brief-meta">WeGro Research Desk • Oct 2026</div>
                  </div>
                </div>
                <span className="hero-v2-brief-status-badge">Published</span>
              </div>

              {/* Divider */}
              <div className="hero-v2-brief-divider" />

              {/* Research Detail Rows */}
              <div className="hero-v2-brief-rows">
                <div className="hero-v2-brief-row">
                  <span className="hero-v2-brief-row-label">Instrument</span>
                  <span className="hero-v2-brief-row-val">NSE: NIFTY 50 (Cash &amp; F&amp;O)</span>
                </div>
                <div className="hero-v2-brief-row">
                  <span className="hero-v2-brief-row-label">Segment</span>
                  <span className="hero-v2-brief-row-val">Equity Derivatives</span>
                </div>
                <div className="hero-v2-brief-row">
                  <span className="hero-v2-brief-row-label">Horizon</span>
                  <span className="hero-v2-brief-row-val">3 to 10 Trading Days</span>
                </div>
                <div className="hero-v2-brief-row">
                  <span className="hero-v2-brief-row-label">Risk Protocol</span>
                  <span className="hero-v2-brief-row-val hero-v2-brief-row-val--highlight">Predefined Stop Loss</span>
                </div>
                <div className="hero-v2-brief-row">
                  <span className="hero-v2-brief-row-label">Risk:Reward</span>
                  <span className="hero-v2-brief-row-val hero-v2-brief-row-val--green">
                    <Star size={11} style={{ display: 'inline', marginRight: 4 }} />
                    Minimum 1:2 Ratio
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div className="hero-v2-brief-divider" />

              {/* Metric Chips */}
              <div className="hero-v2-brief-chips">
                <div className="hero-v2-chip">
                  <BarChart2 size={13} />
                  <span>Quantitative Analysis</span>
                </div>
                <div className="hero-v2-chip">
                  <TrendingUp size={13} />
                  <span>Momentum Breakout</span>
                </div>
                <div className="hero-v2-chip hero-v2-chip--green">
                  <Lock size={12} />
                  <span>SEBI Verified Log</span>
                </div>
              </div>

              {/* Analyst Certification Footer */}
              <div className="hero-v2-brief-footer">
                <div className="hero-v2-brief-footer-row">
                  <ShieldCheck size={13} style={{ color: '#059669', flexShrink: 0 }} />
                  <span>Reviewed &amp; approved under SEBI Research Analyst Regulations, 2014</span>
                </div>
              </div>
            </div>

            {/* ── Transparent Billing Card ── */}
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

          {/* ── RIGHT COLUMN: Typographic Hierarchy + CTAs ── */}
          <div className="hero-v2-content">

            {/* Eyebrow Badge */}
            {eyebrow && (
              <div className="hero-v2-eyebrow">
                <ShieldCheck size={14} style={{ color: '#1C3F35', flexShrink: 0 }} />
                <span>{eyebrow}</span>
              </div>
            )}

            {/* Main Headline */}
            <h1 className="hero-v2-title">
              {renderHeadline()}
            </h1>

            {/* Subheadline */}
            <p className="hero-v2-sub">
              {subheadline}
            </p>

            {/* Social Proof + Trust Metrics */}
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

            {/* Partner Marquee */}
            <div className="hero-v2-marquee-wrap">
              <span className="hero-v2-marquee-label">
                Market Coverage &amp; Institutional Compliance
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
