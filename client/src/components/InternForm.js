import React, { useState } from 'react';

const ROLES = ['Frontend', 'Backend', 'Fullstack'];
const STATUSES = ['Applied', 'Interviewing', 'Hired', 'Rejected'];

export default function InternForm({ initialData, onSubmit, onCancel, error, loading, submitLabel }) {
  const [form, setForm] = useState({ ...initialData });
  const [validationError, setValidationError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.name || form.name.trim().length < 2) return 'Name must be at least 2 characters';
    if (!form.email || !/^\S+@\S+\.\S+$/.test(form.email)) return 'Please enter a valid email';
    if (!form.role) return 'Role is required';
    if (!form.status) return 'Status is required';
    if (form.score === '' || form.score === null) return 'Score is required';
    if (Number(form.score) < 0 || Number(form.score) > 100) return 'Score must be between 0 and 100';
    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    if (err) { setValidationError(err); return; }
    setValidationError('');
    onSubmit({ ...form, score: Number(form.score) });
  };

  return (
    <form onSubmit={handleSubmit} className="intern-form">
      {(error || validationError) && (
        <div className="alert alert-error">{validationError || error}</div>
      )}

      <div className="form-group">
        <label>Full Name *</label>
        <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Dileep Singh" />
      </div>

      <div className="form-group">
        <label>Email *</label>
        <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="e.g. dileep@example.com" />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Role *</label>
          <select name="role" value={form.role} onChange={handleChange}>
            {ROLES.map((r) => <option key={r}>{r}</option>)}
          </select>
        </div>

        <div className="form-group">
          <label>Status *</label>
          <select name="status" value={form.status} onChange={handleChange}>
            {STATUSES.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>Score (0–100) *</label>
        <input name="score" type="number" min="0" max="100" value={form.score} onChange={handleChange} placeholder="e.g. 85" />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Saving...' : submitLabel}
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel} disabled={loading}>
          Cancel
        </button>
      </div>
    </form>
  );
}
