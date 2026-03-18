import React, { useState, useEffect, useCallback } from 'react';
import { getInterns, deleteIntern } from '../services/api';

const ROLES = ['', 'Frontend', 'Backend', 'Fullstack'];
const STATUSES = ['', 'Applied', 'Interviewing', 'Hired', 'Rejected'];

const statusColors = {
  Applied: '#6366f1',
  Interviewing: '#f59e0b',
  Hired: '#10b981',
  Rejected: '#ef4444',
};

export default function Dashboard({ onEdit, onRefresh }) {
  const [interns, setInterns] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const fetchInterns = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getInterns({
        search: search || undefined,
        role: roleFilter || undefined,
        status: statusFilter || undefined,
        page,
        limit: 8,
      });
      setInterns(res.data.interns);
      setTotal(res.data.total);
      setTotalPages(res.data.totalPages);
    } catch {
      setError('Failed to load interns. Make sure the server is running on port 5000.');
    } finally {
      setLoading(false);
    }
  }, [search, roleFilter, statusFilter, page]);

  useEffect(() => { fetchInterns(); }, [fetchInterns]);
  useEffect(() => { setPage(1); }, [search, roleFilter, statusFilter]);

  const handleDelete = async (id) => {
    try {
      await deleteIntern(id);
      setDeleteConfirm(null);
      fetchInterns();
      onRefresh();
    } catch {
      setError('Failed to delete intern.');
    }
  };

  const hired = interns.filter((i) => i.status === 'Hired').length;
  const avgScore = interns.length
    ? Math.round(interns.reduce((s, i) => s + i.score, 0) / interns.length)
    : 0;

  return (
    <div className="dashboard">
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-number">{total}</div>
          <div className="stat-label">Total Interns</div>
        </div>
        <div className="stat-card">
          <div className="stat-number" style={{ color: '#10b981' }}>{hired}</div>
          <div className="stat-label">Hired</div>
        </div>
        <div className="stat-card">
          <div className="stat-number" style={{ color: '#6366f1' }}>{avgScore}</div>
          <div className="stat-label">Avg Score</div>
        </div>
        <div className="stat-card">
          <div className="stat-number" style={{ color: '#f59e0b' }}>{totalPages}</div>
          <div className="stat-label">Pages</div>
        </div>
      </div>

      <div className="filters-row">
        <input
          className="input search-input"
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select className="input" value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
          {ROLES.map((r) => <option key={r} value={r}>{r || 'All Roles'}</option>)}
        </select>
        <select className="input" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          {STATUSES.map((s) => <option key={s} value={s}>{s || 'All Statuses'}</option>)}
        </select>
        <button className="btn btn-secondary" onClick={() => { setSearch(''); setRoleFilter(''); setStatusFilter(''); }}>
          Clear
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {loading ? (
        <div className="loading">Loading interns...</div>
      ) : interns.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">👥</div>
          <p>No interns found. Add one to get started!</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Score</th>
                <th>Added</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {interns.map((intern) => (
                <tr key={intern._id}>
                  <td><strong>{intern.name}</strong></td>
                  <td className="text-muted">{intern.email}</td>
                  <td><span className="badge badge-role">{intern.role}</span></td>
                  <td>
                    <span className="badge" style={{
                      background: (statusColors[intern.status] || '#888') + '22',
                      color: statusColors[intern.status] || '#888',
                      border: `1px solid ${(statusColors[intern.status] || '#888')}44`,
                    }}>
                      {intern.status}
                    </span>
                  </td>
                  <td>
                    <div className="score-bar">
                      <div className="score-track">
                        <div className="score-fill" style={{
                          width: `${intern.score}%`,
                          background: intern.score >= 70 ? '#10b981' : intern.score >= 40 ? '#f59e0b' : '#ef4444',
                        }} />
                      </div>
                      <span className="score-text">{intern.score}</span>
                    </div>
                  </td>
                  <td className="text-muted">{new Date(intern.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn btn-sm btn-edit" onClick={() => onEdit(intern)}>Edit</button>
                      <button className="btn btn-sm btn-delete" onClick={() => setDeleteConfirm(intern._id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {totalPages > 1 && (
        <div className="pagination">
          <button className="btn btn-secondary btn-sm" disabled={page === 1} onClick={() => setPage(page - 1)}>← Prev</button>
          <span className="page-info">Page {page} of {totalPages}</span>
          <button className="btn btn-secondary btn-sm" disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next →</button>
        </div>
      )}

      {deleteConfirm && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Delete Intern?</h3>
            <p>This action cannot be undone.</p>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setDeleteConfirm(null)}>Cancel</button>
              <button className="btn btn-danger" onClick={() => handleDelete(deleteConfirm)}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}