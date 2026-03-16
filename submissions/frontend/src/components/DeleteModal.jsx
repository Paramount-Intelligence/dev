export default function DeleteModal({ intern, onConfirm, onCancel, loading }) {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-icon">🗑️</div>
        <h2 className="modal-title">Delete Intern</h2>
        <p className="modal-text">
          Are you sure you want to delete <strong>{intern?.name}</strong>? This action cannot be
          undone and will permanently remove their record.
        </p>
        <div className="modal-actions">
          <button className="btn btn-ghost" onClick={onCancel} disabled={loading}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={onConfirm} disabled={loading}>
            {loading ? 'Deleting…' : '🗑️ Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}
