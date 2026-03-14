const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") || "http://localhost:5000";

const buildErrorMessage = (payload, response) => {
  if (!payload) {
    return `Request failed with status ${response.status}`;
  }

  if (Array.isArray(payload.errors) && payload.errors.length > 0) {
    const details = payload.errors
      .map((entry) => (entry.field ? `${entry.field}: ${entry.message}` : entry.message))
      .join(", ");

    return `${payload.message}: ${details}`;
  }

  return payload.message || `Request failed with status ${response.status}`;
};

const request = async (path, options = {}) => {
  let response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {})
      },
      ...options
    });
  } catch (_error) {
    throw new Error("Unable to reach the API. Make sure the server is running.");
  }

  const isJson = response.headers.get("content-type")?.includes("application/json");
  const payload = isJson ? await response.json() : null;

  if (!response.ok) {
    throw new Error(buildErrorMessage(payload, response));
  }

  return payload;
};

export const fetchInterns = ({ page, limit, search, role, status }) => {
  const params = new URLSearchParams();

  params.set("page", page);
  params.set("limit", limit);

  if (search) {
    params.set("search", search);
  }

  if (role) {
    params.set("role", role);
  }

  if (status) {
    params.set("status", status);
  }

  return request(`/api/interns?${params.toString()}`);
};

export const fetchIntern = (id) => request(`/api/interns/${id}`);

export const createIntern = (payload) =>
  request("/api/interns", {
    method: "POST",
    body: JSON.stringify(payload)
  });

export const updateIntern = (id, payload) =>
  request(`/api/interns/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload)
  });

export const deleteIntern = (id) =>
  request(`/api/interns/${id}`, {
    method: "DELETE"
  });
