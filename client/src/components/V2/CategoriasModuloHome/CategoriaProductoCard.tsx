import { useState } from "react";
import { Sabor } from "../../../types/General.types";
import Cart2SVG from "../../SVG/Cart2SVG";
import Imagen from "../Imagen";
import BotonesMasMenos from "../Potes/BotonesMasMenos";
import { useCarritoStore } from "../../../Stores/CarritoStore";
import { agregarProductoAlCarrito } from "../../../hooks/AgregarProductosCarrito";
import { getCantidad } from "../../../utils/util";
import PrecioCambioMoneda from "../Recomendado/PrecioCambioMoneda";

const CategoriaProductoCard = ({ sabor }: { sabor: Sabor }) => {
  const [showButtons, setShowButtons] = useState(false);
  const { setProductosCarrito, productosCarrito } = useCarritoStore();
  const cantidad = getCantidad(productosCarrito, sabor);

  return (
    <div
      key={sabor.id_sabor}
      className="bg-neutral-300 shadow-md flex rounded-xl h-fit min-h-[148px] relative"
      onMouseLeave={() => setShowButtons(false)}
    >
      {cantidad > 0 && (
        <div className="absolute top-0 right-[80px] bg-slate-700 text-2xl font-bold text-white rounded-b-xl w-12 h-8 aspect-square flex justify-center items-center">
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

      <div className="pl-4 pt-4 w-52 flex flex-col justify-between">
        <h2 className="text-slate-800 font-bold leading-4 mb-2">
          {sabor?.nombre_sabor}
        </h2>
        <p className="font-bold text-xs  text-slate-700 mb-4 leading-4 h-fit">
          {sabor?.description?.length > 10
            ? sabor?.description
            : "Sin descripción"}
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
            {" "}
            <Cart2SVG />
          </button>
          <PrecioCambioMoneda producto={sabor} />
        </div>
      </div>
      <div className="rounded-xl w-32 m-2 h-40 overflow-hidden">
        <Imagen imagen_url={sabor.imagenes?.[0]?.ruta_image || ""} nombre={sabor?.nombre_sabor} />
      </div>
    </div>
  );
};

export default CategoriaProductoCard;
