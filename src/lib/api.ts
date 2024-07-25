import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL!,
  headers: {
    "Content-Type": "application/json",
    "x-apollo-operation-name": "operationName", // Añade un encabezado con un valor no vacío
  },
});

export default api;
