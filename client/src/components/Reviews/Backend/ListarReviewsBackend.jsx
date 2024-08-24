import React, { useEffect, useState } from "react";

import CardReviewBackend from "./CardReviewBackend";
import { useReviews } from "../../../context/ReviewProvaider";

const ListarReviewsBackend = () => {
  const { reviews, loadAllReviews, recargarReviews } = useReviews();

  useEffect(() => {
    const cargarReviews = async () => {
      await loadAllReviews(10);
    };
    cargarReviews();
  }, [recargarReviews]);

  return (
    <div className="pt-16">
      {reviews.map((review) => (
        <CardReviewBackend review={review} key={review.id_review} />
      ))}
    </div>
  );
};

export default ListarReviewsBackend;
