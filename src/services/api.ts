import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Helper to get token from localStorage (synced by user store) or persisted user-storage
function getAuthToken(): string | null {
  let token = localStorage.getItem("token");
  if (!token) {
    try {
      const stored = localStorage.getItem("user-storage");
      if (stored) {
        const parsed = JSON.parse(stored);
        token = parsed?.state?.token || null;
      }
    } catch {
      // ignore
    }
  }
  return token;
}

// Add a request interceptor to include the auth token in headers
api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      // Redirect to login only if not already on auth pages
      const path = window.location.pathname;
      if (!path.startsWith("/auth/")) {
        window.location.href = "/auth/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
