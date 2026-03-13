import axios from 'axios';

const API = axios.create({
  // Use the environment variable if it exists, otherwise fallback to localhost
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api/interns',
});

// All your backend requirements mapped here
export const fetchInterns = (params) => API.get('/', { params });
export const getInternById = (id) => API.get(`/${id}`);
export const createIntern = (data) => API.post('/', data);
export const updateIntern = (id, data) => API.patch(`/${id}`, data);
export const deleteIntern = (id) => API.delete(`/${id}`);

export default API;