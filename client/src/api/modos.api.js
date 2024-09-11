import axios from "./axios.js";

export const updateModoCerradoRequest = async (values) => {
  await axios.put(`/cerrado`,values);
};



export const getModoCerradoRequest = async () =>
  await axios.get(`/cerrado`);