import axios from 'axios';

const API = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api',
});

// Add request interceptor to include auth token
API.interceptors.request.use((config) => {
  // Retrieve token from secure storage
  const token = 'your-stored-token'; // Replace with actual token retrieval
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;