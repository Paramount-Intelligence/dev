import React from 'react';
import Modal from './Modal';

export default function ConfirmDialog({ message, onConfirm, onCancel, loading }) {
  return (
    <Modal title="Confirm Delete" onClose={onCancel}>
      <p className="confirm-message">{message}</p>
      <div className="form-actions">
        <button
          className="btn btn-ghost"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </button>
        <button
          className="btn btn-danger"
          onClick={onConfirm}
          disabled={loading}
        >
          {loading ? 'Deleting…' : 'Yes, Delete'}
        </button>
      </div>
    </Modal>
  );
}
