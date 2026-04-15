const sortableColumns = [
  { label: "Name", key: "name" },
  { label: "Email", key: "email" },
  { label: "Role", key: "role" },
  { label: "Status", key: "status" },
  { label: "Score", key: "score" },
  { label: "Created", key: "createdAt" }
];

function InternTable({ interns, onEdit, onDelete, sortBy, sortOrder, onSort }) {
  const getSortIcon = (columnKey) => {
    if (sortBy !== columnKey) return " ";
    return sortOrder === "asc" ? "▲" : "▼";
  };

  return (
    <div className="card table-wrapper">
      <table>
        <thead>
          <tr>
            {sortableColumns.map((column) => (
              <th key={column.key}>
                <button
                  type="button"
                  className="header-sort-button"
                  onClick={() => onSort(column.key)}
                >
                  {column.label}
                  <span className="sort-icon">{getSortIcon(column.key)}</span>
                </button>
              </th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {interns.length === 0 ? (
            <tr>
              <td colSpan="7" className="center">
                No interns found.
              </td>
            </tr>
          ) : (
            interns.map((intern) => (
              <tr key={intern._id}>
                <td>{intern.name}</td>
                <td>{intern.email}</td>
                <td>{intern.role}</td>
                <td>{intern.status}</td>
                <td>{intern.score}</td>
                <td>{new Date(intern.createdAt).toLocaleDateString()}</td>
                <td className="actions">
                  <button type="button" className="secondary" onClick={() => onEdit(intern)}>
                    Edit
                  </button>
                  <button type="button" className="danger" onClick={() => onDelete(intern)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default InternTable;
