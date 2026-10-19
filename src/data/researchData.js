export const researchCategories = [
  "All",
  "Market Commentary",
  "Equity Research",
  "Derivatives Education",
  "Commodity Insights",
  "Risk Management"
];

export const researchArticles = [
  {
    id: "nifty-quarterly-outlook-2025",
    category: "Market Commentary",
    title: "NIFTY 50 Macro Evaluation: Structural Capex vs Global Liquidity Dynamics",
    summary: "A quantitative assessment of corporate earnings trajectories, FII/DII institutional flows, and key technical pivot levels on benchmark Indian indices.",
    date: "14 October 2026",
    readTime: "6 min read",
    author: "Equity Strategy Desk",
    isDemo: true,
    tags: ["Nifty 50", "Macro", "Institutional Flows", "Valuation"],
    keyLevels: {
      support: "24,200 / 23,850",
      resistance: "25,100 / 25,450",
      trend: "Bullish Consolidation with Sector Rotation"
    },
    takeaways: [
      "Indian domestic institutional flows (DII via SIPs) continue to absorb foreign portfolio outflows, stabilizing baseline market volatility.",
      "Valuation multiples in NIFTY Large Caps currently trade near 21.8x forward P/E, aligning with the 5-year median.",
      "Capital goods, renewable energy infra, and private banking sectors show superior relative strength indicators (RSI > 58)."
    ],
    fullBody: `
### Executive Summary
The Indian equity landscape continues to demonstrate remarkable resilience against heightened global bond yields and currency fluctuations. Our research desk analyzes the interplay between domestic capex cycles, credit growth (+14.2% YoY), and corporate margin expansion.

### Valuation and Earnings Perspective
Nifty forward earnings estimates project an 11-13% CAGR over the next fiscal cycle. While mid-cap valuations demand cautious selectivity, large-cap balance sheets remain under-leveraged with healthy return on equity (RoE) metrics averaging 15.4%.

### Strategic Allocation Framework
Investors are advised to maintain a staggered accumulation approach in fundamentally anchored sectors. Avoid chasing vertical momentum in illiquid counters and preserve at least 15% tactical cash reserves for volatility contractions.
    `
  },
  {
    id: "mastering-iron-condors-nifty",
    category: "Derivatives Education",
    title: "Managing Greeks in Range-Bound Expiries: A Guide to the Iron Condor",
    summary: "How disciplined options traders exploit theta decay and implied volatility mean reversion while capping tail-risk exposure.",
    date: "08 October 2026",
    readTime: "8 min read",
    author: "Derivatives Research Unit",
    isDemo: true,
    tags: ["Options", "Derivatives", "Risk Management", "Theta Decay"],
    keyLevels: {
      support: "Implied Volatility (IV): 13.2%",
      resistance: "Max Pain Zone: 24,600",
      trend: "Neutral Volatility Harvest"
    },
    takeaways: [
      "Iron Condors allow traders to profit from market neutrality while defining absolute maximum loss prior to entering.",
      "The sweet spot for trade initiation is 30 to 45 days prior to monthly expiry where theta decay accelerates safely.",
      "Always set a hard exit rule at 2x the received credit to avoid gamma spikes in expiry week."
    ],
    fullBody: `
### The Mechanics of Defined-Risk Option Selling
Unlike naked option selling, an Iron Condor combines an Out-of-the-Money (OTM) Bull Put Spread and an OTM Bear Call Spread. This ensures that even under unpredictable gap openings, the trader's downside is strictly mathematically bounded.

### Managing Vega and Gamma
As expiry approaches, gamma risk increases exponentially. Our empirical study of Nifty weekly contracts over 36 months shows that closing multi-leg positions at 50% of maximum achievable profit significantly enhances the Sharpe Ratio compared to holding until expiration.
    `
  },
  {
    id: "green-energy-capex-deep-dive",
    category: "Equity Research",
    title: "Decarbonization & Grid Modernization: Tracking India's Power Transmission Capex",
    summary: "Detailed fundamental breakdown of transmission equipment manufacturers and EPC players benefiting from the 500 GW renewable target.",
    date: "02 October 2026",
    readTime: "10 min read",
    author: "Infrastructure Sector Analyst",
    isDemo: true,
    tags: ["Power Grid", "Clean Energy", "Capital Goods", "Fundamental"],
    keyLevels: {
      support: "Sector PE: 34.5x",
      resistance: "Order Book to Bill: 3.8x",
      trend: "Multi-Year Structural Supercycle"
    },
    takeaways: [
      "Central Transmission Utility (CTU) planned project pipeline exceeds ₹2.4 Lakh Crore through 2030.",
      "High-voltage transformer and conductor manufacturers possess 24-36 months of clear order book visibility.",
      "Watch raw material cost pressures, specifically copper and cold-rolled grain-oriented (CRGO) steel pricing."
    ],
    fullBody: `
### The Renewable Evacuation Bottleneck
India's ambitious target of achieving 500 GW non-fossil capacity by 2030 requires massive additions to interstate transmission systems. Renewable energy generation hubs in Rajasthan and Gujarat require dedicated high-capacity green energy corridors.

### Financial Health Check
Leading suppliers are generating positive free cash flow, operating at >85% capacity utilization, and executing timely capacity debottlenecking. We emphasize companies with clean debtor aging and minimum customer concentration risks.
    `
  },
  {
    id: "gold-silver-ratio-analysis-2025",
    category: "Commodity Insights",
    title: "Gold-to-Silver Ratio at 84: Evaluating the Industrial Silver Demand Thesis",
    summary: "Historical mean reversion patterns suggest silver offers attractive risk-reward relative to gold as photovoltaic and EV demand escalates.",
    date: "25 September 2026",
    readTime: "5 min read",
    author: "Commodities & Bullion Desk",
    isDemo: true,
    tags: ["MCX", "Gold", "Silver", "Precious Metals"],
    keyLevels: {
      support: "MCX Gold: ₹74,500 / 10g",
      resistance: "MCX Silver: ₹94,000 / kg",
      trend: "Bullish Industrial Momentum"
    },
    takeaways: [
      "Historically, a Gold-to-Silver ratio above 80 has signaled favorable medium-term accumulation zones for silver.",
      "Photovoltaic (solar cell) manufacturing accounts for over 16% of total global industrial silver consumption.",
      "Central bank gold accumulation remains a supportive structural floor for overall precious metals valuation."
    ],
    fullBody: `
### Macro Fundamentals
Precious metals continue to be buoyed by global dedollarization trends and sovereign reserve diversification. However, silver exhibits dual characteristics—both as a monetary hedge and an irreplaceable industrial element in next-generation electronic components.

### Trading Framework on MCX
Traders are advised to structure staggered positions utilizing Mini contracts (SilverM) to manage margin volatility during high-impact US CPI and FOMC announcements.
    `
  },
  {
    id: "stoploss-execution-psychology",
    category: "Risk Management",
    title: "The Mathematical Imperative of Stop-Losses: Surviving Market Drawdowns",
    summary: "Why a 10% loss requires an 11% gain to recover, while a 50% drawdown demands a 100% return just to return to breakeven.",
    date: "18 September 2026",
    readTime: "7 min read",
    author: "Risk Governance Team",
    isDemo: true,
    tags: ["Risk First", "Capital Preservation", "Position Sizing", "Discipline"],
    keyLevels: {
      support: "Max Risk Per Trade: 1.5% of Capital",
      resistance: "Max Sector Exposure: 25%",
      trend: "Risk-First Defensive Architecture"
    },
    takeaways: [
      "Capital preservation is the only true prerequisite for long-term compound wealth creation.",
      "A mechanical, pre-planned stop-loss eliminates emotional hesitation and anchoring bias during adverse price swings.",
      "Never average down a losing leveraged derivative trade; add risk only to winners that confirm your thesis."
    ],
    fullBody: `
### Asymmetry of Financial Losses
Many retail market participants overlook the geometric mathematics of loss recovery. Protecting your trading capital from catastrophic failure is exponentially more important than pursuing speculative multibaggers.

### Implementation Checklist
1. Calculate position size AFTER establishing stop-loss distance, never before.
2. Place hard stop orders with your broker rather than relying on mental triggers.
3. Treat small losses as normal operational business expenses, comparable to an inventory cost.
    `
  }
];
