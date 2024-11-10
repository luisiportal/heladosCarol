import React from "react";
import TinaCardElement from "./TinaCardElement";
import BTN_Comprar from "./Sabores/BTN_Comprar";

const Tinas = ({ tinas }) => {
  const sinTina = tinas.map((item) => ({
    nombre_sabor: item.nombre_sabor.replace("Tina", "").trim(),
    color: item.color,
    existencia: item.existencia,
  }));
  return (
    <div className="bg-neutral-200 my-4 rounded-lg group">
      <div className="p-2">
        {" "}
        <div className="relative">
          <img
            className="rounded-lg"
            src="../images/tinahelado.jpeg"
            alt="Tina de Helado"
          />
          <img
            className="absolute top-0 left-0 w-16 h-16 m-1"
            src="../images/new.png"
            alt="Nuevo Producto"
          />
          <div className="absolute -left-1/2 overflow-hidden group-hover:left-1/2 top-1/2 -translate-x-1/2 transition-all duration-700">
            <BTN_Comprar />
          </div>
        </div>
      </div>

      <h2 className="font-irish flex justify-center pt-2">
        {tinas?.[0]?.precio_venta ?? ""} USD | 5 litros
      </h2>

      <div className="flex justify-center gap-2 flex-wrap py-4">
        {sinTina.map(
          (item, index) =>
            item.existencia > 0 && (
              <div key={index} className="">
                <TinaCardElement tina={item} />
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default Tinas;
