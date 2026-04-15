import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api"
});

export const fetchInterns = async (params) => {
  const response = await api.get("/interns", { params });
  return response.data;
};

export const fetchInternKpis = async (params) => {
  const response = await api.get("/interns/kpis", { params });
  return response.data;
};

export const exportInternReport = async (params) => {
  const response = await api.get("/interns/export", {
    params,
    responseType: "blob"
  });
  return response.data;
};

export const createIntern = async (payload) => {
  const response = await api.post("/interns", payload);
  return response.data;
};

export const updateIntern = async (id, payload) => {
  const response = await api.put(`/interns/${id}`, payload);
  return response.data;
};

export const deleteIntern = async (id) => {
  const response = await api.delete(`/interns/${id}`);
  return response.data;
};
