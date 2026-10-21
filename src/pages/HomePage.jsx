import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Award,
  Users,
  Compass,
  CheckCircle2,
  AlertCircle,
  Clock,
  TrendingUp,
  Activity,
  HeartHandshake,
  BarChart3,
  BarChart2,
  Shield,
  FileCheck,
  Star,
  Lock,
  Layers,
  Sparkles,
  Zap,
  PhoneCall,
  Check,
  ShieldAlert,
  FileSpreadsheet,
  Target,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { companyConfig } from '../data/companyConfig';
import Hero from '../components/ui/demo';
import { openConsultationModal } from '../components/ConsultationLauncher';

export default function HomePage({ navigate }) {
  const [selectedVertical, setSelectedVertical] = useState('cash');

  const handleNav = (path) => {
    if (navigate) {
      navigate(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Cooldown check for consultation modal
  const checkCooldownActive = () => {
    if (typeof window === 'undefined') return true;
    try {
      const submittedAt = localStorage.getItem('wegro_lead_submitted_at');
      if (submittedAt) {
        const daysPassed = (Date.now() - parseInt(submittedAt, 10)) / (1000 * 60 * 60 * 24);
        if (daysPassed < 30) return true;
      }
      const dismissedAt = localStorage.getItem('wegro_lead_popup_dismissed_at');
      if (dismissedAt) {
        const hoursPassed = (Date.now() - parseInt(dismissedAt, 10)) / (1000 * 60 * 60);
        if (hoursPassed < 24) return true;
      }
    } catch (e) {}
    return false;
  };

  // Automated gentle modal trigger after active scroll
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (checkCooldownActive()) return;

    let hasScrolled = false;
    let scrollTimer = null;

    const onScroll = () => {
      if (window.scrollY > 80 && !hasScrolled) {
        hasScrolled = true;
        scrollTimer = setTimeout(() => {
          if (!checkCooldownActive()) {
            openConsultationModal();
          }
        }, 6000);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (scrollTimer) clearTimeout(scrollTimer);
    };
  }, []);

  // 4 Advisory Verticals data
  const advisoryVerticals = [
    {
      id: 'cash',
      tag: 'EQUITY CASH',
      title: 'Equity Cash & Intraday Growth',
      badge: 'High Conviction',
      description: 'Precision entry, stop-loss and dual target levels for high-momentum Indian equities, triggered by daily momentum and volume structure.',
      features: [
        '1-2 intraday cash calls daily',
        'Entry zone, stop-loss & dual targets',
        'Trailing alerts till final exit',
        'Weekly momentum watchlist'
      ],
      idealFor: 'Active intraday & swing traders with disciplined position sizing.',
      riskRatio: '1:2.35 Target R:R'
    },
    {
      id: 'fno',
      tag: 'DERIVATIVES (F&O)',
      title: 'F&O Derivatives Strategy',
      badge: 'Defined Risk',
      description: 'Hedging, option buying and option selling strategies engineered around Nifty & BankNifty weekly expiries and stock futures setups.',
      features: [
        'Index option trade ideas with Greeks rationale',
        'Stock futures momentum setups',
        'Expiry-day risk frameworks',
        'Hedge construction guidance'
      ],
      idealFor: 'Traders who understand derivatives risk, volatility decay & margin discipline.',
      riskRatio: '1:2.60 Target R:R'
    },
    {
      id: 'mcx',
      tag: 'COMMODITIES',
      title: 'Commodity Alpha & Macro Hedging',
      badge: 'Macro Driven',
      description: 'Bullion and energy momentum setups on MCX Gold, Silver, and Crude Oil triggered by global dollar indices and supply inventory dynamics.',
      features: [
        'High-conviction MCX bullion setups',
        'Macro yield & dollar correlation analysis',
        'Defined stop-loss volatility bands',
        'Inventory breakout alerts'
      ],
      idealFor: 'Commodity traders and portfolio hedgers seeking inflation-protected diversification.',
      riskRatio: '1:2.20 Target R:R'
    },
    {
      id: 'vip',
      tag: 'MULTI-SEGMENT',
      title: 'HNI Wealth & Swing VIP',
      badge: 'Institutional VIP',
      description: 'Comprehensive multi-segment research bench covering Cash, F&O, and MCX with dedicated telephonic analyst consultation.',
      features: [
        'Full multi-segment coverage (Equity + F&O + MCX)',
        'High-conviction swing trade ideas',
        'Quarterly deep-dive multibagger reports',
        'Priority telephonic analyst consultation'
      ],
      idealFor: 'HNIs and business leaders seeking multi-asset capital compounding with institutional scrutiny.',
      riskRatio: '1:2.80 Target R:R'
    }
  ];

  // 3 Official Pricing Packages
  const pricingPlans = [
    {
      id: 'starter',
      name: 'Starter Equity Cash',
      price: '₹4,999',
      period: '/ Month',
      badge: 'Equity Cash',
      popular: false,
      tagline: 'Precision momentum intraday cash recommendations for disciplined equity traders.',
      features: [
        '1-2 intraday cash calls daily',
        'Real-time WhatsApp & Telegram delivery',
        'Stop-loss & target trailing alerts',
        'Basic portfolio review',
        'Standard research desk support'
      ],
      idealFor: 'Active cash traders seeking disciplined position sizing without overnight leverage risk.'
    },
    {
      id: 'pro-fno',
      name: 'Pro F&O Derivatives',
      price: '₹9,999',
      period: '/ Month',
      badge: 'Most Popular',
      popular: true,
      tagline: 'Greeks-engineered option strategies and stock futures momentum setups for derivatives traders.',
      features: [
        'Nifty & BankNifty index options',
        'Stock futures & momentum trade ideas',
        'Option buying & selling strategies',
        '1-on-1 risk management guidance',
        'Dedicated relationship manager'
      ],
      idealFor: 'Traders who understand derivatives risk, option Greeks, and margin discipline.'
    },
    {
      id: 'hni-vip',
      name: 'HNI Wealth & Swing VIP',
      price: '₹24,999',
      period: '/ Quarter',
      badge: 'VIP Institutional',
      popular: false,
      tagline: 'Full multi-segment research desk covering Equity, Derivatives, and MCX Commodities.',
      features: [
        'Full multi-segment coverage (Equity + F&O + MCX)',
        'High-conviction swing trade ideas',
        'Quarterly multibagger research reports',
        'Priority telephonic analyst consultation',
        'SEBI-compliant investor protection'
      ],
      idealFor: 'HNIs and working professionals building medium-term compounding wealth across asset classes.'
    }
  ];

  return (
    <div className="home-page-root">

      {/* ═════════════════════════════════════════════════════════════════════
          SECTION 1: HERO SECTION (Concept A Institutional Desk + Live Ticker)
          ═════════════════════════════════════════════════════════════════════ */}
      <div id="hero-section">
        <Hero
          headline={companyConfig.heroHeadline}
          subheadline={companyConfig.heroSubheadline}
          eyebrow="SEBI Registered Research Analyst • INH000008093 • BSE Member: 5422"
          metricNumber="15,000+"
          metricLabel="Market Participants Guided"
          ctaText="Request Advisory Consultation"
          onCtaClick={() => openConsultationModal()}
          secondaryCtaText="Explore Advisory Services"
          onSecondaryCtaClick={() => handleNav('/services')}
        />
      </div>

      {/* ═════════════════════════════════════════════════════════════════════
          SECTION 2: CORE HIGHLIGHTS & AUTHORITY TRUST STRIP
          ═════════════════════════════════════════════════════════════════════ */}
      <section className="home-highlights-strip">
        <div className="container">
          <div className="home-highlights-grid">
            {/* Highlight 1 */}
            <div className="home-highlight-item">
              <div className="home-highlight-icon-box">
                <Award size={26} />
              </div>
              <div>
                <h4 className="home-highlight-title">Over 40 Years Combined Experience</h4>
                <p className="home-highlight-desc">Senior quantitative analysts with multi-cycle Indian market expertise.</p>
              </div>
            </div>

            {/* Highlight 2 */}
            <div className="home-highlight-item">
              <div className="home-highlight-icon-box home-highlight-icon-box--secondary">
                <HeartHandshake size={26} />
              </div>
              <div>
                <h4 className="home-highlight-title">Zero Conflict Fee-Only Model</h4>
                <p className="home-highlight-desc">100% demat control in your broker. We never handle client funds or profit share.</p>
              </div>
            </div>

            {/* Highlight 3 */}
            <div className="home-highlight-item">
              <div className="home-highlight-icon-box">
                <Clock size={26} />
              </div>
              <div>
                <h4 className="home-highlight-title">Predefined Stop-Loss Discipline</h4>
                <p className="home-highlight-desc">Every recommendation includes mathematical invalidation before transmission.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════════
          SECTION 3: ABOUT WEGRO (Corporate Background with Real Research Desk Image)
          ═════════════════════════════════════════════════════════════════════ */}
      <section className="section home-about-section">
        <div className="container">
          <div className="home-split-grid">
            {/* Left Column: Narrative */}
            <div className="home-about-content">
              <span className="section-eyebrow">
                Corporate Background · Mumbai Desk
              </span>
              <h2 className="section-title home-split-title">
                A research house built on one revenue stream: <em>being right, honestly.</em>
              </h2>
              <p className="home-about-p">
                WeGro Research Private Limited is a <strong>SEBI-registered Research Analyst firm (Registration No: INH000008093)</strong> and <strong>BSE Member (Membership No: 5422)</strong> based in Mumbai. Built on the foundational pillars of quantitative analytical depth, institutional-grade data scrutiny, and uncompromising risk management, WeGro delivers structured, objective, and timely market intelligence across Indian Equities, Derivatives (F&O), and Commodities.
              </p>

              <div className="home-about-points">
                <div className="home-about-point">
                  <CheckCircle2 size={18} className="home-about-check" />
                  <span><strong>Proprietary Momentum Models:</strong> Multi-timeframe volume expansion &amp; structural price action screening.</span>
                </div>
                <div className="home-about-point">
                  <CheckCircle2 size={18} className="home-about-check" />
                  <span><strong>Strict Capital Preservation:</strong> Predefined 1:2+ risk-to-reward frameworks with zero tolerance for averaging down.</span>
                </div>
                <div className="home-about-point">
                  <CheckCircle2 size={18} className="home-about-check" />
                  <span><strong>Direct Bank Settlement:</strong> Official banking gateway settlements with 18% GST tax invoices for every subscription.</span>
                </div>
              </div>

              <div className="home-about-actions">
                <button
                  type="button"
                  onClick={() => handleNav('/about')}
                  className="btn btn-primary btn-lg"
                >
                  <span>Read Full Corporate Profile</span>
                  <ArrowRight size={17} />
                </button>
                <button
                  type="button"
                  onClick={() => openConsultationModal()}
                  className="btn btn-secondary btn-lg"
                >
                  <span>Speak with an Analyst</span>
                  <PhoneCall size={16} />
                </button>
              </div>
            </div>

            {/* Right Column: Editorial Photograph Frame */}
            <div className="home-about-media-col">
              <div className="home-media-card">
                <img
                  src="/analyst_research_desk.jpg"
                  alt="WeGro Institutional Research Desk Mumbai"
                  className="home-media-img"
                  loading="lazy"
                />
                <div className="home-media-glass-overlay">
                  <div className="home-media-badge">
                    <span className="home-media-pulse-dot" />
                    <span>MUMBAI DESK · ACTIVE MARKET HOURS</span>
                  </div>
                  <div className="home-media-caption">
                    <strong>Institutional Candlestick &amp; Volume Telemetry</strong>
                    <span>Live multi-monitor screening of NSE NIFTY 50 and BSE Sensex</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════════
          SECTION 4: FOUR ADVISORY VERTICALS (With Market Analytics Visual)
          ═════════════════════════════════════════════════════════════════════ */}
      <section className="section home-services-section">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">
              Four Core Advisory Verticals
            </span>
            <h2 className="section-title">
              Structured Research Engineered for Market Participants
            </h2>
            <p className="section-description">
              Whether you trade high-momentum cash equities, hedge weekly index options, or position for commodity swings, our research desks deliver defined-risk market intelligence.
            </p>
          </div>

          {/* Interactive Verticals Layout */}
          <div className="home-services-layout">
            {/* Visual Analytics Showcase Banner */}
            <div className="home-services-hero-banner">
              <div className="home-services-banner-img-wrap">
                <img
                  src="/market_advisory_analytics.jpg"
                  alt="Multi-Asset Indian Market Analytics"
                  className="home-services-banner-img"
                  loading="lazy"
                />
                <div className="home-services-banner-overlay">
                  <div className="home-services-banner-badge">
                    <Layers size={14} />
                    <span>SEBI COMPLIANT · MULTI-ASSET COVERAGE</span>
                  </div>
                  <h3 className="home-services-banner-headline">
                    Quantitative Momentum &amp; Greeks Analytics Lab
                  </h3>
                  <p className="home-services-banner-sub">
                    Real-time option surfaces, volatility delta, and multi-timeframe volume profiling across Indian capital markets.
                  </p>
                </div>
              </div>
            </div>

            {/* 4 Cards Grid */}
            <div className="home-verticals-grid">
              {advisoryVerticals.map((vert) => (
                <div key={vert.id} className="home-vertical-card">
                  <div className="home-vertical-top">
                    <span className="home-vertical-tag">{vert.tag}</span>
                    <span className="home-vertical-badge">{vert.badge}</span>
                  </div>

                  <h3 className="home-vertical-title">{vert.title}</h3>
                  <p className="home-vertical-desc">{vert.description}</p>

                  <div className="home-vertical-features">
                    {vert.features.map((feat, idx) => (
                      <div key={idx} className="home-vertical-feature-row">
                        <Check size={14} className="home-vertical-feature-check" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  <div className="home-vertical-footer">
                    <div className="home-vertical-meta">
                      <span className="home-vertical-meta-label">Target Metric</span>
                      <span className="home-vertical-meta-val">{vert.riskRatio}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => openConsultationModal()}
                      className="home-vertical-btn"
                    >
                      <span>Consult Desk</span>
                      <ArrowUpRight size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════════
          SECTION 5: KEY VALUE PILLARS (4 Architectural Cards)
          ═════════════════════════════════════════════════════════════════════ */}
      <section className="section home-pillars-section">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">
              Core Strengths
            </span>
            <h2 className="section-title">Key Value Pillars</h2>
            <p className="section-description">
              Our operations and research philosophy are anchored upon four foundational principles that guide every market recommendation.
            </p>
          </div>

          <div className="home-pillars-grid">
            {/* Pillar 1: Research */}
            <div className="home-pillar-card">
              <div className="home-pillar-icon-wrap">
                <TrendingUp size={28} />
              </div>
              <h3 className="home-pillar-title">Research</h3>
              <p className="home-pillar-desc">
                Backed by analysis and data. Every recommendation undergoes rigorous fundamental and technical evaluation before transmission.
              </p>
            </div>

            {/* Pillar 2: Customer Focus */}
            <div className="home-pillar-card">
              <div className="home-pillar-icon-wrap home-pillar-icon-wrap--secondary">
                <Users size={28} />
              </div>
              <h3 className="home-pillar-title">Customer Focus</h3>
              <p className="home-pillar-desc">
                Meeting financial objectives. We orient our communication, support, and syllabus toward the distinct goals and risk profiles of our clients.
              </p>
            </div>

            {/* Pillar 3: Risk Management */}
            <div className="home-pillar-card">
              <div className="home-pillar-icon-wrap">
                <ShieldCheck size={28} />
              </div>
              <h3 className="home-pillar-title">Risk Management</h3>
              <p className="home-pillar-desc">
                Robust risk management plan. Non-negotiable stop-loss discipline and structured risk:reward ratios to prioritize capital preservation.
              </p>
            </div>

            {/* Pillar 4: Vibrancy */}
            <div className="home-pillar-card">
              <div className="home-pillar-icon-wrap home-pillar-icon-wrap--secondary">
                <Compass size={28} />
              </div>
              <h3 className="home-pillar-title">Vibrancy</h3>
              <p className="home-pillar-desc">
                Young and energetic employee base. An agile, tech-driven research bench constantly monitoring live market dynamics and regulatory standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════════
          SECTION 6: OFFICIAL PRICING PACKAGES & REGULATORY FEE PRINCIPLES
          ═════════════════════════════════════════════════════════════════════ */}
      <section className="section home-pricing-section">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">
              Transparent Advisory Plans
            </span>
            <h2 className="section-title">
              Clear, Fixed Research Pricing
            </h2>
            <p className="section-description">
              No hidden commissions. No profit sharing. Transparent advisory fees with official GST tax invoices on every subscription.
            </p>
          </div>

          {/* Pricing Cards Grid */}
          <div className="home-pricing-grid">
            {pricingPlans.map((plan) => (
              <div
                key={plan.id}
                className={`home-pricing-card ${plan.popular ? 'home-pricing-card--popular' : ''}`}
              >
                {plan.popular && (
                  <div className="home-pricing-popular-badge">
                    <Star size={11} fill="#FFFFFF" />
                    <span>MOST POPULAR CHOICE</span>
                  </div>
                )}

                <div className="home-pricing-header">
                  <span className="home-pricing-tag">{plan.badge}</span>
                  <h3 className="home-pricing-name">{plan.name}</h3>
                  <p className="home-pricing-tagline">{plan.tagline}</p>
                </div>

                <div className="home-pricing-price-wrap">
                  <span className="home-pricing-amount">{plan.price}</span>
                  <span className="home-pricing-period">{plan.period}</span>
                </div>

                <div className="home-pricing-features">
                  {plan.features.map((feat, idx) => (
                    <div key={idx} className="home-pricing-feat-row">
                      <CheckCircle2 size={15} className="home-pricing-feat-check" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="home-pricing-ideal">
                  <strong>Ideal for:</strong> {plan.idealFor}
                </div>

                <button
                  type="button"
                  onClick={() => openConsultationModal()}
                  className={`home-pricing-btn ${plan.popular ? 'home-pricing-btn--primary' : 'home-pricing-btn--secondary'}`}
                >
                  <span>Choose {plan.name}</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            ))}
          </div>

          {/* Statutory Fee & Refund Principles Banner */}
          <div className="home-fee-principles-box">
            <div className="home-fee-principles-grid">
              <div className="home-fee-item">
                <ShieldAlert size={20} className="home-fee-icon" />
                <div>
                  <strong>Research-Only Advisory:</strong> Fees are charged exclusively for research, never against promised returns.
                </div>
              </div>
              <div className="home-fee-item">
                <FileSpreadsheet size={20} className="home-fee-icon" />
                <div>
                  <strong>Statutory GST Invoicing:</strong> Official GST invoice issued for every payment to our corporate account.
                </div>
              </div>
              <div className="home-fee-item">
                <Lock size={20} className="home-fee-icon" />
                <div>
                  <strong>Direct Bank Settlement:</strong> Official NEFT/RTGS/UPI gateway only. No individual personal accounts.
                </div>
              </div>
              <div className="home-fee-item">
                <ShieldCheck size={20} className="home-fee-icon" />
                <div>
                  <strong>100% Demat Control:</strong> We never take custody of trading capital or ask for broker passwords.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════════
          SECTION 7: INSTITUTIONAL GOVERNANCE & COMPLIANCE (With BKC Boardroom Image)
          ═════════════════════════════════════════════════════════════════════ */}
      <section className="section home-governance-section">
        <div className="container">
          <div className="home-split-grid home-split-grid--reverse">
            {/* Left Column: Visual */}
            <div className="home-about-media-col">
              <div className="home-media-card">
                <img
                  src="/institutional_governance.jpg"
                  alt="WeGro Institutional Governance Boardroom Mumbai BKC"
                  className="home-media-img"
                  loading="lazy"
                />
                <div className="home-media-glass-overlay">
                  <div className="home-media-badge home-media-badge--green">
                    <ShieldCheck size={13} />
                    <span>SEBI REGULATED · SCORES &amp; SMART ODR</span>
                  </div>
                  <div className="home-media-caption">
                    <strong>Bandra Kurla Complex (BKC) Advisory Standards</strong>
                    <span>Statutory audit trails, investor protection &amp; formal risk disclosures</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Text */}
            <div className="home-about-content">
              <span className="section-eyebrow">
                Institutional Governance &amp; Ethics
              </span>
              <h2 className="section-title home-split-title">
                Regulated by SEBI. Governed by <em>Absolute Integrity.</em>
              </h2>
              <p className="home-about-p">
                In an industry clouded by unregulated social media tips and false promises, WeGro operates under the strict oversight of the <strong>Securities and Exchange Board of India (Research Analysts) Regulations, 2014</strong>. Every trade recommendation is documented with multi-timeframe risk rationale and archived in compliance with regulatory audit standards.
              </p>

              <div className="home-gov-cards">
                <div className="home-gov-card">
                  <div className="home-gov-card-num">01</div>
                  <div>
                    <h4 className="home-gov-card-title">SEBI SCORES &amp; Smart ODR</h4>
                    <p className="home-gov-card-desc">Direct investor grievance portal integration ensuring full legal recourse and speedy dispute resolution.</p>
                  </div>
                </div>

                <div className="home-gov-card">
                  <div className="home-gov-card-num">02</div>
                  <div>
                    <h4 className="home-gov-card-title">Non-Discretionary Advisory</h4>
                    <p className="home-gov-card-desc">Clients execute trades independently on their preferred brokerage. We never touch trading capital.</p>
                  </div>
                </div>

                <div className="home-gov-card">
                  <div className="home-gov-card-num">03</div>
                  <div>
                    <h4 className="home-gov-card-title">Transparent Performance Audit</h4>
                    <p className="home-gov-card-desc">Every recommendation, win or loss, is logged with exact timestamps, entry, exit, and stop-loss levels.</p>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 32 }}>
                <button
                  type="button"
                  onClick={() => handleNav('/disclosures')}
                  className="btn btn-secondary btn-lg"
                >
                  <span>Review Regulatory Disclosures</span>
                  <ExternalLink size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════════
          SECTION 8: FINAL HIGH-CONVERSION CONSULTATION CTA BANNER
          ═════════════════════════════════════════════════════════════════════ */}
      <section className="home-cta-banner-section">
        <div className="container">
          <div className="home-cta-banner-box">
            <div className="home-cta-banner-content">
              <div className="home-cta-badge">
                <Sparkles size={14} />
                <span>SPEAK DIRECTLY WITH OUR MUMBAI RESEARCH DESK</span>
              </div>
              <h2 className="home-cta-title">
                Your search ends with our research. Upgrade your market edge today.
              </h2>
              <p className="home-cta-sub">
                Schedule a confidential 1-on-1 advisory orientation with our senior research team. Review our methodologies, risk governance, and tailored subscription verticals.
              </p>

              <div className="home-cta-btn-row">
                <button
                  type="button"
                  onClick={() => openConsultationModal()}
                  className="btn btn-primary btn-xl home-cta-main-btn"
                >
                  <span>Request Advisory Consultation</span>
                  <ArrowUpRight size={19} />
                </button>
                <button
                  type="button"
                  onClick={() => handleNav('/pricing')}
                  className="btn btn-secondary btn-xl home-cta-secondary-btn"
                >
                  <span>Compare All Plans</span>
                  <ArrowRight size={17} />
                </button>
              </div>

              <div className="home-cta-trust-strip">
                <span className="home-cta-trust-item">
                  <CheckCircle2 size={13} />
                  <span>SEBI RA: INH000008093</span>
                </span>
                <span className="home-cta-trust-item">
                  <CheckCircle2 size={13} />
                  <span>BSE Member: 5422</span>
                </span>
                <span className="home-cta-trust-item">
                  <CheckCircle2 size={13} />
                  <span>Zero Profit Sharing</span>
                </span>
                <span className="home-cta-trust-item">
                  <CheckCircle2 size={13} />
                  <span>100% Demat Control</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
