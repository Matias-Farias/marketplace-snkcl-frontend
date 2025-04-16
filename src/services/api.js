import axios from 'axios';

const api = axios.create({
  baseURL: '/api'
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  const { token, user } = response.data;
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const fetchProducts = async () => {
  const response = await api.get('/products');
  return response.data;
};

export const addProduct = async (productData) => {
  const response = await api.post('/products', productData);
  return response.data;
};

export const updateProduct = async (productId, productData) => {
  const response = await api.put(`/products/${productId}`, productData);
  return response.data;
};

export const deleteProduct = async (productId) => {
  const response = await api.delete(`/products/${productId}`);
  return response.data;
};

export const fetchUserPurchases = async () => {
  const response = await api.get('/users/purchases');
  return response.data;
};

export const fetchUserSales = async () => {
  const response = await api.get('/users/sales');
  return response.data;
};

export const createPurchase = async (items) => {
  const response = await api.post('/users/purchase', { items });
  return response.data;
};

export const fetchFavorites = async () => {
  const response = await api.get('/users/favorites');
  return response.data;
};

export const toggleFavorite = async (productId) => {
  const response = await api.post(`/users/favorites/${productId}`);
  return response.data;
};