import { useEffect, useState } from "react";

import { EMPTY_INTERN, ROLE_OPTIONS, STATUS_OPTIONS } from "../constants";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const createInitialState = (intern) => ({
  name: intern?.name || EMPTY_INTERN.name,
  email: intern?.email || EMPTY_INTERN.email,
  role: intern?.role || EMPTY_INTERN.role,
  status: intern?.status || EMPTY_INTERN.status,
  score: intern?.score ?? EMPTY_INTERN.score
});

const validateForm = (values) => {
  const errors = {};

  if (!values.name.trim() || values.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters long.";
  }

  if (!values.email.trim() || !emailPattern.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!ROLE_OPTIONS.includes(values.role)) {
    errors.role = "Select a valid role.";
  }

  if (!STATUS_OPTIONS.includes(values.status)) {
    errors.status = "Select a valid status.";
  }

  const numericScore = Number(values.score);

  if (!Number.isFinite(numericScore) || numericScore < 0 || numericScore > 100) {
    errors.score = "Score must be a number between 0 and 100.";
  }

  return errors;
};

export default function InternFormModal({
  isOpen,
  mode,
  intern,
  loading,
  submitError,
  onClose,
  onSubmit
}) {
  const [values, setValues] = useState(createInitialState(intern));
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      setValues(createInitialState(intern));
      setErrors({});
    }
  }, [intern, isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues((current) => ({
      ...current,
      [name]: value
    }));

    setErrors((current) => ({
      ...current,
      [name]: ""
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateForm(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    await onSubmit({
      name: values.name.trim(),
      email: values.email.trim(),
      role: values.role,
      status: values.status,
      score: Number(values.score)
    });
  };

  const title = mode === "edit" ? "Edit intern profile" : "Add a new intern";
  const subtitle =
    mode === "edit"
      ? "Update role, status, score, or contact details without leaving the list."
      : "Capture a candidate quickly, then keep the hiring pipeline moving from one workspace.";

  return (
    <div className="modal-shell" role="presentation">
      <div className="modal-backdrop" onClick={loading ? undefined : onClose} />
      <div className="modal-card" role="dialog" aria-modal="true" aria-labelledby="intern-form-title">
        <div className="modal-copy">
          <p className="eyebrow">{mode === "edit" ? "Edit intern" : "New intern"}</p>
          <h2 id="intern-form-title">{title}</h2>
          <p>{subtitle}</p>
        </div>

        <form className="form-grid" onSubmit={handleSubmit}>
          <label>
            <span>Name</span>
            <input
              name="name"
              value={values.name}
              onChange={handleChange}
              placeholder="Avery Johnson"
              autoFocus
            />
            {errors.name ? <small className="field-error">{errors.name}</small> : null}
          </label>

          <label>
            <span>Email</span>
            <input
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              placeholder="avery@example.com"
            />
            {errors.email ? <small className="field-error">{errors.email}</small> : null}
          </label>

          <label>
            <span>Role</span>
            <select name="role" value={values.role} onChange={handleChange}>
              {ROLE_OPTIONS.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
            {errors.role ? <small className="field-error">{errors.role}</small> : null}
          </label>

          <label>
            <span>Status</span>
            <select name="status" value={values.status} onChange={handleChange}>
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            {errors.status ? <small className="field-error">{errors.status}</small> : null}
          </label>

          <label>
            <span>Score</span>
            <input
              name="score"
              type="number"
              min="0"
              max="100"
              value={values.score}
              onChange={handleChange}
              placeholder="85"
            />
            {errors.score ? <small className="field-error">{errors.score}</small> : null}
          </label>

          {submitError ? <p className="form-error-banner">{submitError}</p> : null}

          <div className="modal-actions">
            <button type="button" className="ghost-button" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="primary-button" disabled={loading}>
              {loading ? "Saving..." : mode === "edit" ? "Save changes" : "Create intern"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
