import React, { useState } from "react";
import TituloModulo from "../DesingSystem/TituloModulo";
import Cart2SVG from "../../SVG/Cart2SVG";
import { Sabor } from "../../../types/General.types";
import Imagen from "../Imagen";
import BotonesMasMenos from "../Potes/BotonesMasMenos";

const Recomendado = ({ producto }: { producto: Sabor }) => {
  const [showButtons, setShowButtons] = useState(false);
  const [cantidad, setCantidad] = useState(0);
  return (
    <div>
      <TituloModulo titulo="Recomendado Para Ti" />

      <div
        onMouseLeave={() => setShowButtons(false)}
        className="bg-neutral-300 rounded-xl relative shadow-md"
      >
        {cantidad > 0 && (
          <div className="absolute top-3 right-[130px] bg-slate-700 text-2xl font-bold text-white rounded-r-xl w-12 h-8 aspect-square flex justify-center items-center">
            <h2>{cantidad}</h2>
          </div>
        )}
        <div
          className={`absolute right-2 top-2 transition-all duration-500 ${
            showButtons ? "opacity-100" : "opacity-0"
          }`}
        >
          <BotonesMasMenos
            mas={() => setCantidad(cantidad + 1)}
            menos={() => setCantidad(cantidad > 0 ? cantidad - 1 : cantidad)}
          />
        </div>
        <section className="flex w-full">
          <div className="w-48 h-40 p-2 flex flex-col justify-center items-center gap-2">
            <h2 className="text-slate-800 font-bold leading-4 mb-2">
              {producto?.nombre_sabor}
            </h2>
            <p className="font-semibold text-xs text-slate-700 mb-2 leading-4">
              {producto?.description}
            </p>
          </div>
          <div className="bg-slate-500 w-48 h-40 rounded-tr-xl  overflow-hidden">
            {" "}
            <Imagen
              imagen_url={producto?.imagenes?.[0].ruta_image || ""}
              nombre={producto?.nombre_sabor}
            />
          </div>
        </section>
        <section className="flex w-full">
          <div className="bg-slate-500 w-48 h-40 rounded-bl-xl  overflow-hidden">
            <Imagen
              imagen_url={producto?.imagenes?.[1].ruta_image || ""}
              nombre={producto?.nombre_sabor}
            />
          </div>
          <div className="w-48 h-40 flex gap-5 flex-col justify-center items-center">
            <h2 className="font-bold text-4xl flex">
              {parseInt(producto?.precio_venta_cup.toString())}
              <span className="font-semibold text-neutral-500 text-sm uppercase mt-1 ml-1">
                cup
              </span>
            </h2>

            <button
              onClick={() => {
                setCantidad(cantidad + 1);
                setShowButtons(true);
              }}
              className="flex items-center w-36 gap-2 rounded-xl px-5 pt-1 pb-2 bg-slate-700 font-bold text-white text-xl"
            >
              Comprar
              <span className="text-white mt-2">
                <Cart2SVG />
              </span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Recomendado;
