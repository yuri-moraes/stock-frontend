import axios from "axios";

const api = axios.create({
  baseURL: "stock-api-yurimoraes-projects.vercel.app",
});

export default api;
