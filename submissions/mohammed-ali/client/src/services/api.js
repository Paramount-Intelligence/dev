import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

export const getInterns = (params) => API.get('/interns', { params });
export const getInternById = (id) => API.get(`/interns/${id}`);
export const createIntern = (data) => API.post('/interns', data);
export const updateIntern = (id, data) => API.patch(`/interns/${id}`, data);
export const deleteIntern = (id) => API.delete(`/interns/${id}`);