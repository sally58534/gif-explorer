import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_BE_URL
});

export default apiClient;
