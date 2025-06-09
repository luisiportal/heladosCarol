import axios from "./axios.js";

export const getTodosReservasRequest = async (limit) =>
  await axios.get(`/reservas?limit=${limit}`);