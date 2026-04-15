import { useEffect, useState } from "react";

const initialForm = {
  name: "",
  email: "",
  role: "Frontend",
  status: "Applied",
  score: 0
};

function InternForm({ selectedIntern, onSubmit, onCancel, loading }) {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selectedIntern) {
      setFormData({
        name: selectedIntern.name,
        email: selectedIntern.email,
        role: selectedIntern.role,
        status: selectedIntern.status,
        score: selectedIntern.score
      });
    } else {
      setFormData(initialForm);
    }
    setErrors({});
  }, [selectedIntern]);

  const validate = () => {
    const nextErrors = {};

    if (!formData.name.trim()) nextErrors.name = "Name is required";
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) nextErrors.email = "Valid email is required";
    if (formData.score < 0 || formData.score > 100) {
      nextErrors.score = "Score must be between 0 and 100";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "score" ? Number(value) : value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;
    onSubmit(formData);
  };

  return (
    <div className="card">
      <h2>{selectedIntern ? "Edit Intern" : "Add New Intern"}</h2>
      <form onSubmit={handleSubmit} className="intern-form">
        <label>
          Name
          <input name="name" value={formData.name} onChange={handleChange} />
          {errors.name && <small className="error-text">{errors.name}</small>}
        </label>

        <label>
          Email
          <input name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <small className="error-text">{errors.email}</small>}
        </label>

        <label>
          Role
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Fullstack">Fullstack</option>
          </select>
        </label>

        <label>
          Status
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
          </select>
        </label>

        <label>
          Score
          <input
            type="number"
            name="score"
            min="0"
            max="100"
            value={formData.score}
            onChange={handleChange}
          />
          {errors.score && <small className="error-text">{errors.score}</small>}
        </label>

        <div className="form-actions">
          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : selectedIntern ? "Update Intern" : "Add Intern"}
          </button>
          {selectedIntern && (
            <button type="button" className="secondary" onClick={onCancel} disabled={loading}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default InternForm;
