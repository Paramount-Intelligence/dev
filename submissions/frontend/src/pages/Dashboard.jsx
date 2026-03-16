import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import * as svc from '../services/internService';
import StatusBadge from '../components/StatusBadge';
import DeleteModal from '../components/DeleteModal';
import Pagination from '../components/Pagination';
import LoadingSpinner from '../components/LoadingSpinner';

const ROLES = ['', 'Frontend', 'Backend', 'Fullstack', 'DevOps', 'UI/UX', 'Data Science'];
const STATUSES = ['', 'Applied', 'Screening', 'Interview', 'Offer', 'Hired', 'Rejected'];

export default function Dashboard() {
  const [interns, setInterns] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0, limit: 10 });
  const [filters, setFilters] = useState({ search: '', role: '', status: '' });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [stats, setStats] = useState({});

  const fetchInterns = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await svc.getInterns({ page, limit: 10, ...filters });
      setInterns(data.data);
      setPagination(data.pagination);

      const { data: all } = await svc.getInterns({ page: 1, limit: 1000 });
      const allInterns = all.data;
      setStats({
        total: all.pagination.total,
        hired: allInterns.filter((i) => i.status === 'Hired').length,
        interview: allInterns.filter((i) => i.status === 'Interview').length,
        rejected: allInterns.filter((i) => i.status === 'Rejected').length,
        avgScore: allInterns.length
          ? Math.round(allInterns.reduce((s, i) => s + i.score, 0) / allInterns.length)
          : 0,
      });
    } catch {
      setError('Failed to load intern data. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  }, [page, filters]);

  useEffect(() => { fetchInterns(); }, [fetchInterns]);

  const handleSearch = (e) => {
    setFilters((f) => ({ ...f, search: e.target.value }));
    setPage(1);
  };

  const handleFilter = (key, val) => {
    setFilters((f) => ({ ...f, [key]: val }));
    setPage(1);
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await svc.deleteIntern(deleteTarget._id);
      setDeleteTarget(null);
      fetchInterns();
    } catch {
      setError('Failed to delete intern.');
    } finally {
      setDeleting(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return '#10b981';
    if (score >= 60) return '#6366f1';
    if (score >= 40) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon purple">👥</div>
          <div><div className="stat-number" style={{ color: '#818cf8' }}>{stats.total ?? '–'}</div><div className="stat-label">Total Interns</div></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green">✅</div>
          <div><div className="stat-number" style={{ color: '#10b981' }}>{stats.hired ?? '–'}</div><div className="stat-label">Hired</div></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon blue">🎤</div>
          <div><div className="stat-number" style={{ color: '#60a5fa' }}>{stats.interview ?? '–'}</div><div className="stat-label">Interviewing</div></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon red">❌</div>
          <div><div className="stat-number" style={{ color: '#f87171' }}>{stats.rejected ?? '–'}</div><div className="stat-label">Rejected</div></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon yellow">⭐</div>
          <div><div className="stat-number" style={{ color: '#fbbf24' }}>{stats.avgScore ?? '–'}</div><div className="stat-label">Avg Score</div></div>
        </div>
      </div>

      <div className="page-header">
        <div>
          <h1 className="page-title">Intern Dashboard</h1>
          <p className="page-subtitle">Manage and track all intern records</p>
        </div>
        <Link to="/add" className="btn btn-primary">➕ Add Intern</Link>
      </div>

      <div className="filters-row">
        <div className="search-input-wrap">
          <span className="search-icon">🔍</span>
          <input
            value={filters.search}
            onChange={handleSearch}
            placeholder="Search by name or email…"
          />
        </div>
        <select
          className="filter-select"
          value={filters.role}
          onChange={(e) => handleFilter('role', e.target.value)}
        >
          {ROLES.map((r) => <option key={r} value={r}>{r || 'All Roles'}</option>)}
        </select>
        <select
          className="filter-select"
          value={filters.status}
          onChange={(e) => handleFilter('status', e.target.value)}
        >
          {STATUSES.map((s) => <option key={s} value={s}>{s || 'All Statuses'}</option>)}
        </select>
        {(filters.search || filters.role || filters.status) && (
          <button
            className="btn btn-ghost"
            onClick={() => { setFilters({ search: '', role: '', status: '' }); setPage(1); }}
          >
            ✕ Clear
          </button>
        )}
      </div>

      {error && <div className="alert alert-error">⚠️ {error}</div>}

      {loading ? (
        <LoadingSpinner />
      ) : interns.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <div className="empty-title">No interns found</div>
          <div className="empty-subtitle">
            {filters.search || filters.role || filters.status
              ? 'Try adjusting your filters'
              : 'Add your first intern to get started'}
          </div>
          {!filters.search && !filters.role && !filters.status && (
            <Link to="/add" className="btn btn-primary" style={{ marginTop: 12 }}>➕ Add Intern</Link>
          )}
        </div>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Role</th>
                <th>Status</th>
                <th>Score</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {interns.map((intern, idx) => (
                <tr key={intern._id}>
                  <td style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                    {(page - 1) * 10 + idx + 1}
                  </td>
                  <td>
                    <div className="td-name">{intern.name}</div>
                    <div className="td-email">{intern.email}</div>
                  </td>
                  <td><span className="role-badge">{intern.role}</span></td>
                  <td><StatusBadge status={intern.status} /></td>
                  <td>
                    <div className="score-bar-wrap">
                      <div className="score-bar">
                        <div
                          className="score-fill"
                          style={{ width: `${intern.score}%`, background: getScoreColor(intern.score) }}
                        />
                      </div>
                      <span className="td-score" style={{ color: getScoreColor(intern.score) }}>
                        {intern.score}
                      </span>
                    </div>
                  </td>
                  <td style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                    {new Date(intern.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td>
                    <div className="td-actions">
                      <Link to={`/edit/${intern._id}`} className="btn-icon edit" title="Edit">✏️</Link>
                      <button
                        className="btn-icon delete"
                        title="Delete"
                        onClick={() => setDeleteTarget(intern)}
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination pagination={pagination} onPageChange={setPage} />
        </div>
      )}

      {deleteTarget && (
        <DeleteModal
          intern={deleteTarget}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
          loading={deleting}
        />
      )}
    </div>
  );
}
