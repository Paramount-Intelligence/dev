import { useState, useEffect } from "react";
import axios from "axios";

const API = "/api/interns";

function InternForm({ onSuccess, editIntern, setEditIntern }) {
  const [form, setForm] = useState({
    name: "", email: "", role: "Frontend", status: "Applied", score: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editIntern) setForm(editIntern);
  }, [editIntern]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email || !form.score) {
      setError("All fields are required!");
      return;
    }
    if (form.score < 0 || form.score > 100) {
      setError("Score must be between 0 and 100!");
      return;
    }
    setLoading(true);
    try {
      if (editIntern) {
        await axios.patch(`${API}/${editIntern._id}`, form);
        setEditIntern(null);
      } else {
        await axios.post(API, form);
      }
      setForm({ name: "", email: "", role: "Frontend", status: "Applied", score: "" });
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    }
    setLoading(false);
  };

  return (
    <div className="form-container">
      <h2>{editIntern ? "Edit Intern" : "Add Intern"}</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <select name="role" value={form.role} onChange={handleChange}>
          <option>Frontend</option>
          <option>Backend</option>
          <option>Fullstack</option>
        </select>
        <select name="status" value={form.status} onChange={handleChange}>
          <option>Applied</option>
          <option>Interviewing</option>
          <option>Hired</option>
          <option>Rejected</option>
        </select>
        <input name="score" type="number" placeholder="Score (0-100)" value={form.score} onChange={handleChange} />
        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : editIntern ? "Update Intern" : "Add Intern"}
        </button>
        {editIntern && <button type="button" onClick={() => setEditIntern(null)}>Cancel</button>}
      </form>
    </div>
  );
}

export default InternForm;