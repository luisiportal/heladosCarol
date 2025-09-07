import React, { useState } from "react";
import { Sabor } from "../../../types/General.types";
import Cart2SVG from "../../SVG/Cart2SVG";
import { agregarProductoAlCarrito } from "../../../hooks/AgregarProductosCarrito";
import BotonesMasMenos from "../Potes/BotonesMasMenos";
import { getCantidad } from "../../../utils/util";
import { useCarritoStore } from "../../../Stores/CarritoStore";
import Imagen from "../Imagen";
import PrecioChiquito from "../Potes/PrecioChiquito";

const TinaCard = ({ sabor, css }: { sabor: Sabor; css: string }) => {
  const [showButtons, setShowButtons] = useState(false);
  const { setProductosCarrito, productosCarrito } = useCarritoStore();

  const cantidad = getCantidad(productosCarrito, sabor);
  const color = `#${sabor.color}`;

  return (
    <div
      onMouseLeave={() => setShowButtons(false)}
      className={`relative shadow-md bg-neutral-300 rounded-xl overflow-hidden min-h-[230px] pb-3 ${css}`}
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
              showButtons ? "opacity-100" : "opacity-0 invisible"
            }`}
          >
            <BotonesMasMenos
              mas={() => {
                agregarProductoAlCarrito({
                  producto: sabor,
                  cantidad: cantidad + 1,
                  productosCarrito,
                  setProductosCarrito,
                });
              }}
              menos={() =>
                agregarProductoAlCarrito({
                  producto: sabor,
                  cantidad: cantidad > 0 ? cantidad - 1 : cantidad,
                  productosCarrito,
                  setProductosCarrito,
                })
              }
            />
          </div>
        </>

        <button
          onClick={() => {
            agregarProductoAlCarrito({
              producto: sabor,
              cantidad: cantidad + 1,
              productosCarrito,
              setProductosCarrito,
            });
            setShowButtons(true);
          }}
          title="Comprar"
          className={`transition-all duration-500 absolute top-[60%] left-1/2 transform -translate-x-1/2  -translate-y-1/2 bg-slate-700 text-white rounded-xl w-14 h-8 flex justify-center items-center ${
            showButtons ? "opacity-0 invisible" : "opacity-100"
          }`}
        >
          {" "}
          <Cart2SVG />
        </button>

        <div className="rounded-xl object-cover w-full h-32 p-0.5 overflow-hidden">
          <Imagen
            nombre={sabor.nombre_sabor}
            imagen_url={`${sabor?.imagenes?.[0]?.ruta_image}`}
          />
        </div>
      </div>
      <div className="flex flex-col justify-between min-h-[80px]">
        {" "}
        <h2 className="font-bold flex justify-center h-fit leading-4 px-2 pt-2 text-slate-800/80">
          {sabor.nombre_sabor}
        </h2>
        <PrecioChiquito producto={sabor} />
      </div>
      <div
        className={`w-full h-3 absolute bottom-0 rounded-b-xl border border-neutral-300`}
        style={{ backgroundColor: color }}
      ></div>
    </div>
  );
};

export default TinaCard;
