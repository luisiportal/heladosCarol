import axios from "./axios.js";

export const getRepartosRequest = async () => {
  const response = await axios.get(`/repartos`);
  return response;
};

export const getUnRepartoRequest = async (id) =>
  await axios.get(`/repartos/${id}`);

export const updateUnRepartoRequest = async (id, data) =>
  await axios.put(`/repartos/${id}`, data);

export const createRepartoRequest = async (data) =>
  await axios.post(`/repartos`, data);
