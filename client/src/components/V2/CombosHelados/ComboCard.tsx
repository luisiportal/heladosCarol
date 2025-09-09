import { useState } from "react";
import { useCarritoStore } from "../../../Stores/CarritoStore";
import { getCantidad } from "../../../utils/util";
import Cart2SVG from "../../SVG/Cart2SVG";
import Imagen from "../Imagen";
import BotonesMasMenos from "../Potes/BotonesMasMenos";
import { Sabor } from "../../../types/General.types";
import { agregarProductoAlCarrito } from "../../../hooks/AgregarProductosCarrito";
import PrecioCambioMoneda from "../Recomendado/PrecioCambioMoneda";

const ComboCard = ({ sabor }: { sabor: Sabor }) => {
  const { setProductosCarrito, productosCarrito } = useCarritoStore();
  const [showButtons, setShowButtons] = useState(false);

  //const length = sabor?.imagenes?.length || 0;

  //const randomIndex = Math.floor(Math.random() * length);

  const cantidad = getCantidad(productosCarrito, sabor);
  return (
    <div
      onMouseLeave={() => setShowButtons(false)}
      key={sabor.id_sabor}
      className="bg-neutral-300 shadow-md flex rounded-xl w-full h-fit min-h-[148px] relative"
    >
      <div className="pl-4 pt-4 w-60 flex flex-col justify-between">
        <p className="font-bold text-xs  text-slate-700 mb-4 leading-4 h-fit">
          {sabor.description}
        </p>
        <div className="flex gap-5 items-center mb-2">
          {" "}
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
            className={`transition-all duration-500 bg-slate-700 text-white rounded-xl w-16 h-10 flex justify-center items-center ${
              showButtons ? "opacity-0 invisible" : "opacity-100"
            }`}
          >
            <Cart2SVG />
          </button>
          <PrecioCambioMoneda producto={sabor} />
        </div>
      </div>
      <div className="relative w-full">
        {cantidad > 0 && (
          <div className="absolute top-3 left-1 bg-slate-700 text-2xl font-bold text-white rounded-r-xl w-12 h-8 aspect-square flex justify-center items-center">
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

        <div className="rounded-xl w-full ml-1 h-40 overflow-hidden">
          <Imagen
            imagen_url={sabor?.imagenes?.[0]?.ruta_image ?? ""}
            nombre={sabor?.nombre_sabor}
          />
        </div>
      </div>
    </div>
  );
};

export default ComboCard;
