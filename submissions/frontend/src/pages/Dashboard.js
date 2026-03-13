import React, { useState, useEffect } from 'react';
import { fetchInterns, deleteIntern } from '../services/api';
import InternTable from '../components/InternTable';
import InternForm from '../components/InternForm';

const Dashboard = () => {
  const [interns, setInterns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [currentIntern, setCurrentIntern] = useState(null);
  
  // State for Search, Filters, and Pagination
  const [filters, setFilters] = useState({
    name: '',
    role: '',
    status: '',
    page: 1,
    limit: 5
  });
  
  const [pagination, setPagination] = useState({
    total: 0,
    pages: 1
  });

  // Load interns whenever filters change
  useEffect(() => {
    loadInterns();
  }, [filters]);

  const loadInterns = async () => {
    setLoading(true);
    try {
      const { data } = await fetchInterns(filters);
      setInterns(data.data);
      setPagination(data.pagination);
      setError(null);
    } catch (err) {
      setError('Failed to fetch interns. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setFilters({ ...filters, name: e.target.value, page: 1 });
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value, page: 1 });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this intern?')) {
      try {
        await deleteIntern(id);
        loadInterns(); // Refresh list
      } catch (err) {
        alert('Error deleting intern');
      }
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Intern Management Dashboard</h2>

      {/* Search and Filter Section */}
      <div className="filters-bar">
        <input 
          type="text" 
          placeholder="Search by name or email..." 
          value={filters.name} 
          onChange={handleSearchChange} 
        />
        
        <select name="role" onChange={handleFilterChange}>
          <option value="">All Roles</option>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="Fullstack">Fullstack</option>
        </select>

        <select name="status" onChange={handleFilterChange}>
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Accepted">Accepted</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Main Content */}
      {loading ? (
        <p>Loading interns...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : showForm ? (
        <InternForm 
          existingIntern={currentIntern} 
          onSave={() => { setShowForm(false); loadInterns(); }} 
          onCancel={() => setShowForm(false)} 
        />
      ) : (
        <>
          <button onClick={() => { setCurrentIntern(null); setShowForm(true); }} className="btn-add">
            + Add New Intern
          </button>
          <InternTable 
            interns={interns} 
            onDelete={handleDelete} 
            onEdit={(intern) => { setCurrentIntern(intern); setShowForm(true); }} 
          />
          
          {/* Pagination Controls */}
          <div className="pagination">
            <button 
              disabled={filters.page === 1} 
              onClick={() => setFilters({...filters, page: filters.page - 1})}
            >
              Previous
            </button>
            <span>Page {filters.page} of {pagination.pages}</span>
            <button 
              disabled={filters.page === pagination.pages} 
              onClick={() => setFilters({...filters, page: filters.page + 1})}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;