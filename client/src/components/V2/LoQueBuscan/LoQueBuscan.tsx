import TituloModulo from "../DesingSystem/TituloModulo";
import Cart2SVG from "../../SVG/Cart2SVG";
import { Sabor } from "../../../types/General.types";
import { agregarProductoAlCarrito } from "../../../hooks/AgregarProductosCarrito";
import { useState } from "react";
import { getCantidad } from "../../../utils/util";
import { useCarritoStore } from "../../../Stores/CarritoStore";
import BotonesMasMenos from "../Potes/BotonesMasMenos";
import PrecioCambioMoneda from "../Recomendado/PrecioCambioMoneda";
import Imagen from "../Imagen";

const LoQueBuscan = ({ producto }: { producto: Sabor }) => {
  const { setProductosCarrito, productosCarrito } = useCarritoStore();
  const [showButtons, setShowButtons] = useState(false);

  const cantidad = getCantidad(productosCarrito, producto);

  return (
    <div>
      <TituloModulo titulo="Lo Que Buscan Nuestros Clientes" />
      <div
        onMouseLeave={() => setShowButtons(false)}
        className="bg-neutral-300 flex gap-5 rounded-xl shadow-md"
      >
        <div className="pl-5 py-5">
          <p className="font-bold text-xs text-slate-700 mb-5 leading-4">
            {producto?.description}
          </p>
          <PrecioCambioMoneda producto={producto} />
        </div>
        <div className="rounded-xl relative">
          {cantidad > 0 && (
            <div className="absolute left-0 top-4 bg-slate-700 text-2xl font-bold text-white rounded-r-xl w-12 h-8 aspect-square flex justify-center items-center">
              <h2>{cantidad}</h2>
            </div>
          )}
          <div
            className={`absolute right-3 top-3 transition-all duration-500 ${
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

          <div className="rounded-xl object-cover w-40 h-full aspect-square overflow-hidden">
            {" "}
            <Imagen
              nombre={producto?.nombre_sabor}
              imagen_url={producto?.imagenes?.[0]?.ruta_image || ""}
            />
          </div>
        </div>
      </div>
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
        className="flex shadow-md w-40 mt-5 items-center  gap-2 rounded-xl px-5 pt-1 pb-2 bg-slate-700 font-bold text-white text-xl"
      >
        Comprar{" "}
        <span className="text-white mt-2">
          <Cart2SVG />
        </span>
      </button>
    </div>
  );
};

export default LoQueBuscan;
