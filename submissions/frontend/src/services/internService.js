import axios from 'axios';

const API_BASE = `${import.meta.env.VITE_API_URL || ''}/api/interns`;

export const getInterns = (params) => axios.get(API_BASE, { params });

export const getInternById = (id) => axios.get(`${API_BASE}/${id}`);

export const createIntern = (data) => axios.post(API_BASE, data);

export const updateIntern = (id, data) => axios.put(`${API_BASE}/${id}`, data);

export const deleteIntern = (id) => axios.delete(`${API_BASE}/${id}`);
