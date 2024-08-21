import { useContext, useState } from "react";
import { ReviewContext } from "./ReviewContext";
import {
  deleteReviewRequest,
  getReviewsRequest,
  publicarReviewRequest,
} from "../api/reviews.api";

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

  async function loadAllReviews() {
    const response = await getReviewsRequest();
    setReviews(response.data);
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
        recargarReviews,
        loadAllReviews,
        deleteReview,
        publicarReview,
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
};
