import React from 'react';

export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  // Build page number list with ellipsis
  const delta = 2;
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= page - delta && i <= page + delta)
    ) {
      pages.push(i);
    }
  }

  // Insert '…' where there are gaps
  const withEllipsis = [];
  let prev = null;
  for (const p of pages) {
    if (prev && p - prev > 1) withEllipsis.push('…');
    withEllipsis.push(p);
    prev = p;
  }

  return (
    <div className="pagination">
      <button
        className="btn btn-ghost pag-btn"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        ← Prev
      </button>

      {withEllipsis.map((p, i) =>
        p === '…' ? (
          <span key={`ellipsis-${i}`} className="pag-ellipsis">…</span>
        ) : (
          <button
            key={p}
            className={`btn pag-btn ${p === page ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => onPageChange(p)}
          >
            {p}
          </button>
        )
      )}

      <button
        className="btn btn-ghost pag-btn"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >
        Next →
      </button>
    </div>
  );
}
