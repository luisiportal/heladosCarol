import React, { useEffect, useState } from "react";

import CardReviewFrontend from "./CardReviewFrontend";

import { useReviews } from "../../../context/ReviewProvaider";
import { useSabores } from "../../../context/SaboresProvider";
import BTNCargarMas from "../../Utilidades/BTNCargarMas";
import { useAuth } from "../../../context/AuthContext";

import { getReviewsPublicadosRequest } from "../../../api/reviews.api";

const ListarReviewsFrontend = ({sabores}) => {
  const { reviews, setReviews, loadReviewsPublicados, recargarReviews } =
    useReviews();
  const { loader, setLoader, setModalActivo } = useAuth();
  useEffect(() => {
    const cargarReviews = async (limit) => {
      await loadReviewsPublicados(limit);
    };
    cargarReviews(5);
  }, [recargarReviews]);

  return (
    <div>
      <div>
        {" "}
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

      <div className="flex justify-center items-center">
        
        <BTNCargarMas
          estado={reviews}
          setEstado={setReviews}
          getRecurso={getReviewsPublicadosRequest}
          setLoader={setLoader}
          texto={"+ comentarios"}
        />
      </div>
    </div>
  );
};

export default ListarReviewsFrontend;
