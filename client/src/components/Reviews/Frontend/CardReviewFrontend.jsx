import React from "react";
import DerretidoVainilla2 from "../../apariencia/DerretidoVainilla2";

const CardReviewFrontend = ({ review, sabores, index }) => {
  
  
  return (
    <div>
    
      <div
        className={`flex items-center mb-4 bg-${sabores[index].color} rounded-xl p-2 shadow-md`}
      >
        <img
          src="images/avatar.png"
          alt="Avatar"
          className="w-10 h-10 rounded-full mr-2"
        />
        <div>
          <p className="text-slate-900">{review.comentario}</p>
          <span className="text-slate-900 text-sm">- {review.autor}</span>
          <span className="text-gray-500 text-sm">- {review.fecha}</span>
        </div>
        
      </div>
      <div className={`relative bottom-4 izquierda${index}`}>
        <DerretidoVainilla2 color={"#" + sabores[index].color} />
      </div>
    </div>
  );
};

export default CardReviewFrontend;
