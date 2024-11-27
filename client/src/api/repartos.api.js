import axios from "./axios.js";

export const getRepartosRequest = async () => {
  return await axios.get(`/repartos`);
};

export const getUnRepartoRequest = async (id) =>
  await axios.get(`/repartos/${id}`);

export const updateUnRepartoRequest = async (id, data) =>
  await axios.put(`/repartos/${id}`, data);

export const createRepartoRequest = async (data) =>
  await axios.post(`/repartos`, data);
