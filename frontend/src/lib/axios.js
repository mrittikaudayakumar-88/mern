import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5001/api/notes",
  headers: {
    "Content-Type": "application/json",
  },
 
});

export default api;