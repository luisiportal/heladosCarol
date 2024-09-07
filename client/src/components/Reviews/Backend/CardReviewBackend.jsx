import React from 'react'
import { useReviews } from '../../../context/ReviewProvaider';
import CheckedSVG from '../../SVG/CheckedSVG';
import Unchecked from '../../SVG/Unchecked';



const CardReviewBackend = ({review}) => {
  const { deleteReview, publicarReview } = useReviews();

  const handleClick = () => {
    publicarReview(review.id_review);
  };
  
    return (
        <div>
          <div className="flex items-center mb-4 bg-neutral-300 rounded p-2 shadow-md">
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}/images/perfilReviews/${review.ruta_image}`}
          alt="Avatar"
          className="w-14 h-14 rounded-full mr-2  border-white border-2"
        />
        <div>
          <div>
            {review.publicado == true ? (
       <CheckedSVG/>
            ) : (
             <Unchecked/>
            )}
          </div>

          <p className="text-gray-700">{review.comentario}</p>

          <span className="text-gray-500 text-sm">- {review.autor}</span>
          <span className="text-gray-500 text-sm">- {review.title}</span>
          <span className="text-gray-500 text-sm">- {review.fecha}</span>
        </div>
      </div>
      <button
        type="submit"
        onClick={handleClick}
        className="bg-fresa hover:bg-fresa-700 text-white font-bold py-2 px-4 rounded "
      >
        Publicar
      </button>
      <button
        type="submit"
        onClick={() => deleteReview(review.id_review)}
        className="bg-fresa hover:bg-fresa-700 text-white font-bold py-2 px-4 rounded "
      >
        Eliminar
      </button>
        </div>
      );
    };

export default CardReviewBackend
