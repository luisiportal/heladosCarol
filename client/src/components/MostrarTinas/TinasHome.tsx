import React from "react";
import { Sabor } from "../../types/General.types";
import BTN_Comprar from "../HOME/Sabores/BTN_Comprar";

interface ImportMetaEnv {
  readonly VITE_BACKEND_URL: string;
  // Otras variables de entorno que quieras definir
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

const TinasHome = ({ tinas }: { tinas: Sabor[] }) => {
  const sinTina = tinas.map((item) => ({
    nombre_sabor: item.nombre_sabor.replace("Tina", "").trim(),
    color: item.color,
    existencia: item.existencia,
    precio_venta: item.precio_venta,
    precio_venta_cup: item.precio_venta_cup,
    ruta_image: item.ruta_image,
    home_img: item.home_img,
  }));

  return (
    <div className="flex flex-wrap gap-2 justify-center bg-neutral-200 p-2">
      {sinTina.map((tina, index) => (
        <section
          key={index}
          className="w-44 flex flex-col text-neutral-950 border-2 bg-white rounded-lg hover:border-fresa transition-colors duration-500"
        >
          <div title="imagen contendor" className="relative h-32">
            <picture className="z-10">
              <img
                className="w-full h-32 object-center object-cover  rounded-t-lg z-10 shadow-lg"
                src={`${import.meta.env.VITE_BACKEND_URL}/images/productos/${
                  tina.ruta_image
                }`}
                alt={tina.nombre_sabor}
              />
            </picture>
            <h2
              className={`absolute top-0 left-0 font-bold text-sm text-white p-1 rounded-br-lg rounded-tl-lg bg-fresa`}
            >
              Tinas 4L
            </h2>
          </div>
          <div className="flex justify-between py-2 px-2 font-bold first-letter:bold text-neutral-950 text-xs">
            <h2 className="">{tina.precio_venta} USD</h2>

            <h2>{tina.precio_venta_cup} CUP</h2>
          </div>
          <div
            title="contendor propiedades"
            className="flex flex-col flex-1"
          ></div>

          <h2 className="font-irish flex justify-center text-md px-2 py-1 pb-2">
            {tina.nombre_sabor}
          </h2>

          <div className="flex justify-center p-2">
            <BTN_Comprar color="#e188b5" />
          </div>
        </section>
      ))}
    </div>
  );
};

export default TinasHome;
