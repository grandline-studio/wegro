export const performanceAuditNotice = {
  title: "Independent Verification & Compliance Notice",
  subtitle: "Demonstration Audit Architecture for Research Recommendations",
  notice: "The records presented below represent an illustrative structural framework designed in compliance with SEBI Research Analyst regulations. In accordance with regulatory guidelines, WeGrow does not publish fabricated win-rates, promised returns, or unverified track records. Upon formal registration and operations commencement, this table will be populated strictly with audited timestamps, trade alerts, and verified realization records.",
  statDisclosures: [
    { label: "Standardized Methodology", value: "SEBI RA Compliant Audit Trail" },
    { label: "Pricing Benchmarks", value: "NSE Official Closing Prices" },
    { label: "Slippage & Brokerage", value: "Net of Indicative Costs (0.15%)" },
    { label: "Audit Frequency", value: "Quarterly Independent Certification" }
  ]
};

export const sampleRecommendations = [
  {
    id: "REC-2026-104",
    date: "10 Oct 2026 09:35 AM",
    segment: "Stock Cash",
    instrument: "LARSEN & TOUBRO (LT)",
    type: "BUY (Positional)",
    horizon: "3-4 Weeks",
    entryPrice: "₹3,480.00",
    stopLoss: "₹3,360.00 (-3.4%)",
    target1: "₹3,620.00 (+4.0%)",
    target2: "₹3,750.00 (+7.7%)",
    exitPrice: "In Progress",
    status: "Active",
    statusType: "active",
    rationale: "Breakout from 6-week cup-and-handle base with expanding volume; international Middle East order inflows confirmed."
  },
  {
    id: "REC-2026-103",
    date: "06 Oct 2026 10:15 AM",
    segment: "Index Options",
    instrument: "NIFTY 24800 CE (Weekly)",
    type: "BUY (Spread Setup)",
    horizon: "1-2 Days",
    entryPrice: "₹145.00",
    stopLoss: "₹95.00 (-34.5%)",
    target1: "₹210.00 (+44.8%)",
    target2: "₹260.00 (+79.3%)",
    exitPrice: "₹212.00 (Partial Exit)",
    status: "Target 1 Achieved",
    statusType: "target-met",
    rationale: "Bullish divergence on 15-min RSI with heavy put writing witnessed at 24,700 strike."
  },
  {
    id: "REC-2026-102",
    date: "29 Sep 2026 02:20 PM",
    segment: "Commodities",
    instrument: "MCX GOLD OCT FUT",
    type: "BUY (Positional)",
    horizon: "1 Week",
    entryPrice: "₹74,850.00",
    stopLoss: "₹74,200.00 (-0.87%)",
    target1: "₹75,800.00 (+1.27%)",
    target2: "₹76,400.00 (+2.07%)",
    exitPrice: "₹75,820.00",
    status: "Target 1 Achieved",
    statusType: "target-met",
    rationale: "Global geo-political risk premium escalation and US 10-year Treasury yield rejection from key resistance."
  },
  {
    id: "REC-2026-101",
    date: "22 Sep 2026 11:00 AM",
    segment: "Stock Futures",
    instrument: "TATA MOTORS FUT",
    type: "BUY (Intraday/Swing)",
    horizon: "2-3 Days",
    entryPrice: "₹965.00",
    stopLoss: "₹948.00 (-1.76%)",
    target1: "₹995.00 (+3.1%)",
    target2: "₹1,020.00 (+5.7%)",
    exitPrice: "₹947.50",
    status: "Stop-Loss Triggered",
    statusType: "sl-hit",
    rationale: "Failed breakout at resistance following weaker-than-anticipated monthly commercial vehicle dispatch numbers."
  },
  {
    id: "REC-2026-100",
    date: "15 Sep 2026 09:40 AM",
    segment: "Stock Cash",
    instrument: "HDFC BANK (HDFCBANK)",
    type: "BUY (Delivery)",
    horizon: "6-8 Weeks",
    entryPrice: "₹1,640.00",
    stopLoss: "₹1,580.00 (-3.6%)",
    target1: "₹1,720.00 (+4.8%)",
    target2: "₹1,790.00 (+9.1%)",
    exitPrice: "₹1,745.00",
    status: "Closed / Target 1 Met",
    statusType: "closed",
    rationale: "Credit-deposit ratio stabilization and improvement in net interest margin (NIM) guidance post merger digestion."
  }
];
