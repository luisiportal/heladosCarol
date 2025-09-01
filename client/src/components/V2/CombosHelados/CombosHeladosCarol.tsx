import { useState } from "react";
import { Sabor } from "../../../types/General.types";
import TituloModulo from "../DesingSystem/TituloModulo";
import Cart2SVG from "../../SVG/Cart2SVG";
import Imagen from "../Imagen";
import BotonesMasMenos from "../Potes/BotonesMasMenos";

const CombosHeladosCarol = ({ combos }: { combos: Sabor[] }) => {
  const [showButtons, setShowButtons] = useState(false);
  const [cantidad, setCantidad] = useState(0);

  return (
    <section className="mt-10">
      {" "}
      <TituloModulo titulo="Combos Helados Carol" />
      <div className="flex justify-center flex-wrap gap-4 w-full pb-2">
        {combos.map((sabor) => (
          <div
            key={sabor.id_sabor}
            className="bg-neutral-300 shadow-md flex rounded-xl w-full h-fit min-h-[148px]"
          >
            <div
              className={`absolute right-2 top-2 transition-all duration-500 ${
                showButtons ? "opacity-100" : "opacity-0"
              }`}
            >
              <BotonesMasMenos
                mas={() => {
                  setCantidad(cantidad + 1);
                }}
                menos={() =>
                  setCantidad(cantidad > 0 ? cantidad - 1 : cantidad)
                }
              />
            </div>
            <div className="pl-4 pt-4 w-60 flex flex-col justify-between">
              <p className="font-bold text-xs  text-slate-700 mb-4 leading-4 h-fit">
                {sabor.description}
              </p>
              <div className="flex gap-5 items-center mb-2">
                {" "}
                <button
                  onClick={() => {
                    setCantidad(cantidad + 1);
                    setShowButtons(true);
                  }}
                  title="Comprar"
                  className={`transition-all duration-500 bg-slate-700 text-white rounded-xl w-16 h-10 flex justify-center items-center ${
                    showButtons ? "opacity-0" : "opacity-100"
                  }`}
                >
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
              <Imagen
                imagen_url={sabor?.ruta_image}
                nombre={sabor?.nombre_sabor}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CombosHeladosCarol;
