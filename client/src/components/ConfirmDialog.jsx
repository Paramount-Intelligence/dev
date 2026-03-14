export default function ConfirmDialog({
  isOpen,
  title,
  description,
  confirmLabel,
  onCancel,
  onConfirm,
  loading
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-shell" role="presentation">
      <div className="modal-backdrop" onClick={loading ? undefined : onCancel} />
      <div className="modal-card modal-card--small" role="dialog" aria-modal="true">
        <div className="modal-copy">
          <p className="eyebrow">Confirm action</p>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>

        <div className="modal-actions">
          <button type="button" className="ghost-button" onClick={onCancel} disabled={loading}>
            Cancel
          </button>
          <button type="button" className="danger-button" onClick={onConfirm} disabled={loading}>
            {loading ? "Deleting..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
