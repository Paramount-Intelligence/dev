import React, { useState } from 'react';
import { createIntern, updateIntern } from '../services/api';

const ROLES = ['Frontend', 'Backend', 'Fullstack'];
const STATUSES = ['Applied', 'Interviewing', 'Hired', 'Rejected'];
const emptyForm = { name: '', email: '', role: 'Frontend', status: 'Applied', score: 0 };

export default function InternForm({ intern, onSave, onCancel }) {
  const [form, setForm] = useState(intern ? {
    name: intern.name,
    email: intern.email,
    role: intern.role,
    status: intern.status,
    score: intern.score,
  } : emptyForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    else if (form.name.trim().length < 2) errs.name = 'Name must be at least 2 characters';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = 'Enter a valid email';
    if (!form.role) errs.role = 'Role is required';
    if (!form.status) errs.status = 'Status is required';
    if (form.score < 0 || form.score > 100) errs.score = 'Score must be between 0 and 100';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: name === 'score' ? Number(value) : value }));
    setErrors((e) => ({ ...e, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setServerError('');
    try {
      if (intern?._id) {
        await updateIntern(intern._id, form);
      } else {
        await createIntern(form);
      }
      onSave();
    } catch (err) {
      setServerError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page">
      <div className="form-card">
        <div className="form-header">
          <h2>{intern ? 'Edit Intern' : 'Add New Intern'}</h2>
          <p className="text-muted">{intern ? 'Update intern information' : 'Fill in the details below'}</p>
        </div>

        {serverError && <div className="alert alert-error">{serverError}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-label">Full Name *</label>
            <input className={`input ${errors.name ? 'input-error' : ''}`} name="name" value={form.name} onChange={handleChange} placeholder="e.g. Alice Johnson" />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Email Address *</label>
            <input className={`input ${errors.email ? 'input-error' : ''}`} name="email" type="email" value={form.email} onChange={handleChange} placeholder="e.g. alice@example.com" />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Role *</label>
              <select className={`input ${errors.role ? 'input-error' : ''}`} name="role" value={form.role} onChange={handleChange}>
                {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
              {errors.role && <span className="error-text">{errors.role}</span>}
            </div>
            <div className="form-group">
              <label className="form-label">Status *</label>
              <select className={`input ${errors.status ? 'input-error' : ''}`} name="status" value={form.status} onChange={handleChange}>
                {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              {errors.status && <span className="error-text">{errors.status}</span>}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Evaluation Score: <strong>{form.score}/100</strong></label>
            <input type="range" name="score" min="0" max="100" value={form.score} onChange={handleChange} className="score-slider" />
            <div className="score-labels"><span>0</span><span>25</span><span>50</span><span>75</span><span>100</span></div>
            {errors.score && <span className="error-text">{errors.score}</span>}
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving...' : intern ? 'Update Intern' : 'Add Intern'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}