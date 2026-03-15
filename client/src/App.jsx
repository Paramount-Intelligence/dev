import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Search, Filter, Trash2, Edit2, ChevronLeft, ChevronRight } from 'lucide-react';
import './index.css';

const API_BASE = 'http://localhost:5000/api/interns';

function App() {
    const [interns, setInterns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingIntern, setEditingIntern] = useState(null);
    const [filters, setFilters] = useState({ name: '', role: '', status: '' });
    const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });

    useEffect(() => {
        fetchInterns();
    }, [pagination.page, filters]);

    const fetchInterns = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams({
                page: pagination.page,
                limit: 10,
                ...filters
            });
            const res = await axios.get(`${API_BASE}?${params}`);
            setInterns(res.data.data);
            setPagination(prev => ({ ...prev, totalPages: res.data.pagination.totalPages }));
        } catch (err) {
            setError('Failed to fetch interns');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this intern?')) {
            try {
                await axios.delete(`${API_BASE}/${id}`);
                fetchInterns();
            } catch (err) {
                alert('Delete failed');
            }
        }
    };

    const handleSave = async (formData) => {
        try {
            if (editingIntern) {
                await axios.patch(`${API_BASE}/${editingIntern._id}`, formData);
            } else {
                await axios.post(API_BASE, formData);
            }
            setShowAddModal(false);
            setEditingIntern(null);
            fetchInterns();
        } catch (err) {
            alert(err.response?.data?.error || 'Save failed');
        }
    };

    return (
        <div className="container">
            <div className="header-actions">
                <h1>Intern Tracker</h1>
                <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
                    <Plus size={18} /> Add Intern
                </button>
            </div>

            <div className="card">
                <div className="search-bar">
                    <input
                        placeholder="Search by name..."
                        value={filters.name}
                        onChange={(e) => setFilters(prev => ({ ...prev, name: e.target.value }))}
                    />
                    <select
                        value={filters.role}
                        onChange={(e) => setFilters(prev => ({ ...prev, role: e.target.value }))}
                    >
                        <option value="">All Roles</option>
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                        <option value="Fullstack">Fullstack</option>
                    </select>
                    <select
                        value={filters.status}
                        onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                    >
                        <option value="">All Statuses</option>
                        <option value="Applied">Applied</option>
                        <option value="Interviewing">Interviewing</option>
                        <option value="Hired">Hired</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>

                <div className="table-container">
                    <table>
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
                            {loading ? (
                                <tr><td colSpan="7" style={{ textAlign: 'center' }}>Loading...</td></tr>
                            ) : interns.length === 0 ? (
                                <tr><td colSpan="7" style={{ textAlign: 'center' }}>No interns found</td></tr>
                            ) : interns.map(intern => (
                                <tr key={intern._id}>
                                    <td style={{ fontWeight: 600 }}>{intern.name}</td>
                                    <td>{intern.email}</td>
                                    <td>{intern.role}</td>
                                    <td>
                                        <span className={`badge badge-${intern.status.toLowerCase()}`}>
                                            {intern.status}
                                        </span>
                                    </td>
                                    <td>{intern.score}</td>
                                    <td>{new Date(intern.createdAt).toLocaleDateString()}</td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button className="btn btn-outline" style={{ padding: '0.25rem' }} onClick={() => { setEditingIntern(intern); setShowAddModal(true); }}>
                                                <Edit2 size={16} />
                                            </button>
                                            <button className="btn btn-outline" style={{ padding: '0.25rem', color: 'var(--error)' }} onClick={() => handleDelete(intern._id)}>
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="pagination">
                    <button
                        className="btn btn-outline"
                        disabled={pagination.page === 1}
                        onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                    >
                        <ChevronLeft size={18} />
                    </button>
                    <span>Page {pagination.page} of {pagination.totalPages}</span>
                    <button
                        className="btn btn-outline"
                        disabled={pagination.page === pagination.totalPages}
                        onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>

            {showAddModal && (
                <Modal
                    onClose={() => { setShowAddModal(false); setEditingIntern(null); }}
                    onSave={handleSave}
                    initialData={editingIntern}
                />
            )}
        </div>
    );
}

function Modal({ onClose, onSave, initialData }) {
    const [formData, setFormData] = useState(initialData || {
        name: '',
        email: '',
        role: 'Frontend',
        status: 'Applied',
        score: 0
    });

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h3>{initialData ? 'Edit Intern' : 'Add New Intern'}</h3>
                <form onSubmit={(e) => { e.preventDefault(); onSave(formData); }} style={{ marginTop: '1rem' }}>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input required type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                    </div>
                    <div className="form-group" style={{ display: 'flex', gap: '1rem' }}>
                        <div style={{ flex: 1 }}>
                            <label>Role</label>
                            <select value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })}>
                                <option>Frontend</option>
                                <option>Backend</option>
                                <option>Fullstack</option>
                            </select>
                        </div>
                        <div style={{ flex: 1 }}>
                            <label>Status</label>
                            <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                                <option>Applied</option>
                                <option>Interviewing</option>
                                <option>Hired</option>
                                <option>Rejected</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Score (0-100)</label>
                        <input type="number" min="0" max="100" value={formData.score} onChange={e => setFormData({ ...formData, score: parseInt(e.target.value) })} />
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                        <button type="button" className="btn btn-outline" style={{ flex: 1 }} onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Save Intern</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default App;
