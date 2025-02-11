import React, { useEffect, useState } from "react";
import { getSaborRequest } from "../../api/sabores.api";
import { Imagen } from "../../types/General.types";

const SliderBanner = () => {
  const [current, setCurrent] = useState(0);
  const [images, setImages] = useState<Imagen[]>([]);

  useEffect(() => {
    const loadProducto = async () => {
      const { data } = await getSaborRequest(14);
      setImages(data.imagenes);
    };
    loadProducto();
  }, []);

  useEffect(() => {
    if (images.length > 0) {
      const interval = setInterval(() => {
        setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      }, 5000); // Cambiar cada 3 segundos
      return () => clearInterval(interval);
    }
  }, [images]);

  return (
    <section className="px-3">
      <div className="relative w-full h-48 rounded-xl mt-2">
        {images.map((image, index) => (
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/images/productos/${
              image.ruta_image
            }`}
            className={`rounded-lg h-80 slide ${
              index === current ? "active" : ""
            }`}
            alt={`Slide ${index + 1}`}
            key={index}
          />
        ))}
      </div>
    </section>
  );
};

export default SliderBanner;
