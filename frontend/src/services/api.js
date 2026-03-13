import axios from 'axios';

const API_URL = 'http://localhost:5000/api/interns';

// Create an intern
export const createIntern = async (internData) => {
  const response = await axios.post(API_URL, internData);
  return response.data;
};

// Get all interns with query params
export const getInterns = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const response = await axios.get(`${API_URL}?${query}`);
  return response.data;
};

// Get single intern
export const getInternById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Update intern
export const updateIntern = async (id, internData) => {
  const response = await axios.patch(`${API_URL}/${id}`, internData);
  return response.data;
};

// Delete intern
export const deleteIntern = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
