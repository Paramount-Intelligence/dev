const buildPageItems = (currentPage, totalPages) => {
  const pages = [];

  for (let page = 1; page <= totalPages; page += 1) {
    if (page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1) {
      pages.push(page);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }

  return pages;
};

export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) {
    return null;
  }

  const items = buildPageItems(page, totalPages);

  return (
    <div className="pagination">
      <button
        type="button"
        className="ghost-button"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        Previous
      </button>

      <div className="pagination__pages">
        {items.map((item, index) =>
          item === "..." ? (
            <span key={`ellipsis-${index}`} className="pagination__ellipsis">
              ...
            </span>
          ) : (
            <button
              key={item}
              type="button"
              className={item === page ? "page-button page-button--active" : "page-button"}
              onClick={() => onPageChange(item)}
            >
              {item}
            </button>
          )
        )}
      </div>

      <button
        type="button"
        className="ghost-button"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  );
}
