// src/utils/axiosConfig.js
import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'https://docketpay-backend-production.up.railway.app', // Base URL

  timeout: 10000, // Request timeout in milliseconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Add authorization token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      // Redirect to login or handle token expiration
      localStorage.removeItem("token")
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
