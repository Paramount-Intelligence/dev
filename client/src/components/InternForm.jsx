import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createIntern, getInternById, updateIntern } from '../services/api';
import { ArrowLeft, Save } from 'lucide-react';

const InternForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Frontend',
    status: 'Applied',
    score: 0
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditing);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEditing) {
      const fetchCurrent = async () => {
        try {
          const data = await getInternById(id);
          setFormData({
            name: data.name,
            email: data.email,
            role: data.role,
            status: data.status,
            score: data.score
          });
        } catch (err) {
          setError('Failed to fetch intern details for editing.');
        } finally {
          setFetching(false);
        }
      };
      fetchCurrent();
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'score' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isEditing) {
        await updateIntern(id, formData);
      } else {
        await createIntern(formData);
      }
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred while saving.');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="glass-panel" style={{ display: 'flex', justifyContent: 'center', padding: '3rem 0' }}>
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="glass-panel" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem', gap: '1rem' }}>
        <button 
          className="btn" 
          style={{ background: 'rgba(255,255,255,0.05)', color: 'white', padding: '0.4rem 0.6rem' }} 
          onClick={() => navigate('/')}
        >
          <ArrowLeft size={18} />
        </button>
        <h2 style={{ color: 'white', fontWeight: 600 }}>
          {isEditing ? 'Edit Intern Details' : 'Add New Intern'}
        </h2>
      </div>

      {error && (
        <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input 
            type="text" 
            name="name" 
            className="input-field" 
            value={formData.name} 
            onChange={handleChange} 
            required 
            minLength={2}
            placeholder="Jane Doe"
          />
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input 
            type="email" 
            name="email" 
            className="input-field" 
            value={formData.email} 
            onChange={handleChange} 
            required 
            placeholder="jane@example.com"
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label>Role</label>
            <select name="role" className="input-field" value={formData.role} onChange={handleChange}>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Fullstack">Fullstack</option>
            </select>
          </div>

          <div className="form-group">
            <label>Status</label>
            <select name="status" className="input-field" value={formData.status} onChange={handleChange}>
              <option value="Applied">Applied</option>
              <option value="Interviewing">Interviewing</option>
              <option value="Hired">Hired</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Evaluation Score (0-100): <span style={{ color: 'var(--primary-color)', fontWeight: 600 }}>{formData.score}</span></label>
          <input 
            type="range" 
            name="score" 
            min="0" 
            max="100" 
            style={{ width: '100%', cursor: 'pointer', accentColor: 'var(--primary-color)' }}
            value={formData.score} 
            onChange={handleChange} 
          />
        </div>

        <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'flex-end' }}>
          <button type="submit" className="btn btn-primary" disabled={loading} style={{ padding: '0.8rem 2rem' }}>
            {loading ? <div className="loader" style={{ width: '18px', height: '18px', borderWidth: '2px' }}></div> : (
              <><Save size={18} /> {isEditing ? 'Save Changes' : 'Create Intern'}</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InternForm;
