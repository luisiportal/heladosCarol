import React from "react";
import EnviarReviewForm from "../Reviews/Frontend/EnviarReviewForm";
import ListarReviewsFrontend from "../Reviews/Frontend/ListarReviewsFrontend";

const Reviews = ({sabores}) => {
  return (
    <div className=" bg-neutral-200 p-4 my-5 rounded-lg">
      <h2 className="flex justify-center font-irish text-2xl mb-4">
         Nuestros Clientes
      </h2>
      <ListarReviewsFrontend sabores={sabores} />
      <EnviarReviewForm />

     
    </div>
  );
};

export default Reviews;
