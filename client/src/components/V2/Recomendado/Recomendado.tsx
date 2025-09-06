import React, { useState } from "react";
import TituloModulo from "../DesingSystem/TituloModulo";
import Cart2SVG from "../../SVG/Cart2SVG";
import { Sabor } from "../../../types/General.types";
import Imagen from "../Imagen";
import BotonesMasMenos from "../Potes/BotonesMasMenos";
import { getCantidad } from "../../../utils/util";
import { useCarritoStore } from "../../../Stores/CarritoStore";
import { agregarProductoAlCarrito } from "../../../hooks/AgregarProductosCarrito";
import { useMonedaStore } from "../../../Stores/MonedaStore";
import PrecioCambioMoneda from "./PrecioCambioMoneda";

const Recomendado = ({ producto }: { producto: Sabor }) => {
  const [showButtons, setShowButtons] = useState(false);
  const { setProductosCarrito, productosCarrito } = useCarritoStore();
  const { moneda } = useMonedaStore();

  const cantidad = getCantidad(productosCarrito, producto);

  return (
    <div className="-mt-10">
      <TituloModulo titulo="Recomendado Para Ti" />

      <div
        onMouseLeave={() => setShowButtons(false)}
        className="bg-neutral-300 rounded-xl shadow-md"
      >
        <section className="flex w-full">
          <div className="w-1/2 min-h-[140px] p-2 flex flex-col justify-center items-center gap-2">
            <h2 className="text-slate-800 font-bold leading-4 mb-2">
              {producto?.nombre_sabor}
            </h2>
            <p className="font-semibold text-xs text-slate-700 mb-2 leading-4">
              {producto?.description}
            </p>
          </div>
          <div className="bg-slate-500 w-1/2 min-h-[140px] rounded-tr-xl  overflow-hidden relative">
            {cantidad > 0 && (
              <div className="absolute top-3 left-0 bg-slate-700 text-2xl font-bold text-white rounded-r-xl w-12 h-8 aspect-square flex justify-center items-center">
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
                    producto: producto,
                    cantidad: cantidad + 1,
                    productosCarrito,
                    setProductosCarrito,
                  });
                }}
                menos={() =>
                  agregarProductoAlCarrito({
                    producto: producto,
                    cantidad: cantidad > 0 ? cantidad - 1 : cantidad,
                    productosCarrito,
                    setProductosCarrito,
                  })
                }
              />
            </div>
            <Imagen
              imagen_url={producto?.imagenes?.[0].ruta_image || ""}
              nombre={producto?.nombre_sabor}
            />
          </div>
        </section>
        <section className="flex w-full">
          <div className="bg-slate-500 w-1/2 min-h-[140px] rounded-bl-xl  overflow-hidden">
            <Imagen
              imagen_url={producto?.imagenes?.[1].ruta_image || ""}
              nombre={producto?.nombre_sabor}
            />
          </div>
          <div className="w-1/2 h-40 flex gap-5 flex-col justify-center items-center">
            <PrecioCambioMoneda producto={producto} />

            <button
              onClick={() => {
                agregarProductoAlCarrito({
                  producto: producto,
                  cantidad: cantidad + 1,
                  productosCarrito,
                  setProductosCarrito,
                });
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
