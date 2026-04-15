import { useEffect, useState } from "react";
import ConfirmDialog from "../components/ConfirmDialog";
import ErrorMessage from "../components/ErrorMessage";
import InternForm from "../components/InternForm";
import InternTable from "../components/InternTable";
import KpiCards from "../components/KpiCards";
import Loader from "../components/Loader";
import Pagination from "../components/Pagination";
import SearchAndFilter from "../components/SearchAndFilter";
import {
  createIntern,
  deleteIntern,
  exportInternReport,
  fetchInternKpis,
  fetchInterns,
  updateIntern
} from "../services/internService";

function Dashboard() {
  const [interns, setInterns] = useState([]);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedIntern, setSelectedIntern] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);
  const [error, setError] = useState("");
  const [kpis, setKpis] = useState({
    totalInterns: 0,
    averageScore: 0,
    acceptedCount: 0,
    interviewCount: 0,
    acceptanceRate: 0
  });

  const loadInterns = async () => {
    setLoading(true);
    setError("");

    try {
      const params = { page, limit: 8, search, role, status, sortBy, sortOrder };
      const [internResponse, kpiResponse] = await Promise.all([
        fetchInterns(params),
        fetchInternKpis({ search, role, status })
      ]);

      setInterns(internResponse.data);
      setTotalPages(internResponse.pagination.totalPages);
      setKpis(kpiResponse);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load interns");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInterns();
  }, [page, search, role, status, sortBy, sortOrder]);

  const handleSubmit = async (formData) => {
    setFormLoading(true);
    setError("");

    try {
      if (selectedIntern) {
        await updateIntern(selectedIntern._id, formData);
      } else {
        await createIntern(formData);
      }

      setSelectedIntern(null);
      setPage(1);
      await loadInterns();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to save intern");
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;

    setDeleteLoading(true);
    setError("");

    try {
      await deleteIntern(deleteTarget._id);
      setDeleteTarget(null);
      await loadInterns();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to delete intern");
    } finally {
      setDeleteLoading(false);
    }
  };

  const resetFilters = () => {
    setSearch("");
    setRole("");
    setStatus("");
    setSortBy("createdAt");
    setSortOrder("desc");
    setPage(1);
  };

  const handleSort = (column) => {
    setPage(1);

    if (sortBy === column) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
      return;
    }

    setSortBy(column);
    setSortOrder("asc");
  };

  const handleExport = async () => {
    setExportLoading(true);
    setError("");

    try {
      const blob = await exportInternReport({ search, role, status, sortBy, sortOrder });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "intern-report.csv";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to export report");
    } finally {
      setExportLoading(false);
    }
  };

  return (
    <main className="dashboard">
      <h1>Intern Lifecycle Management System</h1>
      <ErrorMessage message={error} />
      <KpiCards kpis={kpis} />

      <div className="grid">
        <InternForm
          selectedIntern={selectedIntern}
          onSubmit={handleSubmit}
          onCancel={() => setSelectedIntern(null)}
          loading={formLoading}
        />

        <section>
          <SearchAndFilter
            search={search}
            role={role}
            status={status}
            onSearchChange={(value) => {
              setSearch(value);
              setPage(1);
            }}
            onRoleChange={(value) => {
              setRole(value);
              setPage(1);
            }}
            onStatusChange={(value) => {
              setStatus(value);
              setPage(1);
            }}
            onReset={resetFilters}
            onExport={handleExport}
            exportLoading={exportLoading}
          />

          {loading ? (
            <Loader text="Loading interns..." />
          ) : (
            <>
              <InternTable
                interns={interns}
                onEdit={setSelectedIntern}
                onDelete={setDeleteTarget}
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSort={handleSort}
              />
              <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
            </>
          )}
        </section>
      </div>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete Intern"
        message={`Are you sure you want to delete ${deleteTarget?.name || "this intern"}?`}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        loading={deleteLoading}
      />
    </main>
  );
}

export default Dashboard;
