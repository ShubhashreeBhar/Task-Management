// Central API configuration
// Set VITE_API_BASE_URL in your .env file (e.g. http://localhost:4000)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

export default API_BASE_URL;
