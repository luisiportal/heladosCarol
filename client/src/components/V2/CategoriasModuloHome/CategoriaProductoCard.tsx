import { useEffect, useState } from "react";
import { Sabor } from "../../../types/General.types";
import Cart2SVG from "../../SVG/Cart2SVG";
import Imagen from "../Imagen";
import BotonesMasMenos from "../Potes/BotonesMasMenos";
import { useCarritoStore } from "../../../Stores/CarritoStore";
import { agregarProductoAlCarrito } from "../../../hooks/AgregarProductosCarrito";

const CategoriaProductoCard = ({ sabor }: { sabor: Sabor }) => {
  const { setProductosCarrito, productosCarrito } = useCarritoStore();
  const [showButtons, setShowButtons] = useState(false);
  const [cantidad, setCantidad] = useState(0);

  const saborExiste = productosCarrito?.find(
    (item) => item?.producto?.id_sabor === sabor.id_sabor
  );
  useEffect(() => {
    setCantidad(saborExiste?.cantidad || 0);
  }, []);

  return (
    <div
      key={sabor.id_sabor}
      className="bg-neutral-300 shadow-md flex rounded-xl w-full h-fit min-h-[148px] relative"
      onMouseLeave={() => setShowButtons(false)}
    >
      {cantidad > 0 && (
        <div className="absolute top-0 right-[130px] bg-slate-700 text-2xl font-bold text-white rounded-b-xl w-12 h-8 aspect-square flex justify-center items-center">
          <h2>{cantidad}</h2>
        </div>
      )}
      <div
        className={`absolute right-2 top-2 transition-all duration-500 ${
          showButtons ? "opacity-100" : "opacity-0"
        }`}
      >
        <BotonesMasMenos
          mas={() => {
            setCantidad(cantidad + 1);
            agregarProductoAlCarrito({
              producto: sabor,
              cantidad: cantidad + 1,
              productosCarrito,
              setProductosCarrito,
            });
          }}
          menos={() => setCantidad(cantidad > 0 ? cantidad - 1 : cantidad)}
        />
      </div>

      <div className="pl-4 pt-4 w-60 flex flex-col justify-between">
        <h2 className="text-slate-800 font-bold leading-4 mb-2">
          {sabor?.nombre_sabor}
        </h2>
        <p className="font-bold text-xs  text-slate-700 mb-4 leading-4 h-fit">
          {sabor.description}
        </p>
        <div className="flex gap-5 items-center mb-2">
          {" "}
          <button
            onClick={() => {
              setCantidad(cantidad + 1);
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
              showButtons ? "opacity-0" : "opacity-100"
            }`}
          >
            {" "}
            <Cart2SVG />
          </button>
          <h2 className="font-bold text-4xl flex mb-1">
            {parseInt(String(sabor?.precio_venta_cup))}
            <span className="font-semibold text-neutral-500 text-sm uppercase mt-1 ml-1">
              cup
            </span>
          </h2>
        </div>
      </div>
      <div className="rounded-xl w-32 p-2 h-40 overflow-hidden">
        <Imagen imagen_url={sabor?.ruta_image} nombre={sabor?.nombre_sabor} />
      </div>
    </div>
  );
};

export default CategoriaProductoCard;
