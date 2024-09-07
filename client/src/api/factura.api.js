import axios from "./axios.js";

export const confirmarFacturaRequest = async (id) => {
  await axios.put(`/facturas/confirmar/${id}`, id);
};