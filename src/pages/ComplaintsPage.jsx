import React, { useState } from 'react';
import {
  ShieldAlert,
  Scale,
  ExternalLink,
  FileText,
  AlertTriangle,
  Building,
  Mail,
  Phone,
  CheckCircle2,
  Clock,
  ArrowRight,
  Search,
  ChevronDown,
  ChevronUp,
  Send,
  HelpCircle,
  Copy,
  Check,
  Download,
  AlertCircle,
  LayoutGrid,
  Table as TableIcon,
  Edit3,
  Lock,
  RotateCcw
} from 'lucide-react';
import { companyConfig } from '../data/companyConfig';

export default function ComplaintsPage({ navigate }) {
  // Table 1 View Mode (Defaults to 'table' on desktop/tablet matching audited filing, 'cards' on mobile)
  const [table1ViewMode, setTable1ViewMode] = useState(() => (typeof window !== 'undefined' && window.innerWidth < 768 ? 'cards' : 'table'));

  // Tab states for Trend Analysis (Monthly vs Annual)
  const [trendTab, setTrendTab] = useState('monthly'); // 'monthly' | 'annual'
  const [trendViewMode, setTrendViewMode] = useState('cards'); // 'cards' | 'table'

  // 4-Tier Matrix View State (Defaults to Accordion on mobile for scannability, Stepper on desktop)
  const [matrixMode, setMatrixMode] = useState(() => (typeof window !== 'undefined' && window.innerWidth < 768 ? 'accordion' : 'stepper'));
  const [activeTierIndex, setActiveTierIndex] = useState(0); // 0 (Level 1) to 3 (Level 4)
  const [accordionOpenTier, setAccordionOpenTier] = useState(0); // For accordion mode

  // Interactive Grievance Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    clientId: '',
    department: 'Advisory Recommendations & Reports',
    escalationLevel: 'Level 1: Support Desk',
    subject: '',
    description: '',
    consent: true
  });

  const [formSubmitting, setFormSubmitting] = useState(false);
  const [ticketGenerated, setTicketGenerated] = useState(null);
  const [formError, setFormError] = useState('');
  const [copiedTicket, setCopiedTicket] = useState(false);

  // Status Lookup State
  const [trackerInput, setTrackerInput] = useState('');
  const [searchedTicket, setSearchedTicket] = useState({
    id: 'WG-GRV-849201',
    statusType: 'in_review', // 'pending' | 'in_review' | 'resolved'
    statusLabel: 'Under Active Scrutiny — Compliance Audit',
    statusBadgeColor: '#702632',
    statusBadgeBg: '#fffbeb',
    statusBadgeBorder: '#fde68a',
    date: '17 Oct 2026',
    time: '10:45 AM IST',
    name: 'Vikramaditya Mehta',
    department: 'Advisory Recommendations & Reports',
    level: 'Level 2: Head of Customer Relations',
    subject: 'Verification of swing trading radar alert dispatch time',
    currentStage: 2, // 1 to 4
    explanation: 'Level 1 Support Desk completed factual review on 18 Oct. The ticket is currently undergoing formal review with our Regulatory Compliance Desk.',
    slaTarget: '21 Oct 2026, 5:30 PM IST (Guaranteed Turnaround)'
  });
  const [trackerError, setTrackerError] = useState('');

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState(null);

  // SEBI Prescribed Table 1: Data for Month Ending October 2026 (Audited Filing Data)
  const initialMonthlyData = [
    {
      sno: 1,
      source: 'Support',
      pendingLastMonth: 0,
      received: 2,
      resolved: 2,
      totalPending: 0,
      pendingOverMonths: 0,
      avgResolutionDays: '-'
    },
    {
      sno: 2,
      source: 'SEBI Scores',
      pendingLastMonth: 4,
      received: 8,
      resolved: 11,
      totalPending: 1,
      pendingOverMonths: 0,
      avgResolutionDays: '-'
    },
    {
      sno: 3,
      source: 'Other Sources',
      pendingLastMonth: 5,
      received: 0,
      resolved: 0,
      totalPending: 5,
      pendingOverMonths: 5,
      avgResolutionDays: '0'
    }
  ];

  const [monthlyDisposalData, setMonthlyDisposalData] = useState(initialMonthlyData);
  const [isEditingData, setIsEditingData] = useState(false);

  // Dynamic Grand Total calculation matching the statutory summary
  const grandTotal = {
    pendingLastMonth: monthlyDisposalData.reduce((acc, r) => acc + (parseInt(r.pendingLastMonth, 10) || 0), 0),
    received: monthlyDisposalData.reduce((acc, r) => acc + (parseInt(r.received, 10) || 0), 0),
    resolved: monthlyDisposalData.reduce((acc, r) => acc + (parseInt(r.resolved, 10) || 0), 0),
    totalPending: monthlyDisposalData.reduce((acc, r) => acc + (parseInt(r.totalPending, 10) || 0), 0),
    pendingOverMonths: monthlyDisposalData.reduce((acc, r) => acc + (parseInt(r.pendingOverMonths, 10) || 0), 0),
    avgResolutionDays: '0'
  };

  const handleCellChange = (index, field, value) => {
    setMonthlyDisposalData((prev) => {
      const next = [...prev];
      const updatedRow = { ...next[index], [field]: value };
      if (['pendingLastMonth', 'received', 'resolved'].includes(field)) {
        const p = parseInt(field === 'pendingLastMonth' ? value : updatedRow.pendingLastMonth, 10) || 0;
        const r = parseInt(field === 'received' ? value : updatedRow.received, 10) || 0;
        const res = parseInt(field === 'resolved' ? value : updatedRow.resolved, 10) || 0;
        updatedRow.totalPending = Math.max(0, p + r - res);
      }
      next[index] = updatedRow;
      return next;
    });
  };

  const resetToDefaultMonthlyData = () => {
    setMonthlyDisposalData(initialMonthlyData);
  };

  // Table 2A: Monthly Trend (Last 6 Months: May 2026 - October 2026)
  const monthlyTrendData = [
    { sno: 1, month: 'May 2026', carried: 0, received: 1, resolved: 1, pending: 0 },
    { sno: 2, month: 'June 2026', carried: 0, received: 0, resolved: 0, pending: 0 },
    { sno: 3, month: 'July 2026', carried: 0, received: 2, resolved: 2, pending: 0 },
    { sno: 4, month: 'August 2026', carried: 0, received: 1, resolved: 1, pending: 0 },
    { sno: 5, month: 'September 2026', carried: 0, received: 0, resolved: 0, pending: 0 },
    { sno: 6, month: 'October 2026 (M-T-D)', carried: 9, received: 10, resolved: 13, pending: 6 }
  ];

  // Table 2B: Annual Trend (Last 3 Financial Years)
  const annualTrendData = [
    { sno: 1, year: 'FY 2023–24', carried: 0, received: 3, resolved: 3, pending: 0 },
    { sno: 2, year: 'FY 2024–25', carried: 0, received: 4, resolved: 4, pending: 0 },
    { sno: 3, year: 'FY 2025–26 (YTD)', carried: 0, received: 14, resolved: 17, pending: 6 }
  ];

  // 4-Tier Internal Escalation Matrix (Simplified & Scannable)
  const escalationTiers = [
    {
      level: 'Level 1',
      title: 'Client Support Desk',
      authority: 'Senior Support Executive',
      email: companyConfig.contact?.email || 'support@wegro.in',
      phone: companyConfig.contact?.phone || '+91 80 4718 5555',
      sla: 'Within 24–48 Business Hours',
      summary: 'First-response desk for all operational & advisory inquiries.',
      scopeItems: [
        'Subscription access, report delivery & account queries',
        'Billing clarifications & tax invoice issuance',
        'Initial factual review of research rationale'
      ]
    },
    {
      level: 'Level 2',
      title: 'Head of Customer Relations',
      authority: 'Grievance Redressal Lead',
      email: 'complaints@wegro.in',
      phone: '+91 80 4718 5555 (Ext. 204)',
      sla: 'Within 3 Business Days',
      summary: 'Senior desk for delayed or unsatisfactory Level 1 resolutions.',
      scopeItems: [
        'Unresolved tickets exceeding 48h from Level 1 desk',
        'Service delivery disputes & analyst communication audit',
        'Inter-departmental investigation into technical anomalies'
      ]
    },
    {
      level: 'Level 3',
      title: 'Compliance & Grievance Officer',
      authority: companyConfig.complianceOfficer?.name || 'Mr. Ramesh Sharma, CS',
      email: companyConfig.complianceOfficer?.email || 'compliance@wegro.in',
      phone: companyConfig.complianceOfficer?.phone || '+91 80 4718 5556',
      sla: 'Within 7 Business Days',
      summary: 'Statutory compliance authority ensuring adherence to SEBI norms.',
      scopeItems: [
        'SEBI (Research Analysts) Regulations 2014 statutory compliance',
        'Investor Charter rights protection & code of conduct scrutiny',
        'Formal supervisory inquiry & corrective action planning (CAPA)'
      ]
    },
    {
      level: 'Level 4',
      title: 'Principal Officer & CEO Desk',
      authority: 'Principal Officer & CEO',
      email: 'principal@wegro.in',
      phone: '+91 80 4718 5555 (Desk: CEO)',
      sla: 'Within 10 Business Days',
      summary: 'Apex internal authority for final adjudication before SEBI SCORES / ODR.',
      scopeItems: [
        'Final corporate adjudication of complex contentious claims',
        'Institutional dispute review prior to external regulatory escalation',
        'Direct oversight of SEBI SCORES & SMART ODR compliance filings'
      ]
    }
  ];

  // Frequently Asked Questions
  const faqs = [
    {
      q: 'What is the maximum time for WeGro to resolve an investor grievance?',
      a: 'In adherence to SEBI norms, WeGro aims to redress all operational queries within 24 to 48 business hours and resolve formal written grievances within 21 calendar days (mandated statutory outer limit is 30 days).'
    },
    {
      q: 'What should I do if my grievance is not resolved within 30 days?',
      a: 'If your grievance remains unaddressed after 30 calendar days, or if you are dissatisfied with our resolution, you have the statutory right to escalate directly to the SEBI SCORES 2.0 portal (scores.sebi.gov.in) or initiate online conciliation/arbitration through the SMART ODR portal (smartodr.in).'
    },
    {
      q: 'Does filing a complaint on SMART ODR require physical attendance or legal representation?',
      a: 'No. The Securities Market Approach for Resolution Through ODR Portal (SMART ODR) operates 100% digitally. All proceedings, documentation submission, and conciliation hearings occur online via institutional dispute resolution bodies recognized by SEBI.'
    },
    {
      q: 'How does WeGro track and prevent repeated investor grievances?',
      a: 'Every ticket is audited monthly by our Principal Officer and Compliance Officer. Recurring operational friction or advisory misunderstanding results in root-cause corrective action (CAPA) logged under our compliance charter.'
    }
  ];

  // Handle Form Submit
  const handleLodgeSubmit = (e) => {
    e.preventDefault();

    if (!formData.fullName.trim()) {
      setFormError('Please enter your full legal name as registered.');
      return;
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      setFormError('Please provide a valid registered email address.');
      return;
    }
    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      setFormError('Please enter a valid 10-digit Indian mobile number.');
      return;
    }
    if (!formData.subject.trim()) {
      setFormError('Please provide a brief subject for your grievance.');
      return;
    }
    if (!formData.description.trim() || formData.description.trim().length < 20) {
      setFormError('Please describe your grievance in detail (minimum 20 characters).');
      return;
    }
    if (!formData.consent) {
      setFormError('You must acknowledge the grievance registration consent.');
      return;
    }

    setFormError('');
    setFormSubmitting(true);

    setTimeout(() => {
      const generatedCode = `WG-GRV-${Math.floor(100000 + Math.random() * 900000)}`;
      const now = new Date();
      const ticketPayload = {
        id: generatedCode,
        statusType: 'pending',
        statusLabel: 'Pending — Acknowledged & Logged in Registry',
        statusBadgeColor: '#0e7490',
        statusBadgeBg: '#f0fdfa',
        statusBadgeBorder: '#99f6e4',
        date: now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
        time: now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        name: formData.fullName,
        department: formData.department,
        level: formData.escalationLevel,
        subject: formData.subject,
        currentStage: 1,
        explanation: 'Your grievance has been safely logged in our SEBI Compliance Audit Register. Support desk assignment is currently underway. First contact within 24 business hours.',
        slaTarget: 'Turnaround within 48 Business Hours'
      };

      setFormSubmitting(false);
      setTicketGenerated(ticketPayload);
      setSearchedTicket(ticketPayload);
    }, 850);
  };

  // Lookup preset ticket samples
  const loadPresetTicket = (presetId) => {
    setTrackerInput(presetId);
    setTrackerError('');

    if (presetId === 'WG-GRV-849201') {
      setSearchedTicket({
        id: 'WG-GRV-849201',
        statusType: 'in_review',
        statusLabel: 'In Review — Compliance Desk Audit',
        statusBadgeColor: '#702632',
        statusBadgeBg: '#fffbeb',
        statusBadgeBorder: '#fde68a',
        date: '17 Oct 2026',
        time: '10:45 AM IST',
        name: 'Vikramaditya Mehta',
        department: 'Advisory Recommendations & Reports',
        level: 'Level 2: Head of Customer Relations',
        subject: 'Verification of swing trading radar alert dispatch time',
        currentStage: 2,
        explanation: 'Level 1 Support Desk completed factual review on 18 Oct. The ticket is currently undergoing formal review with our Regulatory Compliance Desk.',
        slaTarget: '21 Oct 2026, 5:30 PM IST (Guaranteed Turnaround)'
      });
    } else if (presetId === 'WG-GRV-512044') {
      setSearchedTicket({
        id: 'WG-GRV-512044',
        statusType: 'resolved',
        statusLabel: 'Resolved & Closed — Solution Dispatched',
        statusBadgeColor: '#14532d',
        statusBadgeBg: '#ecfdf5',
        statusBadgeBorder: '#86efac',
        date: '12 Oct 2026',
        time: '03:15 PM IST',
        name: 'Pooja Kashyap',
        department: 'Subscription Delivery & App Access',
        level: 'Level 1: Client Support Desk',
        subject: 'Invoice re-issuance with updated GSTIN details',
        currentStage: 4,
        explanation: 'Revised tax invoice was generated and transmitted to subscriber registered email on 13 Oct 2026. Ticket verified by Compliance Officer.',
        slaTarget: 'Completed & Certified within 24 Hours'
      });
    } else if (presetId === 'WG-GRV-103982') {
      setSearchedTicket({
        id: 'WG-GRV-103982',
        statusType: 'pending',
        statusLabel: 'Pending — Queue Assignment Underway',
        statusBadgeColor: '#0e7490',
        statusBadgeBg: '#f0fdfa',
        statusBadgeBorder: '#99f6e4',
        date: '19 Oct 2026',
        time: '09:10 AM IST',
        name: 'Arjun Singhania',
        department: 'Billing, Fees & Invoicing',
        level: 'Level 1: Client Support Desk',
        subject: 'Renewal billing transaction query',
        currentStage: 1,
        explanation: 'Payment gateway confirmation logged in registry. Support specialist assigned to review banking clearance statement.',
        slaTarget: 'Target Resolution: 20 Oct 2026, 1:00 PM IST'
      });
    }
  };

  // Handle Status Lookup
  const handleTrackerSearch = (e) => {
    e.preventDefault();
    const query = trackerInput.trim().toUpperCase();

    if (!query) {
      setTrackerError('Please enter a valid Ticket Reference Number (e.g. WG-GRV-849201).');
      return;
    }

    setTrackerError('');

    if (query === 'WG-GRV-849201' || query === 'WG-GRV-512044' || query === 'WG-GRV-103982') {
      loadPresetTicket(query);
    } else if (ticketGenerated && ticketGenerated.id === query) {
      setSearchedTicket(ticketGenerated);
    } else if (query.startsWith('WG-GRV-')) {
      setSearchedTicket({
        id: query,
        statusType: 'in_review',
        statusLabel: 'In Review — Investigation In Progress',
        statusBadgeColor: '#702632',
        statusBadgeBg: '#fffbeb',
        statusBadgeBorder: '#fde68a',
        date: '18 Oct 2026',
        time: '11:20 AM IST',
        name: 'Registered Subscriber',
        department: 'Service Delivery & Advisory Clarity',
        level: 'Level 2: Head of Customer Relations',
        subject: 'Inquiry regarding research report delivery protocol',
        currentStage: 2,
        explanation: 'Support desk has completed preliminary fact-finding. Formal statement drafted for Compliance Desk sign-off.',
        slaTarget: 'Target Resolution: Within 48 Business Hours'
      });
    } else {
      setTrackerError(`No record found for "${query}". Ticket numbers follow the format WG-GRV-XXXXXX.`);
      setSearchedTicket(null);
    }
  };

  const copyTicketId = () => {
    if (ticketGenerated?.id) {
      navigator.clipboard.writeText(ticketGenerated.id);
      setCopiedTicket(true);
      setTimeout(() => setCopiedTicket(false), 2500);
    }
  };

  const activeTier = escalationTiers[activeTierIndex];

  return (
    <div className="complaints-page-wrapper">
      {/* =========================================================================
          1. HERO HEADER SECTION
          ========================================================================= */}
      <section className="complaints-hero-section">
        <div className="container">
          <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '6px 14px',
                borderRadius: 999,
                background: 'rgba(148, 185, 175, 0.12)',
                border: '1px solid rgba(148, 185, 175, 0.3)',
                color: '#94B9AF',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                marginBottom: 16,
                maxWidth: '100%',
                boxSizing: 'border-box'
              }}
            >
              <Scale size={14} style={{ flexShrink: 0 }} />
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                SEBI Disclosure • Investor Grievance Mechanism
              </span>
            </div>

            <h1
              style={{
                fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
                fontWeight: 800,
                color: '#FFFFFA',
                letterSpacing: '-0.03em',
                lineHeight: 1.2,
                marginBottom: 16
              }}
            >
              Complaint Board & Grievance Redressal
            </h1>

            <p
              style={{
                fontSize: 'clamp(0.875rem, 1.3vw, 1.05rem)',
                color: 'rgba(255, 255, 250, 0.78)',
                lineHeight: 1.6,
                maxWidth: 720,
                margin: '0 auto 24px auto'
              }}
            >
              In strict adherence to SEBI (Research Analysts) Regulations, 2014 & SEBI Master Circulars.
              WeGrow maintains a transparent, institutional grievance redressal system with 100% audited monthly complaint reporting and structured 4-tier internal escalation.
            </p>

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: 8,
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)'
              }}
            >
              <span style={{ padding: '5px 10px', background: 'rgba(255, 255, 255, 0.06)', borderRadius: 6, border: '1px solid rgba(255, 255, 255, 0.12)', color: 'rgba(255, 255, 250, 0.9)' }}>
                SEBI Reg: <strong>{companyConfig.sebiRegistrationNumber}</strong>
              </span>
              <span style={{ padding: '5px 10px', background: 'rgba(255, 255, 255, 0.06)', borderRadius: 6, border: '1px solid rgba(255, 255, 255, 0.12)', color: 'rgba(255, 255, 250, 0.9)' }}>
                BSE Member ID: <strong>{companyConfig.bseMembershipNumber}</strong>
              </span>
              <span style={{ padding: '5px 10px', background: 'rgba(148, 185, 175, 0.15)', borderRadius: 6, border: '1px solid rgba(148, 185, 175, 0.4)', color: '#94B9AF' }}>
                Audit: <strong>Month Ending October 2026</strong>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. STATUTORY COMPLIANCE NOTICE BANNER
          ========================================================================= */}
      <section
        style={{
          background: '#0d0c0a',
          borderBottom: '1px solid rgba(148, 185, 175, 0.16)',
          padding: '14px 0'
        }}
      >
        <div className="container">
          <div className="complaints-notice-banner">
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, color: '#f59e0b', fontSize: '0.8125rem' }}>
              <AlertTriangle size={18} style={{ flexShrink: 0, marginTop: 2 }} />
              <span style={{ color: 'rgba(255, 255, 250, 0.88)', lineHeight: 1.5 }}>
                <strong style={{ color: '#f59e0b' }}>Mandatory SEBI Disclosure:</strong> Research Analysts are required to display complaints data on their website by the 7th of every succeeding month.
              </span>
            </div>

            <div className="complaints-notice-actions">
              <a
                href="#lodge-complaint"
                className="btn btn-sm btn-primary"
                style={{ fontSize: '0.75rem', padding: '6px 14px', flex: '1 1 auto', justifyContent: 'center' }}
              >
                <span>Lodge Grievance</span>
                <ArrowRight size={12} />
              </a>
              <a
                href="#scores-odr"
                className="btn btn-sm btn-secondary"
                style={{ fontSize: '0.75rem', padding: '6px 14px', flex: '1 1 auto', justifyContent: 'center' }}
              >
                <span>SCORES & ODR Links</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. COMPLIANCE METRICS RIBBON (Live Status)
          ========================================================================= */}
      <section style={{ padding: '32px 0 20px 0', background: '#f8faf9', borderBottom: '1px solid rgba(8, 7, 5, 0.08)' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))',
              gap: 16
            }}
          >
            {/* KPI 1: Disposal Rate */}
            <div
              style={{
                background: '#FFFFFA',
                padding: '18px 20px',
                borderRadius: 14,
                border: '1px solid rgba(8, 7, 5, 0.08)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)'
              }}
            >
              <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'rgba(8, 7, 5, 0.55)', textTransform: 'uppercase', marginBottom: 4 }}>
                Disposal Rate (Oct 2026)
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#080705', fontFamily: 'var(--font-mono)' }}>
                {Math.round((grandTotal.resolved / (grandTotal.pendingLastMonth + grandTotal.received || 1)) * 100)}%
              </div>
              <div style={{ fontSize: '0.75rem', color: '#16a34a', display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
                <CheckCircle2 size={13} />
                <span>{grandTotal.resolved} of {grandTotal.pendingLastMonth + grandTotal.received} complaints disposed</span>
              </div>
            </div>

            {/* KPI 2: Total Pending */}
            <div
              style={{
                background: '#FFFFFA',
                padding: '18px 20px',
                borderRadius: 14,
                border: '1px solid rgba(8, 7, 5, 0.08)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)'
              }}
            >
              <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'rgba(8, 7, 5, 0.55)', textTransform: 'uppercase', marginBottom: 4 }}>
                Total Pending Complaints
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#702632', fontFamily: 'var(--font-mono)' }}>
                {grandTotal.totalPending}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(8, 7, 5, 0.65)', marginTop: 4 }}>
                {grandTotal.pendingOverMonths} pending &gt; 3 months
              </div>
            </div>

            {/* KPI 3: Avg Response */}
            <div
              style={{
                background: '#FFFFFA',
                padding: '18px 20px',
                borderRadius: 14,
                border: '1px solid rgba(8, 7, 5, 0.08)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)'
              }}
            >
              <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'rgba(8, 7, 5, 0.55)', textTransform: 'uppercase', marginBottom: 4 }}>
                Avg Initial Response
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#080705', fontFamily: 'var(--font-mono)' }}>
                &lt; 24h
              </div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(8, 7, 5, 0.65)', marginTop: 4 }}>
                Fast acknowledgement SLA
              </div>
            </div>

            {/* KPI 4: SCORES Resolution */}
            <div
              style={{
                background: '#FFFFFA',
                padding: '18px 20px',
                borderRadius: 14,
                border: '1px solid rgba(8, 7, 5, 0.08)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)'
              }}
            >
              <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'rgba(8, 7, 5, 0.55)', textTransform: 'uppercase', marginBottom: 4 }}>
                SEBI SCORES Disposed
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#080705', fontFamily: 'var(--font-mono)' }}>
                11
              </div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(8, 7, 5, 0.65)', marginTop: 4 }}>
                1 pending under scrutiny
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. STATUTORY COMPLAINT DATA TABLES (SEBI Mandated Layout + Mobile Stacking)
          ========================================================================= */}
      <section id="complaint-data" style={{ padding: '48px 0', borderBottom: '1px solid rgba(8, 7, 5, 0.08)' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14, marginBottom: 24 }}>
            <div>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  textTransform: 'uppercase',
                  color: '#702632',
                  fontWeight: 700,
                  letterSpacing: '0.06em'
                }}
              >
                Section 1 • Statutory Filing
              </span>
              <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#080705', marginTop: 4, marginBottom: 6 }}>
                Data for the Month Ending — October 2026
              </h2>
              <p style={{ color: 'rgba(8, 7, 5, 0.68)', fontSize: '0.875rem', maxWidth: 840, lineHeight: 1.55 }}>
                In accordance with SEBI circular SEBI/HO/IMD/DF1/CIR/P/2021/688, research analysts are required to display complaints received from investors, disposed of, and pending on their website.
              </p>
            </div>

            {/* Action Buttons: Edit Inputs Toggle + Reset + View Switcher */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              {isEditingData && (
                <button
                  type="button"
                  onClick={resetToDefaultMonthlyData}
                  style={{
                    padding: '6px 12px',
                    borderRadius: 8,
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    background: '#FFFFFA',
                    border: '1px solid rgba(8, 7, 5, 0.15)',
                    color: '#080705',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6
                  }}
                  title="Reset to uploaded October 2026 audit values"
                >
                  <RotateCcw size={13} />
                  <span>Reset Default Values</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => setIsEditingData(!isEditingData)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 8,
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  border: isEditingData ? '1px solid #702632' : '1px solid rgba(8, 7, 5, 0.15)',
                  background: isEditingData ? '#702632' : '#FFFFFA',
                  color: isEditingData ? '#FFFFFA' : '#080705',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)'
                }}
              >
                {isEditingData ? (
                  <>
                    <Lock size={13} />
                    <span>Save & Lock Inputs</span>
                  </>
                ) : (
                  <>
                    <Edit3 size={13} style={{ color: '#702632' }} />
                    <span>Edit Monthly Inputs</span>
                  </>
                )}
              </button>

              {/* View Switcher: Table vs Cards */}
              <div
                style={{
                  display: 'inline-flex',
                  padding: 4,
                  borderRadius: 10,
                  background: '#ecefe9',
                  border: '1px solid rgba(8, 7, 5, 0.08)'
                }}
              >
                <button
                  type="button"
                  onClick={() => setTable1ViewMode('table')}
                  style={{
                    padding: '6px 12px',
                    borderRadius: 8,
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 5,
                    background: table1ViewMode === 'table' ? '#FFFFFA' : 'transparent',
                    color: table1ViewMode === 'table' ? '#080705' : 'rgba(8, 7, 5, 0.6)',
                    boxShadow: table1ViewMode === 'table' ? '0 2px 6px rgba(0, 0, 0, 0.08)' : 'none'
                  }}
                >
                  <TableIcon size={13} />
                  <span>Full Table</span>
                </button>
                <button
                  type="button"
                  onClick={() => setTable1ViewMode('cards')}
                  style={{
                    padding: '6px 12px',
                    borderRadius: 8,
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 5,
                    background: table1ViewMode === 'cards' ? '#FFFFFA' : 'transparent',
                    color: table1ViewMode === 'cards' ? '#080705' : 'rgba(8, 7, 5, 0.6)',
                    boxShadow: table1ViewMode === 'cards' ? '0 2px 6px rgba(0, 0, 0, 0.08)' : 'none'
                  }}
                >
                  <LayoutGrid size={13} />
                  <span>Mobile Cards</span>
                </button>
              </div>
            </div>
          </div>

          {/* VIEW MODE 1: Full Statutory Table (Matching exact screenshot structure) */}
          {table1ViewMode === 'table' && (
            <div className="sebi-statutory-table-wrapper">
              <table className="sebi-statutory-table" aria-label="Data for the Month Ending — October 2026">
                <thead>
                  <tr>
                    <th style={{ width: 60, textAlign: 'center' }}>Sr. No.</th>
                    <th style={{ minWidth: 130 }}>Received from</th>
                    <th style={{ minWidth: 135 }}>Pending at the end of last month</th>
                    <th style={{ minWidth: 80, textAlign: 'center' }}>Received</th>
                    <th style={{ minWidth: 80, textAlign: 'center' }}>Resolved</th>
                    <th style={{ minWidth: 95, textAlign: 'center' }}>Total Pending</th>
                    <th style={{ minWidth: 135 }}>Pending Complaints &gt; Months</th>
                    <th style={{ minWidth: 145 }}>Average Resolution Time (in days)</th>
                  </tr>
                </thead>
                <tbody>
                  {monthlyDisposalData.map((row, idx) => (
                    <tr key={row.sno}>
                      <td style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{row.sno}</td>
                      <td style={{ fontWeight: 600, color: '#080705' }}>{row.source}</td>
                      <td>
                        {isEditingData ? (
                          <input
                            type="number"
                            min="0"
                            className="sebi-table-input"
                            value={row.pendingLastMonth}
                            onChange={(e) => handleCellChange(idx, 'pendingLastMonth', e.target.value)}
                          />
                        ) : (
                          <span style={{ fontFamily: 'var(--font-mono)' }}>{row.pendingLastMonth}</span>
                        )}
                      </td>
                      <td>
                        {isEditingData ? (
                          <input
                            type="number"
                            min="0"
                            className="sebi-table-input"
                            value={row.received}
                            onChange={(e) => handleCellChange(idx, 'received', e.target.value)}
                          />
                        ) : (
                          <span style={{ fontFamily: 'var(--font-mono)' }}>{row.received}</span>
                        )}
                      </td>
                      <td>
                        {isEditingData ? (
                          <input
                            type="number"
                            min="0"
                            className="sebi-table-input"
                            value={row.resolved}
                            onChange={(e) => handleCellChange(idx, 'resolved', e.target.value)}
                          />
                        ) : (
                          <span style={{ fontFamily: 'var(--font-mono)', color: row.resolved > 0 ? '#15803d' : 'inherit' }}>{row.resolved}</span>
                        )}
                      </td>
                      <td>
                        {isEditingData ? (
                          <input
                            type="number"
                            min="0"
                            className="sebi-table-input"
                            value={row.totalPending}
                            onChange={(e) => handleCellChange(idx, 'totalPending', e.target.value)}
                          />
                        ) : (
                          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: row.totalPending > 0 ? '#702632' : 'inherit' }}>
                            {row.totalPending}
                          </span>
                        )}
                      </td>
                      <td>
                        {isEditingData ? (
                          <input
                            type="number"
                            min="0"
                            className="sebi-table-input"
                            value={row.pendingOverMonths}
                            onChange={(e) => handleCellChange(idx, 'pendingOverMonths', e.target.value)}
                          />
                        ) : (
                          <span style={{ fontFamily: 'var(--font-mono)' }}>{row.pendingOverMonths}</span>
                        )}
                      </td>
                      <td>
                        {isEditingData ? (
                          <input
                            type="text"
                            className="sebi-table-input"
                            value={row.avgResolutionDays}
                            onChange={(e) => handleCellChange(idx, 'avgResolutionDays', e.target.value)}
                          />
                        ) : (
                          <span style={{ fontFamily: 'var(--font-mono)' }}>{row.avgResolutionDays}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                  <tr className="total-row">
                    <td></td>
                    <td style={{ fontWeight: 800, color: '#080705' }}>Grand Total</td>
                    <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{grandTotal.pendingLastMonth}</td>
                    <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{grandTotal.received}</td>
                    <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#15803d' }}>{grandTotal.resolved}</td>
                    <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#702632' }}>{grandTotal.totalPending}</td>
                    <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{grandTotal.pendingOverMonths}</td>
                    <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{grandTotal.avgResolutionDays}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* VIEW MODE 2: Mobile-Optimized Stacked Cards View */}
          {table1ViewMode === 'cards' && (
            <div className="sebi-mobile-cards-grid" style={{ marginBottom: 20 }}>
              {monthlyDisposalData.map((row) => (
                <div key={row.sno} className="sebi-mobile-stat-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ width: 24, height: 24, borderRadius: '50%', background: '#080705', color: '#FFFFFA', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                        {row.sno}
                      </span>
                      <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#080705' }}>
                        {row.source}
                      </h4>
                    </div>
                    <span style={{ fontSize: '0.75rem', background: row.totalPending > 0 ? '#fff1f2' : '#ecfdf5', color: row.totalPending > 0 ? '#9f1239' : '#047857', border: row.totalPending > 0 ? '1px solid #fecdd3' : '1px solid #a7f3d0', padding: '2px 8px', borderRadius: 999, fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                      {row.totalPending} Total Pending
                    </span>
                  </div>

                  <div className="sebi-mobile-stat-row">
                    <div className="sebi-mobile-stat-pill">
                      <div className="sebi-mobile-stat-pill-label">Pending Last Mo</div>
                      <div className="sebi-mobile-stat-pill-value">{row.pendingLastMonth}</div>
                    </div>
                    <div className="sebi-mobile-stat-pill">
                      <div className="sebi-mobile-stat-pill-label">Received</div>
                      <div className="sebi-mobile-stat-pill-value">{row.received}</div>
                    </div>
                    <div className="sebi-mobile-stat-pill">
                      <div className="sebi-mobile-stat-pill-label">Resolved</div>
                      <div className="sebi-mobile-stat-pill-value" style={{ color: '#16a34a' }}>{row.resolved}</div>
                    </div>
                    <div className="sebi-mobile-stat-pill">
                      <div className="sebi-mobile-stat-pill-label">Total Pending</div>
                      <div className="sebi-mobile-stat-pill-value" style={{ color: row.totalPending > 0 ? '#702632' : 'inherit' }}>{row.totalPending}</div>
                    </div>
                    <div className="sebi-mobile-stat-pill">
                      <div className="sebi-mobile-stat-pill-label">Pending &gt; Mos</div>
                      <div className="sebi-mobile-stat-pill-value">{row.pendingOverMonths}</div>
                    </div>
                    <div className="sebi-mobile-stat-pill">
                      <div className="sebi-mobile-stat-pill-label">Avg Res (Days)</div>
                      <div className="sebi-mobile-stat-pill-value">{row.avgResolutionDays}</div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Grand Total Card */}
              <div className="sebi-mobile-stat-card is-total">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#080705' }}>
                    Grand Total (October 2026)
                  </div>
                  <span style={{ fontSize: '0.75rem', background: '#fff1f2', color: '#9f1239', border: '1px solid #fecdd3', padding: '3px 10px', borderRadius: 999, fontWeight: 800, fontFamily: 'var(--font-mono)' }}>
                    {grandTotal.totalPending} Total Pending
                  </span>
                </div>

                <div className="sebi-mobile-stat-row">
                  <div className="sebi-mobile-stat-pill">
                    <div className="sebi-mobile-stat-pill-label">Pending Last Mo</div>
                    <div className="sebi-mobile-stat-pill-value">{grandTotal.pendingLastMonth}</div>
                  </div>
                  <div className="sebi-mobile-stat-pill">
                    <div className="sebi-mobile-stat-pill-label">Total Received</div>
                    <div className="sebi-mobile-stat-pill-value">{grandTotal.received}</div>
                  </div>
                  <div className="sebi-mobile-stat-pill">
                    <div className="sebi-mobile-stat-pill-label">Total Resolved</div>
                    <div className="sebi-mobile-stat-pill-value" style={{ color: '#16a34a' }}>{grandTotal.resolved}</div>
                  </div>
                  <div className="sebi-mobile-stat-pill">
                    <div className="sebi-mobile-stat-pill-label">Total Pending</div>
                    <div className="sebi-mobile-stat-pill-value" style={{ color: '#702632' }}>{grandTotal.totalPending}</div>
                  </div>
                  <div className="sebi-mobile-stat-pill">
                    <div className="sebi-mobile-stat-pill-label">Pending &gt; Mos</div>
                    <div className="sebi-mobile-stat-pill-value">{grandTotal.pendingOverMonths}</div>
                  </div>
                  <div className="sebi-mobile-stat-pill">
                    <div className="sebi-mobile-stat-pill-label">Avg Res (Days)</div>
                    <div className="sebi-mobile-stat-pill-value">{grandTotal.avgResolutionDays}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 10,
              fontSize: '0.8125rem',
              color: 'rgba(8, 7, 5, 0.65)'
            }}
          >
            <div>
              * Certified under Regulation 20(1) of SEBI (Research Analysts) Regulations, 2014.
            </div>
            <div style={{ fontFamily: 'var(--font-mono)' }}>
              Compliance Officer: <strong>{companyConfig.complianceOfficer?.name}</strong>
            </div>
          </div>

          {/* Section 2: Historical Trend Analysis (Monthly vs Annual Tabs) */}
          <div style={{ marginTop: 36 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14, marginBottom: 18 }}>
              <div>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono)',
                    textTransform: 'uppercase',
                    color: '#702632',
                    fontWeight: 700,
                    letterSpacing: '0.06em'
                  }}
                >
                  Section 2 • Historical Audit
                </span>
                <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#080705', marginTop: 2 }}>
                  Trend of Complaints Disposal
                </h3>
              </div>

              {/* Tab Switcher & View Switcher */}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <div
                  style={{
                    display: 'inline-flex',
                    padding: 3,
                    borderRadius: 10,
                    background: '#ecefe9',
                    border: '1px solid rgba(8, 7, 5, 0.08)'
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setTrendTab('monthly')}
                    style={{
                      padding: '6px 12px',
                      borderRadius: 8,
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      border: 'none',
                      background: trendTab === 'monthly' ? '#FFFFFA' : 'transparent',
                      color: trendTab === 'monthly' ? '#080705' : 'rgba(8, 7, 5, 0.6)',
                      boxShadow: trendTab === 'monthly' ? '0 2px 6px rgba(0, 0, 0, 0.08)' : 'none'
                    }}
                  >
                    Monthly (6 Mos)
                  </button>
                  <button
                    type="button"
                    onClick={() => setTrendTab('annual')}
                    style={{
                      padding: '6px 12px',
                      borderRadius: 8,
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      border: 'none',
                      background: trendTab === 'annual' ? '#FFFFFA' : 'transparent',
                      color: trendTab === 'annual' ? '#080705' : 'rgba(8, 7, 5, 0.6)',
                      boxShadow: trendTab === 'annual' ? '0 2px 6px rgba(0, 0, 0, 0.08)' : 'none'
                    }}
                  >
                    Annual (3 FYs)
                  </button>
                </div>

                <div
                  style={{
                    display: 'inline-flex',
                    padding: 3,
                    borderRadius: 10,
                    background: '#ecefe9',
                    border: '1px solid rgba(8, 7, 5, 0.08)'
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setTrendViewMode('cards')}
                    style={{
                      padding: '6px 10px',
                      borderRadius: 8,
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                      background: trendViewMode === 'cards' ? '#FFFFFA' : 'transparent',
                      color: trendViewMode === 'cards' ? '#080705' : 'rgba(8, 7, 5, 0.6)'
                    }}
                  >
                    <LayoutGrid size={12} />
                    <span>Cards</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setTrendViewMode('table')}
                    style={{
                      padding: '6px 10px',
                      borderRadius: 8,
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                      background: trendViewMode === 'table' ? '#FFFFFA' : 'transparent',
                      color: trendViewMode === 'table' ? '#080705' : 'rgba(8, 7, 5, 0.6)'
                    }}
                  >
                    <TableIcon size={12} />
                    <span>Table</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Monthly Trend: Cards or Table */}
            {trendTab === 'monthly' && (
              trendViewMode === 'cards' ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: 12 }}>
                  {monthlyTrendData.map((row) => (
                    <div key={row.sno} className="sebi-mobile-stat-card">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 800, color: '#080705', fontSize: '0.95rem' }}>{row.month}</span>
                        <span style={{ fontSize: '0.75rem', background: '#ecfdf5', color: '#047857', border: '1px solid #a7f3d0', padding: '2px 8px', borderRadius: 999, fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                          {row.pending} Pending
                        </span>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginTop: 10, paddingTop: 10, borderTop: '1px solid rgba(8, 7, 5, 0.08)' }}>
                        <div className="sebi-mobile-stat-pill">
                          <div className="sebi-mobile-stat-pill-label">Carried</div>
                          <div className="sebi-mobile-stat-pill-value">{row.carried}</div>
                        </div>
                        <div className="sebi-mobile-stat-pill">
                          <div className="sebi-mobile-stat-pill-label">Received</div>
                          <div className="sebi-mobile-stat-pill-value">{row.received}</div>
                        </div>
                        <div className="sebi-mobile-stat-pill">
                          <div className="sebi-mobile-stat-pill-label">Resolved</div>
                          <div className="sebi-mobile-stat-pill-value" style={{ color: '#16a34a' }}>{row.resolved}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="sebi-table-scroll-container">
                  <div className="table-swipe-hint">
                    <ArrowRight size={13} style={{ transform: 'rotate(180deg)' }} />
                    <span>Swipe horizontally to view full trend</span>
                    <ArrowRight size={13} />
                  </div>
                  <table className="sebi-table">
                    <thead>
                      <tr style={{ background: '#12100d', color: '#FFFFFA' }}>
                        <th style={{ width: 80 }}>Sr. No.</th>
                        <th className="sticky-col-header">Month & Year</th>
                        <th style={{ textAlign: 'center' }}>Carried Forward</th>
                        <th style={{ textAlign: 'center' }}>Received</th>
                        <th style={{ textAlign: 'center' }}>Resolved</th>
                        <th style={{ textAlign: 'center' }}>Pending</th>
                      </tr>
                    </thead>
                    <tbody>
                      {monthlyTrendData.map((row, idx) => (
                        <tr
                          key={row.sno}
                          style={{ background: idx % 2 === 0 ? '#FFFFFA' : '#fcfdfc' }}
                        >
                          <td style={{ fontFamily: 'var(--font-mono)' }}>{row.sno}</td>
                          <td className="sticky-col-cell" style={{ fontWeight: 600, color: '#080705' }}>{row.month}</td>
                          <td style={{ textAlign: 'center', fontFamily: 'var(--font-mono)' }}>{row.carried}</td>
                          <td style={{ textAlign: 'center', fontFamily: 'var(--font-mono)' }}>{row.received}</td>
                          <td style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', color: '#16a34a', fontWeight: 600 }}>{row.resolved}</td>
                          <td style={{ textAlign: 'center', fontFamily: 'var(--font-mono)' }}>{row.pending}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )
            )}

            {/* Annual Trend: Cards or Table */}
            {trendTab === 'annual' && (
              trendViewMode === 'cards' ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: 12 }}>
                  {annualTrendData.map((row) => (
                    <div key={row.sno} className="sebi-mobile-stat-card">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 800, color: '#080705', fontSize: '1rem' }}>{row.year}</span>
                        <span style={{ fontSize: '0.75rem', background: '#ecfdf5', color: '#047857', border: '1px solid #a7f3d0', padding: '2px 8px', borderRadius: 999, fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                          {row.pending} Pending
                        </span>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginTop: 10, paddingTop: 10, borderTop: '1px solid rgba(8, 7, 5, 0.08)' }}>
                        <div className="sebi-mobile-stat-pill">
                          <div className="sebi-mobile-stat-pill-label">Carried Fwd</div>
                          <div className="sebi-mobile-stat-pill-value">{row.carried}</div>
                        </div>
                        <div className="sebi-mobile-stat-pill">
                          <div className="sebi-mobile-stat-pill-label">Received</div>
                          <div className="sebi-mobile-stat-pill-value">{row.received}</div>
                        </div>
                        <div className="sebi-mobile-stat-pill">
                          <div className="sebi-mobile-stat-pill-label">Resolved</div>
                          <div className="sebi-mobile-stat-pill-value" style={{ color: '#16a34a' }}>{row.resolved}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="sebi-table-scroll-container">
                  <div className="table-swipe-hint">
                    <ArrowRight size={13} style={{ transform: 'rotate(180deg)' }} />
                    <span>Swipe horizontally to view full annual trend</span>
                    <ArrowRight size={13} />
                  </div>
                  <table className="sebi-table">
                    <thead>
                      <tr style={{ background: '#12100d', color: '#FFFFFA' }}>
                        <th style={{ width: 80 }}>Sr. No.</th>
                        <th className="sticky-col-header">Financial Year</th>
                        <th style={{ textAlign: 'center' }}>Carried Forward</th>
                        <th style={{ textAlign: 'center' }}>Received</th>
                        <th style={{ textAlign: 'center' }}>Resolved</th>
                        <th style={{ textAlign: 'center' }}>Pending at FY End</th>
                      </tr>
                    </thead>
                    <tbody>
                      {annualTrendData.map((row, idx) => (
                        <tr
                          key={row.sno}
                          style={{ background: idx % 2 === 0 ? '#FFFFFA' : '#fcfdfc' }}
                        >
                          <td style={{ fontFamily: 'var(--font-mono)' }}>{row.sno}</td>
                          <td className="sticky-col-cell" style={{ fontWeight: 600, color: '#080705' }}>{row.year}</td>
                          <td style={{ textAlign: 'center', fontFamily: 'var(--font-mono)' }}>{row.carried}</td>
                          <td style={{ textAlign: 'center', fontFamily: 'var(--font-mono)' }}>{row.received}</td>
                          <td style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', color: '#16a34a', fontWeight: 600 }}>{row.resolved}</td>
                          <td style={{ textAlign: 'center', fontFamily: 'var(--font-mono)' }}>{row.pending}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. SIMPLIFIED 4-TIER ESCALATION MATRIX (Horizontal Stepper & Collapsible Accordion)
          ========================================================================= */}
      <section id="escalation-matrix" style={{ padding: '48px 0', background: '#f8faf9', borderBottom: '1px solid rgba(8, 7, 5, 0.08)' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14, marginBottom: 24 }}>
            <div>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  textTransform: 'uppercase',
                  color: '#702632',
                  fontWeight: 700,
                  letterSpacing: '0.06em'
                }}
              >
                Hierarchical Redressal
              </span>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#080705', marginTop: 4, marginBottom: 4 }}>
                4-Tier Internal Escalation Matrix
              </h2>
              <p style={{ color: 'rgba(8, 7, 5, 0.7)', fontSize: '0.875rem', maxWidth: 760, lineHeight: 1.55 }}>
                Scan through our progressive redressal hierarchy. Click any level to inspect its SLA, authority profile, and direct contact desk.
              </p>
            </div>

            {/* Stepper vs Accordion View Toggle */}
            <div
              style={{
                display: 'inline-flex',
                padding: 3,
                borderRadius: 10,
                background: '#ecefe9',
                border: '1px solid rgba(8, 7, 5, 0.08)'
              }}
            >
              <button
                type="button"
                onClick={() => setMatrixMode('stepper')}
                style={{
                  padding: '6px 12px',
                  borderRadius: 8,
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  border: 'none',
                  background: matrixMode === 'stepper' ? '#FFFFFA' : 'transparent',
                  color: matrixMode === 'stepper' ? '#080705' : 'rgba(8, 7, 5, 0.6)',
                  boxShadow: matrixMode === 'stepper' ? '0 2px 6px rgba(0, 0, 0, 0.08)' : 'none'
                }}
              >
                Horizontal Stepper
              </button>
              <button
                type="button"
                onClick={() => setMatrixMode('accordion')}
                style={{
                  padding: '6px 12px',
                  borderRadius: 8,
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  border: 'none',
                  background: matrixMode === 'accordion' ? '#FFFFFA' : 'transparent',
                  color: matrixMode === 'accordion' ? '#080705' : 'rgba(8, 7, 5, 0.6)',
                  boxShadow: matrixMode === 'accordion' ? '0 2px 6px rgba(0, 0, 0, 0.08)' : 'none'
                }}
              >
                Accordion View
              </button>
            </div>
          </div>

          {/* MODE A: Interactive Horizontal Stepper (Default) */}
          {matrixMode === 'stepper' && (
            <div>
              {/* Stepper Pills Track */}
              <div className="escalation-stepper-track">
                {escalationTiers.map((tier, idx) => {
                  const isActive = activeTierIndex === idx;
                  return (
                    <button
                      key={tier.level}
                      type="button"
                      onClick={() => setActiveTierIndex(idx)}
                      className={`escalation-step-pill ${isActive ? 'is-active' : ''}`}
                    >
                      <div className="escalation-step-number">
                        {idx + 1}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', opacity: isActive ? 0.9 : 0.6, textTransform: 'uppercase' }}>
                          {tier.level}
                        </span>
                        <span style={{ fontSize: '0.875rem', fontWeight: 700, lineHeight: 1.2 }}>
                          {tier.title}
                        </span>
                        <span style={{ fontSize: '0.6875rem', color: isActive ? '#94B9AF' : '#702632', fontWeight: 600, marginTop: 3 }}>
                          {tier.sla}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Spotlight Focus Card for Active Tier */}
              <div className="escalation-spotlight-card">
                {/* Left: Summary & Scope */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                    <span
                      style={{
                        background: '#080705',
                        color: '#FFFFFA',
                        padding: '4px 10px',
                        borderRadius: 6,
                        fontSize: '0.75rem',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 700
                      }}
                    >
                      {activeTier.level} of 4
                    </span>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontFamily: 'var(--font-mono)',
                        color: '#047857',
                        background: '#ecfdf5',
                        border: '1px solid #a7f3d0',
                        padding: '3px 8px',
                        borderRadius: 999,
                        fontWeight: 700
                      }}
                    >
                      SLA: {activeTier.sla}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#080705', marginBottom: 2 }}>
                    {activeTier.title}
                  </h3>
                  <div style={{ fontSize: '0.8125rem', color: '#702632', fontWeight: 600, marginBottom: 12 }}>
                    Designated Authority: {activeTier.authority}
                  </div>

                  <p style={{ fontSize: '0.875rem', color: 'rgba(8, 7, 5, 0.72)', lineHeight: 1.55, marginBottom: 16 }}>
                    {activeTier.summary}
                  </p>

                  <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#080705', marginBottom: 6 }}>
                    Key Jurisdictional Scope:
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {activeTier.scopeItems.map((item, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: '0.8125rem', color: 'rgba(8, 7, 5, 0.8)' }}>
                        <CheckCircle2 size={14} style={{ color: '#16a34a', flexShrink: 0, marginTop: 2 }} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Direct Desk Card */}
                <div
                  style={{
                    background: '#f8faf9',
                    borderRadius: 14,
                    border: '1px solid #e2e8f0',
                    padding: '20px 18px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 14
                  }}
                >
                  <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', color: 'rgba(8, 7, 5, 0.55)' }}>
                    Direct Escalation Desk Contact
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(145, 47, 64, 0.1)', color: '#912F40', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Mail size={16} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.6875rem', color: 'rgba(8, 7, 5, 0.6)' }}>Official Grievance Inbox</div>
                      <a href={`mailto:${activeTier.email}`} style={{ color: '#080705', fontWeight: 700, fontSize: '0.875rem', wordBreak: 'break-all' }}>
                        {activeTier.email}
                      </a>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(148, 185, 175, 0.18)', color: '#080705', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Phone size={16} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.6875rem', color: 'rgba(8, 7, 5, 0.6)' }}>Telephone Helpline</div>
                      <div style={{ color: '#080705', fontWeight: 700, fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>
                        {activeTier.phone}
                      </div>
                    </div>
                  </div>

                  <div style={{ paddingTop: 8, borderTop: '1px solid rgba(8, 7, 5, 0.08)' }}>
                    <a
                      href="#lodge-complaint"
                      onClick={() => setFormData({ ...formData, escalationLevel: `${activeTier.level}: ${activeTier.title}` })}
                      className="btn btn-sm btn-primary"
                      style={{ width: '100%', justifyContent: 'center' }}
                    >
                      <span>Lodge Grievance at {activeTier.level}</span>
                      <ArrowRight size={13} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MODE B: Collapsible Accordion Mode */}
          {matrixMode === 'accordion' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {escalationTiers.map((tier, idx) => {
                const isOpen = accordionOpenTier === idx;
                return (
                  <div
                    key={tier.level}
                    style={{
                      background: '#FFFFFA',
                      borderRadius: 14,
                      border: '1px solid rgba(8, 7, 5, 0.12)',
                      overflow: 'hidden',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)'
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setAccordionOpenTier(isOpen ? null : idx)}
                      style={{
                        width: '100%',
                        padding: '16px 18px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        background: isOpen ? '#f4f7f5' : 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        textAlign: 'left',
                        gap: 10
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                        <span style={{ background: '#080705', color: '#FFFFFA', padding: '3px 8px', borderRadius: 6, fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                          {tier.level}
                        </span>
                        <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#080705' }}>
                          {tier.title}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: '#702632', fontWeight: 600 }}>
                          • {tier.authority}
                        </span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                        <span style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: '#047857', background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '2px 6px', borderRadius: 999, fontWeight: 600 }}>
                          {tier.sla}
                        </span>
                        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </div>
                    </button>

                    {isOpen && (
                      <div style={{ padding: '16px 18px 20px 18px', borderTop: '1px solid rgba(8, 7, 5, 0.08)' }}>
                        <p style={{ fontSize: '0.875rem', color: 'rgba(8, 7, 5, 0.75)', lineHeight: 1.55, marginBottom: 14 }}>
                          {tier.summary}
                        </p>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
                          <div>
                            <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#080705', marginBottom: 6 }}>
                              Specific Scope:
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                              {tier.scopeItems.map((item, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8125rem', color: 'rgba(8, 7, 5, 0.8)' }}>
                                  <CheckCircle2 size={13} style={{ color: '#16a34a', flexShrink: 0 }} />
                                  <span>{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div style={{ background: '#f8faf9', padding: 14, borderRadius: 10, fontSize: '0.8125rem', display: 'flex', flexDirection: 'column', gap: 6 }}>
                            <div>
                              <strong>Email Desk:</strong>{' '}
                              <a href={`mailto:${tier.email}`} style={{ color: '#912F40', wordBreak: 'break-all' }}>{tier.email}</a>
                            </div>
                            <div>
                              <strong>Phone:</strong> <span style={{ fontFamily: 'var(--font-mono)' }}>{tier.phone}</span>
                            </div>
                            <div>
                              <strong>Standard SLA:</strong> {tier.sla}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* =========================================================================
          6. STATUTORY REGULATORY REDRESSAL PORTALS (SEBI SCORES & SMART ODR)
          ========================================================================= */}
      <section id="scores-odr" style={{ padding: '48px 0', borderBottom: '1px solid rgba(8, 7, 5, 0.08)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 28px auto' }}>
            <span
              style={{
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                textTransform: 'uppercase',
                color: '#702632',
                fontWeight: 700,
                letterSpacing: '0.06em'
              }}
            >
              External Statutory Recourse
            </span>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#080705', marginTop: 4, marginBottom: 8 }}>
              Official Regulatory Portals (SEBI Mandated)
            </h2>
            <p style={{ color: 'rgba(8, 7, 5, 0.7)', fontSize: '0.875rem', lineHeight: 1.55 }}>
              Under Indian securities law, investors possess an unconditional statutory right to escalate unresolved grievances directly to market regulator SEBI and institutional online dispute resolution bodies.
            </p>
          </div>

          <div className="regulatory-portals-grid">
            {/* Box 1: SEBI SCORES 2.0 */}
            <div
              style={{
                background: 'linear-gradient(145deg, #0f172a 0%, #080705 100%)',
                color: '#FFFFFA',
                padding: '28px 22px',
                borderRadius: 16,
                border: '1px solid rgba(148, 185, 175, 0.25)',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.25)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(148, 185, 175, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94B9AF', flexShrink: 0 }}>
                    <Scale size={18} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#FFFFFA' }}>
                      SEBI SCORES 2.0 Portal
                    </h3>
                    <div style={{ fontSize: '0.6875rem', color: '#94B9AF', fontFamily: 'var(--font-mono)' }}>
                      SEBI Complaints Redress System
                    </div>
                  </div>
                </div>

                <p style={{ fontSize: '0.8125rem', color: 'rgba(255, 255, 250, 0.78)', lineHeight: 1.55, marginBottom: 16 }}>
                  If your complaint is not redressed within 30 calendar days or if you are not satisfied with our resolution, you may lodge a complaint directly with SEBI. SCORES facilitates centralized online tracking, auto-escalation, and independent review.
                </p>

                <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '12px 14px', borderRadius: 10, fontSize: '0.75rem', marginBottom: 20 }}>
                  <div style={{ color: '#94B9AF', fontWeight: 700, marginBottom: 4 }}>SEBI Toll-Free Investor Helplines:</div>
                  <div style={{ fontFamily: 'var(--font-mono)', color: '#FFFFFA' }}>
                    1800 22 7575 / 1800 266 7575 (Toll-Free, 9:00 AM – 6:00 PM IST)
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <a
                  href={companyConfig.officialPortals?.sebiScores || 'https://scores.sebi.gov.in'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-primary"
                  style={{ flex: '1 1 auto', justifyContent: 'center' }}
                >
                  <span>Launch SEBI SCORES</span>
                  <ExternalLink size={13} />
                </a>
                <a
                  href={companyConfig.officialPortals?.sebiScoresApp || 'https://play.google.com/store/apps/details?id=com.sebi&hl=en_IN'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-secondary"
                  style={{ flex: '1 1 auto', justifyContent: 'center' }}
                >
                  <span>SCORES App</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>

            {/* Box 2: SMART ODR Portal */}
            <div
              style={{
                background: 'linear-gradient(145deg, #161a23 0%, #0d0c0a 100%)',
                color: '#FFFFFA',
                padding: '28px 22px',
                borderRadius: 16,
                border: '1px solid rgba(145, 47, 64, 0.3)',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.25)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(145, 47, 64, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#912F40', flexShrink: 0 }}>
                    <ShieldAlert size={18} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#FFFFFA' }}>
                      SMART ODR Portal
                    </h3>
                    <div style={{ fontSize: '0.6875rem', color: '#94B9AF', fontFamily: 'var(--font-mono)' }}>
                      Securities Market Online Dispute Resolution
                    </div>
                  </div>
                </div>

                <p style={{ fontSize: '0.8125rem', color: 'rgba(255, 255, 250, 0.78)', lineHeight: 1.55, marginBottom: 16 }}>
                  In pursuant of SEBI Circular SEBI/HO/OIAE/OIAE_IAD-1/P/CIR/2023/131, disputes unresolved through internal redressal or SCORES can be initiated on the SMART ODR portal for independent online conciliation and arbitration.
                </p>

                <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '12px 14px', borderRadius: 10, fontSize: '0.75rem', marginBottom: 20 }}>
                  <div style={{ color: '#94B9AF', fontWeight: 700, marginBottom: 4 }}>Institutional Conciliation:</div>
                  <div style={{ color: 'rgba(255, 255, 250, 0.85)' }}>
                    100% digital, paperless dispute resolution conducted by empaneled MII institutions.
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <a
                  href={companyConfig.officialPortals?.smartOdr || 'https://smartodr.in/login'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-primary"
                  style={{ flex: '1 1 auto', justifyContent: 'center', background: '#912F40', borderColor: '#912F40' }}
                >
                  <span>Launch SMART ODR</span>
                  <ExternalLink size={13} />
                </a>
                <a
                  href={companyConfig.officialPortals?.odrCircular || 'https://www.sebi.gov.in/legal/circulars/jul-2023/online-resolution-of-disputes-in-the-indian-securities-market_74574.html'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-secondary"
                  style={{ flex: '1 1 auto', justifyContent: 'center' }}
                >
                  <span>ODR Circular</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. INTERACTIVE "LODGE AN INVESTOR GRIEVANCE" & CLARIFIED TRACKER
          ========================================================================= */}
      <section id="lodge-complaint" style={{ padding: '48px 0', background: '#f8faf9', borderBottom: '1px solid rgba(8, 7, 5, 0.08)' }}>
        <div className="container">
          <div className="grievance-desk-grid">
            {/* Left: Enhanced Real-Time Status Tracker */}
            <div>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  textTransform: 'uppercase',
                  color: '#702632',
                  fontWeight: 700,
                  letterSpacing: '0.06em'
                }}
              >
                Verification & Status
              </span>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#080705', marginTop: 4, marginBottom: 12 }}>
                Track Ticket & Redressal Status
              </h2>
              <p style={{ color: 'rgba(8, 7, 5, 0.72)', fontSize: '0.875rem', lineHeight: 1.55, marginBottom: 18 }}>
                Every grievance filed with WeGrow is assigned a unique reference identifier with real-time audit milestones tracked below.
              </p>

              {/* Status Lookup Box */}
              <div
                style={{
                  background: '#FFFFFA',
                  borderRadius: 16,
                  border: '1px solid rgba(8, 7, 5, 0.12)',
                  padding: '20px 18px',
                  marginBottom: 20,
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, color: '#080705', marginBottom: 6, fontSize: '0.875rem' }}>
                  <Search size={16} style={{ color: '#912F40' }} />
                  <span>Enter Grievance Reference Number:</span>
                </div>

                <form onSubmit={handleTrackerSearch} style={{ display: 'flex', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
                  <input
                    type="text"
                    placeholder="e.g. WG-GRV-849201"
                    className="form-input"
                    style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', fontWeight: 600, flex: '1 1 180px' }}
                    value={trackerInput}
                    onChange={(e) => setTrackerInput(e.target.value)}
                  />
                  <button type="submit" className="btn btn-sm btn-primary" style={{ flexShrink: 0 }}>
                    <span>Check Status</span>
                  </button>
                </form>

                {/* Quick-try sample chips */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
                  <span style={{ fontSize: '0.6875rem', color: 'rgba(8, 7, 5, 0.55)', fontFamily: 'var(--font-mono)' }}>Try Demo:</span>
                  <button
                    type="button"
                    onClick={() => loadPresetTicket('WG-GRV-849201')}
                    style={{ fontSize: '0.6875rem', background: '#fffbeb', border: '1px solid #fde68a', color: '#702632', padding: '2px 8px', borderRadius: 4, cursor: 'pointer', fontFamily: 'var(--font-mono)', fontWeight: 600 }}
                  >
                    WG-GRV-849201 (In Review)
                  </button>
                  <button
                    type="button"
                    onClick={() => loadPresetTicket('WG-GRV-512044')}
                    style={{ fontSize: '0.6875rem', background: '#ecfdf5', border: '1px solid #86efac', color: '#14532d', padding: '2px 8px', borderRadius: 4, cursor: 'pointer', fontFamily: 'var(--font-mono)', fontWeight: 600 }}
                  >
                    WG-GRV-512044 (Resolved)
                  </button>
                  <button
                    type="button"
                    onClick={() => loadPresetTicket('WG-GRV-103982')}
                    style={{ fontSize: '0.6875rem', background: '#f0fdfa', border: '1px solid #99f6e4', color: '#0e7490', padding: '2px 8px', borderRadius: 4, cursor: 'pointer', fontFamily: 'var(--font-mono)', fontWeight: 600 }}
                  >
                    WG-GRV-103982 (Pending)
                  </button>
                </div>

                {trackerError && (
                  <div style={{ color: '#912F40', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                    <AlertCircle size={13} />
                    <span>{trackerError}</span>
                  </div>
                )}

                {/* CLARIFIED TRACKER RESPONSE STATE (Visual Feedback Box Right Below Input) */}
                {searchedTicket && (
                  <div
                    style={{
                      marginTop: 8,
                      padding: '16px 14px',
                      background: searchedTicket.statusBadgeBg,
                      borderRadius: 12,
                      border: `1.5px solid ${searchedTicket.statusBadgeBorder}`,
                      boxShadow: '0 4px 14px rgba(0, 0, 0, 0.04)'
                    }}
                  >
                    {/* Header Row: ID + Clear Status Pill */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8, marginBottom: 10 }}>
                      <div>
                        <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', color: 'rgba(8, 7, 5, 0.6)' }}>
                          Ticket Reference
                        </div>
                        <span style={{ fontWeight: 800, fontFamily: 'var(--font-mono)', color: '#080705', fontSize: '1.05rem' }}>
                          {searchedTicket.id}
                        </span>
                      </div>

                      {/* Prominent Colored Status Badge */}
                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                          padding: '5px 10px',
                          borderRadius: 999,
                          background: '#FFFFFA',
                          border: `1px solid ${searchedTicket.statusBadgeBorder}`,
                          color: searchedTicket.statusBadgeColor,
                          fontSize: '0.75rem',
                          fontWeight: 800,
                          fontFamily: 'var(--font-mono)'
                        }}
                      >
                        {searchedTicket.statusType === 'resolved' ? (
                          <CheckCircle2 size={14} style={{ color: '#16a34a' }} />
                        ) : searchedTicket.statusType === 'in_review' ? (
                          <Clock size={14} style={{ color: '#702632' }} />
                        ) : (
                          <FileText size={14} style={{ color: '#0e7490' }} />
                        )}
                        <span>{searchedTicket.statusLabel}</span>
                      </div>
                    </div>

                    {/* 4-Stage Visual Progress Bar */}
                    <div style={{ margin: '14px 0 12px 0' }}>
                      <div className="tracker-pipeline">
                        <div className="tracker-pipeline-line" />

                        {/* Stage 1 */}
                        <div className={`tracker-pipeline-step ${searchedTicket.currentStage >= 1 ? 'is-active' : ''}`}>
                          <div className={`tracker-pipeline-dot ${searchedTicket.currentStage > 1 ? 'is-completed' : searchedTicket.currentStage === 1 ? 'is-active' : ''}`}>
                            {searchedTicket.currentStage > 1 ? '✓' : '1'}
                          </div>
                          <span className="tracker-pipeline-label">Logged</span>
                        </div>

                        {/* Stage 2 */}
                        <div className={`tracker-pipeline-step ${searchedTicket.currentStage >= 2 ? 'is-active' : ''}`}>
                          <div className={`tracker-pipeline-dot ${searchedTicket.currentStage > 2 ? 'is-completed' : searchedTicket.currentStage === 2 ? 'is-active' : ''}`}>
                            {searchedTicket.currentStage > 2 ? '✓' : '2'}
                          </div>
                          <span className="tracker-pipeline-label">Scrutiny</span>
                        </div>

                        {/* Stage 3 */}
                        <div className={`tracker-pipeline-step ${searchedTicket.currentStage >= 3 ? 'is-active' : ''}`}>
                          <div className={`tracker-pipeline-dot ${searchedTicket.currentStage > 3 ? 'is-completed' : searchedTicket.currentStage === 3 ? 'is-active' : ''}`}>
                            {searchedTicket.currentStage > 3 ? '✓' : '3'}
                          </div>
                          <span className="tracker-pipeline-label">Compliance</span>
                        </div>

                        {/* Stage 4 */}
                        <div className={`tracker-pipeline-step ${searchedTicket.currentStage === 4 ? 'is-active' : ''}`}>
                          <div className={`tracker-pipeline-dot ${searchedTicket.currentStage === 4 ? 'is-completed' : ''}`}>
                            {searchedTicket.currentStage === 4 ? '✓' : '4'}
                          </div>
                          <span className="tracker-pipeline-label">Resolved</span>
                        </div>
                      </div>
                    </div>

                    {/* Explanation Narrative */}
                    <div style={{ background: '#FFFFFA', padding: 12, borderRadius: 8, border: '1px solid rgba(8, 7, 5, 0.08)', marginBottom: 10 }}>
                      <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#080705', marginBottom: 2 }}>
                        Current Milestone Update:
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'rgba(8, 7, 5, 0.8)', lineHeight: 1.5 }}>
                        {searchedTicket.explanation}
                      </div>
                    </div>

                    {/* Metadata Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 8, fontSize: '0.6875rem', color: 'rgba(8, 7, 5, 0.7)' }}>
                      <div>
                        <strong>Assigned:</strong> {searchedTicket.level}
                      </div>
                      <div>
                        <strong>Date:</strong> {searchedTicket.date}
                      </div>
                      <div style={{ gridColumn: '1 / -1', color: searchedTicket.statusBadgeColor, fontWeight: 700 }}>
                        ⏳ {searchedTicket.slaTarget}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Statutory Privacy Box */}
              <div
                style={{
                  background: 'rgba(148, 185, 175, 0.1)',
                  borderRadius: 14,
                  border: '1px solid rgba(148, 185, 175, 0.3)',
                  padding: 18
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, color: '#080705', marginBottom: 4, fontSize: '0.8125rem' }}>
                  <ShieldAlert size={15} style={{ color: '#912F40' }} />
                  <span>Statutory Non-Retaliation Protection</span>
                </div>
                <p style={{ fontSize: '0.75rem', color: 'rgba(8, 7, 5, 0.72)', lineHeight: 1.5, margin: 0 }}>
                  WeGrow prohibits any subscriber discrimination or access restriction resulting from filing a grievance. All data is protected under the Digital Personal Data Protection Act.
                </p>
              </div>
            </div>

            {/* Right: Interactive Lodging Form */}
            <div className="grievance-form-card">
              {ticketGenerated ? (
                /* Ticket Success Confirmation Screen */
                <div style={{ textAlign: 'center', padding: '16px 0' }}>
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: '50%',
                      background: '#ecfdf5',
                      color: '#10b981',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 16px auto',
                      border: '2px solid #a7f3d0'
                    }}
                  >
                    <CheckCircle2 size={32} />
                  </div>

                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#080705', marginBottom: 4 }}>
                    Grievance Registered Successfully
                  </h3>
                  <p style={{ fontSize: '0.8125rem', color: 'rgba(8, 7, 5, 0.7)', maxWidth: 440, margin: '0 auto 20px auto', lineHeight: 1.55 }}>
                    Your complaint has been logged in our Compliance Audit Register and transmitted to the designated officer.
                  </p>

                  <div
                    style={{
                      background: '#f8faf9',
                      border: '1px dashed #94B9AF',
                      borderRadius: 12,
                      padding: '14px 18px',
                      maxWidth: 380,
                      margin: '0 auto 20px auto',
                      textAlign: 'left'
                    }}
                  >
                    <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', color: 'rgba(8, 7, 5, 0.55)', marginBottom: 2 }}>
                      Official Tracking Reference
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '1.15rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: '#080705' }}>
                        {ticketGenerated.id}
                      </span>
                      <button
                        type="button"
                        onClick={copyTicketId}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: copiedTicket ? '#10b981' : '#702632',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 4,
                          fontSize: '0.75rem',
                          fontWeight: 600
                        }}
                      >
                        {copiedTicket ? <Check size={14} /> : <Copy size={14} />}
                        <span>{copiedTicket ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(8, 7, 5, 0.65)', marginTop: 6 }}>
                      Logged for: <strong>{ticketGenerated.name}</strong> • Assigned: <strong>{ticketGenerated.level}</strong>
                    </div>
                  </div>

                  <div style={{ fontSize: '0.75rem', color: '#047857', marginBottom: 20 }}>
                    <Clock size={13} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />
                    First acknowledgement email dispatched to <strong>{formData.email}</strong>. Formal written resolution will follow within 48 business hours.
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setTicketGenerated(null);
                      setFormData({
                        fullName: '',
                        email: '',
                        phone: '',
                        clientId: '',
                        department: 'Advisory Recommendations & Reports',
                        escalationLevel: 'Level 1: Support Desk',
                        subject: '',
                        description: '',
                        consent: true
                      });
                    }}
                    className="btn btn-outline-dark"
                  >
                    Submit Another Inquiry or Grievance
                  </button>
                </div>
              ) : (
                /* Grievance Input Form */
                <form onSubmit={handleLodgeSubmit}>
                  <div style={{ marginBottom: 18 }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#080705', marginBottom: 2 }}>
                      Investor Grievance Submission Form
                    </h3>
                    <p style={{ fontSize: '0.75rem', color: 'rgba(8, 7, 5, 0.65)' }}>
                      All fields marked with an asterisk (*) are mandatory under our compliance log protocol.
                    </p>
                  </div>

                  {formError && (
                    <div
                      style={{
                        background: '#fff1f2',
                        border: '1px solid #fecdd3',
                        color: '#912F40',
                        padding: '10px 14px',
                        borderRadius: 8,
                        fontSize: '0.75rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        marginBottom: 16
                      }}
                    >
                      <AlertCircle size={14} />
                      <span>{formError}</span>
                    </div>
                  )}

                  <div className="form-row-2col">
                    <div className="form-group">
                      <label className="form-label">Full Legal Name *</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. Vikramaditya Mehta"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Registered Mobile (10 Digits) *</label>
                      <input
                        type="tel"
                        maxLength="10"
                        className="form-input"
                        placeholder="98XXXXXXXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-row-2col">
                    <div className="form-group">
                      <label className="form-label">Registered Email Address *</label>
                      <input
                        type="email"
                        className="form-input"
                        placeholder="investor@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Client ID / PAN (Optional)</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="WG-SUB-XXXX"
                        value={formData.clientId}
                        onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-row-2col">
                    <div className="form-group">
                      <label className="form-label">Department / Category *</label>
                      <select
                        className="form-select"
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      >
                        <option value="Advisory Recommendations & Reports">Advisory Reports & Rationale</option>
                        <option value="Subscription Delivery & App Access">Subscription & Report Delivery</option>
                        <option value="Billing, Fees & Invoicing">Billing, Fees & Invoicing</option>
                        <option value="Regulatory, Code of Conduct & Ethics">Regulatory Code of Conduct</option>
                        <option value="Other Service Dispute">Other Service Dispute</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Escalation Tier Requested</label>
                      <select
                        className="form-select"
                        value={formData.escalationLevel}
                        onChange={(e) => setFormData({ ...formData, escalationLevel: e.target.value })}
                      >
                        <option value="Level 1: Support Desk">Level 1: Support Desk (24-48 hrs)</option>
                        <option value="Level 2: Customer Relations">Level 2: Head of Relations (3 days)</option>
                        <option value="Level 3: Compliance Officer">Level 3: Compliance Officer (7 days)</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Subject of Grievance *</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Brief one-line summary of dispute or inquiry"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Detailed Grievance Narrative *</label>
                    <textarea
                      rows="4"
                      className="form-textarea"
                      placeholder="Provide precise details including recommendation dates, invoice numbers, or specific interactions..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                    <div style={{ fontSize: '0.6875rem', color: 'rgba(8, 7, 5, 0.55)', marginTop: 4, textAlign: 'right' }}>
                      {formData.description.length} characters (minimum 20 recommended)
                    </div>
                  </div>

                  <div className="form-group" style={{ marginBottom: 18 }}>
                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: '0.75rem', color: 'rgba(8, 7, 5, 0.72)', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={formData.consent}
                        onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                        style={{ marginTop: 2 }}
                      />
                      <span>
                        I declare that the information provided is factual and true. I understand this grievance will be entered into WeGrow's statutory compliance register audited under SEBI guidelines.
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={formSubmitting}
                    className="btn btn-lg btn-primary"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    {formSubmitting ? 'Transmitting to Compliance Register...' : 'Register Formal Grievance'}
                    {!formSubmitting && <Send size={16} />}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. COMPLIANCE OFFICER STATUTORY PROFILE
          ========================================================================= */}
      <section style={{ padding: '48px 0', borderBottom: '1px solid rgba(8, 7, 5, 0.08)' }}>
        <div className="container">
          <div className="compliance-profile-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14, marginBottom: 18 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(148, 185, 175, 0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#702632', flexShrink: 0 }}>
                  <Scale size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#080705' }}>
                    Designated Compliance & Grievance Redressal Officer
                  </h3>
                  <div style={{ fontSize: '0.75rem', color: '#702632', fontWeight: 600 }}>
                    In accordance with Regulation 20(1) of SEBI (Research Analysts) Regulations, 2014
                  </div>
                </div>
              </div>

              <div style={{ padding: '5px 12px', borderRadius: 999, background: 'rgba(148, 185, 175, 0.15)', border: '1px solid rgba(148, 185, 175, 0.3)', fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: '#080705' }}>
                Status: In-Office & Active
              </div>
            </div>

            <div className="compliance-profile-grid">
              <div>
                <div style={{ color: 'rgba(8, 7, 5, 0.55)', fontSize: '0.6875rem', marginBottom: 2 }}>Officer Name & Credentials</div>
                <div style={{ fontWeight: 700, color: '#080705' }}>
                  {companyConfig.complianceOfficer?.name || 'Mr. Ramesh Sharma, CS'}
                </div>
                <div style={{ fontSize: '0.6875rem', color: 'rgba(8, 7, 5, 0.65)' }}>
                  Company Secretary (CS) & Regulatory Head
                </div>
              </div>

              <div>
                <div style={{ color: 'rgba(8, 7, 5, 0.55)', fontSize: '0.6875rem', marginBottom: 2 }}>Direct Grievance Desk Email</div>
                <div style={{ fontWeight: 700 }}>
                  <a href={`mailto:${companyConfig.complianceOfficer?.email || 'compliance@wegro.in'}`} style={{ color: '#912F40', textDecoration: 'none', wordBreak: 'break-all' }}>
                    {companyConfig.complianceOfficer?.email || 'compliance@wegro.in'}
                  </a>
                </div>
                <div style={{ fontSize: '0.6875rem', color: 'rgba(8, 7, 5, 0.65)' }}>Direct escalated inbox</div>
              </div>

              <div>
                <div style={{ color: 'rgba(8, 7, 5, 0.55)', fontSize: '0.6875rem', marginBottom: 2 }}>Compliance Direct Line</div>
                <div style={{ fontWeight: 700, color: '#080705', fontFamily: 'var(--font-mono)' }}>
                  {companyConfig.complianceOfficer?.phone || '+91 80 4718 5556'}
                </div>
                <div style={{ fontSize: '0.6875rem', color: 'rgba(8, 7, 5, 0.65)' }}>Trading days 9:00 AM – 5:30 PM IST</div>
              </div>

              <div>
                <div style={{ color: 'rgba(8, 7, 5, 0.55)', fontSize: '0.6875rem', marginBottom: 2 }}>Principal Registration Centre</div>
                <div style={{ fontWeight: 700, color: '#080705' }}>Registered Corporate Office</div>
                <div style={{ fontSize: '0.6875rem', color: 'rgba(8, 7, 5, 0.65)' }}>Andheri (East), Mumbai – 400072</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          9. FREQUENTLY ASKED QUESTIONS (Investor Redressal FAQs)
          ========================================================================= */}
      <section style={{ padding: '48px 0', background: '#FFFFFA' }}>
        <div className="container" style={{ maxWidth: 840 }}>
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <span
              style={{
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                textTransform: 'uppercase',
                color: '#702632',
                fontWeight: 700,
                letterSpacing: '0.06em'
              }}
            >
              Investor Guidance
            </span>
            <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#080705', marginTop: 4 }}>
              Frequently Asked Questions on Grievances
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  style={{
                    background: isOpen ? '#f8faf9' : '#FFFFFA',
                    border: '1px solid rgba(8, 7, 5, 0.1)',
                    borderRadius: 12,
                    overflow: 'hidden',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    style={{
                      width: '100%',
                      padding: '16px 18px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'none',
                      border: 'none',
                      textAlign: 'left',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      fontWeight: 700,
                      color: '#080705',
                      gap: 12
                    }}
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp size={16} style={{ color: '#702632', flexShrink: 0 }} /> : <ChevronDown size={16} style={{ color: 'rgba(8, 7, 5, 0.5)', flexShrink: 0 }} />}
                  </button>

                  {isOpen && (
                    <div style={{ padding: '0 18px 18px 18px', fontSize: '0.8125rem', color: 'rgba(8, 7, 5, 0.75)', lineHeight: 1.6, borderTop: '1px solid rgba(8, 7, 5, 0.06)', paddingTop: 12 }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
