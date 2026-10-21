export interface GlobalContent {
  brandName: string;
  legalName: string;
  tagline: string;
  logoEmblemUrl: string;
  sebiRegistrationNumber: string;
  bseMembershipNumber: string;
  cinNumber: string;
  regulatoryStatus: string;
  riskWarning: string;
  offices: {
    registeredOffice: {
      title: string;
      address: string;
    };
    principalPlace: {
      title: string;
      address: string;
    };
  };
  contact: {
    email: string;
    phone: string;
    supportHours: string;
  };
  complianceOfficer: {
    name: string;
    title: string;
    email: string;
    phone: string;
    address: string;
  };
  officialPortals: {
    sebiScores: string;
    sebiScoresApp: string;
    smartOdr: string;
    odrCircular: string;
  };
  navigation: Array<{ label: string; path: string; isExternal?: boolean }>;
  importantLinks: Array<{ label: string; path: string; isExternal?: boolean }>;
  socialLinks?: Array<{ platform: string; url: string }>;
}

export interface HomeContent {
  hero: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    checkmarks: string[];
    requestCallbackBtnLabel: string;
  };
  leadForm: {
    title: string;
    subtitle: string;
    productOptions: string[];
    submitBtnLabel: string;
    disclaimerText: string;
  };
  highlights: Array<{
    id: string;
    title: string;
    icon: string;
  }>;
  aboutSummary: {
    eyebrow: string;
    title: string;
    description: string;
    ctaBtnLabel: string;
    ctaBtnPath: string;
  };
  keyPillars: {
    eyebrow: string;
    title: string;
    description: string;
    items: Array<{
      id: string;
      title: string;
      description: string;
      icon: string;
    }>;
  };
}

export interface AboutContent {
  hero: {
    badge: string;
    title: string;
    titleHighlight: string;
    description: string;
  };
  stats: Array<{
    id: string;
    number: number;
    prefix?: string;
    suffix?: string;
    label: string;
    subtext: string;
  }>;
  doctrine: {
    eyebrow: string;
    title: string;
    description: string;
    pillars: Array<{
      id: string;
      romanNumeral: string;
      title: string;
      description: string;
      icon: string;
    }>;
  };
  researchFunnel: {
    eyebrow: string;
    title: string;
    description: string;
    gates: Array<{
      gateId: string;
      title: string;
      badge: string;
      summary: string;
      metrics: Array<{ label: string; desc: string }>;
      rejectionTrigger: string;
      outputAudit: string;
    }>;
  };
  radicalTransparency: {
    eyebrow: string;
    title: string;
    description: string;
    whatWeStandFor: {
      title: string;
      subtitle: string;
      items: string[];
    };
    whatWeBan: {
      title: string;
      subtitle: string;
      items: string[];
    };
  };
  faqs: {
    eyebrow: string;
    title: string;
    description: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
  ctaBanner: {
    title: string;
    subtitle: string;
    btnLabel: string;
    btnPath: string;
  };
}

export interface ServiceItem {
  id: string;
  category: string;
  name: string;
  badge: string;
  headline: string;
  shortDesc: string;
  segment: string;
  holdingPeriod: string;
  suitability: string;
  keyDeliverables: string[];
  riskLevel: string;
  riskNote: string;
  pricingNote: string;
  isVisible?: boolean;
}

export interface ServicesContent {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
  };
  services: ServiceItem[];
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  badge?: string;
  popular?: boolean;
  features: string[];
  ctaLabel?: string;
}

export interface FeePrinciple {
  title: string;
  description: string;
}

export interface PricingContent {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
  };
  complianceNotice: {
    title: string;
    content: string;
  };
  plans?: PricingPlan[];
  feePrinciples?: FeePrinciple[];
}


export interface ContactContent {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
  };
  deskInfo: {
    title: string;
    supportHours: string;
    note: string;
  };
}

export interface PolicySection {
  heading: string;
  content: string;
}

export interface PolicyPage {
  slug: string;
  title: string;
  subtitle: string;
  lastUpdated: string;
  sections: PolicySection[];
}

export interface SeoSettings {
  pages: Record<string, {
    title: string;
    description: string;
    keywords?: string;
    ogImage?: string;
  }>;
}

export interface SiteContent {
  global: GlobalContent;
  home: HomeContent;
  about: AboutContent;
  services: ServicesContent;
  pricing: PricingContent;
  contact: ContactContent;
  policies: Record<string, PolicyPage>;
  seo: SeoSettings;
  sectionVisibility?: Record<string, boolean>;
}

// -------------------------------------------------------------
// COMPLAINT BOARD MODEL
// -------------------------------------------------------------
export interface ComplaintColumn {
  key: string;
  label: string;
  minWidth?: number;
  align?: 'left' | 'center' | 'right';
  isEditable?: boolean;
}

export interface ComplaintRow {
  id: string;
  sno: string | number;
  source: string;
  pendingLastMonth: number;
  received: number;
  resolved: number;
  totalPending: number;
  pendingOverMonths: number;
  avgResolutionDays: string | number;
  isOverridden?: Record<string, boolean>; // e.g. { totalPending: true }
}

export interface MonthlyTrendRow {
  sno: number;
  month: string;
  carried: number;
  received: number;
  resolved: number;
  pending: number;
  isCurrentMonth?: boolean;
  isOverridden?: boolean;
}

export interface AnnualTrendRow {
  sno: number;
  year: string;
  carried: number;
  received: number;
  resolved: number;
  pending: number;
  isCurrentYear?: boolean;
  isOverridden?: boolean;
}

export interface AuditReportItem {
  id: string;
  financialYear: string;
  status: 'Completed' | 'In progress' | 'Not applicable';
  reportUrl?: string;
  fileName?: string;
  adverseFindings: string;
}

export interface ComplaintBoardData {
  header: {
    eyebrow: string;
    title: string;
    monthEnding: string; // e.g. "October 2026"
    circularRef: string;
    footnote: string;
    complianceOfficerName: string;
  };
  section1: {
    columns: ComplaintColumn[];
    rows: ComplaintRow[];
    grandTotalOverride?: {
      pendingLastMonth?: number;
      received?: number;
      resolved?: number;
      totalPending?: number;
      pendingOverMonths?: number;
      avgResolutionDays?: string | number;
      isOverridden?: boolean;
    };
  };
  section2: {
    monthlyCountToShow: number;
    monthlyTrend: MonthlyTrendRow[];
    annualTrend: AnnualTrendRow[];
  };
  section3: {
    auditReports: AuditReportItem[];
  };
  escalationMatrix: Array<{
    level: string;
    title: string;
    authority: string;
    email: string;
    phone: string;
    sla: string;
    summary: string;
    scopeItems: string[];
  }>;
  isPublished: boolean;
  lastPublishedAt?: string;
  publishedBy?: string;
}

// -------------------------------------------------------------
// LEADS MODEL
// -------------------------------------------------------------
export interface LeadItem {
  id: string;
  name: string;
  mobile: string;
  email: string;
  productName: string;
  panNumber?: string;
  dob?: string;
  message?: string;
  consentGiven: boolean;
  consentTimestamp: string;
  status: 'New' | 'Contacted' | 'Closed';
  internalNotes?: string;
  createdAt: string;
}

// -------------------------------------------------------------
// AUDIT LOG & ADMIN USER MODEL
// -------------------------------------------------------------
export interface AuditLogEntry {
  id: string;
  userId: string;
  username: string;
  action: string;
  target: string;
  previousValue?: any;
  newValue?: any;
  timestamp: string;
  ipAddress?: string;
}

export interface AdminUser {
  id: string;
  username: string;
  passwordHash: string;
  mustChangePassword: boolean;
  role: 'superadmin' | 'editor';
  createdAt: string;
  lastLoginAt?: string;
}
