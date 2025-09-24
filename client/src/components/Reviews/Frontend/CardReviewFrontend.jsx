import DerretidoVainilla2 from "../../apariencia/DerretidoVainilla2";

const CardReviewFrontend = ({ review, sabores, index }) => {


  const indexColor = Math.min(index, sabores.length - 1);

  const bgColor = "#" + sabores[indexColor]?.color;

  

  return (
    <div>
      <div
        style={{
          backgroundColor: "#" + (sabores?.[indexColor]?.color ?? ""),
        }}
        className={`flex items-center mb-4 
           rounded-xl p-2 shadow-md `}
      >
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}/images/perfilReviews/${
            review.ruta_image
          }`}
          alt="Avatar"
          className="w-14 h-14 aspect-square rounded-full mr-2  border-white border-2 "
        />
        <div>
          <p className="text-slate-900">{review.comentario}</p>
          <span className="text-slate-900 text-sm">- {review.autor}</span>
          <span className="text-gray-500 text-sm">- {review.fecha}</span>
        </div>
      </div>
      <div className={`relative max-w-min bottom-4 izquierda${indexColor}`}>
        <DerretidoVainilla2 color={bgColor || ""} />
      </div>
    </div>
  );
};

export default CardReviewFrontend;
