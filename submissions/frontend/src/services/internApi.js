import axios from 'axios';

// All requests go to /api which the proxy forwards to http://localhost:5000
const api = axios.create({
  baseURL: '/api',
});

// GET all interns — supports search, role, status, page, limit
export const getInterns = (params = {}) =>
  api.get('/interns', { params });

// GET single intern by ID
export const getInternById = (id) =>
  api.get(`/interns/${id}`);

// POST create a new intern
export const createIntern = (data) =>
  api.post('/interns', data);

// PATCH update an existing intern
export const updateIntern = (id, data) =>
  api.patch(`/interns/${id}`, data);

// DELETE an intern
export const deleteIntern = (id) =>
  api.delete(`/interns/${id}`);
