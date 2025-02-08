import React, { useEffect, useState } from "react";
import { Sabor } from "../../types/General.types";
import BTN_Comprar from "../HOME/Sabores/BTN_Comprar";
import SlideIMG from "./SlideIMG";

interface ImportMetaEnv {
  readonly VITE_BACKEND_URL: string;
  // Otras variables de entorno que quieras definir
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

const CombosHome = ({ combos }: { combos: Sabor[] }) => {
  const [current, setCurrent] = useState(0);
  const [item, setItem] = useState("");

  const images = ["flan.jpg", "20241212_174429.jpg"];


  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000); // Cambiar cada 3 segundos

    return () => clearInterval(interval);
  }, []);

  const launchEvent = (id_sabor:string)=>{
    
      setItem(id_sabor);
     // onHover(combo.id_sabor);
      console.log("maouse enter" + id_sabor);
    
  }
 

  return (
    <div className="flex flex-wrap gap-2 justify-center bg-neutral-200 p-2">
      {combos.map((combo) => (
        <section
        onClick={()=>launchEvent(combo.id_sabor)}
          onTouchStart={()=>launchEvent(combo.id_sabor)}
          key={combo.id_sabor}
          className="w-full flex flex-col text-neutral-950 border-2 bg-white rounded-lg hover:border-fresa transition-colors duration-500"
        >
          <div title="imagen contendor" className="relative h-56">
            <picture className="z-10 transition-all duration-500">
              {item == combo.id_sabor ? (
                <SlideIMG
                  combo={combo}
                  images={images}
                  item={item}
                  current={current}
                />
              ) : (
                <img className="w-full h-full transition-all rounded-lg" src={`${import.meta.env.VITE_BACKEND_URL}/images/productos/${images[0]}`}
                alt={combo.nombre_sabor} />
              )}
            </picture>
            <h2
              className={`absolute top-0 left-0 font-bold text-sm text-white p-1 rounded-br-lg rounded-tl-lg bg-[#F9A217]`}
            >
              Combos
            </h2>
          </div>
          <div className="flex justify-between py-2 px-2 font-bold first-letter:bold text-neutral-950 text-md">
            <h2 className="">{combo.precio_venta} USD</h2>

            <h2>{combo.precio_venta_cup} CUP</h2>
          </div>

          <h2 className="font-irish flex justify-center text-lg px-2 py-1 pb-2">
            {combo.nombre_sabor}
          </h2>
          <p className="px-4 italic text-justify">{combo.description}</p>

          <div className="flex justify-center p-2">
            <BTN_Comprar />
          </div>
        </section>
      ))}
    </div>
  );
};

export default CombosHome;
