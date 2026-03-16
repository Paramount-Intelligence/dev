import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';
import * as svc from '../services/internService';

const ROLES = ['Frontend', 'Backend', 'Fullstack', 'DevOps', 'UI/UX', 'Data Science'];
const STATUSES = ['Applied', 'Screening', 'Interview', 'Offer', 'Hired', 'Rejected'];

const empty = { name: '', email: '', role: '', status: 'Applied', score: 0 };

export default function InternForm({ mode }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = mode === 'edit';

  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');

  useEffect(() => {
    if (isEdit && id) {
      svc.getInternById(id)
        .then(({ data }) => { setForm(data.data); setLoading(false); })
        .catch(() => { setApiError('Failed to load intern data.'); setLoading(false); });
    }
  }, [isEdit, id]);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    else if (form.name.trim().length < 2) e.name = 'Name must be at least 2 characters';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.role) e.role = 'Role is required';
    if (!form.status) e.status = 'Status is required';
    if (form.score < 0 || form.score > 100) e.score = 'Score must be 0–100';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: name === 'score' ? Number(value) : value }));
    setErrors((er) => ({ ...er, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitting(true);
    setApiError('');
    try {
      if (isEdit) await svc.updateIntern(id, form);
      else await svc.createIntern(form);
      navigate('/');
    } catch (err) {
      setApiError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner text="Loading intern data..." />;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">{isEdit ? '✏️ Edit Intern' : '➕ Add New Intern'}</h1>
          <p className="page-subtitle">
            {isEdit ? 'Update the intern record below' : 'Fill in the details to create a new intern record'}
          </p>
        </div>
        <button className="btn btn-ghost" onClick={() => navigate('/')}>← Back</button>
      </div>

      <div className="form-card">
        {apiError && (
          <div className="alert alert-error">⚠️ {apiError}</div>
        )}
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Jane Smith"
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <span className="form-error">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Email Address *</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="e.g. jane@example.com"
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="form-error">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Role *</label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className={errors.role ? 'error' : ''}
              >
                <option value="">Select role…</option>
                {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
              {errors.role && <span className="form-error">{errors.role}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Status *</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className={errors.status ? 'error' : ''}
              >
                {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              {errors.status && <span className="form-error">{errors.status}</span>}
            </div>

            <div className="form-group full-width">
              <label className="form-label">Evaluation Score (0–100)</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <input
                  type="number"
                  name="score"
                  value={form.score}
                  onChange={handleChange}
                  min={0}
                  max={100}
                  className={errors.score ? 'error' : ''}
                  style={{ maxWidth: 120 }}
                />
                <div style={{ flex: 1, height: 6, borderRadius: 99, background: 'var(--border)', overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%',
                      width: `${Math.min(form.score, 100)}%`,
                      background: 'var(--gradient-primary)',
                      borderRadius: 99,
                      transition: 'width 0.3s ease',
                    }}
                  />
                </div>
                <span style={{ minWidth: 36, textAlign: 'right', fontWeight: 700, color: 'var(--accent-primary)' }}>
                  {form.score}
                </span>
              </div>
              {errors.score && <span className="form-error">{errors.score}</span>}
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-ghost" onClick={() => navigate('/')} disabled={submitting}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? '⏳ Saving…' : isEdit ? '✅ Save Changes' : '🚀 Create Intern'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
