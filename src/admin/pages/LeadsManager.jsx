import React, { useState, useEffect } from 'react';
import {
  Users,
  Search,
  Download,
  Filter,
  Eye,
  EyeOff,
  CheckCircle2,
  Clock,
  Phone,
  Mail,
  Calendar,
  AlertCircle,
  FileSpreadsheet
} from 'lucide-react';
import { defaultLeads } from '../../content/seedData';
import { getStorageAdapter } from '../../content/storage';

export default function LeadsManager({ currentUser }) {
  const [leads, setLeads] = useState(defaultLeads);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [productFilter, setProductFilter] = useState('All');
  const [revealedPans, setRevealedPans] = useState({});
  const [selectedLead, setSelectedLead] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const loadLeads = async () => {
      try {
        const storage = getStorageAdapter();
        const loaded = await storage.getLeads();
        if (loaded && loaded.length > 0) {
          setLeads(loaded);
        }
      } catch (e) {
        console.error('Error loading leads:', e);
      }
    };
    loadLeads();
  }, []);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const handleStatusChange = async (leadId, newStatus) => {
    try {
      const storage = getStorageAdapter();
      await storage.updateLead(leadId, { status: newStatus }, currentUser || { id: 'admin', username: 'admin' });

      setLeads((prev) =>
        prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
      );
      showToast(`Status updated to "${newStatus}"!`);
    } catch (e) {
      alert('Error updating lead: ' + e.message);
    }
  };

  const handleNotesChange = async (leadId, notes) => {
    try {
      const storage = getStorageAdapter();
      await storage.updateLead(leadId, { internalNotes: notes }, currentUser || { id: 'admin', username: 'admin' });

      setLeads((prev) =>
        prev.map((l) => (l.id === leadId ? { ...l, internalNotes: notes } : l))
      );
    } catch (e) {
      console.error(e);
    }
  };

  const togglePanReveal = (leadId) => {
    setRevealedPans((prev) => ({
      ...prev,
      [leadId]: !prev[leadId]
    }));
  };

  const maskPan = (pan) => {
    if (!pan || pan.length < 5) return 'N/A';
    // e.g. ABCDE1234F -> ABCDE••••F
    return pan.substring(0, 5) + '••••' + pan.substring(pan.length - 1);
  };

  const maskDob = (dob) => {
    if (!dob) return 'N/A';
    // e.g. 1988-06-15 -> ••••-••-15
    const parts = dob.split('-');
    if (parts.length === 3) return `••••-••-${parts[2]}`;
    return '••••••••';
  };

  // Export to CSV
  const handleExportCsv = () => {
    const headers = [
      'Lead ID',
      'Name',
      'Mobile',
      'Email',
      'Product',
      'PAN Number',
      'Date of Birth',
      'Status',
      'Consent Given',
      'Consent Timestamp',
      'Internal Notes',
      'Created At'
    ];

    const rows = leads.map((l) => [
      `"${l.id}"`,
      `"${l.name}"`,
      `"${l.mobile}"`,
      `"${l.email}"`,
      `"${l.productName}"`,
      `"${l.panNumber || ''}"`,
      `"${l.dob || ''}"`,
      `"${l.status}"`,
      `"${l.consentGiven ? 'YES' : 'NO'}"`,
      `"${l.consentTimestamp || ''}"`,
      `"${(l.internalNotes || '').replace(/"/g, '""')}"`,
      `"${l.createdAt || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `wegro_leads_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported leads to CSV successfully!');
  };

  // Filtered Leads
  const filteredLeads = leads.filter((l) => {
    const matchesSearch =
      l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.mobile.includes(searchTerm) ||
      l.productName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'All' || l.status === statusFilter;
    const matchesProduct = productFilter === 'All' || l.productName === productFilter;

    return matchesSearch && matchesStatus && matchesProduct;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {toast && (
        <div
          style={{
            position: 'fixed',
            top: 24,
            right: 24,
            zIndex: 9999,
            background: '#10b981',
            color: '#FFFFFA',
            padding: '12px 20px',
            borderRadius: 10,
            boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            fontWeight: 700,
            fontSize: '0.875rem'
          }}
        >
          <CheckCircle2 size={18} />
          <span>{toast}</span>
        </div>
      )}

      {/* Top Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
          background: '#FFFFFA',
          padding: '16px 22px',
          borderRadius: 14,
          border: '1px solid rgba(8, 7, 5, 0.1)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
        }}
      >
        <div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#080705', margin: 0 }}>
            Investor Callback Leads
          </h1>
          <p style={{ fontSize: '0.8125rem', color: 'rgba(8, 7, 5, 0.65)', margin: '4px 0 0 0' }}>
            Manage client inquiries with audit consent timestamps and masked statutory PII (PAN / DOB).
          </p>
        </div>

        <button
          type="button"
          onClick={handleExportCsv}
          style={{
            padding: '9px 18px',
            borderRadius: 8,
            background: '#1e2022',
            color: '#FFFFFA',
            fontWeight: 700,
            fontSize: '0.875rem',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}
        >
          <FileSpreadsheet size={15} />
          <span>Export Leads (CSV)</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          flexWrap: 'wrap',
          background: '#FFFFFA',
          padding: '12px 18px',
          borderRadius: 12,
          border: '1px solid rgba(8, 7, 5, 0.1)'
        }}
      >
        <div style={{ position: 'relative', flex: 1, minWidth: 220 }}>
          <Search size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'rgba(8,7,5,0.4)' }} />
          <input
            type="text"
            placeholder="Search by name, email, mobile, or product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: '8px 12px 8px 34px', borderRadius: 8, border: '1px solid #ccc', fontSize: '0.8125rem', boxSizing: 'border-box' }}
          />
        </div>

        {/* Status Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8125rem' }}>
          <span style={{ color: 'rgba(8,7,5,0.6)', fontWeight: 700 }}>Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ padding: '7px 10px', borderRadius: 8, border: '1px solid #ccc', fontSize: '0.8125rem' }}
          >
            <option value="All">All Statuses</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        {/* Product Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8125rem' }}>
          <span style={{ color: 'rgba(8,7,5,0.6)', fontWeight: 700 }}>Product:</span>
          <select
            value={productFilter}
            onChange={(e) => setProductFilter(e.target.value)}
            style={{ padding: '7px 10px', borderRadius: 8, border: '1px solid #ccc', fontSize: '0.8125rem' }}
          >
            <option value="All">All Products</option>
            <option value="Stock Cash">Stock Cash</option>
            <option value="Basic F&O">Basic F&O</option>
            <option value="Commodities Pack">Commodities Pack</option>
            <option value="Equity Exclusive">Equity Exclusive</option>
            <option value="F&O Exclusive">F&O Exclusive</option>
          </select>
        </div>
      </div>

      {/* Leads Table */}
      <div
        style={{
          background: '#FFFFFA',
          borderRadius: 16,
          border: '1px solid rgba(8, 7, 5, 0.1)',
          overflowX: 'auto',
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem', minWidth: 900 }}>
          <thead>
            <tr style={{ background: '#1e2022', color: '#FFFFFA', textAlign: 'left' }}>
              <th style={{ padding: '12px 14px', width: 90 }}>Lead ID</th>
              <th style={{ padding: '12px 14px' }}>Investor Details</th>
              <th style={{ padding: '12px 14px' }}>Product</th>
              <th style={{ padding: '12px 14px' }}>PAN / DOB (Masked)</th>
              <th style={{ padding: '12px 14px' }}>Consent Timestamp</th>
              <th style={{ padding: '12px 14px', width: 120 }}>Status</th>
              <th style={{ padding: '12px 14px' }}>Internal Notes</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ padding: 32, textAlign: 'center', color: 'rgba(8,7,5,0.5)' }}>
                  No leads found matching your criteria.
                </td>
              </tr>
            ) : (
              filteredLeads.map((lead) => {
                const isPanRevealed = revealedPans[lead.id];

                return (
                  <tr key={lead.id} style={{ borderBottom: '1px solid #e7e2da' }}>
                    <td style={{ padding: '12px 14px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#702632' }}>
                      {lead.id}
                    </td>

                    <td style={{ padding: '12px 14px' }}>
                      <div style={{ fontWeight: 700, color: '#080705', fontSize: '0.875rem' }}>{lead.name}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(8,7,5,0.65)', marginTop: 2 }}>
                        <Phone size={12} />
                        <span>{lead.mobile}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(8,7,5,0.65)', marginTop: 1 }}>
                        <Mail size={12} />
                        <span>{lead.email}</span>
                      </div>
                    </td>

                    <td style={{ padding: '12px 14px' }}>
                      <span style={{ background: '#FAF6F0', border: '1px solid #e7e2da', padding: '3px 8px', borderRadius: 6, fontWeight: 700, color: '#080705' }}>
                        {lead.productName}
                      </span>
                    </td>

                    <td style={{ padding: '12px 14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                          PAN: {isPanRevealed ? (lead.panNumber || 'N/A') : maskPan(lead.panNumber)}
                        </span>
                        {lead.panNumber && (
                          <button
                            type="button"
                            onClick={() => togglePanReveal(lead.id)}
                            style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#702632', padding: 0 }}
                            title={isPanRevealed ? 'Hide PAN' : 'Reveal full PAN (Audited)'}
                          >
                            {isPanRevealed ? <EyeOff size={13} /> : <Eye size={13} />}
                          </button>
                        )}
                      </div>
                      <div style={{ fontSize: '0.6875rem', color: 'rgba(8,7,5,0.5)', marginTop: 2 }}>
                        DOB: {isPanRevealed ? (lead.dob || 'N/A') : maskDob(lead.dob)}
                      </div>
                    </td>

                    <td style={{ padding: '12px 14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: lead.consentGiven ? '#15803d' : '#b91c1c', fontWeight: 700 }}>
                        <CheckCircle2 size={13} />
                        <span>Consent Verified</span>
                      </div>
                      <div style={{ fontSize: '0.6875rem', color: 'rgba(8,7,5,0.5)', marginTop: 2 }}>
                        {lead.consentTimestamp ? new Date(lead.consentTimestamp).toLocaleString() : 'N/A'}
                      </div>
                    </td>

                    <td style={{ padding: '12px 14px' }}>
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                        style={{
                          padding: '5px 8px',
                          borderRadius: 6,
                          fontWeight: 700,
                          fontSize: '0.75rem',
                          border: '1px solid #ccc',
                          background:
                            lead.status === 'New'
                              ? '#fffbeb'
                              : lead.status === 'Contacted'
                              ? '#eff6ff'
                              : '#ecfdf5',
                          color:
                            lead.status === 'New'
                              ? '#b45309'
                              : lead.status === 'Contacted'
                              ? '#1d4ed8'
                              : '#047857'
                        }}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </td>

                    <td style={{ padding: '12px 14px' }}>
                      <input
                        type="text"
                        defaultValue={lead.internalNotes || ''}
                        placeholder="Add internal note..."
                        onBlur={(e) => handleNotesChange(lead.id, e.target.value)}
                        style={{ width: '100%', minWidth: 140, padding: '5px 8px', borderRadius: 6, border: '1px solid #ccc', fontSize: '0.75rem' }}
                      />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
