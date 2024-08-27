import axios from "./axios.js";


export const getRepartosRequest = async (limit) =>
    await axios.get(`/repartos`);