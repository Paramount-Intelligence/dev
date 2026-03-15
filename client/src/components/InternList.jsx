import { useState, useEffect } from "react";
import axios from "axios";

const API = "/api/interns";

function InternList({ refresh, onEdit, onRefresh }) {
  const [interns, setInterns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchInterns = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(API, {
        params: { search, role, status, page, limit: 10 }
      });
      setInterns(res.data.interns);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      setError("Failed to fetch interns!");
    }
    setLoading(false);
  };

  useEffect(() => { fetchInterns(); }, [refresh, search, role, status, page]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this intern?")) return;
    try {
      await axios.delete(`${API}/${id}`);
      onRefresh();
    } catch (err) {
      alert("Failed to delete intern!");
    }
  };

  return (
    <div className="list-container">
      <h2>Intern List</h2>
      <div className="filters">
        <input placeholder="Search by name or email" value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
        <select value={role} onChange={(e) => { setRole(e.target.value); setPage(1); }}>
          <option value="">All Roles</option>
          <option>Frontend</option>
          <option>Backend</option>
          <option>Fullstack</option>
        </select>
        <select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }}>
          <option value="">All Status</option>
          <option>Applied</option>
          <option>Interviewing</option>
          <option>Hired</option>
          <option>Rejected</option>
        </select>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Score</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {interns.length === 0 && !loading ? (
            <tr><td colSpan="7">No interns found!</td></tr>
          ) : (
            interns.map((intern) => (
              <tr key={intern._id}>
                <td>{intern.name}</td>
                <td>{intern.email}</td>
                <td>{intern.role}</td>
                <td>{intern.status}</td>
                <td>{intern.score}</td>
                <td>{new Date(intern.createdAt).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => onEdit(intern)}>Edit</button>
                  <button onClick={() => handleDelete(intern._id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
        <span>Page {page} of {totalPages}</span>
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}

export default InternList;