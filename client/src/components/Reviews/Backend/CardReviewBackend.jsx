import React from 'react'
import { useReviews } from '../../../context/ReviewProvaider';



const CardReviewBackend = ({review}) => {
  const { deleteReview, publicarReview } = useReviews();

  const handleClick = () => {
    publicarReview(review.id_review);
  };
  
    return (
        <div>
          <div className="flex items-center mb-4 bg-neutral-300 rounded p-2 shadow-md">
        <img
          src={`../images/perfilReviews/${review.ruta_image}`}
          alt="Avatar"
          className="w-14 h-14 rounded-full mr-2"
        />
        <div>
          <div>
            {review.publicado == true ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
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
