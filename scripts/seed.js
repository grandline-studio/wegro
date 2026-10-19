import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const dbDir = path.resolve(rootDir, 'data', 'db');

console.log('🌱 Starting WeGro Finance Content & Governance Database Seeder...');

// Ensure data/db directory exists
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
  console.log(`📁 Created storage directory: ${dbDir}`);
}

// 1. Seed Site Content
const siteContent = {
  global: {
    siteName: 'WeGro Finance',
    tagline: 'SEBI-Regulated Institutional Market Intelligence',
    riskWarning: 'Investment in securities market are subject to market risks. Read all the related documents carefully before investing. Registration granted by SEBI and certification from NISM in no way guarantee performance of the intermediary or provide any assurance of returns to investors.',
    complianceOfficer: {
      name: 'Aniket Sharma',
      designation: 'Principal Officer & Grievance Redressal Officer',
      email: 'compliance@wegrofinance.com',
      phone: '+91 22 4589 7700',
      address: 'Tower 4, 12th Floor, One International Center, Senapati Bapat Marg, Elphinstone Road, Mumbai, Maharashtra — 400013',
      workingHours: 'Monday to Friday, 9:30 AM to 6:00 PM IST (Excluding Public Holidays)'
    },
    regulatory: {
      sebiRegNo: 'INH000014289',
      bseMembershipNo: '6782',
      cin: 'U67190MH2023PTC402198',
      registeredOffice: 'Tower 4, 12th Floor, One International Center, Senapati Bapat Marg, Mumbai, Maharashtra 400013',
      principalPlaceOfBusiness: 'Tower 4, 12th Floor, One International Center, Senapati Bapat Marg, Mumbai, Maharashtra 400013',
      supportEmail: 'support@wegrofinance.com',
      supportPhone: '+91 22 4589 7700',
      scoresUrl: 'https://scores.sebi.gov.in',
      scoresAppUrl: 'https://play.google.com/store/apps/details?id=com.sebi.scores',
      odrPortalUrl: 'https://smartodr.in'
    },
    escalationSteps: [
      {
        step: 1,
        title: 'Level 1: Dedicated Support Desk',
        description: 'Submit your query or grievance directly to our dedicated resolution desk with relevant portfolio or transaction references.',
        contact: 'support@wegrofinance.com | +91 22 4589 7700',
        turnaroundTime: '24-48 business hours'
      },
      {
        step: 2,
        title: 'Level 2: Principal Compliance Officer',
        description: 'If unresolved within 48 hours or if the resolution is unsatisfactory, escalate directly to our designated compliance officer.',
        contact: 'compliance@wegrofinance.com | +91 22 4589 7710',
        turnaroundTime: 'Up to 7 business days'
      },
      {
        step: 3,
        title: 'Level 3: SEBI SCORES 2.0 Portal',
        description: 'If not redressed within 21 days from lodging, investors may lodge grievances on the SEBI Complaints Redress System (SCORES 2.0) or SEBI mobile app.',
        contact: 'https://scores.sebi.gov.in | Toll Free: 1800 22 7575',
        turnaroundTime: 'Statutory SEBI timeline (21 calendar days)'
      },
      {
        step: 4,
        title: 'Level 4: Smart Online Dispute Resolution (SMART ODR)',
        description: 'If unsatisfied with SCORES redressal, investors can initiate online conciliation and arbitration through the SMART ODR institutional portal.',
        contact: 'https://smartodr.in',
        turnaroundTime: 'As per SEBI ODR Master Circular guidelines'
      }
    ],
    socialLinks: {
      twitter: 'https://twitter.com/wegrofinance',
      linkedin: 'https://linkedin.com/company/wegrofinance',
      telegram: 'https://t.me/wegrofinance',
      youtube: 'https://youtube.com/@wegrofinance'
    }
  },
  home: {
    hero: {
      badge: 'SEBI REGISTERED RESEARCH ANALYST',
      heading: 'Precision Market Intelligence for High-Conviction Capital',
      subheading: 'Institutional-grade quantitative analysis, risk-calibrated advisory, and transparent performance tracking designed strictly under SEBI RA regulations.',
      primaryCta: { label: 'Explore Institutional Advisory', url: '/services' },
      secondaryCta: { label: 'Statutory Complaint Board', url: '/complaints' }
    },
    stats: [
      { label: 'Asset Classes Covered', value: '4 Major Markets' },
      { label: 'Risk-Reward Ratio Focus', value: '1 : 2.5+' },
      { label: 'Research Transparency', value: '100% SEBI Compliant' },
      { label: 'Investor Resolution Rate', value: '100%' }
    ],
    features: [
      {
        title: 'Rigorous Quantitative Models',
        description: 'Proprietary factor models combined with strict cash flow, balance sheet forensics, and sector rotation indicators.',
        icon: 'BarChart3'
      },
      {
        title: 'Uncompromised Fiduciary Discipline',
        description: 'Strict adherence to SEBI RA regulations. Zero commissions, zero conflict of interest, and zero undisclosed positions.',
        icon: 'ShieldCheck'
      },
      {
        title: 'Real-Time Risk Calibration',
        description: 'Dynamic volatility stops, systematic hedging guides, and institutional drawdown containment protocols.',
        icon: 'Activity'
      }
    ],
    sectionVisibility: {
      hero: true,
      stats: true,
      features: true,
      regulatoryCallout: true,
      faq: true
    }
  },
  services: {
    hero: {
      badge: 'FIDUCIARY ADVISORY OFFERINGS',
      heading: 'Regulated Investment Advisory & Market Research',
      subheading: 'Engineered for retail investors, HNIs, and family offices seeking disciplined, data-driven equity strategies without speculative noise.'
    },
    services: [
      {
        id: 'equity-growth',
        name: 'Fundamental Equity Growth Advisory',
        category: 'Long-Term Wealth Compounders',
        description: 'High-conviction recommendations in large & mid-cap compounders with pristine corporate governance, high ROCE, and secular industry tailwinds.',
        horizon: '12 - 36 Months',
        riskLevel: 'Moderate to High',
        minCapital: '₹5,00,000',
        features: [
          'Detailed initiation and quarterly review research notes',
          'Systematic position sizing and sector allocation limits',
          'Direct quarterly analyst concall briefings'
        ]
      },
      {
        id: 'momentum-alpha',
        name: 'Tactical Momentum & Swing Strategy',
        category: 'Medium-Term Alpha',
        description: 'Quantitative price action and breakout strategies designed to exploit intermediate trend anomalies across Nifty 500 constituents.',
        horizon: '2 - 12 Weeks',
        riskLevel: 'High',
        minCapital: '₹3,00,000',
        features: [
          'Pre-market research triggers with strict stop-losses',
          'Risk-reward ratio threshold of minimum 1:2.5',
          'Instant updates via encrypted client channel'
        ]
      },
      {
        id: 'portfolio-health',
        name: 'Comprehensive Portfolio Forensic Audit',
        category: 'Diagnostic & Rebalancing',
        description: 'A deep-dive health check of your existing holdings analyzing fee drag, duplicate exposures, valuation risk, and debt vulnerabilities.',
        horizon: 'One-Time Diagnostic',
        riskLevel: 'Low',
        minCapital: 'Any Portfolio Size',
        features: [
          '360-degree forensic factor and ESG governance score',
          'Actionable rebalancing and exit transition blueprint',
          'One-on-one session with Principal Research Analyst'
        ]
      }
    ],
    sectionVisibility: {
      hero: true,
      serviceList: true,
      riskNotice: true
    }
  },
  pricing: {
    hero: {
      badge: 'TRANSPARENT ADVISORY PLANS',
      heading: 'Straightforward, Fixed-Fee Research Advisory',
      subheading: 'No profit sharing, no percentage of AUM, no hidden transactional commissions. Fully compliant with SEBI fee regulations.'
    },
    plans: [
      {
        id: 'quarterly',
        name: 'Quarterly Research Subscription',
        price: '₹14,999',
        billingPeriod: 'per quarter (excl. 18% GST)',
        description: 'Ideal for active investors testing institutional recommendations.',
        features: [
          'Full access to Tactical Momentum Research',
          'Bi-weekly Market Pulse & Macro Overviews',
          'Email & Telegram Alert Delivery',
          'SEBI Standard Investor Agreement'
        ],
        isPopular: false
      },
      {
        id: 'annual',
        name: 'Annual Master Advisory Plan',
        price: '₹49,999',
        billingPeriod: 'per annum (excl. 18% GST)',
        description: 'Complete advisory coverage for long-term compounding and wealth builders.',
        features: [
          'Full access to Fundamental Equity Growth Portfolio',
          'Tactical Momentum & Sector Rotation alerts',
          'Annual Portfolio Health Check included',
          'Priority direct desk support with Research Analyst'
        ],
        isPopular: true
      }
    ],
    sectionVisibility: {
      hero: true,
      plans: true,
      feeDisclosure: true
    }
  },
  about: {
    hero: {
      badge: 'ABOUT WEGRO FINANCE',
      heading: 'Bridging Institutional Research and Disciplined Capital Allocation',
      subheading: 'Founded by senior market practitioners with decades of combined experience across institutional equity desks and corporate finance advisory.'
    },
    story: 'WeGro Finance was established to eliminate the conflict of interest endemic to retail advisory. By aligning purely with fee-only research, we provide unbiased, data-backed insights strictly compliant with SEBI (Research Analysts) Regulations, 2014.',
    mission: 'To democratize institutional-grade market research for discerning investors with unwavering integrity, fiduciary transparency, and mathematical rigor.',
    team: [
      {
        name: 'Rajesh Mehta',
        designation: 'Principal Research Analyst (NISM Series XV Certified)',
        experience: '18+ years in Indian Capital Markets, ex-Institutional Desk'
      },
      {
        name: 'Aniket Sharma',
        designation: 'Principal Officer & Head of Compliance',
        experience: '14+ years in Financial Regulation and Corporate Governance'
      }
    ],
    sectionVisibility: {
      hero: true,
      story: true,
      team: true,
      complianceValues: true
    }
  },
  contact: {
    heading: 'Connect with Our Research Desk',
    subheading: 'Have questions regarding our advisory services, compliance framework, or statutory disclosures? Reach out to our Mumbai headquarters.',
    address: 'Tower 4, 12th Floor, One International Center, Senapati Bapat Marg, Elphinstone Road, Mumbai, Maharashtra — 400013',
    phone: '+91 22 4589 7700',
    email: 'support@wegrofinance.com',
    hours: 'Monday to Friday, 9:30 AM to 6:00 PM IST',
    sectionVisibility: {
      header: true,
      details: true,
      form: true,
      map: true
    }
  },
  policies: [
    {
      id: 'disclaimer',
      slug: 'disclaimer',
      title: 'Statutory Disclaimer',
      lastUpdated: 'October 15, 2026',
      content: 'WeGro Finance is registered with the Securities and Exchange Board of India (SEBI) as a Research Analyst under Registration No. INH000014289. Research reports, market commentaries, and advisory materials published by WeGro Finance are prepared for informational and advisory purposes only and do not constitute an offer to buy or sell securities.\n\nSecurities investments are subject to market risks including loss of principal. WeGro Finance does not guarantee returns or capital preservation under any circumstances.'
    },
    {
      id: 'disclosure',
      slug: 'disclosure',
      title: 'SEBI Mandatory Disclosures',
      lastUpdated: 'October 15, 2026',
      content: 'Disclosures pursuant to SEBI (Research Analysts) Regulations, 2014:\n1. The Research Analyst or associates or relatives do not have any financial interest in the subject company.\n2. The Research Analyst or associates do not have actual/beneficial ownership of 1% or more securities of the subject company at the end of the month immediately preceding the publication date.\n3. Neither WeGro Finance nor its analysts have received any compensation from the subject company for investment banking or merchant banking services in the preceding twelve months.'
    },
    {
      id: 'terms-and-conditions',
      slug: 'terms-and-conditions',
      title: 'Terms & Conditions of Service',
      lastUpdated: 'October 10, 2026',
      content: 'By subscribing to or using the research services provided by WeGro Finance, you agree to be bound by these Terms and Conditions. All content provided is proprietary and meant exclusively for the registered subscriber. Distribution, reproduction, or commercial dissemination of research reports without prior written consent is strictly prohibited and subject to legal action under applicable Indian laws.'
    },
    {
      id: 'privacy-policy',
      slug: 'privacy-policy',
      title: 'Privacy & Data Protection Policy',
      lastUpdated: 'October 10, 2026',
      content: 'WeGro Finance complies with the Digital Personal Data Protection Act, 2023 (DPDP) and SEBI cybersecurity frameworks. We collect personal information (name, contact details, PAN, and KYC identifiers) solely for fulfilling statutory compliance and delivering advisory services. Investor data is encrypted in transit and at rest and is never sold to third parties.'
    },
    {
      id: 'investor-charter',
      slug: 'investor-charter',
      title: 'Investor Charter for Research Analysts',
      lastUpdated: 'October 1, 2026',
      content: 'A. Vision and Mission Statements for Investors:\n- Vision: Invest with knowledge & safety.\n- Mission: Every investor should be treated with fairness and transparency.\n\nB. Rights of Investors:\n- Right to receive authentic, unconflicted research recommendations.\n- Right to clear disclosures of risk factors and analyst holdings.\n- Right to timely grievance redressal through SCORES and SMART ODR.'
    },
    {
      id: 'risk-short-term-investments',
      slug: 'risk-short-term-investments',
      title: 'Risk Warning: Short-Term Investments & Trading',
      lastUpdated: 'October 1, 2026',
      content: 'Trading in cash equities, derivatives, or short-term momentum setups carries significant risk of capital depletion. Historical performance does not guarantee future results. As per SEBI studies, 9 out of 10 individual traders in the equity F&O segment incurred net losses. Clients must strictly determine whether short-term trading is suitable in light of their personal financial condition and risk tolerance.'
    }
  ]
};

// 2. Seed Complaint Board Data (Compliant with SEBI Circular format)
const complaintData = {
  header: {
    eyebrow: 'Section 1 • Statutory Filing',
    title: 'Data for the Month Ending — October 2026',
    description: 'Statutory monthly disclosure of investor grievances disposal pursuant to SEBI Master Circular for Research Analysts and Regulation 20(1) of SEBI (Research Analysts) Regulations, 2014.',
    footnote: 'Certified under Regulation 20(1) of SEBI (Research Analysts) Regulations, 2014',
    complianceOfficerName: 'Aniket Sharma (Principal Compliance Officer)',
    monthEnding: '2026-10'
  },
  section1: {
    columns: [
      { id: 'srNo', label: 'Sr. No.', isCalculated: false },
      { id: 'source', label: 'Received From', isCalculated: false },
      { id: 'carriedForward', label: 'Carried Forward from Previous Month', isCalculated: false },
      { id: 'received', label: 'Received During Month', isCalculated: false },
      { id: 'resolved', label: 'Resolved During Month', isCalculated: false },
      { id: 'pending', label: 'Total Pending', isCalculated: true },
      { id: 'pendingOver3Months', label: 'Pending > 3 Months', isCalculated: false }
    ],
    rows: [
      {
        id: 'direct',
        srNo: 1,
        source: 'Directly from Investors',
        carriedForward: 0,
        received: 0,
        resolved: 0,
        pending: 0,
        pendingOver3Months: 0,
        isOverridden: false
      },
      {
        id: 'scores',
        srNo: 2,
        source: 'SEBI (SCORES 2.0 Portal)',
        carriedForward: 0,
        received: 0,
        resolved: 0,
        pending: 0,
        pendingOver3Months: 0,
        isOverridden: false
      },
      {
        id: 'other',
        srNo: 3,
        source: 'Other Sources (BASL / Exchanges)',
        carriedForward: 0,
        received: 0,
        resolved: 0,
        pending: 0,
        pendingOver3Months: 0,
        isOverridden: false
      }
    ],
    grandTotal: {
      carriedForward: 0,
      received: 0,
      resolved: 0,
      pending: 0,
      pendingOver3Months: 0,
      isOverridden: false
    }
  },
  section2: {
    monthlyTrend: [
      { id: 'm-2026-10', monthYear: 'October 2026', carriedForward: 0, received: 0, resolved: 0, pending: 0, isCurrentMonth: true },
      { id: 'm-2026-09', monthYear: 'September 2026', carriedForward: 0, received: 0, resolved: 0, pending: 0, isCurrentMonth: false },
      { id: 'm-2026-08', monthYear: 'August 2026', carriedForward: 0, received: 0, resolved: 0, pending: 0, isCurrentMonth: false },
      { id: 'm-2026-07', monthYear: 'July 2026', carriedForward: 0, received: 0, resolved: 0, pending: 0, isCurrentMonth: false },
      { id: 'm-2026-06', monthYear: 'June 2026', carriedForward: 0, received: 0, resolved: 0, pending: 0, isCurrentMonth: false },
      { id: 'm-2026-05', monthYear: 'May 2026', carriedForward: 0, received: 0, resolved: 0, pending: 0, isCurrentMonth: false }
    ],
    annualTrend: [
      { id: 'fy-2026-27', financialYear: 'FY 2026-27 (Current YTD)', carriedForward: 0, received: 0, resolved: 0, pending: 0, isCurrentFY: true },
      { id: 'fy-2025-26', financialYear: 'FY 2025-26', carriedForward: 0, received: 0, resolved: 0, pending: 0, isCurrentFY: false },
      { id: 'fy-2024-25', financialYear: 'FY 2024-25', carriedForward: 0, received: 0, resolved: 0, pending: 0, isCurrentFY: false }
    ],
    displayMonthsCount: 6
  },
  section3: {
    auditReports: [
      {
        id: 'audit-2025-26',
        financialYear: 'FY 2025-26',
        status: 'Completed',
        reportUrl: '/reports/annual-compliance-audit-fy25-26.pdf',
        adverseFindings: 'Nil (Full statutory compliance certified by independent peer-reviewed chartered accountant)'
      },
      {
        id: 'audit-2024-25',
        financialYear: 'FY 2024-25',
        status: 'Completed',
        reportUrl: '/reports/annual-compliance-audit-fy24-25.pdf',
        adverseFindings: 'Nil'
      },
      {
        id: 'audit-2026-27',
        financialYear: 'FY 2026-27',
        status: 'In progress',
        reportUrl: '',
        adverseFindings: 'Annual audit will be initiated at closure of financial year.'
      }
    ]
  },
  lastPublishedAt: '2026-10-15T12:00:00.000Z',
  publishedBy: 'admin',
  isDraft: false
};

// 3. Seed Investor Callback Leads
const leads = [
  {
    id: 'lead-1',
    name: 'Siddharth Iyer',
    phone: '+91 98201 54321',
    email: 'siddharth.iyer@example.com',
    productService: 'Fundamental Equity Growth Advisory',
    message: 'Interested in annual subscription for long term family portfolio.',
    createdAt: '2026-10-18T14:30:00.000Z',
    consentGiven: true,
    consentTimestamp: '2026-10-18T14:30:00.000Z',
    status: 'New',
    internalNotes: 'High conviction lead from Mumbai. Prefers callback after 4 PM.',
    pan: 'ABCDE1234F',
    dob: '1984-06-15'
  },
  {
    id: 'lead-2',
    name: 'Pooja Agarwal',
    phone: '+91 98450 98765',
    email: 'pooja.agarwal@example.com',
    productService: 'Tactical Momentum & Swing Strategy',
    message: 'Requesting sample research note on mid-cap breakout setups.',
    createdAt: '2026-10-17T11:15:00.000Z',
    consentGiven: true,
    consentTimestamp: '2026-10-17T11:15:00.000Z',
    status: 'Contacted',
    internalNotes: 'Shared introductory brochure and sample risk-reward report.',
    pan: 'BNMPK9876Q',
    dob: '1991-11-28'
  },
  {
    id: 'lead-3',
    name: 'Kunal Deshmukh',
    phone: '+91 99220 11223',
    email: 'kunal.d@example.com',
    productService: 'Comprehensive Portfolio Forensic Audit',
    message: 'Hold 45 different stocks through various apps; need rationalization.',
    createdAt: '2026-10-15T09:40:00.000Z',
    consentGiven: true,
    consentTimestamp: '2026-10-15T09:40:00.000Z',
    status: 'Closed',
    internalNotes: 'Onboarded for Portfolio Audit service. KYC verified.',
    pan: 'XYZPD4567M',
    dob: '1979-03-22'
  }
];

// 4. Seed Default Admin User
// Default password hash for 'wegro@123' generated with bcryptjs 10 rounds
const adminUsers = [
  {
    id: 'admin-1',
    username: 'admin',
    passwordHash: '$2b$10$zSXHHbZ6jbrXveJ.oWymqe6gXHIzvT87YuifVEordNFHDdau1hGEK',
    mustChangePassword: true,
    role: 'superadmin',

    createdAt: '2026-10-01T00:00:00.000Z'
  }
];

// 5. Seed Initial Audit Log
const auditLog = [
  {
    id: 'audit-init-1',
    timestamp: '2026-10-15T12:00:00.000Z',
    userId: 'admin-1',
    username: 'admin',
    action: 'PUBLISH_COMPLAINTS',
    entityType: 'complaint_board',
    entityId: '2026-10',
    summary: 'Published statutory grievance disposal filing for Month Ending October 2026',
    changes: {
      monthEnding: { previous: '2026-09', current: '2026-10' },
      status: { previous: 'Draft', current: 'Published' }
    }
  }
];

// Write files to data/db
fs.writeFileSync(path.join(dbDir, 'site_content.json'), JSON.stringify(siteContent, null, 2), 'utf-8');
console.log('✅ Created data/db/site_content.json');

fs.writeFileSync(path.join(dbDir, 'complaint_data.json'), JSON.stringify(complaintData, null, 2), 'utf-8');
console.log('✅ Created data/db/complaint_data.json');

fs.writeFileSync(path.join(dbDir, 'leads.json'), JSON.stringify(leads, null, 2), 'utf-8');
console.log('✅ Created data/db/leads.json');

fs.writeFileSync(path.join(dbDir, 'admin_users.json'), JSON.stringify(adminUsers, null, 2), 'utf-8');
console.log('✅ Created data/db/admin_users.json');

fs.writeFileSync(path.join(dbDir, 'audit_log.json'), JSON.stringify(auditLog, null, 2), 'utf-8');
console.log('✅ Created data/db/audit_log.json');

console.log('\n🎉 WeGro Database seeding completed successfully!');
console.log('Default credentials: ID: admin | Password: wegro@123 (mustChangePassword: true)');
