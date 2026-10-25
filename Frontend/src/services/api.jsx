import axios from "axios";

const API = axios.create({
<<<<<<< HEAD
=======
<<<<<<< HEAD
  baseURL: "http://localhost:3000/api", // backend endpoint
=======
>>>>>>> 00f752cfc5a6447c97683a266c1f81bbe8aae672
  baseURL: `${import.meta.env.VITE_API_BASE_URL || "http://localhost:3000"}/api`,
  timeout: 15000,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
<<<<<<< HEAD
=======
>>>>>>> master
>>>>>>> 00f752cfc5a6447c97683a266c1f81bbe8aae672
});

export default API;
