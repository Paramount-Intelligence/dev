import React, { useState, useEffect } from 'react';
import { getInterns, deleteIntern } from '../services/api';
import InternTable from '../components/InternTable';
import InternFormModal from '../components/InternFormModal';
import { Search, Filter, Plus, Users, LayoutDashboard, Loader2 } from 'lucide-react';

const Dashboard = () => {
  const [interns, setInterns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Pagination & Filtering
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIntern, setCurrentIntern] = useState(null);

  const fetchInterns = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getInterns({
        page,
        limit: 10,
        search,
        role: roleFilter,
        status: statusFilter
      });
      setInterns(data.interns);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch interns');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Add debounce for search
    const timer = setTimeout(() => {
      fetchInterns();
    }, 500);
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search, roleFilter, statusFilter]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleAdd = () => {
    setCurrentIntern(null);
    setIsModalOpen(true);
  };

  const handleEdit = (intern) => {
    setCurrentIntern(intern);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this intern?')) {
      try {
        await deleteIntern(id);
        fetchInterns();
      } catch (err) {
        alert(err.response?.data?.message || 'Delete failed');
      }
    }
  };

  const handleModalClose = (shouldRefresh) => {
    setIsModalOpen(false);
    if (shouldRefresh) {
      fetchInterns();
    }
  };

  return (
    <div className="container">
      <header className="app-header">
        <h1 className="app-title">
          <LayoutDashboard size={32} />
          InternHub
        </h1>
        <button className="btn btn-primary" onClick={handleAdd}>
          <Plus size={20} />
          Add Intern
        </button>
      </header>

      {error && <div className="error-msg" style={{marginBottom: '1rem', padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#fca5a5'}}>{error}</div>}

      <div className="glass-panel">
        <div className="controls-bar">
          <div className="search-input-wrapper">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              className="form-control search-input"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <select
              className="form-control"
              style={{ minWidth: '150px' }}
              value={roleFilter}
              onChange={(e) => { setRoleFilter(e.target.value); setPage(1); }}
            >
              <option value="">All Roles</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Fullstack">Fullstack</option>
            </select>

            <select
              className="form-control"
              style={{ minWidth: '150px' }}
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

        {loading ? (
          <div className="loader-container">
            <div className="spinner"></div>
          </div>
        ) : interns.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
            <Users size={48} style={{ opacity: 0.5, marginBottom: '1rem' }} />
            <h3>No interns found</h3>
            <p>Try adjusting your search or filters.</p>
          </div>
        ) : (
          <>
            <InternTable interns={interns} onEdit={handleEdit} onDelete={handleDelete} />
            
            {totalPages > 1 && (
              <div className="pagination">
                <span>Page {page} of {totalPages}</span>
                <div className="pagination-controls">
                  <button 
                    className="btn btn-secondary" 
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    style={{ padding: '0.5rem 1rem', opacity: page === 1 ? 0.5 : 1 }}
                  >
                    Previous
                  </button>
                  <button 
                    className="btn btn-secondary" 
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages}
                    style={{ padding: '0.5rem 1rem', opacity: page === totalPages ? 0.5 : 1 }}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {isModalOpen && (
        <InternFormModal
          intern={currentIntern}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default Dashboard;
