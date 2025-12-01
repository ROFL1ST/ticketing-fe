import axios from "axios";
import { getToken, removeToken } from "./auth";

const BASE_URL = "http://localhost:8080/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      removeToken();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Auth endpoints
export const authAPI = {
  login: (credentials) => api.post("/login", credentials),
  register: (userData) => api.post("/register", userData),
};

// User ticket endpoints
export const userTicketAPI = {
  getMyTickets: () => api.get("/user/tickets"),
  getTicketById: (id) => api.get(`/user/tickets/${id}`),
  createTicket: (ticketData) => api.post("/user/tickets", ticketData),
  addComment: (ticketId, message) =>
    api.post(`/user/tickets/${ticketId}/comment`, { message }),
};

// Admin ticket endpoints
export const adminTicketAPI = {
  getAllTickets: () => api.get("/admin/tickets"),
  getTicketById: (id) => api.get(`/admin/tickets/${id}`),
  updateStatus: (ticketId, status) =>
    api.put(`/admin/tickets/${ticketId}/status`, { status }),
};

export default api;
