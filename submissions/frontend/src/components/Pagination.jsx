export default function Pagination({ pagination, onPageChange }) {
  const { page, totalPages, total, limit } = pagination;
  const from = Math.min((page - 1) * limit + 1, total);
  const to = Math.min(page * limit, total);

  const getPages = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= page - 1 && i <= page + 1)) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== '...') {
        pages.push('...');
      }
    }
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      <span className="pagination-info">
        Showing <strong>{from}–{to}</strong> of <strong>{total}</strong> interns
      </span>
      <div className="pagination-controls">
        <button
          className="page-btn"
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          title="Previous"
        >
          ‹
        </button>
        {getPages().map((p, i) =>
          p === '...' ? (
            <span key={`ellipsis-${i}`} className="page-btn" style={{ border: 'none', cursor: 'default' }}>…</span>
          ) : (
            <button
              key={p}
              className={`page-btn ${p === page ? 'active' : ''}`}
              onClick={() => onPageChange(p)}
            >
              {p}
            </button>
          )
        )}
        <button
          className="page-btn"
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          title="Next"
        >
          ›
        </button>
      </div>
    </div>
  );
}
