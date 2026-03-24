import React, { useState, useEffect, useCallback } from 'react';
import {
  getInterns,
  createIntern,
  updateIntern,
  deleteIntern,
} from '../services/internApi';
import InternForm      from '../components/InternForm';
import Modal           from '../components/Modal';
import ConfirmDialog   from '../components/ConfirmDialog';
import Pagination      from '../components/Pagination';

const ROLES    = ['', 'Frontend', 'Backend', 'Fullstack'];
const STATUSES = ['', 'Applied', 'Interviewing', 'Hired', 'Rejected'];

const STATUS_CLASS = {
  Applied:      'status-applied',
  Interviewing: 'status-interviewing',
  Hired:        'status-hired',
  Rejected:     'status-rejected',
};

/* Coloured progress bar for score */
function ScoreBar({ score }) {
  const color =
    score >= 70 ? '#22c55e' :
    score >= 40 ? '#f59e0b' :
                  '#ef4444';
  return (
    <div className="score-bar-wrap">
      <div className="score-bar-bg">
        <div
          className="score-bar-fill"
          style={{ width: `${score}%`, background: color }}
        />
      </div>
      <span className="score-label">{score}</span>
    </div>
  );
}

export default function InternList() {
  /* ── List state ─────────────────────────────────── */
  const [interns,    setInterns]    = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
  const [loading,    setLoading]    = useState(false);
  const [error,      setError]      = useState('');

  /* ── Filter state ───────────────────────────────── */
  const [search,       setSearch]       = useState('');
  const [roleFilter,   setRoleFilter]   = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  /* ── Modal / action state ───────────────────────── */
  const [showAddModal,   setShowAddModal]   = useState(false);
  const [editIntern,     setEditIntern]     = useState(null);   // intern object or null
  const [deleteTarget,   setDeleteTarget]   = useState(null);   // intern object or null
  const [actionLoading,  setActionLoading]  = useState(false);
  const [actionError,    setActionError]    = useState('');

  /* ── Fetch interns ──────────────────────────────── */
  const fetchInterns = useCallback(async (page = 1) => {
    setLoading(true);
    setError('');
    try {
      const res = await getInterns({
        search,
        role:   roleFilter,
        status: statusFilter,
        page,
        limit: 8,
      });
      setInterns(res.data.data);
      setPagination(res.data.pagination);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load interns. Is the backend running?');
    } finally {
      setLoading(false);
    }
  }, [search, roleFilter, statusFilter]);

  /* Debounce search + re-fetch when filters change */
  useEffect(() => {
    const timer = setTimeout(() => fetchInterns(1), 350);
    return () => clearTimeout(timer);
  }, [fetchInterns]);

  /* ── Create ─────────────────────────────────────── */
  const handleAdd = async (data) => {
    setActionLoading(true);
    setActionError('');
    try {
      await createIntern(data);
      setShowAddModal(false);
      fetchInterns(1);
    } catch (err) {
      setActionError(err.response?.data?.message || 'Failed to create intern');
    } finally {
      setActionLoading(false);
    }
  };

  /* ── Update ─────────────────────────────────────── */
  const handleEdit = async (data) => {
    setActionLoading(true);
    setActionError('');
    try {
      await updateIntern(editIntern._id, data);
      setEditIntern(null);
      fetchInterns(pagination.page);
    } catch (err) {
      setActionError(err.response?.data?.message || 'Failed to update intern');
    } finally {
      setActionLoading(false);
    }
  };

  /* ── Delete ─────────────────────────────────────── */
  const handleDelete = async () => {
    setActionLoading(true);
    setActionError('');
    try {
      await deleteIntern(deleteTarget._id);
      setDeleteTarget(null);
      // If last item on page, go back one page
      const newPage =
        interns.length === 1 && pagination.page > 1
          ? pagination.page - 1
          : pagination.page;
      fetchInterns(newPage);
    } catch (err) {
      setActionError(err.response?.data?.message || 'Failed to delete intern');
    } finally {
      setActionLoading(false);
    }
  };

  /* ── Render ─────────────────────────────────────── */
  return (
    <div className="page">

      {/* ── Header ── */}
      <header className="page-header">
        <div className="header-left">
          <div className="logo-mark">IT</div>
          <div className="header-titles">
            <h1>Intern Tracker</h1>
            <p className="subtitle">Intern Pipeline Dashboard</p>
          </div>
        </div>
        <div className="header-right">
          <button
            className="btn btn-primary"
            onClick={() => { setShowAddModal(true); setActionError(''); }}
          >
            + Add Intern
          </button>
        </div>
      </header>

      {/* ── Filters ── */}
      <div className="filters-bar">
        <input
          className="search-input"
          placeholder="Search by name or email…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          {ROLES.map((r) => (
            <option key={r} value={r}>{r || 'All Roles'}</option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s || 'All Statuses'}</option>
          ))}
        </select>
        <span className="total-count">
          {pagination.total} intern{pagination.total !== 1 ? 's' : ''}
        </span>
      </div>

      {/* ── List-level error ── */}
      {error && <div className="error-banner">{error}</div>}

      {/* ── Table ── */}
      <div className="table-wrap">
        {loading ? (
          <div className="loading-state">
            <div className="spinner" />
            <p>Loading interns…</p>
          </div>
        ) : interns.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <p>No interns found</p>
            <span>Try adjusting your search or filters</span>
          </div>
        ) : (
          <table className="intern-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Score</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {interns.map((intern) => (
                <tr key={intern._id}>
                  <td className="name-cell">{intern.name}</td>
                  <td className="email-cell">{intern.email}</td>
                  <td>
                    <span className="role-badge">{intern.role}</span>
                  </td>
                  <td>
                    <span className={`status-badge ${STATUS_CLASS[intern.status]}`}>
                      {intern.status}
                    </span>
                  </td>
                  <td>
                    <ScoreBar score={intern.score} />
                  </td>
                  <td className="date-cell">
                    {new Date(intern.createdAt).toLocaleDateString('en-GB', {
                      day: '2-digit', month: 'short', year: 'numeric',
                    })}
                  </td>
                  <td className="action-cell">
                    <button
                      className="btn btn-sm btn-ghost"
                      onClick={() => { setEditIntern(intern); setActionError(''); }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger-ghost"
                      onClick={() => { setDeleteTarget(intern); setActionError(''); }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ── Pagination ── */}
      <Pagination
        page={pagination.page}
        totalPages={pagination.totalPages}
        onPageChange={(p) => fetchInterns(p)}
      />

      {/* ── Add Intern Modal ── */}
      {showAddModal && (
        <Modal title="Add New Intern" onClose={() => setShowAddModal(false)}>
          {actionError && <div className="error-banner">{actionError}</div>}
          <InternForm
            onSubmit={handleAdd}
            onCancel={() => setShowAddModal(false)}
            loading={actionLoading}
          />
        </Modal>
      )}

      {/* ── Edit Intern Modal ── */}
      {editIntern && (
        <Modal title="Edit Intern" onClose={() => setEditIntern(null)}>
          {actionError && <div className="error-banner">{actionError}</div>}
          <InternForm
            initial={editIntern}
            onSubmit={handleEdit}
            onCancel={() => setEditIntern(null)}
            loading={actionLoading}
          />
        </Modal>
      )}

      {/* ── Delete Confirmation ── */}
      {deleteTarget && (
        <ConfirmDialog
          message={`Are you sure you want to delete "${deleteTarget.name}"? This cannot be undone.`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
          loading={actionLoading}
        />
      )}

    </div>
  );
}
