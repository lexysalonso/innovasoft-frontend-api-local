import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const clienteService = {
  getAll: async () => {
    const response = await api.get("/");
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/${id}`);
    return response.data;
  },

  create: async (cliente) => {
    const response = await api.post("/", cliente);
    return response.data;
  },

  update: async (id, cliente) => {
    const response = await api.put(`/${id}`, cliente);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/${id}`);
    return response.data;
  },
};
