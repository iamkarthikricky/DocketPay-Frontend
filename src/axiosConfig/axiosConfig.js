// src/utils/axiosConfig.js
import axios from 'axios';
import { toast } from 'react-toastify';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'https://docketpay-backend-production.up.railway.app', // Base URL
  // baseURL: "http://localhost:5000",

  timeout: 10000, // Request timeout in milliseconds
  headers: {
    'Content-Type': 'application/json',
  },
});


// Add request & response interceptors
axiosInstance.interceptors.request.use(
  (config) => {
    // Attach Authorization token if available
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      // Handle token expiration and authentication errors
      if (status === 401 || status === 403) {
        if (data?.error?.type === "TOKEN_EXPIRED") {
          localStorage.removeItem("token");
          toast.info("Session Expired")
          window.location.href = "/login"; // Redirect only if token expired
        
        }
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
