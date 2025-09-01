import React, { useState } from "react";
import { Sabor } from "../../../types/General.types";
import Cart2SVG from "../../SVG/Cart2SVG";

const TinaCard = ({ sabor, css }: { sabor: Sabor; css: string }) => {
  const [showButtons, setShowButtons] = useState(false);
  const [cantidad, setCantidad] = useState(0);

  const color = `#${sabor.color}`;

  return (
    <div
      onMouseLeave={() => setShowButtons(false)}
      className={`relative shadow-md bg-neutral-300 rounded-xl min-h-[230px] pb-3 ${css}`}
    >
      <div className="relative">
        <>
          {cantidad > 0 && (
            <div className="absolute top-3 bg-slate-700 text-2xl font-bold text-white rounded-r-xl w-12 h-8 aspect-square flex justify-center items-center">
              <h2>{cantidad}</h2>
            </div>
          )}

          <div
            className={`absolute right-2 top-2 transition-all duration-500 ${
              showButtons ? "opacity-100" : "opacity-0"
            }`}
          >
            <button
              onClick={() => setCantidad(cantidad + 1)}
              className="bg-slate-700 text-3xl font-bold text-white rounded-full w-8 h-8 aspect-square flex justify-center items-center"
            >
              <h2 className="mb-1">+</h2>
            </button>
            <button
              onClick={() =>
                setCantidad(cantidad > 0 ? cantidad - 1 : cantidad)
              }
              className="bg-slate-700 text-3xl font-bold text-white rounded-full w-8 h-8 aspect-square flex justify-center items-center mt-2"
            >
              <h2 className="mb-1">-</h2>
            </button>
          </div>
        </>

        <button
          onClick={() => {
            setCantidad(cantidad + 1);
            setShowButtons(true);
          }}
          title="Comprar"
          className={`transition-all duration-500 absolute top-[60%] left-1/2 transform -translate-x-1/2  -translate-y-1/2 bg-slate-700 text-white rounded-xl w-14 h-8 flex justify-center items-center ${
            showButtons ? "opacity-0" : "opacity-100"
          }`}
        >
          {" "}
          <Cart2SVG />
        </button>

        <img
          className="rounded-xl object-cover w-full h-32 p-0.5"
          src={
            sabor.imagenes
              ? `${import.meta.env.VITE_BACKEND_URL}/images/productos/${sabor
                  ?.imagenes[0]?.ruta_image}`
              : "`/images/potesolonuevo.png`"
          }
          alt={sabor.nombre_sabor}
        />
      </div>
      <div className="flex flex-col justify-between min-h-[80px]">
        {" "}
        <h2 className="font-bold flex justify-center h-fit leading-4 px-2 pt-2 text-slate-800/80">
          {sabor.nombre_sabor}
        </h2>
        <h2 className="font-bold text-xl flex ml-2 px-2">
          {parseInt(sabor.precio_venta_cup.toString())}
          <span className="font-semibold text-neutral-500 text-xs uppercase mt-1 ml-1">
            cup
          </span>
        </h2>
      </div>
      <div
        className={`w-full h-3 absolute bottom-0 rounded-b-xl border border-neutral-300`}
        style={{ backgroundColor: color }}
      ></div>
    </div>
  );
};

export default TinaCard;
