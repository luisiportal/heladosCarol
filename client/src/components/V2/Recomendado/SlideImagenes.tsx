import { useEffect, useState } from "react";
import { Sabor } from "../../../types/General.types";
import Imagen from "../Imagen";

const SlideImagenes = ({ producto }: { producto: Sabor }) => {
  const [imgActiva, setImgActiva] = useState(0);

  const length = producto?.imagenes?.length || 0;

  useEffect(() => {
    const intervalo = setInterval(() => {
      setImgActiva((prev) => (prev + 1) % length);
    }, 5000);

    return () => clearInterval(intervalo); // Limpieza
  }, []);


  return (
    <div className="relative w-full h-full z-0">
      {producto.imagenes?.map((item, index) => (
        <div
          className={`w-full h-full opacity-0 transition-all duration-700 absolute top-0 left-0 ${
            imgActiva === index ? "opacity-100" : "opacity-0"
          }`}
          key={item.id_imagen}
        >
          <Imagen
            imagen_url={item.ruta_image || ""}
            nombre={producto?.nombre_sabor}
          />
        </div>
      ))}
    </div>
  );
};

export default SlideImagenes;
