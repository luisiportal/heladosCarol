import axios from "./axios.js";

export const createVentaRequest = async (ordenCompleta) => {
  return await axios.post(`/ventas`, ordenCompleta);
};
export const createReservaRequest = async (ordenCompleta) => {
  return await axios.post(`/reservas`, ordenCompleta);
};

export const createPagoRequest = async (data) => {
  return await axios.post(`/pago`, data);
};

export const getTodosFacturasRequest = async (limit) =>
  await axios.get(`/ventas?limit=${limit}`);

export const deleteFacturaRequest = async (id) =>
  await axios.delete(`/facturas/${id}`);

export const updateFechaFacturaRequest = async (values) => {
  await axios.put(`/facturas/`, values);
};

export const getReciboPagoZelleRequest = async (data) =>
  await axios.post(`/ventas/pagozelle/`, data);

export const getPagosRecibidosZelleRequest = async () => {
  const response = await axios.get(`/pagos/recibidos/zelle`);
  
  return response.data.mensajes;
};

export const asociarPagoZelleRequest = async (data) =>
  await axios.post(`/ventas/pagozelle/asociar`, data);
