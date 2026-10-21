import { SiteContent, ComplaintBoardData, LeadItem, AdminUser } from './schema';

export const defaultSiteContent: SiteContent = {
  global: {
    brandName: "WeGro",
    legalName: "WeGro Research Analysts Private Limited",
    tagline: "Where independent research meets disciplined capital. Built for investors who value data over speculation.",
    logoEmblemUrl: "/wegrow_emblem.png",
    sebiRegistrationNumber: "INH000012345",
    bseMembershipNumber: "5422",
    cinNumber: "U72900MH2020PTC346236",
    regulatoryStatus: "SEBI Registered Research Analyst (INH000012345) • BASL Membership ID: 5422",
    riskWarning: "Investments in securities market are subject to market risks. Read all the related documents carefully before investing. Registration granted by SEBI, membership of BASL and certification from NISM in no way guarantee performance of the intermediary or provide any assurance of returns to investors. Futures & Options and Commodity trading involve substantial leverage risk.",
    offices: {
      registeredOffice: {
        title: "Registered Office",
        address: "B-204, 2nd Floor, Universal Business Park, Chandivali Farm Road, Off Saki Vihar Road, Andheri (East), Mumbai, Maharashtra – 400072, India."
      },
      principalPlace: {
        title: "Principal Place of Business",
        address: "No. 42, 3rd Floor, 100 Feet Road, 4th Block, Koramangala, Bengaluru, Karnataka – 560034, India."
      }
    },
    contact: {
      email: "support@wegro.in",
      phone: "+91 80 4718 5555 / +91 98200 12345",
      supportHours: "Monday – Friday: 8:30 AM – 5:30 PM IST (Trading Days)"
    },
    complianceOfficer: {
      name: "Mr. Ramesh Sharma",
      title: "Company Secretary & Regulatory Compliance Officer",
      email: "compliance@wegro.in",
      phone: "+91 80 4718 5556",
      address: "B-204, 2nd Floor, Universal Business Park, Chandivali Farm Road, Off Saki Vihar Road, Andheri (East), Mumbai – 400072, India."
    },
    officialPortals: {
      sebiScores: "https://scores.sebi.gov.in",
      sebiScoresApp: "https://play.google.com/store/apps/details?id=com.sebi&hl=en_IN",
      smartOdr: "https://smartodr.in/login",
      odrCircular: "https://www.sebi.gov.in/legal/circulars/jul-2023/online-resolution-of-disputes-in-the-indian-securities-market_74574.html"
    },
    navigation: [
      { label: "Home", path: "/" },
      { label: "About", path: "/about" },
      { label: "Services", path: "/services" },
      { label: "Pricing", path: "/pricing" },
      { label: "Disclosures", path: "/disclosures" },
      { label: "Contact", path: "/contact" }
    ],
    importantLinks: [
      { label: "Disclaimer", path: "/disclosures" },
      { label: "Disclosure", path: "/disclosures" },
      { label: "Terms & Conditions", path: "/terms" },
      { label: "Privacy Policy", path: "/privacy-policy" },
      { label: "Service Delivery Policy", path: "/service-delivery" },
      { label: "Refund & cancellation policy", path: "/refund-cancellation" },
      { label: "Risk with short term investments", path: "/disclosures" },
      { label: "Investor Charter", path: "/investor-charter" },
      { label: "ODR Link", path: "/odr" },
      { label: "ODR Circular Link", path: "https://www.sebi.gov.in/legal/circulars/jul-2023/online-resolution-of-disputes-in-the-indian-securities-market_74574.html", isExternal: true },
      { label: "SEBI Scores App Link", path: "https://play.google.com/store/apps/details?id=com.sebi&hl=en_IN", isExternal: true },
      { label: "SEBI Scores Website Link", path: "https://scores.sebi.gov.in", isExternal: true }
    ]
  },
  home: {
    hero: {
      eyebrow: "SEBI Registered Research Analyst • INH000008093",
      headline: "Your search ends with our research!",
      subheadline: "In-depth market research and analysis to help you make more informed business decisions.",
      checkmarks: [
        "BSE Member: 5422",
        "Disciplined Risk:Reward",
        "Analysis & Data Backed"
      ],
      requestCallbackBtnLabel: "Request a callback"
    },
    leadForm: {
      title: "Request a Research Callback",
      subtitle: "Connect directly with our research desk to discuss our service offerings.",
      productOptions: [
        "Starter Equity Cash (₹4,999/mo)",
        "Pro F&O Derivatives (₹9,999/mo)",
        "HNI Wealth & Swing VIP (₹24,999/qtr)",
        "Equity Cash & Intraday Growth",
        "F&O Derivatives Strategy",
        "Commodity & MCX Advisory",
        "Swing & Wealth Creation Portfolio"
      ],
      submitBtnLabel: "Request a callback",
      disclaimerText: "By submitting this form, you agree to our Terms & Conditions, Privacy Policy, and Disclosures."
    },
    highlights: [
      {
        id: "hl-1",
        title: "Over 40 years of combined corporate experience",
        icon: "Award"
      },
      {
        id: "hl-2",
        title: "Committed to serve our customers, going the extra mile",
        icon: "HeartHandshake"
      },
      {
        id: "hl-3",
        title: "Regular Updates from us in a structured format and routine",
        icon: "Clock"
      }
    ],
    aboutSummary: {
      eyebrow: "Corporate Background",
      title: "About WeGro",
      description: "WeGro is a SEBI-certified Research Analyst firm (Registration No: INH000008093) and BSE Member (Membership No: 5422). Built on the foundational pillars of quantitative analytical depth, institutional-grade data scrutiny, and uncompromising risk management, WeGro delivers structured, objective, and timely market intelligence across Indian Equities, Derivatives (F&O), and Commodities to assist investors and business leaders in making informed, disciplined financial decisions.",
      ctaBtnLabel: "KNOW MORE ABOUT WEGRO",
      ctaBtnPath: "/about"
    },
    keyPillars: {
      eyebrow: "Core Strengths",
      title: "Key Value Pillars",
      description: "Our operations and research philosophy are anchored upon four foundational principles that guide every market recommendation.",
      items: [
        {
          id: "pillar-1",
          title: "Research",
          description: "Backed by analysis and data. Every recommendation undergoes rigorous fundamental and technical evaluation before transmission.",
          icon: "TrendingUp"
        },
        {
          id: "pillar-2",
          title: "Customer Focus",
          description: "Meeting financial objectives. We orient our communication, support, and syllabus toward the distinct goals and risk profiles of our clients.",
          icon: "Users"
        },
        {
          id: "pillar-3",
          title: "Risk Management",
          description: "Robust risk management plan. Non-negotiable stop-loss discipline and structured risk:reward ratios to prioritize capital preservation.",
          icon: "ShieldCheck"
        },
        {
          id: "pillar-4",
          title: "Vibrancy",
          description: "Young and energetic employee base. An agile, tech-driven research bench constantly monitoring live market dynamics and regulatory standards.",
          icon: "Compass"
        }
      ]
    }
  },
  about: {
    hero: {
      badge: "SEBI Registered Research Analyst · INH000008093",
      title: "Independent Research. Pure Mathematics.",
      titleHighlight: "Zero Conflicting Interests.",
      description: "WeGro was established to dismantle speculative hype and predatory advisory practices in Indian capital markets. We deliver institutional-grade fundamental models, quantitative options architecture, and audited risk parameters to retail and professional market participants."
    },
    stats: [
      {
        id: "stat-1",
        number: 100,
        suffix: "%",
        label: "Fee-Only Advisory",
        subtext: "Zero kickbacks, broker rebates, or hidden volume incentives."
      },
      {
        id: "stat-2",
        number: 4,
        suffix: "-Stage",
        label: "Analytical Pipeline",
        subtext: "Macro, fundamental, volatility, and risk committee sign-off gates."
      },
      {
        id: "stat-3",
        number: 2.5,
        prefix: "1:",
        suffix: "+",
        label: "Minimum Risk-Reward",
        subtext: "Strict mathematical cutoff before any recommendation is published."
      },
      {
        id: "stat-4",
        number: 0,
        suffix: " PMS",
        label: "Full Custody Retention",
        subtext: "Clients retain 100% control of their own demat and trading accounts."
      }
    ],
    doctrine: {
      eyebrow: "The WeGro Doctrine",
      title: "Built for Serious Capital. Grounded in Integrity.",
      description: "We reject the speculative narrative that equates active trading with gambling. Our operational architecture rests on three non-negotiable pillars of financial discipline.",
      pillars: [
        {
          id: "doc-1",
          romanNumeral: "I",
          title: "Capital Preservation First",
          description: "Mathematical compounding is impossible without defensive risk parameters. An investor who mitigates severe drawdowns during macro corrections does not have to engage in desperate recovery trades to outpace benchmark indices.",
          icon: "Target"
        },
        {
          id: "doc-2",
          romanNumeral: "II",
          title: "Mathematical Determinism",
          description: "Subjective intuition and emotional bias are systematically replaced with structured models: forensic balance-sheet health scores, volatility surfaces, Open Interest profiles, and pre-calculated invalidation levels.",
          icon: "Cpu"
        },
        {
          id: "doc-3",
          romanNumeral: "III",
          title: "Fiduciary Independence",
          description: "We work exclusively for our subscribers. We do not distribute financial products for commissions, we receive zero broker volume rebates, and our analysts are legally barred from trading against research calls.",
          icon: "Scale"
        }
      ]
    },
    researchFunnel: {
      eyebrow: "Analytical Rigor",
      title: "The 4-Stage Research & Verification Funnel",
      description: "Before any recommendation is transmitted to subscribers, it must pass through four distinct analytical checkpoints to eliminate subjective bias and false positives.",
      gates: [
        {
          gateId: "GATE 01",
          title: "Macro & Systemic Liquidity Screening",
          badge: "Macro Liquidity",
          summary: "Quantitative monitoring of foreign & domestic institutional flows, RBI policy stance, yield curves, and cross-asset volatility parity.",
          metrics: [
            { label: "Institutional Flow Monitor", desc: "FII vs DII 20-day rolling cumulative absorption ratio" },
            { label: "Sovereign Yield Spread", desc: "India 10Y G-Sec vs US Treasury 10Y yield differential" },
            { label: "Currency Parity", desc: "USD/INR implied volatility and FX reserve cover stability" },
            { label: "Sector Rotation Index", desc: "Relative momentum analysis across 14 Nifty sectoral indices" }
          ],
          rejectionTrigger: "Disqualification if the broader index trades in an institutional distribution phase or systemic liquidity contraction.",
          outputAudit: "Generates daily institutional market regime score (Risk-On / Defensive / Neutral)."
        },
        {
          gateId: "GATE 02",
          title: "Forensic Fundamental & Balance Sheet Audit",
          badge: "Fundamental Health",
          summary: "In-depth forensic audit of cash flow statements, promoter pledge dynamics, working capital cycles, and accounting health.",
          metrics: [
            { label: "Altman Z-Score", desc: "Target > 2.80 confirming minimal credit or bankruptcy probability" },
            { label: "Piotroski 9-Point Score", desc: "Minimum threshold of ≥ 7 for operational efficiency and profitability" },
            { label: "Free Cash Flow Yield", desc: "Consistent positive CFO/EV yield across past 3 fiscal cycles" },
            { label: "Promoter Pledge & Ownership", desc: "Disqualification if promoter pledge exceeds 5% of holding" }
          ],
          rejectionTrigger: "Instant rejection for auditor qualifications, aggressive revenue recognition, or related-party transactions.",
          outputAudit: "Produces documented fundamental equity valuation thesis and fair value target corridor."
        },
        {
          gateId: "GATE 03",
          title: "Quantitative & Options Volatility Architecture",
          badge: "Derivatives & Structure",
          summary: "Multi-timeframe market structure mapping, volume distribution profiles (VPVR), Implied Volatility skew, and Open Interest buildup.",
          metrics: [
            { label: "Volume Profile (VPVR)", desc: "High Volume Nodes (HVN) and Point of Control (POC) identification" },
            { label: "Implied Volatility Rank (IVR)", desc: "Current IV relative to 52-week historical distribution" },
            { label: "Open Interest (OI) Dynamics", desc: "Put-Call Ratio (PCR) shifts and institutional strike concentrations" },
            { label: "Market Breadth (AD Line)", desc: "Advance/Decline confirmation across equal-weighted indices" }
          ],
          rejectionTrigger: "Rejection if bid-ask spread exceeds 0.15% or if derivative strike liquidity falls below threshold.",
          outputAudit: "Defines mathematically precise execution triggers, entry windows, and invalidation points."
        },
        {
          gateId: "GATE 04",
          title: "Risk Committee Sign-off & Mathematical Invalidation",
          badge: "Capital Preservation",
          summary: "Independent analytical oversight mandating non-negotiable stop-losses, position sizing constraints, and statutory conflict audits.",
          metrics: [
            { label: "Risk-to-Reward Ratio", desc: "Strict requirement: minimum 1:2.5 potential payoff profile" },
            { label: "Trade Risk Allocation", desc: "Pre-set position sizing ceiling capping portfolio exposure at 2.0%" },
            { label: "Volatility ATR Stop-Loss", desc: "Stop-loss calibrated against Average True Range, never arbitrary" },
            { label: "Conflict Audit Clearance", desc: "Mandatory check verifying zero personal analyst or affiliate holding" }
          ],
          rejectionTrigger: "Immediate veto if risk-reward ratio is sub-optimal or if conflict disclosure checklist is incomplete.",
          outputAudit: "Final verified research release with statutory disclosures published to subscriber terminal."
        }
      ]
    },
    radicalTransparency: {
      eyebrow: "Radical Transparency",
      title: "The WeGro Standard: Contrasting Integrity",
      description: "In an industry troubled by misleading guarantees and unregistered tipsters, our standard is defined as much by what we refuse to do as by what we do.",
      whatWeStandFor: {
        title: "What We Stand For (The WeGro Code)",
        subtitle: "Every advisory process is governed by documented research methodology, risk-adjusted parameters, and SEBI statutory mandates.",
        items: [
          "Non-negotiable stop-loss calculated via mathematical volatility models",
          "Mandatory 1:2.5 minimum risk-to-reward ratio on every setup",
          "100% client custody retention (zero handling of demat or trading logins)",
          "Fee-only subscription model with zero volume or brokerage kickbacks",
          "Full SEBI statutory conflict disclosure on every research thesis"
        ]
      },
      whatWeBan: {
        title: "Practices We Explicitly Ban",
        subtitle: "Zero tolerance for fraudulent industry practices that compromise investor capital.",
        items: [
          "Guaranteed return schemes or assured percentage promises",
          "Profit-sharing models or performance-cut advisory contracts",
          "Managing client accounts, trading on client behalf, or PMS operations",
          "Trading against published research calls or front-running subscribers",
          "Aggressive speculative calls without predefined invalidation stop-loss"
        ]
      }
    },
    faqs: {
      eyebrow: "Frequently Asked Questions",
      title: "Regulatory & Operational Clarity",
      description: "Direct answers to common questions regarding our SEBI credentials, advisory boundaries, and research delivery.",
      items: [
        {
          question: "What is WeGro's official regulatory status with SEBI?",
          answer: "WeGro Research Analysts Private Limited operates under the regulatory purview of the Securities and Exchange Board of India (SEBI) under the SEBI (Research Analysts) Regulations, 2014 with Registration Number INH000008093 and BSE Membership Number 5422. All published research reports adhere strictly to Chapter III regulations regarding independence, conflict disclosures, and qualifications."
        },
        {
          question: "Does WeGro manage client funds, handle demat credentials, or offer PMS?",
          answer: "No. WeGro does NOT offer Portfolio Management Services (PMS), discretionary asset management, or account handling under any circumstance. We never accept investor trading deposits, never request trading passwords or OTPs, and never trade on behalf of clients. You maintain 100% custody of your capital."
        },
        {
          question: "How does WeGro ensure its research recommendations are free from conflict of interest?",
          answer: "Under SEBI Regulations, our analysts and associates are legally barred from trading in the securities they cover for 30 days prior to and 5 days post publication. Furthermore, WeGro receives zero kickbacks, transaction-based brokerage cuts, or listing fees from corporations."
        },
        {
          question: "What is your mathematical approach to Stop-Loss and risk management?",
          answer: "Every single trade recommendation generated by WeGro is issued with a pre-defined mathematical invalidation price (Stop-Loss) before entry. We never use arbitrary round numbers; stop-losses are calculated using multi-timeframe volatility metrics (ATR), structural support/resistance zones, and liquidity nodes."
        },
        {
          question: "How can clients resolve grievances or escalate questions?",
          answer: "WeGro has a structured 4-tier Investor Grievance Redressal framework. Clients can email our dedicated Compliance Desk directly at support@wegro.in or escalate to our Compliance Officer at our Mumbai registered office, or utilize the SEBI SCORES portal (scores.sebi.gov.in) and SMART ODR platform (smartodr.in)."
        }
      ]
    },
    ctaBanner: {
      title: "Ready to Trade with Research-Backed Discipline?",
      subtitle: "Join disciplined investors and market operators who rely on quantitative models, institutional screening, and strict risk parameters.",
      btnLabel: "Explore Advisory Services",
      btnPath: "/services"
    }
  },
  services: {
    hero: {
      eyebrow: "Advisory Services Syllabus",
      title: "Institutional-Grade Market Intelligence",
      description: "Systematic, quantitative, and fundamentally audited research across Indian Equities, Derivatives (F&O), and Multi-Commodity Exchange (MCX) contracts."
    },
    services: [
      {
        id: "equity-cash-intraday",
        category: "Equity Cash",
        name: "Equity Cash & Intraday Growth",
        badge: "High Conviction",
        headline: "Momentum & Volume Structure in Liquid Indian Equities",
        shortDesc: "Precision entry, stop-loss and target levels for high-momentum Indian equities, triggered by daily momentum and volume structure.",
        segment: "NSE / BSE Cash Market",
        holdingPeriod: "Intraday (Same-Day Exit)",
        suitability: "Active intraday traders with disciplined position sizing.",
        keyDeliverables: [
          "1-2 intraday cash calls per day",
          "Entry zone, stop-loss & dual targets",
          "Trailing alerts till exit",
          "Weekly momentum watchlist"
        ],
        riskLevel: "High (Intraday Momentum)",
        riskNote: "Intraday equity calls carry rapid price movement risks. Mandates strict stop-loss adherence and swift execution before market close.",
        pricingNote: "Fixed advisory subscription fee. Direct banking remittance only.",
        isVisible: true
      },
      {
        id: "fo-derivatives-strategy",
        category: "Derivatives (F&O)",
        name: "F&O Derivatives Strategy",
        badge: "Index & Stock Options",
        headline: "Greeks-Engineered Expiry Setups & Stock Futures Hedging",
        shortDesc: "Hedging, option buying and option selling strategies engineered around Nifty & BankNifty weekly expiries and stock futures.",
        segment: "NSE Index & Stock Derivatives",
        holdingPeriod: "Intraday to Weekly Expiry (1-5 Days)",
        suitability: "Traders who understand derivatives risk and margin discipline.",
        keyDeliverables: [
          "Index option trade ideas with Greeks rationale",
          "Stock futures momentum setups",
          "Expiry-day risk frameworks",
          "Hedge construction guidance"
        ],
        riskLevel: "High (Leveraged Derivatives)",
        riskNote: "Derivatives involve significant leverage, volatility swings, and theta decay. Inappropriate position sizing can result in substantial capital loss.",
        pricingNote: "Flat fee-only research subscription. Zero profit sharing.",
        isVisible: true
      },
      {
        id: "commodity-mcx-advisory",
        category: "Commodities",
        name: "Commodity & MCX Advisory",
        badge: "Gold, Silver & Crude",
        headline: "Global Macro & Inventory Mapped Bullion and Energy",
        shortDesc: "Direct signals on Gold, Silver and Crude Oil futures, mapped to global macro trends, currency moves and inventory data.",
        segment: "MCX India (Multi Commodity Exchange)",
        holdingPeriod: "Evening Session & Swing (1-3 Days)",
        suitability: "Evening traders and commodity portfolio diversifiers.",
        keyDeliverables: [
          "MCX futures calls with macro context",
          "Evening session coverage",
          "Inventory & data-day alerts",
          "Cross-asset correlation notes"
        ],
        riskLevel: "High (Commodity Volatility)",
        riskNote: "MCX commodities are sensitive to overseas geopolitics, US Federal Reserve statements, and inventory releases during late evening sessions.",
        pricingNote: "Fixed advisory subscription fee. Invoiced transparently.",
        isVisible: true
      },
      {
        id: "swing-wealth-portfolio",
        category: "Positional & Wealth",
        name: "Swing & Wealth Creation Portfolio",
        badge: "Positional · 2-12 Weeks",
        headline: "Medium-Term Capital Compounding & Fundamental Growth",
        shortDesc: "Multibagger momentum picks and fundamental growth stories for medium-term capital compounding, blending technicals with balance-sheet work.",
        segment: "NSE Large, Mid & Small Cap",
        holdingPeriod: "Positional (2-12 Weeks)",
        suitability: "Working professionals building medium-term wealth.",
        keyDeliverables: [
          "2-4 high-conviction swing ideas per month",
          "Quarterly multibagger research reports",
          "Fundamental + technical thesis notes",
          "Portfolio review on request"
        ],
        riskLevel: "Moderate (Positional Equity)",
        riskNote: "Equity delivery investments are subject to broader market corrections and quarterly corporate performance. No leverage risk.",
        pricingNote: "Fixed quarterly or annual research subscription. Transparent institutional billing.",
        isVisible: true
      }
    ]
  },
  pricing: {
    hero: {
      eyebrow: "Advisory Fee Schedule · SEBI Registered Research Analyst",
      title: "Advisory Plans & Subscription Packages",
      description: "Transparent, fee-based research subscriptions. In strict compliance with SEBI Research Analyst regulations, we do not operate profit-sharing models or assured return schemes."
    },
    complianceNotice: {
      title: "SEBI Advisory Fee Compliance Notice",
      content: "All research fees are charged strictly as fixed advisory subscription charges paid through verifiable banking channels. No payment should ever be transferred to individual bank accounts."
    },
    plans: [
      {
        id: "starter-equity-cash",
        name: "Starter Equity Cash",
        price: "₹4,999",
        period: "/ Month",
        badge: "Cash Intraday",
        popular: false,
        features: [
          "1-2 intraday cash calls daily",
          "Real-time WhatsApp & Telegram delivery",
          "Stop-loss & target trailing alerts",
          "Basic portfolio review",
          "Standard support"
        ],
        ctaLabel: "Subscribe to Starter Equity"
      },
      {
        id: "pro-fo-derivatives",
        name: "Pro F&O Derivatives",
        price: "₹9,999",
        period: "/ Month",
        badge: "Most Popular",
        popular: true,
        features: [
          "Nifty & BankNifty index options",
          "Stock futures & momentum trade ideas",
          "Option buying & selling strategies",
          "1-on-1 risk management guidance",
          "Dedicated relationship manager"
        ],
        ctaLabel: "Subscribe to Pro F&O"
      },
      {
        id: "hni-wealth-swing-vip",
        name: "HNI Wealth & Swing VIP",
        price: "₹24,999",
        period: "/ Quarter",
        badge: "VIP Multi-Segment",
        popular: false,
        features: [
          "Full multi-segment coverage (Equity + F&O + MCX)",
          "High-conviction swing trade ideas",
          "Quarterly multibagger research reports",
          "Priority telephonic analyst consultation",
          "SEBI-compliant investor protection"
        ],
        ctaLabel: "Subscribe to HNI Wealth VIP"
      }
    ],
    feePrinciples: [
      {
        title: "Research-Only Advisory",
        description: "Fees are charged only for research services, never against promised returns."
      },
      {
        title: "Statutory GST Invoicing",
        description: "GST invoice issued for every payment made to the official account/UPI ID."
      },
      {
        title: "Designated Secure Channels",
        description: "Payments are accepted only via the designated secure fast payment channels."
      },
      {
        title: "Dedicated Redressal Tracking",
        description: "Grievances on billing are tracked through the dedicated complaint status system."
      }
    ]
  },
  contact: {
    hero: {
      eyebrow: "Connect with Research Desk",
      title: "Speak with Our Advisory Analysts",
      description: "Have questions regarding our research methodology, risk-reward parameters, or service syllabus? Submit an inquiry below."
    },
    deskInfo: {
      title: "Official Communications Desk",
      supportHours: "Monday – Friday: 8:30 AM – 5:30 PM IST (Trading Days)",
      note: "For general inquiries, subscription verification, and technical assistance."
    }
  },
  policies: {
    "disclosures": {
      slug: "disclosures",
      title: "Regulatory Disclosures & Conflict of Interest Policy",
      subtitle: "Transparency, Analyst Ownership Declarations & Statutory Standards",
      lastUpdated: "October 2026",
      sections: [
        {
          heading: "1. Regulatory Status Declaration",
          content: "WeGro Research Analysts Private Limited operates under the regulatory purview of the Securities and Exchange Board of India (SEBI) as a certified Research Analyst with Registration Number INH000008093 and BSE Membership Number 5422."
        },
        {
          heading: "2. Disclosures on Ownership & Material Conflicts",
          content: "Under the SEBI (Research Analysts) Regulations, 2014, the research analyst and associates declare that:\n• Neither the research analyst nor associates have any direct financial interest in subject securities exceeding ₹1,00,000, except as disclosed in individual research reports.\n• The research analyst or associates do not have actual/beneficial ownership of one percent or more securities of the subject company at the end of the month preceding publication.\n• The research analyst has not served as an officer, director, or employee of the subject company during the preceding twelve months."
        },
        {
          heading: "3. Disclosures on Compensation & Merchant Banking",
          content: "• Neither WeGro nor its analysts have received any compensation from the subject company for investment banking, merchant banking, or brokerage services in the past 12 months.\n• Research analysts receive compensation based on overall firm performance and research quality, and never as a percentage of trading turnover or client trading volumes."
        },
        {
          heading: "4. Standard Statutory Risk Warning",
          content: "Investments in the securities market are subject to market risks. Read all related documents carefully before investing. Registration granted by SEBI, membership of BASL, and certification from NISM in no way guarantee the performance of the intermediary or provide any assurance of returns to investors."
        }
      ]
    },
    "investor-charter": {
      slug: "investor-charter",
      title: "Investor Charter in Respect of Research Analysts",
      subtitle: "Prescribed Framework by SEBI to Protect Investor Interests",
      lastUpdated: "October 2026",
      sections: [
        {
          heading: "A. Vision and Mission Statements for Investors",
          content: "• Vision: Invest with knowledge, discipline, and safety in Indian capital markets.\n• Mission: Every investor should be able to conduct their investment or trade with appropriate research-backed knowledge and clear awareness of associated risk factors."
        },
        {
          heading: "B. Details of Business Transacted by the Research Analyst",
          content: "• Publishing unbiased research reports based on independent fundamental and technical analysis.\n• Providing recommendations with predefined entry, target, and stop-loss levels.\n• Disclosing financial interests and potential conflicts of interest on every published report."
        },
        {
          heading: "C. Rights of Investors",
          content: "• Right to receive clear, objective, and unbiased research reports.\n• Right to full transparency on analyst qualifications, SEBI registration details, and fee structures.\n• Right to prompt resolution of grievances through our structured escalation matrix and SEBI SCORES platform."
        },
        {
          heading: "D. Do's and Don'ts for Investors",
          content: "DO'S:\n1. Always verify the registration credentials of the research analyst on the official SEBI website.\n2. Understand that all research recommendations carry risk; determine personal risk tolerance before entering.\n3. Demand written research rationale and pay only through documented banking channels.\n\nDON'TS:\n1. Do not believe in guaranteed profit promises, fixed return schemes, or 100% win-rate claims.\n2. Never share trading account passwords, OTPs, or demat credentials with anyone claiming to trade on your behalf.\n3. Do not engage in cash transactions or transfer funds to personal savings accounts of sales agents."
        }
      ]
    },
    "odr": {
      slug: "odr",
      title: "Online Dispute Resolution (ODR) Portal",
      subtitle: "SEBI Circular on Common Online Dispute Resolution Mechanism",
      lastUpdated: "SEBI Circular No. SEBI/HO/OIAE/OIAE_IAD-1/P/CIR/2023/131",
      sections: [
        {
          heading: "1. About SMART ODR Mechanism",
          content: "In order to streamline the dispute resolution mechanism in the Indian securities market, SEBI has introduced an independent, institution-led online conciliation and arbitration process via the SMART ODR portal."
        },
        {
          heading: "2. Eligibility and Process Flow",
          content: "1. Stage 1: The investor must first lodge their complaint with WeGro via our designated grievance channels.\n2. Stage 2: If the dispute is not resolved satisfactorily, the investor can escalate via the SEBI SCORES platform.\n3. Stage 3: If unresolved after SCORES, the dispute can be initiated on the SMART ODR portal for independent online conciliation and arbitration."
        },
        {
          heading: "3. Direct Link to Official SMART ODR Portal",
          content: "Investors can access the official platform at: https://smartodr.in/login\nThe platform provides secure, paperless, digital resolution without the need for physical appearances."
        }
      ]
    },
    "terms": {
      slug: "terms",
      title: "Terms and Conditions of Research Service",
      subtitle: "User Agreement, Advisory Scope & Non-Discretionary Framework",
      lastUpdated: "October 2026",
      sections: [
        {
          heading: "1. Scope of Services",
          content: "WeGro provides independent financial research, macro commentary, and educational material. WeGro does NOT provide Portfolio Management Services (PMS), discretionary asset management, or assured-return schemes. All decisions to execute trades remain the sole discretion and responsibility of the client."
        },
        {
          heading: "2. Advisory Disclaimer",
          content: "Information provided on this platform does not constitute personalized financial planning. Clients are urged to assess their own risk appetite, financial situation, and tax circumstances before executing any research recommendation."
        },
        {
          heading: "3. Prohibition on Account Sharing & Redistribution",
          content: "Research materials, alert messages, and reports are proprietary intellectual property of WeGro and are intended exclusively for the registered subscriber. Unauthorized forwarding, sharing, or commercial redistribution will result in immediate termination of access without refund and may attract legal action."
        }
      ]
    },
    "privacy-policy": {
      slug: "privacy-policy",
      title: "Privacy and Data Protection Policy",
      subtitle: "Commitment to Confidentiality and Compliance with DPDP Guidelines",
      lastUpdated: "October 2026",
      sections: [
        {
          heading: "1. Information We Collect",
          content: "We collect only basic identification and contact details voluntarily provided on public enquiry forms (such as Name, Email, Mobile Number, and Service Interest). We DO NOT collect bank login credentials or credit card details through public enquiry forms."
        },
        {
          heading: "2. Purpose of Processing",
          content: "Collected data is used strictly to respond to your service requests, verify user subscriptions, provide regulatory disclosures, and send research alerts. We never sell, rent, or trade your personal information to third-party telemarketers."
        },
        {
          heading: "3. Data Security & Storage",
          content: "All client data is encrypted in transit using industry-standard TLS protocols and stored securely within ISO 27001-certified Indian data center regions."
        }
      ]
    },
    "refund-cancellation": {
      slug: "refund-cancellation",
      title: "Refund and Cancellation Policy",
      subtitle: "Transparent Terms for Research Subscriptions",
      lastUpdated: "October 2026",
      sections: [
        {
          heading: "1. Evaluation Period & Transparency",
          content: "We encourage all prospective subscribers to thoroughly review our free sample research, performance methodology, and risk disclosures prior to purchasing any subscription plan."
        },
        {
          heading: "2. Cancellation Terms",
          content: "• Subscriptions may be cancelled within 48 hours of initial activation if research delivery has not commenced, subject to an administrative processing charge not exceeding 10%.\n• Once research alerts, proprietary model portfolios, or strategy sheets have been delivered, fees become non-refundable due to the instantaneous delivery of intellectual property."
        },
        {
          heading: "3. Service Interruption Assurance",
          content: "In the unlikely event of prolonged technical failure on our delivery channels exceeding 5 consecutive trading days, subscription validity will be extended pro-rata without additional cost."
        }
      ]
    },
    "service-delivery": {
      slug: "service-delivery",
      title: "Service Delivery & Communication Framework",
      subtitle: "Delivery Channels, Turnaround Times & Market Hours Guidelines",
      lastUpdated: "October 2026",
      sections: [
        {
          heading: "1. Official Delivery Channels",
          content: "All actionable research updates, morning briefs, and stop-loss revisions are transmitted via:\n• Secure Client Dashboard\n• Dedicated Verified WhatsApp & SMS Gateway\n• Encrypted Private Telegram Channel"
        },
        {
          heading: "2. Operational Timings",
          content: "• Pre-Market Setup: Dispatched between 08:30 AM and 09:00 AM IST.\n• Live Market Hours: Active monitoring from 09:15 AM to 03:30 PM IST (Cash & F&O).\n• MCX Commodity Desk: Active coverage extends through the evening session until 11:30 PM IST."
        },
        {
          heading: "3. Network and Latency Disclaimers",
          content: "While WeGro utilizes enterprise tier-1 messaging aggregators, telecommunication network delays or mobile carrier throttling are beyond our control. Users are advised to rely on the Client Dashboard as the primary real-time benchmark."
        }
      ]
    },
    "risk-short-term": {
      slug: "risk-short-term",
      title: "Risk with Short-Term Investments & Leveraged Trading",
      subtitle: "Statutory Capital Preservation & Leverage Advisory Note",
      lastUpdated: "October 2026",
      sections: [
        {
          heading: "1. Nature of Derivative & Short-Term Trading Risk",
          content: "Trading in derivative contracts (Futures & Options) and short-term positional equity involves high leverage. SEBI studies indicate that 9 out of 10 individual traders in the equity F&O segment incur net losses."
        },
        {
          heading: "2. Non-Negotiable Risk Controls",
          content: "Subscribers must strictly adhere to the stop-loss guidance provided with each research recommendation. Never risk capital required for essential living expenses or emergency funds."
        }
      ]
    }
  },
  seo: {
    pages: {
      "/": {
        title: "WeGro — Your Search Ends With Our Research | SEBI Registered Research Analyst",
        description: "SEBI Registered Research Analyst (INH000008093) & BSE Member (5422). Independent, quantitative, and data-backed market intelligence for Indian Equities, F&O, and Commodities.",
        keywords: "SEBI Research Analyst, Indian Stock Market Advisory, Nifty Options Research, BSE Member, WeGro Finance"
      },
      "/about": {
        title: "About Us — WeGro Research Analysts",
        description: "Discover WeGro's 4-stage analytical research funnel, corporate credentials, fee-only fiduciary model, and capital preservation doctrine.",
        keywords: "About WeGro, SEBI Registered Analyst Mumbai, Independent Research, Stock Advisory Doctrine"
      },
      "/services": {
        title: "Services — WeGro Research Analysts",
        description: "Explore our institutional-grade research coverage across Equity Cash & Intraday Growth, F&O Derivatives Strategy, Commodity & MCX Advisory, and Swing & Wealth Creation Portfolio.",
        keywords: "Equity Cash Intraday, F&O Derivatives Strategy, Commodity MCX Advisory, Swing Wealth Creation"
      },
      "/pricing": {
        title: "Pricing & Advisory Subscriptions — WeGro",
        description: "Fixed-fee advisory subscriptions with transparent terms, zero profit sharing, and verified banking transaction channels.",
        keywords: "SEBI Research Fees, Advisory Subscription, Fixed Fee Stock Research"
      },
      "/contact": {
        title: "Contact & Corporate Desks — WeGro Research Analysts",
        description: "Connect directly with our research advisory desks in Mumbai and Bengaluru for inquiries, subscription details, and regulatory compliance.",
        keywords: "Contact WeGro, WeGro Mumbai Address, Research Desk Koramangala"
      },
      "/complaints": {
        title: "Complaint Board & Grievance Redressal — WeGro",
        description: "Statutory complaint disposal data under SEBI circular SEBI/HO/IMD/DF1/CIR/P/2021/688, 4-tier escalation matrix, and grievance tracker.",
        keywords: "SEBI Complaints Board, SCORES Portal, Smart ODR WeGro, Grievance Escalation Matrix"
      }
    }
  }
};

export const defaultComplaintBoardData: ComplaintBoardData = {
  header: {
    eyebrow: "Section 1 • Statutory Filing",
    title: "Data for the Month Ending — October 2026",
    monthEnding: "October 2026",
    circularRef: "In accordance with SEBI circular SEBI/HO/IMD/DF1/CIR/P/2021/688, research analysts are required to display complaints received from investors, disposed of, and pending on their website.",
    footnote: "* Certified under Regulation 20(1) of SEBI (Research Analysts) Regulations, 2014.",
    complianceOfficerName: "Mr. Ramesh Sharma"
  },
  section1: {
    columns: [
      { key: "sno", label: "Sr. No.", minWidth: 60, align: "center", isEditable: false },
      { key: "source", label: "Received from", minWidth: 140, align: "left", isEditable: true },
      { key: "pendingLastMonth", label: "Pending at the end of last month", minWidth: 140, align: "left", isEditable: true },
      { key: "received", label: "Received", minWidth: 80, align: "center", isEditable: true },
      { key: "resolved", label: "Resolved", minWidth: 80, align: "center", isEditable: true },
      { key: "totalPending", label: "Total Pending", minWidth: 95, align: "center", isEditable: true },
      { key: "pendingOverMonths", label: "Pending Complaints > Months", minWidth: 135, align: "left", isEditable: true },
      { key: "avgResolutionDays", label: "Average Resolution Time (in days)", minWidth: 145, align: "left", isEditable: true }
    ],
    rows: [
      {
        id: "row-1",
        sno: 1,
        source: "Support",
        pendingLastMonth: 0,
        received: 2,
        resolved: 2,
        totalPending: 0,
        pendingOverMonths: 0,
        avgResolutionDays: "-"
      },
      {
        id: "row-2",
        sno: 2,
        source: "SEBI Scores",
        pendingLastMonth: 4,
        received: 8,
        resolved: 11,
        totalPending: 1,
        pendingOverMonths: 0,
        avgResolutionDays: "-"
      },
      {
        id: "row-3",
        sno: 3,
        source: "Other Sources",
        pendingLastMonth: 5,
        received: 0,
        resolved: 0,
        totalPending: 5,
        pendingOverMonths: 5,
        avgResolutionDays: "0"
      }
    ]
  },
  section2: {
    monthlyCountToShow: 6,
    monthlyTrend: [
      { sno: 1, month: "May 2026", carried: 0, received: 1, resolved: 1, pending: 0 },
      { sno: 2, month: "June 2026", carried: 0, received: 0, resolved: 0, pending: 0 },
      { sno: 3, month: "July 2026", carried: 0, received: 2, resolved: 2, pending: 0 },
      { sno: 4, month: "August 2026", carried: 0, received: 1, resolved: 1, pending: 0 },
      { sno: 5, month: "September 2026", carried: 0, received: 0, resolved: 0, pending: 0 },
      { sno: 6, month: "October 2026 (M-T-D)", carried: 9, received: 10, resolved: 13, pending: 6, isCurrentMonth: true }
    ],
    annualTrend: [
      { sno: 1, year: "FY 2023–24", carried: 0, received: 3, resolved: 3, pending: 0 },
      { sno: 2, year: "FY 2024–25", carried: 0, received: 4, resolved: 4, pending: 0 },
      { sno: 3, year: "FY 2025–26 (YTD)", carried: 0, received: 14, resolved: 17, pending: 6, isCurrentYear: true }
    ]
  },
  section3: {
    auditReports: [
      {
        id: "rep-1",
        financialYear: "FY 2025–26",
        status: "In progress",
        adverseFindings: "Audit currently underway by independent statutory auditor; interim compliance clearance confirmed."
      },
      {
        id: "rep-2",
        financialYear: "FY 2024–25",
        status: "Completed",
        reportUrl: "/reports/compliance-audit-fy24-25.pdf",
        fileName: "SEBI_RA_Audit_Report_FY24_25.pdf",
        adverseFindings: "Clean audit report. Zero adverse regulatory findings or non-compliance citations."
      },
      {
        id: "rep-3",
        financialYear: "FY 2023–24",
        status: "Completed",
        reportUrl: "/reports/compliance-audit-fy23-24.pdf",
        fileName: "SEBI_RA_Audit_Report_FY23_24.pdf",
        adverseFindings: "Unqualified compliance certificate issued; all advisory disclosures in statutory alignment."
      }
    ]
  },
  escalationMatrix: [
    {
      level: "Level 1",
      title: "Client Support Desk",
      authority: "Senior Support Executive",
      email: "support@wegro.in",
      phone: "+91 80 4718 5555",
      sla: "Within 24–48 Business Hours",
      summary: "First-response desk for all operational & advisory inquiries.",
      scopeItems: [
        "Subscription access, report delivery & account queries",
        "Technical clarification on published research reports",
        "Billing inquiries and receipt verification"
      ]
    },
    {
      level: "Level 2",
      title: "Head of Customer Relations",
      authority: "VP — Client Relations",
      email: "grievances@wegro.in",
      phone: "+91 80 4718 5558",
      sla: "Within 3 Business Days",
      summary: "Escalation point if Level 1 resolution is unsatisfactory or delayed beyond 48 hours.",
      scopeItems: [
        "Unresolved operational or analytical tickets exceeding 48 hours",
        "Service delivery quality or delay concerns",
        "Disputed billing or refund eligibility requests"
      ]
    },
    {
      level: "Level 3",
      title: "Compliance Officer",
      authority: "Mr. Ramesh Sharma (Company Secretary)",
      email: "compliance@wegro.in",
      phone: "+91 80 4718 5556",
      sla: "Within 7 Business Days",
      summary: "Statutory grievance officer under SEBI (Research Analysts) Regulations, 2014.",
      scopeItems: [
        "Statutory compliance, code of conduct & regulatory questions",
        "Conflict of interest audit and analyst disclosure queries",
        "Formal SEBI-mandated complaint registration"
      ]
    },
    {
      level: "Level 4",
      title: "Principal Officer / Managing Director",
      authority: "Principal Officer Desk",
      email: "principal@wegro.in",
      phone: "+91 80 4718 5550",
      sla: "Within 10 Business Days",
      summary: "Final internal appellate authority for escalated disputes.",
      scopeItems: [
        "Grievances unresolved across Levels 1–3 within statutory timelines",
        "Executive reviews of policy, legal, or advisory disputes",
        "Preparation for external conciliation (SCORES / SMART ODR)"
      ]
    }
  ],
  isPublished: true,
  lastPublishedAt: "2026-10-19T23:30:00.000Z",
  publishedBy: "admin"
};

export const defaultLeads: LeadItem[] = [
  {
    id: "WG-LEAD-101",
    name: "Vikramaditya Mehta",
    mobile: "9820011223",
    email: "vikram.mehta@example.com",
    productName: "Stock Cash",
    panNumber: "ABCDE1234F",
    dob: "1988-06-15",
    message: "Interested in large-cap positional recommendations for portfolio allocation.",
    consentGiven: true,
    consentTimestamp: "2026-10-18T10:15:30.000Z",
    status: "New",
    internalNotes: "Callback scheduled for tomorrow 11 AM IST.",
    createdAt: "2026-10-18T10:15:30.000Z"
  },
  {
    id: "WG-LEAD-102",
    name: "Pooja Deshmukh",
    mobile: "9930044556",
    email: "pooja.d@example.com",
    productName: "Basic F&O",
    panNumber: "BKRPD5678K",
    dob: "1992-11-20",
    message: "Looking for index futures intraday levels with strict stop-losses.",
    consentGiven: true,
    consentTimestamp: "2026-10-17T14:40:00.000Z",
    status: "Contacted",
    internalNotes: "Explained fee-only model and risk guidelines. Follow up after market hours.",
    createdAt: "2026-10-17T14:40:00.000Z"
  },
  {
    id: "WG-LEAD-103",
    name: "Rohan Singhal",
    mobile: "9811122233",
    email: "rohan.singhal@example.com",
    productName: "Commodities Pack",
    panNumber: "XYZPS9012L",
    dob: "1985-03-08",
    message: "Trading MCX Gold and Silver evening sessions.",
    consentGiven: true,
    consentTimestamp: "2026-10-16T18:20:10.000Z",
    status: "Closed",
    internalNotes: "Subscribed to Commodities Pack 3-month advisory.",
    createdAt: "2026-10-16T18:20:10.000Z"
  }
];

export const defaultAdminUser: AdminUser = {
  id: "admin-1",
  username: "admin",
  // Valid 10-round bcrypt hash for 'wegro@123'
  passwordHash: "$2b$10$zSXHHbZ6jbrXveJ.oWymqe6gXHIzvT87YuifVEordNFHDdau1hGEK", 
  mustChangePassword: true,

  role: "superadmin",
  createdAt: "2026-10-19T00:00:00.000Z"
};
