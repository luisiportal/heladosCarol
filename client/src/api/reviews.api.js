import axios from "./axios.js";

//reviews

export const getReviewsRequest = async (limit) =>
  await axios.get(`/reviews?limit=${limit}`);

export const getReviewsPublicadosRequest = async (limit) =>
  await axios.get(`/reviewsP?limit=${limit}`);


export const createReviewRequest = async (formData) => {
  await axios.post(`/reviews`, formData);
};
export const publicarReviewRequest = async (id_review) =>
  await axios.put(`/reviews/publicar/${id_review}`);

export const deleteReviewRequest = async (id_review) =>
  await axios.delete(`/reviews/${id_review}`);

export const getReviewRequest = async (id_review) =>
  await axios.get(`/reviews/${id_review}`);

export const updateReviewRequest = async (id_review, formData) =>
  await axios.put(`/reviews/${id_review}`, formData);
