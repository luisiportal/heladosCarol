import { useState } from "react";
import { Sabor } from "../../../types/General.types";
import Cart2SVG from "../../SVG/Cart2SVG";
import BotonesMasMenos from "./BotonesMasMenos";
import { useCarritoStore } from "../../../Stores/CarritoStore";
import { getCantidad } from "../../../utils/util";
import { agregarProductoAlCarrito } from "../../../hooks/AgregarProductosCarrito";
import PrecioChiquito from "./PrecioChiquito";

const PotesCard = ({ sabor, css }: { sabor: Sabor; css: string }) => {
  const [showButtons, setShowButtons] = useState(false);
  const { setProductosCarrito, productosCarrito } = useCarritoStore();

  const cantidad = getCantidad(productosCarrito, sabor);
  const color = `#${sabor.color}`;

  return (
    <div
      onMouseLeave={() => setShowButtons(false)}
      className={`relative bg-neutral-300 shadow-md rounded-xl pb-3 ${css}`}
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

        <img
          className="rounded-xl object-cover w-full h-28 p-0.5"
          src="/images/potes2026.webp"
          alt={sabor.nombre_sabor}
        />
      </div>
      <h2 className="font-bold flex justify-center">
        {sabor.nombre_sabor.replace("Pote", "")}
      </h2>

      <div className="flex justify-between m-1">
        {" "}
        <PrecioChiquito producto={sabor} />{" "}
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
          className={`transition-all duration-500  bg-slate-700 text-white rounded-xl w-12 h-8 flex justify-center items-center ${
            showButtons ? "opacity-0 invisible" : "opacity-100"
          }`}
        >
          {" "}
          <Cart2SVG />
        </button>
      </div>
      <div
        className={`w-full h-3 absolute bottom-0 rounded-b-xl border border-neutral-300`}
        style={{ backgroundColor: color }}
      ></div>
    </div>
  );
};

export default PotesCard;
