/**
 * Structured Content Map: Page -> Sections -> Editable Fields
 * Defines the schema metadata used by the Admin Dashboard Site Content Editor
 */

export interface FieldDefinition {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'richtext' | 'number' | 'image' | 'button' | 'list' | 'boolean' | 'select';
  description?: string;
  placeholder?: string;
  options?: string[];
  itemSchema?: FieldDefinition[];
}

export interface SectionDefinition {
  id: string;
  name: string;
  description: string;
  canHide?: boolean;
  fields: FieldDefinition[];
}

export interface PageDefinition {
  id: string;
  name: string;
  path: string;
  description: string;
  sections: SectionDefinition[];
}

export const contentMap: PageDefinition[] = [
  {
    id: "global",
    name: "Global Identity & Navigation",
    path: "/*",
    description: "Header navigation, footer corporate identity, regulatory credentials, office locations, and universal risk disclosures.",
    sections: [
      {
        id: "branding",
        name: "Corporate Brand & Credentials",
        description: "Official entity names, SEBI/BSE registrations, and brand tagline.",
        fields: [
          { key: "brandName", label: "Brand Display Name", type: "text", placeholder: "WeGro" },
          { key: "legalName", label: "Full Legal Entity Name", type: "text", placeholder: "WeGro Research Analysts Private Limited" },
          { key: "tagline", label: "Corporate Tagline / Philosophy", type: "textarea" },
          { key: "logoEmblemUrl", label: "Logo Emblem Image", type: "image", description: "PNG/SVG image URL for header and footer emblem" },
          { key: "sebiRegistrationNumber", label: "SEBI RA Registration Number", type: "text", placeholder: "INH000008093" },
          { key: "bseMembershipNumber", label: "BSE / BASL Membership Number", type: "text", placeholder: "5422" },
          { key: "cinNumber", label: "Corporate Identity Number (CIN)", type: "text", placeholder: "U72900MH2020PTC346236" },
          { key: "regulatoryStatus", label: "Footer Regulatory Badge Text", type: "text" }
        ]
      },
      {
        id: "risk",
        name: "Universal Risk Warning",
        description: "Statutory SEBI risk warning stored once and referenced across all footers, disclaimers, and banners.",
        fields: [
          { key: "riskWarning", label: "SEBI Prescribed Risk Warning", type: "textarea", description: "Mandatory securities market risk disclosure" }
        ]
      },
      {
        id: "offices",
        name: "Office Locations",
        description: "Physical corporate addresses in Mumbai and Bengaluru.",
        fields: [
          { key: "offices.registeredOffice.title", label: "Registered Office Title", type: "text" },
          { key: "offices.registeredOffice.address", label: "Registered Office Address (Mumbai)", type: "textarea" },
          { key: "offices.principalPlace.title", label: "Principal Office Title", type: "text" },
          { key: "offices.principalPlace.address", label: "Principal Office Address (Bengaluru)", type: "textarea" }
        ]
      },
      {
        id: "contact",
        name: "Contact Desks & Portals",
        description: "Public contact channels and statutory dispute portal links.",
        fields: [
          { key: "contact.email", label: "Primary Support Email", type: "text" },
          { key: "contact.phone", label: "Support Contact Numbers", type: "text" },
          { key: "contact.supportHours", label: "Operating & Trading Hours", type: "text" },
          { key: "officialPortals.sebiScores", label: "SEBI SCORES Portal URL", type: "text" },
          { key: "officialPortals.sebiScoresApp", label: "SEBI SCORES Mobile App URL", type: "text" },
          { key: "officialPortals.smartOdr", label: "SMART ODR Portal URL", type: "text" },
          { key: "officialPortals.odrCircular", label: "ODR Circular Reference URL", type: "text" }
        ]
      },
      {
        id: "navigation",
        name: "Navigation Links",
        description: "Header navigation bar links and footer legal document links.",
        fields: [
          {
            key: "navigation",
            label: "Header Nav Links",
            type: "list",
            itemSchema: [
              { key: "label", label: "Link Label", type: "text" },
              { key: "path", label: "Target Path / URL", type: "text" }
            ]
          },
          {
            key: "importantLinks",
            label: "Footer Legal & Statutory Links",
            type: "list",
            itemSchema: [
              { key: "label", label: "Link Label", type: "text" },
              { key: "path", label: "Target Path / URL", type: "text" },
              { key: "isExternal", label: "Open in New Tab", type: "boolean" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "home",
    name: "Home Page",
    path: "/",
    description: "Main landing page containing hero banner, lead generation form, corporate stats bar, about overview, and key pillars.",
    sections: [
      {
        id: "home-hero",
        name: "Hero Section",
        description: "Primary visual banner with lead form and credibility checkmarks.",
        canHide: false,
        fields: [
          { key: "hero.eyebrow", label: "Eyebrow Badge", type: "text" },
          { key: "hero.headline", label: "Main Headline", type: "text" },
          { key: "hero.subheadline", label: "Subheadline Description", type: "textarea" },
          {
            key: "hero.checkmarks",
            label: "Trust Badges / Checkmarks",
            type: "list",
            itemSchema: [{ key: "item", label: "Badge Label", type: "text" }]
          }
        ]
      },
      {
        id: "home-lead-form",
        name: "Lead Generation Form",
        description: "Interactive callback request form on hero right column.",
        canHide: false,
        fields: [
          { key: "leadForm.title", label: "Form Title", type: "text" },
          { key: "leadForm.subtitle", label: "Form Subtitle", type: "textarea" },
          { key: "leadForm.submitBtnLabel", label: "Button Label", type: "text" },
          { key: "leadForm.disclaimerText", label: "Disclaimer Note", type: "text" },
          {
            key: "leadForm.productOptions",
            label: "Selectable Product Options",
            type: "list",
            itemSchema: [{ key: "item", label: "Product Name", type: "text" }]
          }
        ]
      },
      {
        id: "home-highlights",
        name: "Corporate Highlights Bar",
        description: "3-column experience, dedication, and update rhythm highlights.",
        canHide: true,
        fields: [
          {
            key: "highlights",
            label: "Highlights List",
            type: "list",
            itemSchema: [
              { key: "title", label: "Highlight Statement", type: "textarea" },
              { key: "icon", label: "Icon Name", type: "text" }
            ]
          }
        ]
      },
      {
        id: "home-about-summary",
        name: "About WeGro Overview",
        description: "Concise corporate background summary with CTA button.",
        canHide: true,
        fields: [
          { key: "aboutSummary.eyebrow", label: "Section Eyebrow", type: "text" },
          { key: "aboutSummary.title", label: "Section Title", type: "text" },
          { key: "aboutSummary.description", label: "Body Text", type: "textarea" },
          { key: "aboutSummary.ctaBtnLabel", label: "Button Label", type: "text" },
          { key: "aboutSummary.ctaBtnPath", label: "Button Destination Path", type: "text" }
        ]
      },
      {
        id: "home-pillars",
        name: "Key Value Pillars",
        description: "4 foundational strength cards (Research, Customer Focus, Risk Management, Vibrancy).",
        canHide: true,
        fields: [
          { key: "keyPillars.eyebrow", label: "Section Eyebrow", type: "text" },
          { key: "keyPillars.title", label: "Section Title", type: "text" },
          { key: "keyPillars.description", label: "Section Description", type: "textarea" },
          {
            key: "keyPillars.items",
            label: "Pillars List",
            type: "list",
            itemSchema: [
              { key: "title", label: "Pillar Name", type: "text" },
              { key: "description", label: "Description", type: "textarea" },
              { key: "icon", label: "Icon Name", type: "text" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "about",
    name: "About Page",
    path: "/about",
    description: "Detailed institutional transparency page with hero metrics, doctrine, 4-stage research funnel, comparison table, and FAQs.",
    sections: [
      {
        id: "about-hero",
        name: "Hero Header",
        description: "Dark luxury obsidian hero header with credential copy pills.",
        canHide: false,
        fields: [
          { key: "hero.badge", label: "Top Badge Text", type: "text" },
          { key: "hero.title", label: "Headline Main Text", type: "text" },
          { key: "hero.titleHighlight", label: "Headline Highlight Text (Teal)", type: "text" },
          { key: "hero.description", label: "Hero Body Paragraph", type: "textarea" }
        ]
      },
      {
        id: "about-stats",
        name: "Transparency Metrics Bar",
        description: "4 key quantitative statistics with animated tickers.",
        canHide: true,
        fields: [
          {
            key: "stats",
            label: "Stats List",
            type: "list",
            itemSchema: [
              { key: "number", label: "Metric Number Value", type: "number" },
              { key: "prefix", label: "Prefix (e.g. 1:)", type: "text" },
              { key: "suffix", label: "Suffix (e.g. %, -Stage)", type: "text" },
              { key: "label", label: "Metric Label", type: "text" },
              { key: "subtext", label: "Metric Explanatory Subtext", type: "textarea" }
            ]
          }
        ]
      },
      {
        id: "about-doctrine",
        name: "The WeGro Doctrine",
        description: "3 pillars of discipline (Capital Preservation, Mathematical Determinism, Fiduciary Independence).",
        canHide: true,
        fields: [
          { key: "doctrine.eyebrow", label: "Eyebrow Label", type: "text" },
          { key: "doctrine.title", label: "Section Title", type: "text" },
          { key: "doctrine.description", label: "Section Description", type: "textarea" },
          {
            key: "doctrine.pillars",
            label: "Doctrine Pillars List",
            type: "list",
            itemSchema: [
              { key: "romanNumeral", label: "Numeral (I, II, III)", type: "text" },
              { key: "title", label: "Pillar Title", type: "text" },
              { key: "description", label: "Pillar Rationale", type: "textarea" }
            ]
          }
        ]
      },
      {
        id: "about-funnel",
        name: "4-Stage Research Funnel",
        description: "Interactive quantitative analytical gates.",
        canHide: true,
        fields: [
          { key: "researchFunnel.eyebrow", label: "Eyebrow Label", type: "text" },
          { key: "researchFunnel.title", label: "Section Title", type: "text" },
          { key: "researchFunnel.description", label: "Section Description", type: "textarea" },
          {
            key: "researchFunnel.gates",
            label: "Gates List",
            type: "list",
            itemSchema: [
              { key: "gateId", label: "Gate Identifier (e.g. GATE 01)", type: "text" },
              { key: "title", label: "Gate Name", type: "text" },
              { key: "badge", label: "Category Badge", type: "text" },
              { key: "summary", label: "Gate Summary", type: "textarea" },
              { key: "rejectionTrigger", label: "Disqualification Trigger", type: "textarea" },
              { key: "outputAudit", label: "Verified Pipeline Output", type: "textarea" }
            ]
          }
        ]
      },
      {
        id: "about-faqs",
        name: "Regulatory FAQs",
        description: "5 common questions regarding advisory status, PMS prohibition, and grievance options.",
        canHide: true,
        fields: [
          { key: "faqs.eyebrow", label: "Section Eyebrow", type: "text" },
          { key: "faqs.title", label: "Section Title", type: "text" },
          { key: "faqs.description", label: "Section Description", type: "textarea" },
          {
            key: "faqs.items",
            label: "FAQ Items",
            type: "list",
            itemSchema: [
              { key: "question", label: "Question", type: "text" },
              { key: "answer", label: "Answer (Rich Text / Paragraph)", type: "textarea" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "services",
    name: "Services Page",
    path: "/services",
    description: "Detailed syllabus for research packages across Equities, Derivatives, and Commodities.",
    sections: [
      {
        id: "services-hero",
        name: "Hero Header",
        description: "Header banner for advisory services.",
        canHide: false,
        fields: [
          { key: "hero.eyebrow", label: "Eyebrow Label", type: "text" },
          { key: "hero.title", label: "Page Title", type: "text" },
          { key: "hero.description", label: "Page Description", type: "textarea" }
        ]
      },
      {
        id: "services-list",
        name: "Advisory Service Packages",
        description: "Full configuration for each research product (name, segment, deliverables, risk level).",
        canHide: false,
        fields: [
          {
            key: "services",
            label: "Services List",
            type: "list",
            itemSchema: [
              { key: "name", label: "Service Name", type: "text" },
              { key: "category", label: "Category", type: "text" },
              { key: "badge", label: "Badge Tag", type: "text" },
              { key: "headline", label: "Headline", type: "text" },
              { key: "shortDesc", label: "Short Description", type: "textarea" },
              { key: "segment", label: "Exchange / Segment", type: "text" },
              { key: "holdingPeriod", label: "Holding Period / Horizon", type: "text" },
              { key: "suitability", label: "Investor Suitability", type: "textarea" },
              { key: "riskLevel", label: "Risk Level", type: "select", options: ["Low", "Moderate", "High", "Very High"] },
              { key: "riskNote", label: "Risk Note", type: "textarea" },
              { key: "pricingNote", label: "Pricing Notice", type: "text" },
              { key: "isVisible", label: "Show on Public Site", type: "boolean" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "pricing",
    name: "Pricing Page",
    path: "/pricing",
    description: "Fee schedules, subscription terms, and mandatory SEBI fee advisory notices.",
    sections: [
      {
        id: "pricing-hero",
        name: "Hero Header",
        description: "Advisory fee schedule header.",
        canHide: false,
        fields: [
          { key: "hero.eyebrow", label: "Eyebrow", type: "text" },
          { key: "hero.title", label: "Headline", type: "text" },
          { key: "hero.description", label: "Description", type: "textarea" }
        ]
      },
      {
        id: "pricing-compliance",
        name: "Compliance Notice",
        description: "SEBI fee payment compliance banner.",
        canHide: false,
        fields: [
          { key: "complianceNotice.title", label: "Notice Title", type: "text" },
          { key: "complianceNotice.content", label: "Notice Text", type: "textarea" }
        ]
      }
    ]
  },
  {
    id: "contact",
    name: "Contact Page",
    path: "/contact",
    description: "Communication channels, operational hours, and inquiry guidelines.",
    sections: [
      {
        id: "contact-hero",
        name: "Hero Header",
        description: "Header banner for contact desk.",
        canHide: false,
        fields: [
          { key: "hero.eyebrow", label: "Eyebrow", type: "text" },
          { key: "hero.title", label: "Title", type: "text" },
          { key: "hero.description", label: "Description", type: "textarea" }
        ]
      },
      {
        id: "contact-desk",
        name: "Communications Desk Info",
        description: "Operational hours and instructions.",
        canHide: false,
        fields: [
          { key: "deskInfo.title", label: "Desk Title", type: "text" },
          { key: "deskInfo.supportHours", label: "Trading Days & Support Hours", type: "text" },
          { key: "deskInfo.note", label: "Instructions Note", type: "textarea" }
        ]
      }
    ]
  },
  {
    id: "complaints",
    name: "Complaint Board (Statutory Filing)",
    path: "/complaints",
    description: "SEBI statutory filing data, monthly & annual disposal trends, audit reports, and escalation matrix. Full unrestricted editing.",
    sections: [
      {
        id: "complaints-header",
        name: "Statutory Header & Regulatory References",
        description: "Section eyebrow, month ending picker, circular reference, footnote, and compliance officer.",
        canHide: false,
        fields: [
          { key: "header.eyebrow", label: "Section Eyebrow", type: "text" },
          { key: "header.title", label: "Section Title", type: "text" },
          { key: "header.monthEnding", label: "Month Ending", type: "text", description: "e.g. October 2026" },
          { key: "header.circularRef", label: "SEBI Circular Reference Paragraph", type: "textarea" },
          { key: "header.footnote", label: "Footnote / Certification Text", type: "text" },
          { key: "header.complianceOfficerName", label: "Compliance Officer Name", type: "text" }
        ]
      },
      {
        id: "complaints-section1",
        name: "Section 1: Current Month Complaints Table",
        description: "Editable rows, columns, and numbers with live calculation & manual overrides.",
        canHide: false,
        fields: [
          {
            key: "section1.rows",
            label: "Complaint Sources (Rows)",
            type: "list",
            itemSchema: [
              { key: "source", label: "Received From (Source Name)", type: "text" },
              { key: "pendingLastMonth", label: "Pending End of Last Month", type: "number" },
              { key: "received", label: "Received During Month", type: "number" },
              { key: "resolved", label: "Resolved During Month", type: "number" },
              { key: "totalPending", label: "Total Pending", type: "number" },
              { key: "pendingOverMonths", label: "Pending Complaints > Months", type: "number" },
              { key: "avgResolutionDays", label: "Average Resolution Time (Days)", type: "text" }
            ]
          }
        ]
      },
      {
        id: "complaints-section2",
        name: "Section 2: Historical Disposal Trends",
        description: "Monthly trend history and Indian financial year (FY) annual history.",
        canHide: false,
        fields: [
          { key: "section2.monthlyCountToShow", label: "Number of Months to Display", type: "number" },
          {
            key: "section2.monthlyTrend",
            label: "Monthly Trend Rows",
            type: "list",
            itemSchema: [
              { key: "month", label: "Month Name", type: "text" },
              { key: "carried", label: "Carried Forward", type: "number" },
              { key: "received", label: "Received", type: "number" },
              { key: "resolved", label: "Resolved", type: "number" },
              { key: "pending", label: "Pending", type: "number" },
              { key: "isCurrentMonth", label: "Is Current Month (M-T-D)", type: "boolean" }
            ]
          },
          {
            key: "section2.annualTrend",
            label: "Annual Trend (FY) Rows",
            type: "list",
            itemSchema: [
              { key: "year", label: "Financial Year (e.g. FY 2025–26)", type: "text" },
              { key: "carried", label: "Carried Forward", type: "number" },
              { key: "received", label: "Received", type: "number" },
              { key: "resolved", label: "Resolved", type: "number" },
              { key: "pending", label: "Pending", type: "number" },
              { key: "isCurrentYear", label: "Is Current Financial Year (YTD)", type: "boolean" }
            ]
          }
        ]
      },
      {
        id: "complaints-section3",
        name: "Annual Compliance Audit Reports",
        description: "Audited reports list with status, PDF uploads/URLs, and adverse findings.",
        canHide: false,
        fields: [
          {
            key: "section3.auditReports",
            label: "Audit Reports List",
            type: "list",
            itemSchema: [
              { key: "financialYear", label: "Financial Year", type: "text" },
              { key: "status", label: "Audit Status", type: "select", options: ["Completed", "In progress", "Not applicable"] },
              { key: "reportUrl", label: "Report Document / PDF URL", type: "text" },
              { key: "fileName", label: "File Name", type: "text" },
              { key: "adverseFindings", label: "Adverse Findings / Auditor Comments", type: "textarea" }
            ]
          }
        ]
      },
      {
        id: "complaints-escalation",
        name: "4-Tier Grievance Escalation Matrix",
        description: "Ordered escalation steps from Support Desk up to Principal Officer / CEO.",
        canHide: false,
        fields: [
          {
            key: "escalationMatrix",
            label: "Escalation Tiers",
            type: "list",
            itemSchema: [
              { key: "level", label: "Level (e.g. Level 1)", type: "text" },
              { key: "title", label: "Tier Title", type: "text" },
              { key: "authority", label: "Designated Authority", type: "text" },
              { key: "email", label: "Email Address", type: "text" },
              { key: "phone", label: "Contact Phone", type: "text" },
              { key: "sla", label: "Resolution SLA Timeline", type: "text" },
              { key: "summary", label: "Scope Summary", type: "textarea" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "policies",
    name: "Regulatory Policy Pages",
    path: "/disclosures, /terms, /privacy-policy, etc.",
    description: "Statutory policies, Disclosures, Terms & Conditions, Privacy Policy, Investor Charter, and ODR.",
    sections: [
      {
        id: "policy-editor",
        name: "Policy Content Editor",
        description: "Rich text editor with automated last-updated stamping.",
        canHide: false,
        fields: [
          { key: "title", label: "Policy Title", type: "text" },
          { key: "subtitle", label: "Policy Subtitle", type: "text" },
          { key: "lastUpdated", label: "Last Updated Stamped Date", type: "text" },
          {
            key: "sections",
            label: "Policy Clauses / Sections",
            type: "list",
            itemSchema: [
              { key: "heading", label: "Clause Heading", type: "text" },
              { key: "content", label: "Clause Body (Rich Text)", type: "textarea" }
            ]
          }
        ]
      }
    ]
  }
];
