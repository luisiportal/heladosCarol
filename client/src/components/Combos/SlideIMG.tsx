import React from "react";

const SlideIMG = ({ images, combo, item, current }) => {
    console.log(item + "ff" +current);
    
  return (
    <div>
      {images.map((imagen, index) => (
        <img
          key={index}
          className={`rounded-lg h-80 slide ${
            index === current ? "active" : ""
          }`}
          src={`${import.meta.env.VITE_BACKEND_URL}/images/productos/${imagen}`}
          alt={combo.nombre_sabor}
        />
      ))}
    </div>
  );
};

export default SlideIMG;
