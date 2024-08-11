import React, { useEffect, useState } from "react";

import CardReviewFrontend from "./CardReviewFrontend";

import { useReviews } from "../../../context/ReviewProvaider";

const ListarReviewsFrontend = () => {
  const { reviews, loadAllReviews, recargarReviews } = useReviews();

  useEffect(() => {
    const cargarReviews = async () => {
      await loadAllReviews();
    };
    cargarReviews();
  }, [recargarReviews]);

  return (
    <div>
      {reviews.map(
        (review) =>
          review.publicado && (
            <CardReviewFrontend review={review} key={review.id_review} />
          )
      )}
    </div>
  );
};

export default ListarReviewsFrontend;
