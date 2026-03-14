import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api/interns',
});

export const getInterns = async (params) => {
    const response = await api.get('/', { params });
    return response.data;
};

export const getIntern = async (id) => {
    const response = await api.get(`/${id}`);
    return response.data;
};

export const createIntern = async (internData) => {
    const response = await api.post('/', internData);
    return response.data;
};

export const updateIntern = async (id, internData) => {
    const response = await api.patch(`/${id}`, internData);
    return response.data;
};

export const deleteIntern = async (id) => {
    const response = await api.delete(`/${id}`);
    return response.data;
};

export default api;
