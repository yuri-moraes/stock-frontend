import axios from "axios";

const api = axios.create({
  baseURL: "https://stock-api-yurimoraes-projects.vercel.app",
});

export default api;
