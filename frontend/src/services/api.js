import axios from "axios";

const API = axios.create({
  baseURL: "https://kaznews-backend.onrender.com/api",
});

export default API;