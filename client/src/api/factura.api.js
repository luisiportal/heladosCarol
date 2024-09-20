import axios from "./axios.js";

export const confirmarFacturaRequest = async (id) => {
  await axios.put(`/facturas/confirmar/${id}`, id);
};

export const estadoEntregadaFacturaRequest = async (id) => {
  await axios.put(`/facturas/entregada/${id}`, id);
};