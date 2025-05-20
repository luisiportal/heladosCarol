import React, { useEffect } from "react";

const SlideIMG = ({ images, combo, item, current, setCurrent }) => {
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000); // Cambiar cada 3 segundos

    return () => clearInterval(interval);
  }, [current]);
  console.log(current);
  
  return (
    <div className="w-full h-56">
      {images.map((imagen, index) => (
        <img
          key={index}
          className={`w-full h-full object-cover rounded-lg slide ${
            index === current ? "active" : ""
          }`}
          src={`${import.meta.env.VITE_BACKEND_URL}/images/productos/${
            imagen.ruta_image
          }`}
          alt={combo.nombre_sabor}
        />
      ))}
    </div>
  );
};

export default SlideIMG;
