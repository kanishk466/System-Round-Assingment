import axios from 'axios';

const API_URL = 'http://localhost:8800/api';

const api = axios.create({
  baseURL: API_URL,
});

export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data.token;
};

export const getCategories = async (token) => {
  return await api.get('/categories', {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createCategory = async (category, token) => {
  return await api.post('/category', category, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Add other API methods similarly...
