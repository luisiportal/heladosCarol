import React, { useEffect, useState } from "react";

import CardReviewFrontend from "./CardReviewFrontend";

import { useReviews } from "../../../context/ReviewProvaider";
import { useSabores } from "../../../context/SaboresProvider";
import BTNCargarMas from "../../Utilidades/BTNCargarMas";
import { useAuth } from "../../../context/AuthContext";
import Loader from "../../Utilidades/Loader";
import { getReviewsRequest } from "../../../api/reviews.api";

const ListarReviewsFrontend = () => {
  const { reviews, setReviews, loadAllReviews, recargarReviews } = useReviews();
  const { sabores } = useSabores();
  const { loader, setLoader, setModalActivo } = useAuth();
  useEffect(() => {
    const cargarReviews = async (limit) => {
      await loadAllReviews(limit);
    };
    cargarReviews(5);
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
      <BTNCargarMas
        estado={reviews}
        setEstado={setReviews}
        getRecurso={getReviewsRequest}
        setLoader={setLoader}
      />
    </div>
  );
};

export default ListarReviewsFrontend;
