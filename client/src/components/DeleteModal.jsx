import React from 'react';

const DeleteModal = ({ isOpen, onClose, onConfirm, internName, isDeleting }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-panel" style={{ padding: '2rem' }}>
        <h2 style={{ marginBottom: '1rem', color: 'white' }}>Confirm Deletion</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
          Are you sure you want to delete the record for <strong>{internName}</strong>? This action cannot be undone.
        </p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          <button className="btn" style={{ background: 'transparent', border: '1px solid var(--border-color)', color: 'white' }} onClick={onClose} disabled={isDeleting}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={onConfirm} disabled={isDeleting}>
            {isDeleting ? <div className="loader" style={{ width: '16px', height: '16px', borderWidth: '2px' }}></div> : 'Delete Record'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
