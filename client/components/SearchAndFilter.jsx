function SearchAndFilter({
  search,
  role,
  status,
  onSearchChange,
  onRoleChange,
  onStatusChange,
  onReset,
  onExport,
  exportLoading
}) {
  return (
    <div className="card controls">
      <input
        type="text"
        placeholder="Search by name or email..."
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
      />

      <select value={role} onChange={(event) => onRoleChange(event.target.value)}>
        <option value="">All Roles</option>
        <option value="Frontend">Frontend</option>
        <option value="Backend">Backend</option>
        <option value="Fullstack">Fullstack</option>
      </select>

      <select value={status} onChange={(event) => onStatusChange(event.target.value)}>
        <option value="">All Statuses</option>
        <option value="Applied">Applied</option>
        <option value="Interview">Interview</option>
        <option value="Accepted">Accepted</option>
        <option value="Rejected">Rejected</option>
      </select>

      <button type="button" className="secondary" onClick={onReset}>
        Reset
      </button>
      <button type="button" onClick={onExport} disabled={exportLoading}>
        {exportLoading ? "Exporting..." : "Export Report (CSV)"}
      </button>
    </div>
  );
}

export default SearchAndFilter;
