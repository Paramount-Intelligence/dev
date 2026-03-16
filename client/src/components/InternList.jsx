import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getInterns, deleteIntern } from '../services/api';
import { Edit2, Trash2, Search, Filter, Briefcase, FileText } from 'lucide-react';
import DeleteModal from './DeleteModal';

const InternList = () => {
  const [interns, setInterns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Pagination & Filtering
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Delete State
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [internToDelete, setInternToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchInterns = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getInterns({ search, role: roleFilter, status: statusFilter, page });
      setInterns(res.data);
      setTotalPages(res.pagination.pages);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch interns');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInterns();
  }, [page, search, roleFilter, statusFilter]);

  const handleDeleteConfirm = async () => {
    if (!internToDelete) return;
    try {
      setIsDeleting(true);
      await deleteIntern(internToDelete._id);
      setDeleteModalOpen(false);
      setInternToDelete(null);
      fetchInterns();
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to delete intern');
    } finally {
      setIsDeleting(false);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'Applied': return 'badge-applied';
      case 'Interviewing': return 'badge-interviewing';
      case 'Hired': return 'badge-hired';
      case 'Rejected': return 'badge-rejected';
      default: return '';
    }
  };

  return (
    <div className="glass-panel">
      <div className="controls-header">
        <div style={{ flex: 1, position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            className="input-field" 
            placeholder="Search by name or email..." 
            style={{ paddingLeft: '2.5rem' }}
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
        </div>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ position: 'relative' }}>
            <Briefcase size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
            <select 
              className="input-field" 
              style={{ paddingLeft: '2.5rem', width: '200px', cursor: 'pointer' }}
              value={roleFilter}
              onChange={(e) => { setRoleFilter(e.target.value); setPage(1); }}
            >
              <option value="">All Roles</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Fullstack">Fullstack</option>
            </select>
          </div>

          <div style={{ position: 'relative' }}>
            <Filter size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
            <select 
              className="input-field" 
              style={{ paddingLeft: '2.5rem', width: '200px', cursor: 'pointer' }}
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            >
              <option value="">All Statuses</option>
              <option value="Applied">Applied</option>
              <option value="Interviewing">Interviewing</option>
              <option value="Hired">Hired</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {error && (
        <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', borderRadius: '8px', marginBottom: '1rem' }}>
          {error}
        </div>
      )}

      <div className="table-container">
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem 0' }}>
            <div className="loader"></div>
          </div>
        ) : interns.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-muted)' }}>
            <FileText size={48} style={{ opacity: 0.5, marginBottom: '1rem' }} />
            <p>No interns found matching your criteria.</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Score</th>
                <th>Applied On</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {interns.map((intern) => (
                <tr key={intern._id}>
                  <td style={{ fontWeight: 500, color: 'white' }}>{intern.name}</td>
                  <td style={{ color: 'var(--text-muted)' }}>{intern.email}</td>
                  <td>
                    <span className="role-badge">
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'currentColor' }}></div>
                      {intern.role}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${getStatusBadgeClass(intern.status)}`}>
                      {intern.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontWeight: 600, color: intern.score >= 80 ? 'var(--success)' : intern.score >= 50 ? 'var(--warning)' : 'var(--danger)' }}>
                        {intern.score}
                      </span>
                      <div style={{ height: '4px', width: '40px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                        <div style={{ 
                          height: '100%', 
                          width: `${intern.score}%`, 
                          background: intern.score >= 80 ? 'var(--success)' : intern.score >= 50 ? 'var(--warning)' : 'var(--danger)' 
                        }}></div>
                      </div>
                    </div>
                  </td>
                  <td style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    {new Date(intern.createdAt).toLocaleDateString()}
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button 
                        className="btn" 
                        style={{ padding: '0.4rem', background: 'rgba(255,255,255,0.05)', color: 'var(--primary-color)' }}
                        onClick={() => navigate(`/edit/${intern._id}`)}
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        className="btn" 
                        style={{ padding: '0.4rem', background: 'rgba(239,68,68,0.05)', color: 'var(--danger)' }}
                        onClick={() => { setInternToDelete(intern); setDeleteModalOpen(true); }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {!loading && totalPages > 1 && (
        <div className="pagination">
          <button 
            disabled={page === 1} 
            onClick={() => setPage(p => Math.max(1, p - 1))}
          >
            ←
          </button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button 
              key={i} 
              className={page === i + 1 ? 'active' : ''}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button 
            disabled={page === totalPages} 
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
          >
            →
          </button>
        </div>
      )}

      <DeleteModal 
        isOpen={deleteModalOpen}
        onClose={() => { setDeleteModalOpen(false); setInternToDelete(null); }}
        onConfirm={handleDeleteConfirm}
        internName={internToDelete?.name}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default InternList;
