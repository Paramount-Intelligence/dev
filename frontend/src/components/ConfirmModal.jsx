import React, { useState } from 'react';
import { deleteIntern } from '../services/api';

const ConfirmModal = ({ isOpen, onClose, intern, onSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    if (!isOpen || !intern) return null;

    const handleDelete = async () => {
        setLoading(true);
        setError(null);
        try {
            await deleteIntern(intern._id);
            onSuccess();
            onClose();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to delete intern');
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <h2>Delete Intern</h2>
                {error && <div className="error-message">{error}</div>}
                
                <p>Are you sure you want to delete <strong>{intern.name}</strong>?</p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                    This action cannot be undone.
                </p>

                <div className="modal-actions">
                    <button type="button" className="btn btn-icon-only" onClick={onClose} disabled={loading}>
                        Cancel
                    </button>
                    <button type="button" className="btn btn-danger" onClick={handleDelete} disabled={loading}>
                        {loading ? 'Deleting...' : 'Delete'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
