import { useEffect, useState } from "react";
import { Imagen } from "../../../types/General.types";

const SlideImagenes = ({ imagenes }: { imagenes: Imagen[] }) => {
  const [showIMG, setShowIMG] = useState(0);


  const autoPlay = ()=>{

    const posicion = imagenes.length-1 > 0 ? showIMG +1 : showIMG



     setTimeout(() => {
        setShowIMG(posicion);
        console.log(posicion);
        
    }, 20000);
  }

  useEffect(() => {
   
     autoPlay()
  }, []);

  return imagenes.map((item, index) => (
    <div key={item.id_imagen} className="relative bg-red-500 w-48">
      <img
        className={`rounded-r-xl object-cover w-48 h-48  border-l border-slate-400 `}
        src={`${import.meta.env.VITE_BACKEND_URL}/images/productos/${
          item.ruta_image
        }`}
        alt={item?.descripcion}
      />
    </div>
  ));
};

export default SlideImagenes;
