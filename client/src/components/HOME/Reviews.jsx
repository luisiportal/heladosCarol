import React from "react";
import EnviarReviewForm from "../Reviews/Frontend/EnviarReviewForm";
import ListarReviewsFrontend from "../Reviews/Frontend/ListarReviewsFrontend";

const Reviews = () => {
  return (
    <div className=" bg-neutral-200 p-10 my-5 rounded-lg">
      <h2 className="flex justify-center font-inspiration text-3xl">
        Opiniones
      </h2>
      <ListarReviewsFrontend />
      <EnviarReviewForm />
     
    </div>
  );
};

export default Reviews;
