import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://192.168.137.1:5000/",
  withCredentials: true,
});

export default instance;
