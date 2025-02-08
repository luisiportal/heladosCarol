import axios from "./axios.js";

//Sabores

export const getSaboresRequest = async () => await axios.get(`/sabores`);

export const createSaborRequest = async (formData) => {
 return await axios.post("/sabores", formData);
};

export const deleteSaborRequest = async (id_sabor) =>
  await axios.delete(`/sabores/${id_sabor}`);

export const getSaborRequest = async (id_sabor) =>
  await axios.get(`/sabores/${id_sabor}`);

export const updateSaborRequest = async (id_sabor, formData) =>
  await axios.put(`/sabores/${id_sabor}`, formData);
