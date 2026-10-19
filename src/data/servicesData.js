export const servicesData = [
  {
    id: "stock-cash",
    category: "Equity Cash",
    name: "Stock Cash",
    badge: "Core Equity",
    headline: "Delivery & Positional Cash Market Research",
    shortDesc: "High-conviction equity research ideas in liquid large and mid-cap stocks based on fundamental valuation filters and price action triggers.",
    segment: "NSE / BSE Cash Market",
    holdingPeriod: "3 Days to 4 Weeks (Positional)",
    suitability: "Suitable for conservative to moderate equity investors seeking clear entry, target, and trailing stop-loss guidelines without leverage risk.",
    keyDeliverables: [
      "2-4 structured research reports per week with technical & fundamental thesis",
      "Exact entry range, dual profit targets, and non-negotiable stop-loss",
      "Regular trailing stop-loss adjustments and quarterly earnings reviews",
      "Real-time SMS / Telegram research alerts during active market hours"
    ],
    riskLevel: "Moderate",
    riskNote: "Subject to equity market volatility and company-specific fundamental news. Capital is exposed to broad market drawdowns.",
    pricingNote: "[Official subscription tiers will be announced upon SEBI registration. No profit-sharing models.]"
  },
  {
    id: "basic-fo",
    category: "Derivatives (F&O)",
    name: "Basic F&O",
    badge: "Index Derivatives",
    headline: "Systematic Index Futures & Directional Options",
    shortDesc: "Analytical strategies tailored for liquid benchmark indices (NIFTY 50 and BANK NIFTY) with structured risk-to-reward ratios.",
    segment: "NSE Index Futures & Options",
    holdingPeriod: "Intraday to Short Positional (1-2 Days)",
    suitability: "Active traders with an understanding of derivative mechanics, option Greeks, and margin requirements.",
    keyDeliverables: [
      "Index trend analysis based on open interest (OI) concentration and PCR ratios",
      "Strict 1:2 or better risk-to-reward setups with predefined invalidation levels",
      "Morning market preview before 09:00 AM IST with key support/resistance zones",
      "Explicit trade sizing instructions to prevent over-leverage"
    ],
    riskLevel: "High",
    riskNote: "Leveraged instruments carry time decay (Theta) and rapid volatility risks. Unhedged options can lose 100% of premium.",
    pricingNote: "[Subscription models strictly fee-based. Final schedules will be published upon approval.]"
  },
  {
    id: "fo-exclusive",
    category: "Derivatives (F&O)",
    name: "F&O Exclusive",
    badge: "Advanced Quantitative",
    headline: "Multi-Leg Hedged Option Spreads & Stock Derivatives",
    shortDesc: "Institutional-style defined-risk option strategies (Bull Call Spreads, Iron Condors, Ratio Spreads) and stock futures momentum setups.",
    segment: "NSE Stock & Index Derivatives",
    holdingPeriod: "Weekly to Monthly Expiry Cycles",
    suitability: "Sophisticated traders seeking capital protection through built-in hedges and non-directional volatility strategies.",
    keyDeliverables: [
      "Pre-calculated payoff diagrams and maximum risk/reward matrices for every strategy",
      "Options volatility skew and IV percentile screening across high-beta equities",
      "Step-by-step adjustment protocols when spot moves against initial positions",
      "Weekly strategy review and portfolio Greek exposure assessment"
    ],
    riskLevel: "High (Defined Risk via Spreads)",
    riskNote: "High complexity requiring fast execution and sufficient broker margin for spread benefits.",
    pricingNote: "[Transparent fixed advisory subscription; no performance fee or managed trading.]"
  },
  {
    id: "commodities-pack",
    category: "Commodities",
    name: "Commodities Pack",
    badge: "Precious Metals & Energy",
    headline: "MCX Bullion & Energy Market Research",
    shortDesc: "Macro-driven research combining global geopolitical drivers, USD strength index, and technical chart patterns across MCX Gold, Silver, and Crude Oil.",
    segment: "MCX India (Multi Commodity Exchange)",
    holdingPeriod: "Evening Session Swing (1-3 Days)",
    suitability: "Traders seeking portfolio diversification outside equities during extended evening trading hours (till 11:30/11:55 PM IST).",
    keyDeliverables: [
      "Daily global macro brief integrating US economic releases, Fed commentary, and OPEC updates",
      "Key support/resistance levels, pivot points, and volume profile analysis",
      "Evening session actionable research alerts aligned with US market open",
      "Inventory data previews (US EIA Crude Oil & Natural Gas reports)"
    ],
    riskLevel: "High",
    riskNote: "Commodity prices are sensitive to overseas overnight news, currency fluctuations, and unexpected inventory spikes.",
    pricingNote: "[Official flat-fee schedules to be notified post-registration.]"
  },
  {
    id: "commodity-exclusive",
    category: "Commodities",
    name: "Commodity Exclusive",
    badge: "Industrial & Base Metals",
    headline: "Comprehensive Base Metals & Global Commodity Cycles",
    shortDesc: "Specialized research covering MCX Copper, Zinc, Aluminium, Lead, and Natural Gas, supported by global LME data and industrial demand trends.",
    segment: "MCX Base Metals & Energy",
    holdingPeriod: "Positional Swing (3-7 Days)",
    suitability: "Commodity specialists and physical traders seeking technical hedge insights and supply-chain supply/demand analysis.",
    keyDeliverables: [
      "LME-MCX arbitrage tracking and warehouse inventory trends",
      "In-depth weekly cycle notes on global manufacturing PMI and infrastructure capex",
      "Dynamic stop-loss and profit trajectory updates based on ATR metrics",
      "Dedicated analyst query support window during market hours"
    ],
    riskLevel: "High",
    riskNote: "Base metals are deeply tied to global industrial macro trends and Chinese demand shifts.",
    pricingNote: "[Fixed-term research subscriptions only; transparently billed.]"
  },
  {
    id: "equity-exclusive",
    category: "Equity Cash",
    name: "Equity Exclusive",
    badge: "High Conviction",
    headline: "Emerging Leaders Mid & Smallcap Research",
    shortDesc: "Deep-dive fundamental reports identifying high-growth Indian companies poised for structural market expansion over medium-to-long horizons.",
    segment: "NSE / BSE Mid & Small Cap Universe",
    holdingPeriod: "3 Months to 12 Months",
    suitability: "Investors looking to build a high-conviction fundamental equity allocation with disciplined valuation thresholds.",
    keyDeliverables: [
      "Full institutional-grade PDF research reports with DCF & relative valuation models",
      "Management commentary reviews, corporate governance scores, and balance sheet audits",
      "Quarterly business earnings updates and fair value revisions",
      "Comprehensive exit alerts whenever investment thesis is invalidated"
    ],
    riskLevel: "Moderate to High",
    riskNote: "Mid and small-cap stocks experience higher volatility, liquidity constraints, and broader cyclical drawdowns.",
    pricingNote: "[Direct subscription pricing will be published following regulatory clearance.]"
  },
  {
    id: "equity-combo",
    category: "Hybrid & Multi-Asset",
    name: "Equity Combo",
    badge: "All-in-One Flagship",
    headline: "Unified Cash + Index Hedging Research Solution",
    shortDesc: "A complete framework providing growth stock cash picks combined with index hedging recommendations for portfolio drawdown defense.",
    segment: "Cash Equities + Index Options",
    holdingPeriod: "Blended Multi-Timeframe",
    suitability: "Holistic equity market participants who want both long-term capital appreciation and tactical portfolio downside insurance.",
    keyDeliverables: [
      "Access to both Stock Cash research and Index Hedging advisory reports",
      "Macro risk alerts indicating when to hedge cash holdings with Put spreads",
      "Consolidated monthly portfolio review webinars with our research team",
      "Priority customer service and direct research desk interaction"
    ],
    riskLevel: "Moderate (Self-Hedging)",
    riskNote: "Requires disciplined capital allocation across cash investments and option hedges.",
    pricingNote: "[All bundled plans are transparently billed without hidden fees.]"
  }
];
