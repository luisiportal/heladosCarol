import React from 'react'

const CardReviewFrontend = ({review}) => {

  
    return (
        <div>
          <div className="flex items-center mb-4 bg-neutral-300 rounded p-2 shadow-md">
            <img
              src="images/avatar.png"
              alt="Avatar"
              className="w-10 h-10 rounded-full mr-2"
            />
            <div>
              <p className="text-gray-700">{review.comentario}</p>
              <span className="text-gray-500 text-sm">- {review.autor}</span>
              <span className="text-gray-500 text-sm">- {review.fecha}</span>
            </div>
          </div>
        </div>
      );
    };

export default CardReviewFrontend
