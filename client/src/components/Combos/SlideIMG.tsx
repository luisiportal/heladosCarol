import React, { useEffect } from "react";

const SlideIMG = ({ images, combo, item, current, setCurrent }) => {
  console.log(item + "ff" + current);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000); // Cambiar cada 3 segundos

    return () => clearInterval(interval);
  }, []);
  return (
    <div>
      {images.map((imagen, index) => (
        <img
          key={index}
          className={`rounded-lg h-80 slide ${
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
