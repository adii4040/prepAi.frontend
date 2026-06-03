import axios from "axios";

export const apiClient = axios.create({
  baseURL: (import.meta as any).env.VITE_BASE_URL,
  withCredentials: true,
});