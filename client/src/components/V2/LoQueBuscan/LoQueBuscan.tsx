import TituloModulo from "../DesingSystem/TituloModulo";
import Cart2SVG from "../../SVG/Cart2SVG";
import { Sabor } from "../../../types/General.types";

const LoQueBuscan = ({ producto }: { producto: Sabor }) => {
  return (
    <div>
      <TituloModulo titulo="Lo Que Buscan Nuestros Clientes" />
      <div className="bg-neutral-300 flex gap-5 rounded-xl shadow-md">
        <div className="pl-5 py-5">
          <p className="font-bold text-xs text-slate-700 mb-5 leading-4">
            Cake de Maicena + 1 Tina de Helado de Chocolate
          </p>
          <h2 className="font-bold text-4xl flex mb-5">
            {parseInt(String(producto?.precio_venta_cup))}
            <span className="font-semibold text-neutral-500 text-sm uppercase mt-1 ml-1">
              cup
            </span>
          </h2>
        </div>
        <div className="rounded-xl">
          <img
            className="rounded-xl p-2 object-cover w-60 aspect-square"
            src={`${
              import.meta.env.VITE_BACKEND_URL
            }/images/productos/${producto?.ruta_image}`}
            alt=""
          />
        </div>
      </div>
      <button className="flex shadow-md w-40 mt-5 items-center  gap-2 rounded-xl px-5 pt-1 pb-2 bg-slate-700 font-bold text-white text-xl">
        Comprar{" "}
        <span className="text-white mt-2">
          <Cart2SVG />
        </span>
      </button>
    </div>
  );
};

export default LoQueBuscan;
