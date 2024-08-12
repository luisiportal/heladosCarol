import React, { useEffect, useState } from "react";

import CardReviewFrontend from "./CardReviewFrontend";

import { useReviews } from "../../../context/ReviewProvaider";
import { useSabores } from "../../../context/SaboresProvider";

const ListarReviewsFrontend = () => {
  const { reviews, loadAllReviews, recargarReviews } = useReviews();
  const { sabores, loadSabores } = useSabores();

  useEffect(() => {
    const cargarReviews = async () => {
      await loadSabores();
      await loadAllReviews();
    };
    cargarReviews();
  }, [recargarReviews]);

  return (
    <div>
      {reviews.map(
        (review, index) =>
          review.publicado && (
            <CardReviewFrontend
              review={review}
              key={review.id_review}
              sabores={sabores}
              index={index}
            />
          )
      )}
    </div>
  );
};

export default ListarReviewsFrontend;
