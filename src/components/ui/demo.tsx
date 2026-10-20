import React from "react";
import { ArrowUpRight, ArrowRight, ShieldCheck, CheckCircle2, TrendingUp } from "lucide-react";
import Image from "next/image";
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
  eyebrow = "SEBI Registered Research Analyst • INH000008093 • BSE Member: 6997",
  metricNumber = "15,000+",
  metricLabel = "Market Participants Guided",
  ctaText = "Request Advisory Consultation",
  onCtaClick,
  secondaryCtaText = "Explore Advisory Services",
  onSecondaryCtaClick,
  imageSrc = "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=1600&auto=format&fit=crop",
  imageAlt = "WeGro Institutional Market Research Terminal",
  partners = [
    "NSE NIFTY 50",
    "BSE SENSEX",
    "SEBI SCORES",
    "SMART ODR",
    "MCX COMMODITIES",
    "QUANTITATIVE RESEARCH",
    "STRICT 1:2+ RISK-REWARD",
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
          
          {/* Left Column: Framed Editorial Showcase */}
          <div className="hero-v2-showcase">
            <div className="hero-v2-card">
              <Image
                alt={imageAlt}
                height={1080}
                src={imageSrc}
                width={1600}
                priority
              />
              
              {/* Contrast Vignette Overlay */}
              <div className="hero-v2-card-vignette" />

              {/* Top Badge: Live Coverage */}
              <div className="hero-v2-live-tag">
                <span className="hero-v2-live-dot" />
                <span>Live Coverage Active • NSE / BSE</span>
              </div>

              {/* Bottom Overlay Card: Quantitative Research Metric */}
              <div className="hero-v2-card-overlay">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', fontWeight: 700, color: '#1C3F35', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    <TrendingUp size={14} style={{ color: '#1C3F35' }} />
                    <span>Quantitative Screening</span>
                  </div>
                  <span style={{ borderRadius: 9999, background: '#ECFDF5', color: '#047857', border: '1px solid #A7F3D0', padding: '2px 8px', fontSize: '0.6875rem', fontWeight: 700 }}>
                    100% Audited
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: '0.8125rem', color: '#374151', fontWeight: 500, lineHeight: 1.5 }}>
                  Mathematical risk-to-reward parameters, defined stop-loss protocols, and audited SEBI transparency.
                </p>
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
          </div>

        </div>

        {/* 6. Partner Marquee — Full Width Section Across Both Columns */}
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
    </section>
  );
}
