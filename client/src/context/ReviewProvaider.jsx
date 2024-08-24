import { useContext, useState } from "react";
import { ReviewContext } from "./ReviewContext";
import {
  deleteReviewRequest,
  getReviewsPublicadosRequest,
  getReviewsRequest,
  publicarReviewRequest,
} from "../api/reviews.api";
import { useAuth } from "./AuthContext";

export const useReviews = () => {
  const context = useContext(ReviewContext);
  if (!context === undefined) {
    throw new Error("No hay contexto provider");
  }
  return context;
};

export const ReviewContextProvider = ({ children }) => {
  const [reviews, setReviews] = useState([]);
  const [recargarReviews, setRecargarReviews] = useState(false);
  const { setLoader } = useAuth();

  async function loadAllReviews(limit) {
    const response = await getReviewsRequest(limit);
    setReviews(response.data);
    setLoader(false);
  }
  async function loadReviewsPublicados(limit) {
    const response = await getReviewsPublicadosRequest(limit);
    setReviews(response.data);
    setLoader(false);
  }



  const deleteReview = async (id) => {
    deleteReviewRequest(id);
    setReviews(reviews.filter((review) => review.id_review !== id));
  };

  const publicarReview = async (id) => {
    await publicarReviewRequest(id);

    setRecargarReviews(!recargarReviews);
  };

  return (
    <ReviewContext.Provider
      value={{
        reviews,
        setReviews,
        recargarReviews,
        loadAllReviews,
        loadReviewsPublicados,
        deleteReview,
        publicarReview,
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
};
