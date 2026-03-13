import React, { useState, useEffect } from 'react';
import { createIntern, updateIntern } from '../services/api';
import { X } from 'lucide-react';

const InternFormModal = ({ intern, onClose }) => {
  const isEditing = !!intern;
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Frontend',
    status: 'Applied',
    score: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (intern) {
      setFormData({
        name: intern.name,
        email: intern.email,
        role: intern.role,
        status: intern.status,
        score: intern.score,
      });
    }
  }, [intern]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'score' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isEditing) {
        await updateIntern(intern._id, formData);
      } else {
        await createIntern(formData);
      }
      onClose(true); // Close and refresh
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3 style={{ margin: 0 }}>{isEditing ? 'Edit Intern' : 'Add New Intern'}</h3>
          <button className="btn-icon" onClick={() => onClose(false)}>
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {error && <div className="error-msg" style={{marginBottom: '1rem', padding: '0.75rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '6px', border: '1px solid rgba(239, 68, 68, 0.3)'}}>{error}</div>}
            
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                required
                minLength="2"
                placeholder="John Doe"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="john@example.com"
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Role</label>
                <select
                  name="role"
                  className="form-control"
                  value={formData.role}
                  onChange={handleChange}
                  required
                >
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Fullstack">Fullstack</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Status</label>
                <select
                  name="status"
                  className="form-control"
                  value={formData.status}
                  onChange={handleChange}
                  required
                >
                  <option value="Applied">Applied</option>
                  <option value="Interviewing">Interviewing</option>
                  <option value="Hired">Hired</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Evaluation Score (0-100) - {formData.score}</label>
              <input
                type="range"
                name="score"
                min="0"
                max="100"
                style={{ width: '100%', accentColor: 'var(--primary-color)' }}
                value={formData.score}
                onChange={handleChange}
                required
              />
            </div>

          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={() => onClose(false)} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? (
                <>...Saving</>
              ) : (
                <>{isEditing ? 'Save Changes' : 'Create Intern'}</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InternFormModal;
