import React from 'react';

const InternTable = ({ interns, onDelete, onEdit }) => {
  if (interns.length === 0) {
    return <p style={{ textAlign: 'center', marginTop: '20px' }}>No interns found.</p>;
  }

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Score</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {interns.map((intern) => (
            <tr key={intern.id}>
              <td>{intern.name}</td>
              <td>{intern.email}</td>
              <td>
                <span className={`badge role-${intern.role.toLowerCase()}`}>
                  {intern.role}
                </span>
              </td>
              <td>
                <span className={`status-${intern.status.toLowerCase()}`}>
                  {intern.status}
                </span>
              </td>
              <td>{intern.score}/100</td>
              <td>
                <button 
                  className="btn-edit" 
                  onClick={() => onEdit(intern)}
                >
                  Edit
                </button>
                <button 
                  className="btn-delete" 
                  onClick={() => onDelete(intern.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InternTable;