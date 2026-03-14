import React, { useState, useEffect, useCallback } from 'react';
import { Search, Plus, Edit2, Trash2, Users, Loader, Inbox } from 'lucide-react';
import { getInterns } from '../services/api';
import InternModal from '../components/InternModal';
import ConfirmModal from '../components/ConfirmModal';

const InternList = () => {
    const [interns, setInterns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Search & Filters
    const [search, setSearch] = useState('');
    const [roleFilter, setRoleFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    // Pagination
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 10;

    // Modals
    const [isInternModalOpen, setInternModalOpen] = useState(false);
    const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
    const [selectedIntern, setSelectedIntern] = useState(null);

    const fetchInterns = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getInterns({
                search,
                role: roleFilter,
                status: statusFilter,
                page,
                limit,
            });
            setInterns(data.interns);
            setTotalPages(data.pagination.pages);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to open interns');
        } finally {
            setLoading(false);
        }
    }, [search, roleFilter, statusFilter, page, limit]);

    useEffect(() => {
        const debounce = setTimeout(() => {
            fetchInterns();
        }, 300);
        return () => clearTimeout(debounce);
    }, [fetchInterns]);

    const handleAdd = () => {
        setSelectedIntern(null);
        setInternModalOpen(true);
    };

    const handleEdit = (intern) => {
        setSelectedIntern(intern);
        setInternModalOpen(true);
    };

    const handleDelete = (intern) => {
        setSelectedIntern(intern);
        setConfirmModalOpen(true);
    };

    const handleSuccess = () => {
        fetchInterns();
    };

    const getRoleBadgeClass = (role) => {
        return `badge badge-${role.toLowerCase()}`;
    };

    const getStatusBadgeClass = (status) => {
        return `badge badge-${status.toLowerCase()}`;
    };

    return (
        <div className="container">
            <h1>Intern Tracker</h1>

            <div className="glass-panel">
                <div className="controls">
                    <div style={{ position: 'relative', flex: '1 1 250px' }}>
                        <Search size={20} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-secondary)' }} />
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            value={search}
                            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                            style={{ paddingLeft: '2.5rem', backgroundColor: 'black' }}
                        />
                    </div>
                    
                    <select
                        value={roleFilter}
                        onChange={(e) => { setRoleFilter(e.target.value); setPage(1); }}
                        style={{ flex: '0 1 150px', backgroundColor: 'black' }}
                    >
                        <option value="">All Roles</option>
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                        <option value="Fullstack">Fullstack</option>
                    </select>

                    <select
                        value={statusFilter}
                        onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
                        style={{ flex: '0 1 150px', backgroundColor: 'black' }}
                    >
                        <option value="">All Statuses</option>
                        <option value="Applied">Applied</option>
                        <option value="Interviewing">Interviewing</option>
                        <option value="Hired">Hired</option>
                        <option value="Rejected">Rejected</option>
                    </select>

                    <button className="btn" onClick={handleAdd}>
                        <Plus size={20} />
                        Add Intern
                    </button>
                </div>

                {error && <div className="error-message">{error}</div>}

                {loading ? (
                    <div className="loading">
                        <div className="spinner"></div>
                        <span>Loading interns...</span>
                    </div>
                ) : interns.length === 0 ? (
                    <div className="empty-state">
                        <Inbox size={48} />
                        <h3>No Interns Found</h3>
                        <p>Try adjusting your filters or search query.</p>
                    </div>
                ) : (
                    <>
                        <div style={{ overflowX: 'auto' }}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Status</th>
                                        <th>Score</th>
                                        <th>Date Added</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {interns.map((intern) => (
                                        <tr key={intern._id}>
                                            <td style={{ fontWeight: '500', color: '#fff' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                    <Users size={16} color="var(--accent-color)" />
                                                    {intern.name}
                                                </div>
                                            </td>
                                            <td style={{ color: 'var(--text-secondary)' }}>{intern.email}</td>
                                            <td>
                                                <span className={getRoleBadgeClass(intern.role)}>{intern.role}</span>
                                            </td>
                                            <td>
                                                <span className={getStatusBadgeClass(intern.status)}>{intern.status}</span>
                                            </td>
                                            <td>
                                                <strong>{intern.score}</strong><span style={{color: 'var(--text-secondary)', fontSize: '0.8rem'}}>/100</span>
                                            </td>
                                            <td style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                                {new Date(intern.createdAt).toLocaleDateString()}
                                            </td>
                                            <td>
                                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                    <button className="btn-icon-only" onClick={() => handleEdit(intern)} title="Edit">
                                                        <Edit2 size={18} />
                                                    </button>
                                                    <button className="btn-icon-only" onClick={() => handleDelete(intern)} title="Delete" style={{ color: 'var(--danger-color)' }}>
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {totalPages > 1 && (
                            <div className="pagination">
                                <button
                                    className="btn btn-icon-only"
                                    disabled={page === 1}
                                    onClick={() => setPage(p => p - 1)}
                                >
                                    Previous
                                </button>
                                <span>Page {page} of {totalPages}</span>
                                <button
                                    className="btn btn-icon-only"
                                    disabled={page === totalPages}
                                    onClick={() => setPage(p => p + 1)}
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>

            <InternModal
                isOpen={isInternModalOpen}
                onClose={() => setInternModalOpen(false)}
                intern={selectedIntern}
                onSuccess={handleSuccess}
            />

            <ConfirmModal
                isOpen={isConfirmModalOpen}
                onClose={() => setConfirmModalOpen(false)}
                intern={selectedIntern}
                onSuccess={handleSuccess}
            />
        </div>
    );
};

export default InternList;
