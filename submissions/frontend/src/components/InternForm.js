import React, { useState, useEffect } from 'react';
import { createIntern, updateIntern } from '../services/api';

const InternForm = ({ existingIntern, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Frontend',
    status: 'Pending',
    score: 0
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // If we are editing, populate the form with existing data
  useEffect(() => {
    if (existingIntern) {
      setFormData(existingIntern);
    }
  }, [existingIntern]);

  const validate = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required";
    if (!formData.email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
      tempErrors.email = "Valid email is required";
    }
    if (formData.score < 0 || formData.score > 100) {
      tempErrors.score = "Score must be between 0 and 100";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      if (existingIntern) {
        await updateIntern(existingIntern.id, formData);
      } else {
        await createIntern(formData);
      }
      onSave(); // Callback to refresh the dashboard
    } catch (err) {
      alert(err.response?.data?.error || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h3>{existingIntern ? 'Edit Intern' : 'Add New Intern'}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input 
            type="text" 
            value={formData.name} 
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input 
            type="email" 
            value={formData.email} 
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Role</label>
            <select value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})}>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Fullstack">Fullstack</option>
            </select>
          </div>

          <div className="form-group">
            <label>Status</label>
            <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}>
              <option value="Pending">Pending</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Evaluation Score (0-100)</label>
          <input 
            type="number" 
            value={formData.score} 
            onChange={(e) => setFormData({...formData, score: parseInt(e.target.value) || 0})}
          />
          {errors.score && <span className="error-text">{errors.score}</span>}
        </div>

        <div className="form-actions">
          <button type="button" onClick={onCancel} className="btn-cancel">Cancel</button>
          <button type="submit" disabled={loading} className="btn-submit">
            {loading ? 'Saving...' : existingIntern ? 'Update' : 'Add Intern'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InternForm;