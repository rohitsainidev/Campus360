import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Request interceptor: Attach JWT Bearer token
api.interceptors.request.use(
  (config) => {
    try {
      const rawUser = localStorage.getItem('campus360_auth_user');
      if (rawUser) {
        const user = JSON.parse(rawUser);
        const token = user.token || localStorage.getItem('campus360_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    } catch {
      // Ignore parsing errors
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: Global error handler
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear expired session if 401 unauthorized
      localStorage.removeItem('campus360_auth_user');
      localStorage.removeItem('campus360_token');
    }
    return Promise.reject(error);
  }
);

export default api;
