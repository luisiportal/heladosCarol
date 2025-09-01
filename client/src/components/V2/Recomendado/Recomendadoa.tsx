import React from "react";
import TituloModulo from "../DesingSystem/TituloModulo";
import Cart2SVG from "../../SVG/Cart2SVG";
import { Sabor } from "../../../types/General.types";
import SlideImagenes from "../SlideImagenes/SlideImagenes";

const Recomendado = ({ producto }: { producto: Sabor }) => {
  return (
    <div>
      <TituloModulo titulo="Recomendado Para Ti" />

      <div className="bg-neutral-300 flex min-h-[160px] gap-2 rounded-xl">
        <div className="pl-3 py-3 w-40">
          <p className="font-bold text-xs text-slate-700 mb-2 leading-4">
            {producto?.description}
          </p>
          <h2 className="font-bold text-3xl flex">
            {parseInt(producto?.precio_venta_cup.toString())}
            <span className="font-semibold text-neutral-500 text-sm uppercase mt-1 ml-1">
              cup
            </span>
          </h2>

          <button className="flex items-center w-full gap-2 rounded-xl px-5 pt-1 pb-2 bg-slate-700 font-bold text-white text-xl">
            Comprar{" "}
            <span className="text-white mt-2">
              <Cart2SVG />
            </span>
          </button>
        </div>
        <div >
          <img className="rounded-r-xl object-cover w-60 h-full border-l border-slate-400"
            src={`${
              import.meta.env.VITE_BACKEND_URL
            }/images/productos/${producto?.imagenes?.[0].ruta_image}`}
            alt={producto?.nombre_sabor}
          />
          </div>
            
        
      </div>
    </div>
  );
};

export default Recomendado;
