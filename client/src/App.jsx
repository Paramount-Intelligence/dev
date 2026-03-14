import { startTransition, useDeferredValue, useEffect, useState } from "react";

import ConfirmDialog from "./components/ConfirmDialog";
import InternFormModal from "./components/InternFormModal";
import Pagination from "./components/Pagination";
import { ROLE_OPTIONS, STATUS_OPTIONS } from "./constants";
import { createIntern, deleteIntern, fetchInterns, updateIntern } from "./lib/api";

const PAGE_SIZE = 8;

const formatDate = (value) =>
  new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium"
  }).format(new Date(value));

const getScoreTone = (score) => {
  if (score >= 85) {
    return "score-pill score-pill--strong";
  }

  if (score >= 70) {
    return "score-pill score-pill--warm";
  }

  return "score-pill score-pill--cool";
};

const getStatusTone = (status) => {
  const tones = {
    Applied: "status-pill status-pill--neutral",
    Interviewing: "status-pill status-pill--info",
    Hired: "status-pill status-pill--success",
    Rejected: "status-pill status-pill--danger"
  };

  return tones[status] || "status-pill";
};

export default function App() {
  const [interns, setInterns] = useState([]);
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: PAGE_SIZE,
    total: 0,
    totalPages: 1
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshToken, setRefreshToken] = useState(0);
  const [formState, setFormState] = useState({
    isOpen: false,
    mode: "create",
    intern: null
  });
  const [submitError, setSubmitError] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [deleteState, setDeleteState] = useState({
    isOpen: false,
    intern: null
  });
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [banner, setBanner] = useState("");

  const deferredSearch = useDeferredValue(searchInput.trim());

  useEffect(() => {
    let ignore = false;

    const loadInterns = async () => {
      setLoading(true);
      setError("");

      try {
        const payload = await fetchInterns({
          page,
          limit: PAGE_SIZE,
          search: deferredSearch,
          role: roleFilter,
          status: statusFilter
        });

        if (ignore) {
          return;
        }

        setInterns(payload.data);
        setPagination(payload.pagination);
      } catch (requestError) {
        if (ignore) {
          return;
        }

        setError(requestError.message);
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    loadInterns();

    return () => {
      ignore = true;
    };
  }, [page, deferredSearch, roleFilter, statusFilter, refreshToken]);

  const bumpRefresh = () => {
    setRefreshToken((current) => current + 1);
  };

  const handleSearchChange = (event) => {
    const nextValue = event.target.value;
    setSearchInput(nextValue);

    startTransition(() => {
      setPage(1);
    });
  };

  const handleRoleFilterChange = (event) => {
    setRoleFilter(event.target.value);
    setPage(1);
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
    setPage(1);
  };

  const resetFilters = () => {
    setSearchInput("");
    setRoleFilter("");
    setStatusFilter("");
    setPage(1);
  };

  const openCreateModal = () => {
    setSubmitError("");
    setFormState({
      isOpen: true,
      mode: "create",
      intern: null
    });
  };

  const openEditModal = (intern) => {
    setSubmitError("");
    setFormState({
      isOpen: true,
      mode: "edit",
      intern
    });
  };

  const closeFormModal = () => {
    if (submitLoading) {
      return;
    }

    setFormState({
      isOpen: false,
      mode: "create",
      intern: null
    });
    setSubmitError("");
  };

  const dismissFormModal = () => {
    setFormState({
      isOpen: false,
      mode: "create",
      intern: null
    });
    setSubmitError("");
  };

  const handleFormSubmit = async (payload) => {
    setSubmitLoading(true);
    setSubmitError("");

    try {
      if (formState.mode === "edit" && formState.intern?._id) {
        await updateIntern(formState.intern._id, payload);
        setBanner("Intern details updated successfully.");
      } else {
        await createIntern(payload);
        setBanner("Intern added successfully.");
        setPage(1);
      }

      dismissFormModal();
      bumpRefresh();
    } catch (requestError) {
      setSubmitError(requestError.message);
    } finally {
      setSubmitLoading(false);
    }
  };

  const openDeleteDialog = (intern) => {
    setDeleteState({
      isOpen: true,
      intern
    });
  };

  const closeDeleteDialog = () => {
    if (deleteLoading) {
      return;
    }

    setDeleteState({
      isOpen: false,
      intern: null
    });
  };

  const dismissDeleteDialog = () => {
    setDeleteState({
      isOpen: false,
      intern: null
    });
  };

  const handleDelete = async () => {
    if (!deleteState.intern?._id) {
      return;
    }

    setDeleteLoading(true);

    try {
      await deleteIntern(deleteState.intern._id);
      setBanner("Intern removed from the tracker.");

      if (interns.length === 1 && page > 1) {
        setPage(page - 1);
      } else {
        bumpRefresh();
      }

      dismissDeleteDialog();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  const activeFilterCount = [deferredSearch, roleFilter, statusFilter].filter(Boolean).length;

  return (
    <div className="app-shell">
      <div className="background-orb background-orb--left" />
      <div className="background-orb background-orb--right" />

      <main className="page">
        <section className="hero-card">
          <div>
            <p className="eyebrow">MERN assessment</p>
            <h1>Intern Tracker</h1>
            <p className="hero-copy">
              Manage applicant flow with a single workspace for searching, editing, and reviewing intern records.
            </p>
          </div>

          <div className="hero-actions">
            <div className="stat-chip">
              <span>Total interns</span>
              <strong>{pagination.total}</strong>
            </div>
            <div className="stat-chip">
              <span>Active filters</span>
              <strong>{activeFilterCount}</strong>
            </div>
            <button type="button" className="primary-button" onClick={openCreateModal}>
              Add intern
            </button>
          </div>
        </section>

        <section className="workspace-card">
          <div className="toolbar">
            <label className="toolbar__search">
              <span className="toolbar__label">Search</span>
              <input
                type="search"
                value={searchInput}
                onChange={handleSearchChange}
                placeholder="Search by name or email"
              />
            </label>

            <label className="toolbar__filter">
              <span className="toolbar__label">Role</span>
              <select value={roleFilter} onChange={handleRoleFilterChange}>
                <option value="">All roles</option>
                {ROLE_OPTIONS.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </label>

            <label className="toolbar__filter">
              <span className="toolbar__label">Status</span>
              <select value={statusFilter} onChange={handleStatusFilterChange}>
                <option value="">All statuses</option>
                {STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </label>

            <button type="button" className="ghost-button" onClick={resetFilters}>
              Clear filters
            </button>
          </div>

          {banner ? <p className="banner banner--success">{banner}</p> : null}
          {error ? <p className="banner banner--error">{error}</p> : null}

          <div className="table-card">
            <div className="table-card__header">
              <div>
                <h2>Intern roster</h2>
                <p>
                  Showing {interns.length} of {pagination.total} interns
                </p>
              </div>
              {loading ? <div className="loading-pill">Loading...</div> : null}
            </div>

            <div className="table-scroll">
              <table className="intern-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Score</th>
                    <th>Created</th>
                    <th className="actions-column">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {!loading && interns.length === 0 ? (
                    <tr>
                      <td colSpan="7">
                        <div className="empty-state">
                          <h3>No interns found</h3>
                          <p>Try a different search, reset the filters, or add a new record.</p>
                        </div>
                      </td>
                    </tr>
                  ) : null}

                  {interns.map((intern) => (
                    <tr key={intern._id}>
                      <td>
                        <div className="person-cell">
                          <strong>{intern.name}</strong>
                        </div>
                      </td>
                      <td>{intern.email}</td>
                      <td>{intern.role}</td>
                      <td>
                        <span className={getStatusTone(intern.status)}>{intern.status}</span>
                      </td>
                      <td>
                        <span className={getScoreTone(intern.score)}>{intern.score}</span>
                      </td>
                      <td>{formatDate(intern.createdAt)}</td>
                      <td className="actions-column">
                        <button type="button" className="inline-button" onClick={() => openEditModal(intern)}>
                          Edit
                        </button>
                        <button
                          type="button"
                          className="inline-button inline-button--danger"
                          onClick={() => openDeleteDialog(intern)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Pagination page={pagination.page} totalPages={pagination.totalPages} onPageChange={setPage} />
          </div>
        </section>
      </main>

      <InternFormModal
        isOpen={formState.isOpen}
        mode={formState.mode}
        intern={formState.intern}
        loading={submitLoading}
        submitError={submitError}
        onClose={closeFormModal}
        onSubmit={handleFormSubmit}
      />

      <ConfirmDialog
        isOpen={deleteState.isOpen}
        title={`Delete ${deleteState.intern?.name || "this intern"}?`}
        description="This action permanently removes the intern record from the tracker."
        confirmLabel="Delete intern"
        onCancel={closeDeleteDialog}
        onConfirm={handleDelete}
        loading={deleteLoading}
      />
    </div>
  );
}
