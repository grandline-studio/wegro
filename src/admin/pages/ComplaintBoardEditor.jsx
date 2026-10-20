import React, { useState, useEffect, useMemo } from 'react';
import {
  Save,
  Send,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  RotateCcw,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  FileText,
  Clock,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  Eye,
  Columns,
  Layers,
  ChevronRight,
  Check,
  Upload,
  Edit3
} from 'lucide-react';
import { defaultComplaintBoardData } from '../../content/seedData';
import { getStorageAdapter } from '../../content/storage';

export default function ComplaintBoardEditor({ currentUser }) {
  const [data, setData] = useState(defaultComplaintBoardData);
  const [initialData, setInitialData] = useState(defaultComplaintBoardData);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [activeTab, setActiveTab] = useState('section1'); // 'header' | 'section1' | 'section2' | 'section3'
  const [previewMode, setPreviewMode] = useState('split'); // 'split' | 'editor' | 'preview'
  const [previewSubTab, setPreviewSubTab] = useState('table'); // 'table' | 'cards'
  const [previewTrendTab, setPreviewTrendTab] = useState('monthly');
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load existing complaint data on mount
  useEffect(() => {
    const load = async () => {
      try {
        const storage = getStorageAdapter();
        const loaded = await storage.getComplaintBoard();
        if (loaded) {
          setData(loaded);
          setInitialData(loaded);
        }
      } catch (e) {
        console.error('Failed to load complaint data:', e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleUpdate = (updater) => {
    setData((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      setHasUnsavedChanges(true);
      return next;
    });
  };

  // -------------------------------------------------------------
  // CALCULATION ENGINE & STATUTORY VALIDATIONS
  // -------------------------------------------------------------
  const calculatedRows = useMemo(() => {
    return data.section1.rows.map((row) => {
      const p = parseInt(row.pendingLastMonth, 10) || 0;
      const r = parseInt(row.received, 10) || 0;
      const res = parseInt(row.resolved, 10) || 0;

      const isTotalPendingOverridden = row.isOverridden?.totalPending;
      const totalPending = isTotalPendingOverridden
        ? parseInt(row.totalPending, 10) || 0
        : Math.max(0, p + r - res);

      return {
        ...row,
        totalPending
      };
    });
  }, [data.section1.rows]);

  const grandTotal = useMemo(() => {
    const override = data.section1.grandTotalOverride;
    const isOverridden = override?.isOverridden;

    const autoPendingLastMonth = calculatedRows.reduce((acc, r) => acc + (parseInt(r.pendingLastMonth, 10) || 0), 0);
    const autoReceived = calculatedRows.reduce((acc, r) => acc + (parseInt(r.received, 10) || 0), 0);
    const autoResolved = calculatedRows.reduce((acc, r) => acc + (parseInt(r.resolved, 10) || 0), 0);
    const autoTotalPending = calculatedRows.reduce((acc, r) => acc + (parseInt(r.totalPending, 10) || 0), 0);
    const autoPendingOverMonths = calculatedRows.reduce((acc, r) => acc + (parseInt(r.pendingOverMonths, 10) || 0), 0);

    return {
      pendingLastMonth: isOverridden && override.pendingLastMonth !== undefined ? override.pendingLastMonth : autoPendingLastMonth,
      received: isOverridden && override.received !== undefined ? override.received : autoReceived,
      resolved: isOverridden && override.resolved !== undefined ? override.resolved : autoResolved,
      totalPending: isOverridden && override.totalPending !== undefined ? override.totalPending : autoTotalPending,
      pendingOverMonths: isOverridden && override.pendingOverMonths !== undefined ? override.pendingOverMonths : autoPendingOverMonths,
      avgResolutionDays: isOverridden && override.avgResolutionDays !== undefined ? override.avgResolutionDays : '0'
    };
  }, [calculatedRows, data.section1.grandTotalOverride]);

  // Validation Warnings
  const warnings = useMemo(() => {
    const list = [];
    calculatedRows.forEach((row) => {
      const p = parseInt(row.pendingLastMonth, 10) || 0;
      const r = parseInt(row.received, 10) || 0;
      const res = parseInt(row.resolved, 10) || 0;
      if (res > p + r) {
        list.push(`Row "${row.source}": Resolved (${res}) exceeds total available complaints (${p + r}).`);
      }
      if (p < 0 || r < 0 || res < 0) {
        list.push(`Row "${row.source}": Negative complaints entered.`);
      }
    });

    // Check monthly trend continuity
    const trends = data.section2.monthlyTrend;
    for (let i = 0; i < trends.length - 1; i++) {
      if (trends[i + 1].carried !== trends[i].pending) {
        list.push(`Trend warning: ${trends[i + 1].month} carried forward (${trends[i + 1].carried}) differs from ${trends[i].month} pending (${trends[i].pending}).`);
      }
    }

    return list;
  }, [calculatedRows, data.section2.monthlyTrend]);

  // -------------------------------------------------------------
  // ACTIONS: Save Draft & Publish
  // -------------------------------------------------------------
  const handleSaveDraft = async () => {
    try {
      const storage = getStorageAdapter();
      const updatedData = { ...data, section1: { ...data.section1, rows: calculatedRows } };
      await storage.saveComplaintBoard(updatedData, currentUser || { id: 'admin', username: 'admin' }, false);
      setHasUnsavedChanges(false);
      setInitialData(updatedData);
      showToast('Draft saved successfully! (Not published publicly yet)', 'info');
    } catch (e) {
      showToast('Error saving draft: ' + e.message, 'error');
    }
  };

  const handlePublish = async () => {
    try {
      const storage = getStorageAdapter();
      const updatedData = {
        ...data,
        section1: { ...data.section1, rows: calculatedRows },
        isPublished: true,
        lastPublishedAt: new Date().toISOString(),
        publishedBy: currentUser?.username || 'admin'
      };
      await storage.saveComplaintBoard(updatedData, currentUser || { id: 'admin', username: 'admin' }, true);
      
      // Update local storage so public site sees it immediately
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('wegro_db_complaint_data.json', JSON.stringify(updatedData));
      }

      setData(updatedData);
      setInitialData(updatedData);
      setHasUnsavedChanges(false);
      showToast('Complaint Board published to public website with certified audit timestamp!', 'success');
    } catch (e) {
      showToast('Error publishing: ' + e.message, 'error');
    }
  };

  // -------------------------------------------------------------
  // ROW & COLUMN MANAGEMENT (SECTION 1)
  // -------------------------------------------------------------
  const handleCellChange = (rowIndex, field, value) => {
    handleUpdate((prev) => {
      const rows = [...prev.section1.rows];
      rows[rowIndex] = {
        ...rows[rowIndex],
        [field]: value
      };
      return {
        ...prev,
        section1: { ...prev.section1, rows }
      };
    });
  };

  const handleToggleOverride = (rowIndex, field) => {
    handleUpdate((prev) => {
      const rows = [...prev.section1.rows];
      const currentOverrides = rows[rowIndex].isOverridden || {};
      rows[rowIndex] = {
        ...rows[rowIndex],
        isOverridden: {
          ...currentOverrides,
          [field]: !currentOverrides[field]
        }
      };
      return {
        ...prev,
        section1: { ...prev.section1, rows }
      };
    });
  };

  const handleAddRow = () => {
    const newId = `row-${Date.now()}`;
    const nextSno = data.section1.rows.length + 1;
    handleUpdate((prev) => ({
      ...prev,
      section1: {
        ...prev.section1,
        rows: [
          ...prev.section1.rows,
          {
            id: newId,
            sno: nextSno,
            source: 'New Complaint Category',
            pendingLastMonth: 0,
            received: 0,
            resolved: 0,
            totalPending: 0,
            pendingOverMonths: 0,
            avgResolutionDays: '0'
          }
        ]
      }
    }));
  };

  const handleDeleteRow = (index) => {
    if (data.section1.rows.length <= 1) {
      alert('At least one statutory complaint row is required.');
      return;
    }
    handleUpdate((prev) => {
      const filtered = prev.section1.rows.filter((_, i) => i !== index);
      const renumbered = filtered.map((r, i) => ({ ...r, sno: i + 1 }));
      return {
        ...prev,
        section1: { ...prev.section1, rows: renumbered }
      };
    });
  };

  const handleMoveRow = (index, direction) => {
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= data.section1.rows.length) return;

    handleUpdate((prev) => {
      const rows = [...prev.section1.rows];
      const temp = rows[index];
      rows[index] = rows[targetIdx];
      rows[targetIdx] = temp;
      const renumbered = rows.map((r, i) => ({ ...r, sno: i + 1 }));
      return {
        ...prev,
        section1: { ...prev.section1, rows: renumbered }
      };
    });
  };

  // -------------------------------------------------------------
  // QUICK ACTION: "Start New Month"
  // -------------------------------------------------------------
  const handleStartNewMonth = () => {
    const currentMonthStr = data.header.monthEnding;
    const confirmed = window.confirm(
      `Start New Month from ${currentMonthStr}?\n\nThis will:\n1. Roll ${currentMonthStr} data into Historical Trend History.\n2. Automatically set next month's "Pending at End of Last Month" = current "Total Pending" (${grandTotal.totalPending}).\n3. Reset Received and Resolved to 0 for the new reporting cycle.`
    );
    if (!confirmed) return;

    // Advance month
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const parts = currentMonthStr.split(' ');
    let nextMonth = 'November';
    let nextYear = 2026;
    if (parts.length === 2) {
      const mIdx = months.indexOf(parts[0]);
      const y = parseInt(parts[1], 10) || 2026;
      if (mIdx !== -1) {
        if (mIdx === 11) {
          nextMonth = months[0];
          nextYear = y + 1;
        } else {
          nextMonth = months[mIdx + 1];
          nextYear = y;
        }
      }
    }
    const newMonthEnding = `${nextMonth} ${nextYear}`;

    // Create new rolled rows
    const newRows = calculatedRows.map((r) => ({
      ...r,
      pendingLastMonth: r.totalPending,
      received: 0,
      resolved: 0,
      totalPending: r.totalPending,
      pendingOverMonths: r.totalPending > 0 ? r.pendingOverMonths : 0,
      avgResolutionDays: '-'
    }));

    // Add prior month to historical trend
    const newTrendRow = {
      sno: data.section2.monthlyTrend.length + 1,
      month: `${currentMonthStr} (Audit Closed)`,
      carried: grandTotal.pendingLastMonth,
      received: grandTotal.received,
      resolved: grandTotal.resolved,
      pending: grandTotal.totalPending
    };

    handleUpdate((prev) => ({
      ...prev,
      header: {
        ...prev.header,
        monthEnding: newMonthEnding,
        title: `Data for the Month Ending: ${newMonthEnding}`
      },
      section1: {
        ...prev.section1,
        rows: newRows
      },
      section2: {
        ...prev.section2,
        monthlyTrend: [...prev.section2.monthlyTrend, newTrendRow]
      }
    }));

    showToast(`Started reporting cycle for ${newMonthEnding}!`, 'success');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Toast Notification */}
      {toast && (
        <div
          style={{
            position: 'fixed',
            top: 24,
            right: 24,
            zIndex: 9999,
            background: toast.type === 'error' ? '#ef4444' : toast.type === 'info' ? '#2563eb' : '#10b981',
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
          {toast.type === 'error' ? <AlertTriangle size={18} /> : <CheckCircle2 size={18} />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Top Action Bar */}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#080705', margin: 0 }}>
              Complaint Board (Full Statutory Editor)
            </h1>
            {data.isPublished ? (
              <span style={{ fontSize: '0.75rem', background: '#ecfdf5', color: '#047857', border: '1px solid #a7f3d0', padding: '2px 8px', borderRadius: 999, fontWeight: 700 }}>
                ● Published
              </span>
            ) : (
              <span style={{ fontSize: '0.75rem', background: '#fffbeb', color: '#b45309', border: '1px solid #fde68a', padding: '2px 8px', borderRadius: 999, fontWeight: 700 }}>
                ● Draft (Unpublished)
              </span>
            )}
            {hasUnsavedChanges && (
              <span style={{ fontSize: '0.75rem', background: '#fee2e2', color: '#991b1b', border: '1px solid #fca5a5', padding: '2px 8px', borderRadius: 999, fontWeight: 700 }}>
                Unsaved Edits
              </span>
            )}
          </div>
          <div style={{ fontSize: '0.8125rem', color: 'rgba(8, 7, 5, 0.65)', marginTop: 4 }}>
            Cycle: <strong>{data.header.monthEnding}</strong> | Last published: {data.lastPublishedAt ? new Date(data.lastPublishedAt).toLocaleString() : 'Never'}
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          {/* Quick Action: Start New Month */}
          <button
            type="button"
            onClick={handleStartNewMonth}
            style={{
              padding: '8px 14px',
              borderRadius: 8,
              fontSize: '0.8125rem',
              fontWeight: 700,
              cursor: 'pointer',
              background: '#F0F9F7',
              border: '1px solid #94B9AF',
              color: '#284e45',
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}
            title="Automatically carry forward pending into a new month"
          >
            <Sparkles size={14} style={{ color: '#284e45' }} />
            <span>Start New Month</span>
          </button>

          {/* Save Draft */}
          <button
            type="button"
            onClick={handleSaveDraft}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              fontSize: '0.8125rem',
              fontWeight: 700,
              cursor: 'pointer',
              background: '#FFFFFA',
              border: '1px solid rgba(8, 7, 5, 0.2)',
              color: '#080705',
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}
          >
            <Save size={14} />
            <span>Save Draft</span>
          </button>

          {/* Publish */}
          <button
            type="button"
            onClick={handlePublish}
            style={{
              padding: '8px 18px',
              borderRadius: 8,
              fontSize: '0.8125rem',
              fontWeight: 700,
              cursor: 'pointer',
              background: '#702632',
              border: 'none',
              color: '#FFFFFA',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              boxShadow: '0 2px 8px rgba(112, 38, 50, 0.25)'
            }}
          >
            <Send size={14} />
            <span>Publish to Public Site</span>
          </button>

          {/* View Mode Toggle (Split / Editor Only / Preview Only) */}
          <div style={{ display: 'inline-flex', padding: 3, background: '#eee', borderRadius: 8 }}>
            <button
              type="button"
              onClick={() => setPreviewMode('editor')}
              style={{
                padding: '5px 10px',
                borderRadius: 6,
                fontSize: '0.75rem',
                fontWeight: 700,
                border: 'none',
                background: previewMode === 'editor' ? '#FFFFFA' : 'transparent',
                cursor: 'pointer'
              }}
            >
              Editor
            </button>
            <button
              type="button"
              onClick={() => setPreviewMode('split')}
              style={{
                padding: '5px 10px',
                borderRadius: 6,
                fontSize: '0.75rem',
                fontWeight: 700,
                border: 'none',
                background: previewMode === 'split' ? '#FFFFFA' : 'transparent',
                cursor: 'pointer'
              }}
            >
              Split View
            </button>
            <button
              type="button"
              onClick={() => setPreviewMode('preview')}
              style={{
                padding: '5px 10px',
                borderRadius: 6,
                fontSize: '0.75rem',
                fontWeight: 700,
                border: 'none',
                background: previewMode === 'preview' ? '#FFFFFA' : 'transparent',
                cursor: 'pointer'
              }}
            >
              Live Preview
            </button>
          </div>
        </div>
      </div>

      {/* Warnings Banner if any */}
      {warnings.length > 0 && (
        <div
          style={{
            background: 'rgba(245, 158, 11, 0.1)',
            border: '1px solid #f59e0b',
            borderRadius: 10,
            padding: '12px 16px',
            color: '#92400e',
            fontSize: '0.8125rem'
          }}
        >
          <div style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
            <AlertTriangle size={15} />
            <span>Audit Warnings (Review before publishing):</span>
          </div>
          <ul style={{ paddingLeft: 20, margin: 0 }}>
            {warnings.map((w, idx) => (
              <li key={idx}>{w}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Main Content Area (Split Screen) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: previewMode === 'split' ? '1fr 1fr' : '1fr',
          gap: 20,
          alignItems: 'start'
        }}
      >
        {/* =========================================================
            LEFT COLUMN: THE EDITING CONTROLS
            ========================================================= */}
        {(previewMode === 'split' || previewMode === 'editor') && (
          <div
            style={{
              background: '#FFFFFA',
              borderRadius: 16,
              border: '1px solid rgba(8, 7, 5, 0.1)',
              padding: 24,
              boxShadow: '0 4px 16px rgba(0,0,0,0.03)'
            }}
          >
            {/* Editor Sub-Tabs */}
            <div style={{ display: 'flex', gap: 8, borderBottom: '1px solid rgba(8, 7, 5, 0.1)', paddingBottom: 12, marginBottom: 20, flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => setActiveTab('section1')}
                style={{
                  padding: '7px 14px',
                  borderRadius: 8,
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  border: 'none',
                  background: activeTab === 'section1' ? '#702632' : 'transparent',
                  color: activeTab === 'section1' ? '#FFFFFA' : '#080705'
                }}
              >
                1. Monthly Table (Data)
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('header')}
                style={{
                  padding: '7px 14px',
                  borderRadius: 8,
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  border: 'none',
                  background: activeTab === 'header' ? '#702632' : 'transparent',
                  color: activeTab === 'header' ? '#FFFFFA' : '#080705'
                }}
              >
                Header & Metadata
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('section2')}
                style={{
                  padding: '7px 14px',
                  borderRadius: 8,
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  border: 'none',
                  background: activeTab === 'section2' ? '#702632' : 'transparent',
                  color: activeTab === 'section2' ? '#FFFFFA' : '#080705'
                }}
              >
                2. Disposal Trends
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('section3')}
                style={{
                  padding: '7px 14px',
                  borderRadius: 8,
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  border: 'none',
                  background: activeTab === 'section3' ? '#702632' : 'transparent',
                  color: activeTab === 'section3' ? '#FFFFFA' : '#080705'
                }}
              >
                3. Audit Reports
              </button>
            </div>

            {/* TAB 1: SECTION 1 TABLE EDITOR */}
            {activeTab === 'section1' && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                  <div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#080705', margin: 0 }}>
                      Section 1: Data for Month Ending Table
                    </h3>
                    <p style={{ fontSize: '0.75rem', color: 'rgba(8, 7, 5, 0.6)', margin: '3px 0 0 0' }}>
                      Inline editing with auto-calculation and per-cell override.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddRow}
                    style={{
                      padding: '6px 12px',
                      borderRadius: 6,
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      background: '#1e2022',
                      color: '#FFFFFA',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4
                    }}
                  >
                    <Plus size={13} />
                    <span>Add Row</span>
                  </button>
                </div>

                {/* Table Rows Controls */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {data.section1.rows.map((row, idx) => (
                    <div
                      key={row.id || idx}
                      style={{
                        background: '#FAF6F0',
                        borderRadius: 10,
                        border: '1px solid #e7e2da',
                        padding: 16
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, flexWrap: 'wrap', gap: 8 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ width: 22, height: 22, borderRadius: '50%', background: '#080705', color: '#FFFFFA', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700 }}>
                            {idx + 1}
                          </span>
                          <input
                            type="text"
                            value={row.source}
                            onChange={(e) => handleCellChange(idx, 'source', e.target.value)}
                            placeholder="Row source label"
                            style={{
                              fontWeight: 700,
                              fontSize: '0.875rem',
                              color: '#080705',
                              padding: '4px 8px',
                              borderRadius: 6,
                              border: '1px solid rgba(8, 7, 5, 0.15)',
                              background: '#FFFFFA'
                            }}
                          />
                        </div>

                        {/* Reorder and Delete Row Controls */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => handleMoveRow(idx, -1)}
                            style={{ padding: 4, borderRadius: 4, border: '1px solid #ccc', background: '#fff', cursor: idx === 0 ? 'not-allowed' : 'pointer' }}
                            title="Move Up"
                          >
                            <ArrowUp size={13} />
                          </button>
                          <button
                            type="button"
                            disabled={idx === data.section1.rows.length - 1}
                            onClick={() => handleMoveRow(idx, 1)}
                            style={{ padding: 4, borderRadius: 4, border: '1px solid #ccc', background: '#fff', cursor: idx === data.section1.rows.length - 1 ? 'not-allowed' : 'pointer' }}
                            title="Move Down"
                          >
                            <ArrowDown size={13} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteRow(idx)}
                            style={{ padding: 4, borderRadius: 4, border: '1px solid #fca5a5', background: '#fee2e2', color: '#991b1b', cursor: 'pointer' }}
                            title="Delete Row"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>

                      {/* Cell Value Inputs Grid */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: 10 }}>
                        {/* Pending Last Month */}
                        <div>
                          <label style={{ display: 'block', fontSize: '0.6875rem', fontWeight: 700, color: 'rgba(8,7,5,0.6)', marginBottom: 3 }}>
                            Pending Last Mo
                          </label>
                          <input
                            type="number"
                            min="0"
                            value={row.pendingLastMonth}
                            onChange={(e) => handleCellChange(idx, 'pendingLastMonth', e.target.value)}
                            style={{ width: '100%', padding: '6px 8px', borderRadius: 6, border: '1px solid #ccc', background: '#fff', fontFamily: 'var(--font-mono)', fontSize: '0.8125rem' }}
                          />
                        </div>

                        {/* Received */}
                        <div>
                          <label style={{ display: 'block', fontSize: '0.6875rem', fontWeight: 700, color: 'rgba(8,7,5,0.6)', marginBottom: 3 }}>
                            Received
                          </label>
                          <input
                            type="number"
                            min="0"
                            value={row.received}
                            onChange={(e) => handleCellChange(idx, 'received', e.target.value)}
                            style={{ width: '100%', padding: '6px 8px', borderRadius: 6, border: '1px solid #ccc', background: '#fff', fontFamily: 'var(--font-mono)', fontSize: '0.8125rem' }}
                          />
                        </div>

                        {/* Resolved */}
                        <div>
                          <label style={{ display: 'block', fontSize: '0.6875rem', fontWeight: 700, color: 'rgba(8,7,5,0.6)', marginBottom: 3 }}>
                            Resolved
                          </label>
                          <input
                            type="number"
                            min="0"
                            value={row.resolved}
                            onChange={(e) => handleCellChange(idx, 'resolved', e.target.value)}
                            style={{ width: '100%', padding: '6px 8px', borderRadius: 6, border: '1px solid #ccc', background: '#fff', fontFamily: 'var(--font-mono)', fontSize: '0.8125rem' }}
                          />
                        </div>

                        {/* Total Pending (Auto-calculated with Override Toggle) */}
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
                            <label style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'rgba(8,7,5,0.6)' }}>
                              Total Pending
                            </label>
                            <button
                              type="button"
                              onClick={() => handleToggleOverride(idx, 'totalPending')}
                              style={{ background: 'transparent', border: 'none', color: row.isOverridden?.totalPending ? '#b91c1c' : '#047857', fontSize: '0.625rem', cursor: 'pointer', fontWeight: 700 }}
                              title="Toggle manual override"
                            >
                              {row.isOverridden?.totalPending ? 'Manual' : 'Auto'}
                            </button>
                          </div>
                          <input
                            type="number"
                            min="0"
                            value={calculatedRows[idx].totalPending}
                            disabled={!row.isOverridden?.totalPending}
                            onChange={(e) => handleCellChange(idx, 'totalPending', e.target.value)}
                            style={{
                              width: '100%',
                              padding: '6px 8px',
                              borderRadius: 6,
                              border: row.isOverridden?.totalPending ? '1.5px solid #b91c1c' : '1px solid #ccc',
                              background: row.isOverridden?.totalPending ? '#fff1f2' : '#f0fdf4',
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.8125rem',
                              fontWeight: 700,
                              color: calculatedRows[idx].totalPending > 0 ? '#702632' : '#047857'
                            }}
                          />
                        </div>

                        {/* Pending > Months */}
                        <div>
                          <label style={{ display: 'block', fontSize: '0.6875rem', fontWeight: 700, color: 'rgba(8,7,5,0.6)', marginBottom: 3 }}>
                            Pending &gt; Mos
                          </label>
                          <input
                            type="number"
                            min="0"
                            value={row.pendingOverMonths}
                            onChange={(e) => handleCellChange(idx, 'pendingOverMonths', e.target.value)}
                            style={{ width: '100%', padding: '6px 8px', borderRadius: 6, border: '1px solid #ccc', background: '#fff', fontFamily: 'var(--font-mono)', fontSize: '0.8125rem' }}
                          />
                        </div>

                        {/* Avg Resolution Days */}
                        <div>
                          <label style={{ display: 'block', fontSize: '0.6875rem', fontWeight: 700, color: 'rgba(8,7,5,0.6)', marginBottom: 3 }}>
                            Avg Days
                          </label>
                          <input
                            type="text"
                            value={row.avgResolutionDays}
                            onChange={(e) => handleCellChange(idx, 'avgResolutionDays', e.target.value)}
                            style={{ width: '100%', padding: '6px 8px', borderRadius: 6, border: '1px solid #ccc', background: '#fff', fontFamily: 'var(--font-mono)', fontSize: '0.8125rem' }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Grand Total Summary Card */}
                <div
                  style={{
                    marginTop: 18,
                    background: '#F5EFE6',
                    borderRadius: 10,
                    border: '1.5px solid #dcd4c8',
                    padding: '14px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: 12
                  }}
                >
                  <div>
                    <strong style={{ fontSize: '0.9375rem', color: '#080705' }}>Auto-Sum Grand Total:</strong>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(8, 7, 5, 0.65)' }}>Calculated across all sources</div>
                  </div>
                  <div style={{ display: 'flex', gap: 14, fontFamily: 'var(--font-mono)', fontSize: '0.875rem', fontWeight: 800 }}>
                    <div>Pending Last: <strong>{grandTotal.pendingLastMonth}</strong></div>
                    <div>Rec: <strong>{grandTotal.received}</strong></div>
                    <div style={{ color: '#15803d' }}>Res: <strong>{grandTotal.resolved}</strong></div>
                    <div style={{ color: grandTotal.totalPending > 0 ? '#702632' : '#15803d' }}>
                      Pending: <strong>{grandTotal.totalPending}</strong>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: HEADER & METADATA EDITOR */}
            {activeTab === 'header' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#080705', margin: 0 }}>
                  Statutory Header & Compliance Labels
                </h3>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: 4 }}>
                    Month Ending *
                  </label>
                  <input
                    type="text"
                    value={data.header.monthEnding}
                    onChange={(e) =>
                      handleUpdate((prev) => ({
                        ...prev,
                        header: { ...prev.header, monthEnding: e.target.value }
                      }))
                    }
                    placeholder="e.g. October 2026"
                    style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #ccc' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: 4 }}>
                    Eyebrow Label
                  </label>
                  <input
                    type="text"
                    value={data.header.eyebrow}
                    onChange={(e) =>
                      handleUpdate((prev) => ({
                        ...prev,
                        header: { ...prev.header, eyebrow: e.target.value }
                      }))
                    }
                    style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #ccc' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: 4 }}>
                    Section Title
                  </label>
                  <input
                    type="text"
                    value={data.header.title}
                    onChange={(e) =>
                      handleUpdate((prev) => ({
                        ...prev,
                        header: { ...prev.header, title: e.target.value }
                      }))
                    }
                    style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #ccc' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: 4 }}>
                    SEBI Circular Reference Paragraph
                  </label>
                  <textarea
                    rows={3}
                    value={data.header.circularRef}
                    onChange={(e) =>
                      handleUpdate((prev) => ({
                        ...prev,
                        header: { ...prev.header, circularRef: e.target.value }
                      }))
                    }
                    style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #ccc', fontSize: '0.8125rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: 4 }}>
                    Statutory Footnote Certification
                  </label>
                  <input
                    type="text"
                    value={data.header.footnote}
                    onChange={(e) =>
                      handleUpdate((prev) => ({
                        ...prev,
                        header: { ...prev.header, footnote: e.target.value }
                      }))
                    }
                    style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #ccc' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: 4 }}>
                    Compliance Officer Name
                  </label>
                  <input
                    type="text"
                    value={data.header.complianceOfficerName}
                    onChange={(e) =>
                      handleUpdate((prev) => ({
                        ...prev,
                        header: { ...prev.header, complianceOfficerName: e.target.value }
                      }))
                    }
                    style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #ccc' }}
                  />
                </div>
              </div>
            )}

            {/* TAB 3: SECTION 2 TREND OF COMPLAINTS DISPOSAL */}
            {activeTab === 'section2' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#080705', margin: 0 }}>
                    Section 2: Historical Disposal Trends
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8125rem' }}>
                    <span>Display:</span>
                    <input
                      type="number"
                      min="1"
                      max="24"
                      value={data.section2.monthlyCountToShow}
                      onChange={(e) =>
                        handleUpdate((prev) => ({
                          ...prev,
                          section2: { ...prev.section2, monthlyCountToShow: parseInt(e.target.value, 10) || 6 }
                        }))
                      }
                      style={{ width: 55, padding: '4px 6px', borderRadius: 6, border: '1px solid #ccc', textAlign: 'center' }}
                    />
                    <span>Months</span>
                  </div>
                </div>

                {/* Monthly Trend Entries */}
                <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#702632', marginBottom: 10 }}>
                  Monthly History (Last {data.section2.monthlyCountToShow} Months)
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
                  {data.section2.monthlyTrend.map((t, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: '#FAF6F0',
                        borderRadius: 8,
                        padding: '10px 14px',
                        display: 'grid',
                        gridTemplateColumns: '1.4fr 1fr 1fr 1fr 1fr auto',
                        gap: 8,
                        alignItems: 'center'
                      }}
                    >
                      <input
                        type="text"
                        value={t.month}
                        onChange={(e) => {
                          const val = e.target.value;
                          handleUpdate((prev) => {
                            const mt = [...prev.section2.monthlyTrend];
                            mt[idx].month = val;
                            return { ...prev, section2: { ...prev.section2, monthlyTrend: mt } };
                          });
                        }}
                        style={{ padding: '4px 6px', borderRadius: 4, border: '1px solid #ccc', fontSize: '0.75rem', fontWeight: 700 }}
                      />
                      <input
                        type="number"
                        value={t.carried}
                        placeholder="Carried"
                        onChange={(e) => {
                          const val = parseInt(e.target.value, 10) || 0;
                          handleUpdate((prev) => {
                            const mt = [...prev.section2.monthlyTrend];
                            mt[idx].carried = val;
                            return { ...prev, section2: { ...prev.section2, monthlyTrend: mt } };
                          });
                        }}
                        style={{ padding: '4px 6px', borderRadius: 4, border: '1px solid #ccc', fontSize: '0.75rem' }}
                      />
                      <input
                        type="number"
                        value={t.received}
                        placeholder="Rec"
                        onChange={(e) => {
                          const val = parseInt(e.target.value, 10) || 0;
                          handleUpdate((prev) => {
                            const mt = [...prev.section2.monthlyTrend];
                            mt[idx].received = val;
                            return { ...prev, section2: { ...prev.section2, monthlyTrend: mt } };
                          });
                        }}
                        style={{ padding: '4px 6px', borderRadius: 4, border: '1px solid #ccc', fontSize: '0.75rem' }}
                      />
                      <input
                        type="number"
                        value={t.resolved}
                        placeholder="Res"
                        onChange={(e) => {
                          const val = parseInt(e.target.value, 10) || 0;
                          handleUpdate((prev) => {
                            const mt = [...prev.section2.monthlyTrend];
                            mt[idx].resolved = val;
                            return { ...prev, section2: { ...prev.section2, monthlyTrend: mt } };
                          });
                        }}
                        style={{ padding: '4px 6px', borderRadius: 4, border: '1px solid #ccc', fontSize: '0.75rem' }}
                      />
                      <input
                        type="number"
                        value={t.pending}
                        placeholder="Pending"
                        onChange={(e) => {
                          const val = parseInt(e.target.value, 10) || 0;
                          handleUpdate((prev) => {
                            const mt = [...prev.section2.monthlyTrend];
                            mt[idx].pending = val;
                            return { ...prev, section2: { ...prev.section2, monthlyTrend: mt } };
                          });
                        }}
                        style={{ padding: '4px 6px', borderRadius: 4, border: '1px solid #ccc', fontSize: '0.75rem', fontWeight: 700 }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          handleUpdate((prev) => ({
                            ...prev,
                            section2: {
                              ...prev.section2,
                              monthlyTrend: prev.section2.monthlyTrend.filter((_, i) => i !== idx)
                            }
                          }));
                        }}
                        style={{ background: 'transparent', border: 'none', color: '#b91c1c', cursor: 'pointer' }}
                        title="Delete month"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => {
                      handleUpdate((prev) => ({
                        ...prev,
                        section2: {
                          ...prev.section2,
                          monthlyTrend: [
                            ...prev.section2.monthlyTrend,
                            {
                              sno: prev.section2.monthlyTrend.length + 1,
                              month: 'New Month',
                              carried: 0,
                              received: 0,
                              resolved: 0,
                              pending: 0
                            }
                          ]
                        }
                      }));
                    }}
                    style={{ padding: '6px 12px', borderRadius: 6, border: '1px dashed #ccc', background: '#fff', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
                  >
                    <Plus size={13} />
                    <span>Add Historical Month</span>
                  </button>
                </div>

                {/* Annual FY History */}
                <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#702632', marginBottom: 10 }}>
                  Annual Trend by Financial Year (April – March)
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {data.section2.annualTrend.map((a, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: '#FAF6F0',
                        borderRadius: 8,
                        padding: '10px 14px',
                        display: 'grid',
                        gridTemplateColumns: '1.4fr 1fr 1fr 1fr 1fr auto',
                        gap: 8,
                        alignItems: 'center'
                      }}
                    >
                      <input
                        type="text"
                        value={a.year}
                        onChange={(e) => {
                          const val = e.target.value;
                          handleUpdate((prev) => {
                            const at = [...prev.section2.annualTrend];
                            at[idx].year = val;
                            return { ...prev, section2: { ...prev.section2, annualTrend: at } };
                          });
                        }}
                        style={{ padding: '4px 6px', borderRadius: 4, border: '1px solid #ccc', fontSize: '0.75rem', fontWeight: 700 }}
                      />
                      <input
                        type="number"
                        value={a.carried}
                        onChange={(e) => {
                          const val = parseInt(e.target.value, 10) || 0;
                          handleUpdate((prev) => {
                            const at = [...prev.section2.annualTrend];
                            at[idx].carried = val;
                            return { ...prev, section2: { ...prev.section2, annualTrend: at } };
                          });
                        }}
                        style={{ padding: '4px 6px', borderRadius: 4, border: '1px solid #ccc', fontSize: '0.75rem' }}
                      />
                      <input
                        type="number"
                        value={a.received}
                        onChange={(e) => {
                          const val = parseInt(e.target.value, 10) || 0;
                          handleUpdate((prev) => {
                            const at = [...prev.section2.annualTrend];
                            at[idx].received = val;
                            return { ...prev, section2: { ...prev.section2, annualTrend: at } };
                          });
                        }}
                        style={{ padding: '4px 6px', borderRadius: 4, border: '1px solid #ccc', fontSize: '0.75rem' }}
                      />
                      <input
                        type="number"
                        value={a.resolved}
                        onChange={(e) => {
                          const val = parseInt(e.target.value, 10) || 0;
                          handleUpdate((prev) => {
                            const at = [...prev.section2.annualTrend];
                            at[idx].resolved = val;
                            return { ...prev, section2: { ...prev.section2, annualTrend: at } };
                          });
                        }}
                        style={{ padding: '4px 6px', borderRadius: 4, border: '1px solid #ccc', fontSize: '0.75rem' }}
                      />
                      <input
                        type="number"
                        value={a.pending}
                        onChange={(e) => {
                          const val = parseInt(e.target.value, 10) || 0;
                          handleUpdate((prev) => {
                            const at = [...prev.section2.annualTrend];
                            at[idx].pending = val;
                            return { ...prev, section2: { ...prev.section2, annualTrend: at } };
                          });
                        }}
                        style={{ padding: '4px 6px', borderRadius: 4, border: '1px solid #ccc', fontSize: '0.75rem', fontWeight: 700 }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          handleUpdate((prev) => ({
                            ...prev,
                            section2: {
                              ...prev.section2,
                              annualTrend: prev.section2.annualTrend.filter((_, i) => i !== idx)
                            }
                          }));
                        }}
                        style={{ background: 'transparent', border: 'none', color: '#b91c1c', cursor: 'pointer' }}
                        title="Delete FY"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => {
                      handleUpdate((prev) => ({
                        ...prev,
                        section2: {
                          ...prev.section2,
                          annualTrend: [
                            ...prev.section2.annualTrend,
                            {
                              sno: prev.section2.annualTrend.length + 1,
                              year: 'FY 2026–27',
                              carried: 0,
                              received: 0,
                              resolved: 0,
                              pending: 0
                            }
                          ]
                        }
                      }));
                    }}
                    style={{ padding: '6px 12px', borderRadius: 6, border: '1px dashed #ccc', background: '#fff', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
                  >
                    <Plus size={13} />
                    <span>Add Financial Year</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 4: SECTION 3 AUDIT REPORTS */}
            {activeTab === 'section3' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#080705', margin: 0 }}>
                    Annual Compliance Audit Reports
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      handleUpdate((prev) => ({
                        ...prev,
                        section3: {
                          ...prev.section3,
                          auditReports: [
                            {
                              id: `rep-${Date.now()}`,
                              financialYear: 'FY 2026–27',
                              status: 'In progress',
                              adverseFindings: 'Audit commenced.'
                            },
                            ...prev.section3.auditReports
                          ]
                        }
                      }));
                    }}
                    style={{
                      padding: '6px 12px',
                      borderRadius: 6,
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      background: '#1e2022',
                      color: '#FFFFFA',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4
                    }}
                  >
                    <Plus size={13} />
                    <span>Add Audit Report</span>
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {data.section3.auditReports.map((rep, idx) => (
                    <div
                      key={rep.id || idx}
                      style={{
                        background: '#FAF6F0',
                        borderRadius: 10,
                        border: '1px solid #e7e2da',
                        padding: 16
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                          <input
                            type="text"
                            value={rep.financialYear}
                            onChange={(e) => {
                              const val = e.target.value;
                              handleUpdate((prev) => {
                                const reps = [...prev.section3.auditReports];
                                reps[idx].financialYear = val;
                                return { ...prev, section3: { ...prev.section3, auditReports: reps } };
                              });
                            }}
                            style={{ fontWeight: 700, fontSize: '0.875rem', padding: '4px 8px', borderRadius: 6, border: '1px solid #ccc' }}
                          />
                          <select
                            value={rep.status}
                            onChange={(e) => {
                              const val = e.target.value;
                              handleUpdate((prev) => {
                                const reps = [...prev.section3.auditReports];
                                reps[idx].status = val;
                                return { ...prev, section3: { ...prev.section3, auditReports: reps } };
                              });
                            }}
                            style={{ padding: '4px 8px', borderRadius: 6, border: '1px solid #ccc', fontSize: '0.8125rem' }}
                          >
                            <option value="Completed">Completed</option>
                            <option value="In progress">In progress</option>
                            <option value="Not applicable">Not applicable</option>
                          </select>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            handleUpdate((prev) => ({
                              ...prev,
                              section3: {
                                ...prev.section3,
                                auditReports: prev.section3.auditReports.filter((_, i) => i !== idx)
                              }
                            }));
                          }}
                          style={{ background: 'transparent', border: 'none', color: '#b91c1c', cursor: 'pointer' }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <div style={{ marginBottom: 10 }}>
                        <label style={{ display: 'block', fontSize: '0.6875rem', fontWeight: 700, color: 'rgba(8,7,5,0.6)', marginBottom: 2 }}>
                          Report Document PDF Link / File URL
                        </label>
                        <input
                          type="text"
                          value={rep.reportUrl || ''}
                          placeholder="/reports/compliance-audit-fy24-25.pdf"
                          onChange={(e) => {
                            const val = e.target.value;
                            handleUpdate((prev) => {
                              const reps = [...prev.section3.auditReports];
                              reps[idx].reportUrl = val;
                              return { ...prev, section3: { ...prev.section3, auditReports: reps } };
                            });
                          }}
                          style={{ width: '100%', padding: '6px 8px', borderRadius: 6, border: '1px solid #ccc', fontSize: '0.8125rem' }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.6875rem', fontWeight: 700, color: 'rgba(8,7,5,0.6)', marginBottom: 2 }}>
                          Adverse Findings / Auditor Statement
                        </label>
                        <textarea
                          rows={2}
                          value={rep.adverseFindings}
                          onChange={(e) => {
                            const val = e.target.value;
                            handleUpdate((prev) => {
                              const reps = [...prev.section3.auditReports];
                              reps[idx].adverseFindings = val;
                              return { ...prev, section3: { ...prev.section3, auditReports: reps } };
                            });
                          }}
                          style={{ width: '100%', padding: '6px 8px', borderRadius: 6, border: '1px solid #ccc', fontSize: '0.8125rem' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* =========================================================
            RIGHT COLUMN: REAL-TIME LIVE PREVIEW OF PUBLIC SITE
            ========================================================= */}
        {(previewMode === 'split' || previewMode === 'preview') && (
          <div
            style={{
              background: '#FFFFFA',
              borderRadius: 16,
              border: '1px solid rgba(8, 7, 5, 0.1)',
              padding: 24,
              boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
              position: 'sticky',
              top: 20
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(8, 7, 5, 0.1)', paddingBottom: 12, marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Eye size={16} style={{ color: '#702632' }} />
                <strong style={{ fontSize: '0.9375rem', color: '#080705' }}>Live Public Complaint Board Preview</strong>
              </div>
              <span style={{ fontSize: '0.75rem', color: '#702632', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                Updates in Real-Time
              </span>
            </div>

            {/* Public Section 1 Rendering */}
            <div style={{ marginBottom: 20 }}>
              <span style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', color: '#702632', fontWeight: 700, letterSpacing: '0.06em' }}>
                {data.header.eyebrow}
              </span>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#080705', marginTop: 2, marginBottom: 4 }}>
                {data.header.title}
              </h2>
              <p style={{ color: 'rgba(8, 7, 5, 0.65)', fontSize: '0.75rem', lineHeight: 1.45, marginBottom: 12 }}>
                {data.header.circularRef}
              </p>

              {/* View mode toggle in preview */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 10 }}>
                <div style={{ display: 'inline-flex', padding: 2, background: '#eee', borderRadius: 6, fontSize: '0.6875rem' }}>
                  <button
                    type="button"
                    onClick={() => setPreviewSubTab('table')}
                    style={{ padding: '3px 8px', borderRadius: 4, border: 'none', background: previewSubTab === 'table' ? '#fff' : 'transparent', fontWeight: 700, cursor: 'pointer' }}
                  >
                    Table
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewSubTab('cards')}
                    style={{ padding: '3px 8px', borderRadius: 4, border: 'none', background: previewSubTab === 'cards' ? '#fff' : 'transparent', fontWeight: 700, cursor: 'pointer' }}
                  >
                    Cards
                  </button>
                </div>
              </div>

              {/* Preview Table */}
              {previewSubTab === 'table' && (
                <div className="sebi-statutory-table-wrapper" style={{ margin: 0 }}>
                  <table className="sebi-statutory-table" style={{ fontSize: '0.75rem', minWidth: '100%' }}>
                    <thead>
                      <tr>
                        <th style={{ width: 45, textAlign: 'center', padding: '8px 6px' }}>Sr.</th>
                        <th style={{ minWidth: 100, padding: '8px 6px' }}>Received from</th>
                        <th style={{ minWidth: 90, padding: '8px 6px' }}>Pending Last Mo</th>
                        <th style={{ minWidth: 60, textAlign: 'center', padding: '8px 6px' }}>Rec</th>
                        <th style={{ minWidth: 60, textAlign: 'center', padding: '8px 6px' }}>Res</th>
                        <th style={{ minWidth: 70, textAlign: 'center', padding: '8px 6px' }}>Pending</th>
                        <th style={{ minWidth: 90, padding: '8px 6px' }}>&gt; Months</th>
                        <th style={{ minWidth: 70, padding: '8px 6px' }}>Avg Days</th>
                      </tr>
                    </thead>
                    <tbody>
                      {calculatedRows.map((r, i) => (
                        <tr key={r.id || i}>
                          <td style={{ textAlign: 'center', padding: '8px 6px' }}>{r.sno}</td>
                          <td style={{ fontWeight: 600, padding: '8px 6px' }}>{r.source}</td>
                          <td style={{ padding: '8px 6px', fontFamily: 'var(--font-mono)' }}>{r.pendingLastMonth}</td>
                          <td style={{ textAlign: 'center', padding: '8px 6px', fontFamily: 'var(--font-mono)' }}>{r.received}</td>
                          <td style={{ textAlign: 'center', padding: '8px 6px', fontFamily: 'var(--font-mono)', color: r.resolved > 0 ? '#15803d' : 'inherit' }}>{r.resolved}</td>
                          <td style={{ textAlign: 'center', padding: '8px 6px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: r.totalPending > 0 ? '#702632' : '#15803d' }}>
                            {r.totalPending}
                          </td>
                          <td style={{ padding: '8px 6px', fontFamily: 'var(--font-mono)' }}>{r.pendingOverMonths}</td>
                          <td style={{ padding: '8px 6px', fontFamily: 'var(--font-mono)' }}>{r.avgResolutionDays}</td>
                        </tr>
                      ))}
                      <tr className="total-row" style={{ fontWeight: 800 }}>
                        <td></td>
                        <td style={{ padding: '8px 6px' }}>Grand Total</td>
                        <td style={{ padding: '8px 6px', fontFamily: 'var(--font-mono)' }}>{grandTotal.pendingLastMonth}</td>
                        <td style={{ textAlign: 'center', padding: '8px 6px', fontFamily: 'var(--font-mono)' }}>{grandTotal.received}</td>
                        <td style={{ textAlign: 'center', padding: '8px 6px', fontFamily: 'var(--font-mono)', color: '#15803d' }}>{grandTotal.resolved}</td>
                        <td style={{ textAlign: 'center', padding: '8px 6px', fontFamily: 'var(--font-mono)', color: grandTotal.totalPending > 0 ? '#702632' : '#15803d' }}>
                          {grandTotal.totalPending}
                        </td>
                        <td style={{ padding: '8px 6px', fontFamily: 'var(--font-mono)' }}>{grandTotal.pendingOverMonths}</td>
                        <td style={{ padding: '8px 6px', fontFamily: 'var(--font-mono)' }}>{grandTotal.avgResolutionDays}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {/* Preview Cards View */}
              {previewSubTab === 'cards' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {calculatedRows.map((r, i) => (
                    <div key={r.id || i} style={{ background: '#FAF6F0', borderRadius: 8, padding: 12, border: '1px solid #e7e2da' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                        <strong>{r.source}</strong>
                        <span style={{ fontSize: '0.7rem', padding: '2px 6px', borderRadius: 999, background: r.totalPending > 0 ? '#fee2e2' : '#ecfdf5', color: r.totalPending > 0 ? '#991b1b' : '#047857', fontWeight: 700 }}>
                          {r.totalPending} Pending
                        </span>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, fontSize: '0.7rem' }}>
                        <div>Last Mo: <strong>{r.pendingLastMonth}</strong></div>
                        <div>Rec: <strong>{r.received}</strong></div>
                        <div>Res: <strong style={{ color: '#15803d' }}>{r.resolved}</strong></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Preview Footnote */}
              <div style={{ marginTop: 10, display: 'flex', justifyContent: 'space-between', fontSize: '0.6875rem', color: 'rgba(8,7,5,0.6)' }}>
                <div>{data.header.footnote}</div>
                <div>Compliance Officer: <strong>{data.header.complianceOfficerName}</strong></div>
              </div>
            </div>

            {/* Historical Trend Preview */}
            <div style={{ borderTop: '1px solid rgba(8, 7, 5, 0.1)', paddingTop: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <strong style={{ fontSize: '0.8125rem' }}>Section 2: Trend Summary Preview</strong>
                <div style={{ display: 'inline-flex', padding: 2, background: '#eee', borderRadius: 6, fontSize: '0.625rem' }}>
                  <button
                    type="button"
                    onClick={() => setPreviewTrendTab('monthly')}
                    style={{ padding: '2px 6px', borderRadius: 4, border: 'none', background: previewTrendTab === 'monthly' ? '#fff' : 'transparent', fontWeight: 700, cursor: 'pointer' }}
                  >
                    Monthly (Last {data.section2.monthlyCountToShow})
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewTrendTab('annual')}
                    style={{ padding: '2px 6px', borderRadius: 4, border: 'none', background: previewTrendTab === 'annual' ? '#fff' : 'transparent', fontWeight: 700, cursor: 'pointer' }}
                  >
                    Annual (FY)
                  </button>
                </div>
              </div>

              {previewTrendTab === 'monthly' ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: 6 }}>
                  {data.section2.monthlyTrend.slice(-data.section2.monthlyCountToShow).map((m, idx) => (
                    <div key={idx} style={{ background: '#FAF6F0', borderRadius: 6, padding: 8, fontSize: '0.6875rem', border: '1px solid #e7e2da' }}>
                      <div style={{ fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.month}</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                        <span>Rec: {m.received}</span>
                        <span style={{ color: '#15803d' }}>Res: {m.resolved}</span>
                      </div>
                      <div style={{ marginTop: 2, fontWeight: 700, color: m.pending > 0 ? '#702632' : '#15803d' }}>
                        Pending: {m.pending}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: 6 }}>
                  {data.section2.annualTrend.map((a, idx) => (
                    <div key={idx} style={{ background: '#FAF6F0', borderRadius: 6, padding: 8, fontSize: '0.6875rem', border: '1px solid #e7e2da' }}>
                      <div style={{ fontWeight: 700 }}>{a.year}</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                        <span>Rec: {a.received}</span>
                        <span style={{ color: '#15803d' }}>Res: {a.resolved}</span>
                      </div>
                      <div style={{ marginTop: 2, fontWeight: 700, color: a.pending > 0 ? '#702632' : '#15803d' }}>
                        Pending: {a.pending}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
