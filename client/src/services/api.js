import axios from 'axios';

const API_URL = 'http://localhost:5000/api/interns';

export const getInterns = async (params) => {
  const response = await axios.get(API_URL, { params });
  return response.data;
};

export const getInternById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createIntern = async (internData) => {
  const response = await axios.post(API_URL, internData);
  return response.data;
};

export const updateIntern = async (id, internData) => {
  const response = await axios.patch(`${API_URL}/${id}`, internData);
  return response.data;
};

export const deleteIntern = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
