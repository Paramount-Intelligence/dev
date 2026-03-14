import React, { useState, useEffect } from 'react';

const ROLES    = ['Frontend', 'Backend', 'Fullstack'];
const STATUSES = ['Applied', 'Interviewing', 'Hired', 'Rejected'];

const emptyForm = {
  name:   '',
  email:  '',
  role:   '',
  status: 'Applied',
  score:  '',
};

export default function InternForm({ initial, onSubmit, onCancel, loading }) {
  const [form, setForm]             = useState(emptyForm);
  const [fieldErrors, setFieldErrors] = useState({});

  // Pre-fill form when editing
  useEffect(() => {
    if (initial) {
      setForm({
        name:   initial.name   || '',
        email:  initial.email  || '',
        role:   initial.role   || '',
        status: initial.status || 'Applied',
        score:  initial.score !== undefined ? String(initial.score) : '',
      });
    } else {
      setForm(emptyForm);
    }
    setFieldErrors({});
  }, [initial]);

  // Client-side validation
  const validate = () => {
    const errs = {};
    if (!form.name.trim() || form.name.trim().length < 2)
      errs.name = 'Name must be at least 2 characters';
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email))
      errs.email = 'Please enter a valid email address';
    if (!form.role)
      errs.role = 'Please select a role';
    if (!form.status)
      errs.status = 'Please select a status';
    const score = Number(form.score);
    if (form.score === '' || isNaN(score) || score < 0 || score > 100)
      errs.score = 'Score must be a number between 0 and 100';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear the error for this field as user types
    setFieldErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      return;
    }
    onSubmit({ ...form, score: Number(form.score) });
  };

  return (
    <form className="intern-form" onSubmit={handleSubmit} noValidate>

      {/* Row 1: Name + Email */}
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Jane Doe"
            className={fieldErrors.name ? 'error' : ''}
            autoFocus
          />
          {fieldErrors.name && <span className="field-error">{fieldErrors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="e.g. jane@company.com"
            className={fieldErrors.email ? 'error' : ''}
          />
          {fieldErrors.email && <span className="field-error">{fieldErrors.email}</span>}
        </div>
      </div>

      {/* Row 2: Role + Status + Score */}
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            name="role"
            value={form.role}
            onChange={handleChange}
            className={fieldErrors.role ? 'error' : ''}
          >
            <option value="">Select role…</option>
            {ROLES.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
          {fieldErrors.role && <span className="field-error">{fieldErrors.role}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={form.status}
            onChange={handleChange}
            className={fieldErrors.status ? 'error' : ''}
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {fieldErrors.status && <span className="field-error">{fieldErrors.status}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="score">Score (0–100)</label>
          <input
            id="score"
            name="score"
            type="number"
            min="0"
            max="100"
            value={form.score}
            onChange={handleChange}
            placeholder="e.g. 85"
            className={fieldErrors.score ? 'error' : ''}
          />
          {fieldErrors.score && <span className="field-error">{fieldErrors.score}</span>}
        </div>
      </div>

      {/* Actions */}
      <div className="form-actions">
        <button
          type="button"
          className="btn btn-ghost"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? 'Saving…' : initial ? 'Update Intern' : 'Add Intern'}
        </button>
      </div>

    </form>
  );
}
