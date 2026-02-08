import axios from 'axios';
import { auth } from './firebase';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token to requests
apiClient.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  register: (data) => apiClient.post('/auth/register', data),
  login: (data) => apiClient.post('/auth/login', data),
  verifyToken: (token) => apiClient.post('/auth/verify', { token })
};

// Character APIs
export const characterAPI = {
  create: (data) => apiClient.post('/characters', data),
  getAll: () => apiClient.get('/characters'),
  getOne: (id) => apiClient.get(`/characters/${id}`),
  update: (id, data) => apiClient.put(`/characters/${id}`, data),
  delete: (id) => apiClient.delete(`/characters/${id}`)
};

// Chat APIs
export const chatAPI = {
  create: (data) => apiClient.post('/chat/create', data),
  sendMessage: (data) => apiClient.post('/chat/message', data),
  getHistory: (characterId) => apiClient.get(`/chat/${characterId}`),
  delete: (chatId) => apiClient.delete(`/chat/${chatId}`)
};

// Credit APIs
export const creditAPI = {
  getCredits: () => apiClient.get('/credits'),
  getTransactions: () => apiClient.get('/credits/transactions')
};

// Payment APIs
export const paymentAPI = {
  createOrder: (amount) => apiClient.post('/payment/create-order', { amount }),
  verifyPayment: (data) => apiClient.post('/payment/verify', data),
  getHistory: () => apiClient.get('/payment/history')
};

export default apiClient;
