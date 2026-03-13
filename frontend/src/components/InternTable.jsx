import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';

const InternTable = ({ interns, onEdit, onDelete }) => {
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'score-high';
    if (score >= 50) return 'score-medium';
    return 'score-low';
  };

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>Intern Name & Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Score</th>
            <th>Added On</th>
            <th style={{ textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {interns.map((intern) => (
            <tr key={intern._id}>
              <td>
                <div style={{ fontWeight: '600', color: 'var(--text-main)', marginBottom: '0.25rem' }}>
                  {intern.name}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  {intern.email}
                </div>
              </td>
              <td>
                <span style={{ color: 'var(--text-main)' }}>{intern.role}</span>
              </td>
              <td>
                <span className={`badge status-${intern.status.toLowerCase()}`}>
                  {intern.status}
                </span>
              </td>
              <td>
                <div className="score-indicator">
                  <div className="score-bar-bg">
                    <div 
                      className={`score-bar-fill ${getScoreColor(intern.score)}`} 
                      style={{ width: `${intern.score}%` }}
                    ></div>
                  </div>
                  <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>{intern.score}</span>
                </div>
              </td>
              <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                {formatDate(intern.createdAt)}
              </td>
              <td style={{ textAlign: 'right' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                  <button 
                    className="btn-icon edit" 
                    onClick={() => onEdit(intern)}
                    title="Edit Intern"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button 
                    className="btn-icon delete" 
                    onClick={() => onDelete(intern._id)}
                    title="Delete Intern"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InternTable;
