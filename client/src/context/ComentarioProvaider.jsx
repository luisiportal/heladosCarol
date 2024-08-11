import { useContext, useState } from "react";

import {
  deleteReviewRequest,
  getReviewsRequest,
  publicarReviewRequest,
} from "../api/reviews.api";
import { ComentarioContext } from "./ComentarioContext";

export const useComentarios = () => {
  const context = useContext(ComentarioContext);
  if (!context === undefined) {
    throw new Error("No hay contexto provider");
  }
  return context;
};

export const ComentarioContextProvider = ({ children }) => {
  const [recargarReviews, setRecargarReviews] = useState(null);
  const [reviews, setReviews] = useState([]);

  const loadAllReviews=async()=> {
    console.log("hjhjh");

    const response = await getReviewsRequest();
    console.log(response);

    setReviews(response.data);
  }

  const deleteReview = async (id) => {
    deleteReviewRequest(id);
    setReviews(reviews.filter((review) => review.id !== id));
  };

  const publicarReview = async (id) => {
    publicarReviewRequest(id);
    setRecargarReviews(true);
  };

  return (
    <ComentarioContext.Provider
      value={{
        loadAllReviews,
        reviews,
      }}
    >
      {children}
    </ComentarioContext.Provider>
  );
};
