import React, { useState, useEffect } from 'react';
import { History, Search, Filter, RefreshCw, User, Calendar, CheckCircle2, ChevronDown, ChevronRight } from 'lucide-react';
import { getStorageAdapter } from '../../content/storage';

export default function ActivityLogView() {
  const [logs, setLogs] = useState([]);
  const [actionFilter, setActionFilter] = useState('All');
  const [userFilter, setUserFilter] = useState('All');
  const [expandedLogId, setExpandedLogId] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadLogs = async () => {
    setLoading(true);
    try {
      const storage = getStorageAdapter();
      const items = await storage.getAuditLogs({ limit: 100 });
      setLogs(items);
    } catch (e) {
      console.error('Error fetching logs:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLogs();
  }, []);

  const filteredLogs = logs.filter((log) => {
    const matchesAction = actionFilter === 'All' || log.action.includes(actionFilter);
    const matchesUser = userFilter === 'All' || log.username.toLowerCase() === userFilter.toLowerCase();
    return matchesAction && matchesUser;
  });

  const uniqueActions = Array.from(new Set(logs.map((l) => l.action)));
  const uniqueUsers = Array.from(new Set(logs.map((l) => l.username)));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
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
            Audit & Activity Trail
          </h1>
          <p style={{ fontSize: '0.8125rem', color: 'rgba(8, 7, 5, 0.65)', margin: '4px 0 0 0' }}>
            Comprehensive immutable log of every administrative edit, publishing action, and password update.
          </p>
        </div>

        <button
          type="button"
          onClick={loadLogs}
          style={{
            padding: '8px 14px',
            borderRadius: 8,
            background: '#FAF6F0',
            border: '1px solid #e7e2da',
            color: '#080705',
            fontWeight: 700,
            fontSize: '0.8125rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6
          }}
        >
          <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
          <span>Refresh Logs</span>
        </button>
      </div>

      {/* Filter Bar */}
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8125rem' }}>
          <span style={{ color: 'rgba(8,7,5,0.6)', fontWeight: 700 }}>Action Filter:</span>
          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            style={{ padding: '6px 10px', borderRadius: 8, border: '1px solid #ccc', fontSize: '0.8125rem' }}
          >
            <option value="All">All Actions</option>
            {uniqueActions.map((act) => (
              <option key={act} value={act}>
                {act}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8125rem' }}>
          <span style={{ color: 'rgba(8,7,5,0.6)', fontWeight: 700 }}>User:</span>
          <select
            value={userFilter}
            onChange={(e) => setUserFilter(e.target.value)}
            style={{ padding: '6px 10px', borderRadius: 8, border: '1px solid #ccc', fontSize: '0.8125rem' }}
          >
            <option value="All">All Users</option>
            {uniqueUsers.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginLeft: 'auto', fontSize: '0.75rem', color: 'rgba(8,7,5,0.6)' }}>
          Showing <strong>{filteredLogs.length}</strong> events
        </div>
      </div>

      {/* Audit Log Table */}
      <div
        style={{
          background: '#FFFFFA',
          borderRadius: 16,
          border: '1px solid rgba(8, 7, 5, 0.1)',
          overflowX: 'auto',
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem', minWidth: 800 }}>
          <thead>
            <tr style={{ background: '#1e2022', color: '#FFFFFA', textAlign: 'left' }}>
              <th style={{ padding: '12px 14px', width: 40 }}></th>
              <th style={{ padding: '12px 14px', width: 170 }}>Timestamp</th>
              <th style={{ padding: '12px 14px', width: 110 }}>Operator</th>
              <th style={{ padding: '12px 14px', width: 200 }}>Action Code</th>
              <th style={{ padding: '12px 14px' }}>Target Entity</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: 32, textAlign: 'center', color: 'rgba(8,7,5,0.5)' }}>
                  No audit logs found.
                </td>
              </tr>
            ) : (
              filteredLogs.map((log) => {
                const isExpanded = expandedLogId === log.id;
                return (
                  <React.Fragment key={log.id}>
                    <tr
                      onClick={() => setExpandedLogId(isExpanded ? null : log.id)}
                      style={{
                        borderBottom: '1px solid #e7e2da',
                        cursor: 'pointer',
                        background: isExpanded ? '#FAF6F0' : '#FFFFFA'
                      }}
                    >
                      <td style={{ padding: '12px 14px', textAlign: 'center' }}>
                        {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                      </td>
                      <td style={{ padding: '12px 14px', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'rgba(8,7,5,0.7)' }}>
                        {new Date(log.timestamp).toLocaleString()}
                      </td>
                      <td style={{ padding: '12px 14px', fontWeight: 700, color: '#080705' }}>
                        {log.username}
                      </td>
                      <td style={{ padding: '12px 14px' }}>
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            padding: '3px 8px',
                            borderRadius: 6,
                            background:
                              log.action.includes('PUBLISH')
                                ? 'rgba(16, 185, 129, 0.15)'
                                : log.action.includes('PASSWORD')
                                ? 'rgba(239, 68, 68, 0.15)'
                                : 'rgba(112, 38, 50, 0.1)',
                            color:
                              log.action.includes('PUBLISH')
                                ? '#047857'
                                : log.action.includes('PASSWORD')
                                ? '#b91c1c'
                                : '#702632'
                          }}
                        >
                          {log.action}
                        </span>
                      </td>
                      <td style={{ padding: '12px 14px', color: '#080705' }}>
                        {log.target}
                      </td>
                    </tr>

                    {/* Diff Details row if expanded */}
                    {isExpanded && (
                      <tr style={{ background: '#FAF6F0', borderBottom: '1px solid #e7e2da' }}>
                        <td></td>
                        <td colSpan={4} style={{ padding: '12px 16px 18px 0' }}>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                            <div>
                              <strong style={{ fontSize: '0.6875rem', textTransform: 'uppercase', color: 'rgba(8,7,5,0.6)', display: 'block', marginBottom: 4 }}>
                                Previous Snapshot:
                              </strong>
                              <pre
                                style={{
                                  background: '#fff',
                                  padding: 10,
                                  borderRadius: 8,
                                  border: '1px solid #ddd',
                                  fontSize: '0.6875rem',
                                  maxHeight: 140,
                                  overflowY: 'auto',
                                  margin: 0
                                }}
                              >
                                {log.previousValue ? JSON.stringify(log.previousValue, null, 2) : '(none)'}
                              </pre>
                            </div>

                            <div>
                              <strong style={{ fontSize: '0.6875rem', textTransform: 'uppercase', color: '#15803d', display: 'block', marginBottom: 4 }}>
                                New Snapshot:
                              </strong>
                              <pre
                                style={{
                                  background: '#fff',
                                  padding: 10,
                                  borderRadius: 8,
                                  border: '1px solid #a7f3d0',
                                  fontSize: '0.6875rem',
                                  maxHeight: 140,
                                  overflowY: 'auto',
                                  margin: 0
                                }}
                              >
                                {log.newValue ? JSON.stringify(log.newValue, null, 2) : '(none)'}
                              </pre>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
