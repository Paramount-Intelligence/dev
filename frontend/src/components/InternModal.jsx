import React, { useState, useEffect } from 'react';
import { createIntern, updateIntern } from '../services/api';

const InternModal = ({ isOpen, onClose, intern, onSuccess }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'Frontend',
        status: 'Applied',
        score: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (intern) {
            setFormData({
                name: intern.name || '',
                email: intern.email || '',
                role: intern.role || 'Frontend',
                status: intern.status || 'Applied',
                score: intern.score || '',
            });
        } else {
            setFormData({
                name: '',
                email: '',
                role: 'Frontend',
                status: 'Applied',
                score: '',
            });
        }
        setError(null);
    }, [intern, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (intern) {
                await updateIntern(intern._id, formData);
            } else {
                await createIntern(formData);
            }
            onSuccess();
            onClose();
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <h2>{intern ? 'Edit Intern' : 'Add New Intern'}</h2>
                {error && <div className="error-message">{error}</div>}
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            minLength="2"
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group " >
                        <label>Role</label>
                        <select name="role" value={formData.role} onChange={handleChange} style={{ backgroundColor: 'black' }}>
                            <option value="Frontend">Frontend</option>
                            <option value="Backend">Backend</option>
                            <option value="Fullstack">Fullstack</option>
                        </select>
                    </div>

                    <div className="form-group" >
                        <label>Status</label>
                        <select name="status" value={formData.status} onChange={handleChange} style={{ backgroundColor: 'black' }}>
                            <option value="Applied">Applied</option>
                            <option value="Interviewing">Interviewing</option>
                            <option value="Hired">Hired</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Score (0-100)</label>
                        <input
                            type="number"
                            name="score"
                            value={formData.score}
                            onChange={handleChange}
                            required
                            min="0"
                            max="100"
                        />
                    </div>

                    <div className="modal-actions">
                        <button type="button" className="btn btn-icon-only" onClick={onClose} disabled={loading}>
                            Cancel
                        </button>
                        <button type="submit" className="btn" disabled={loading}>
                            {loading ? 'Saving...' : 'Save Intern'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default InternModal;
