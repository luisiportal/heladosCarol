import axios from "./axios.js";

export const rastrearOrdenRequest = async (contacto) =>
    await axios.get(`/ordenes/${contacto}`);