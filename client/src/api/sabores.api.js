import axios from "./axios.js";

//Sabores

export const getSaboresRequest = async () => await axios.get(`/Sabores`);

export const createSaborRequest = async (formData) => {
  await axios.post(`/Sabores`, formData);
};

export const deleteSaborRequest = async (id_sabor) =>
  await axios.delete(`/Sabores/${id_sabor}`);

export const getSaborRequest = async (id_sabor) =>
  await axios.get(`/Sabores/${id_sabor}`);

export const updateSaborRequest = async (id_sabor, formData) =>
  await axios.put(`/Sabores/${id_sabor}`, formData);
