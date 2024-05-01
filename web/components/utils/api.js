// utils/api.js
import axios from 'axios';

// Define the base URL for different environments
const baseURL = process.env.NODE_ENV === 'development'
  ? 'https://dev.api.invalsia.com'
  : 'https://api.limovia.se';

// Create a separate Axios instance with the configured base URL
const api = axios.create({
  baseURL,
  withCredentials: true,
});

// Export api as the default export
export default api;