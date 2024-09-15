import axios from "./axios.js";

export const getTodasFrases = async () => await axios.get(`/frases/`);

export const get1Frase = async (id) => await axios.get(`/frases/${id}`);

export const updateFrase = async (id, values) =>
  await axios.put(`/frases/${id}`, values);
