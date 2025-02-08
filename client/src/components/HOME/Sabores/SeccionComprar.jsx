import React, { useState } from "react";
import PoteHelado from "./PoteHelado";
import BTN_Comprar from "./BTN_Comprar";

const SeccionComprar = ({ sabor }) => {
  return (
    <section className="w-40 pt-12 mr-4">
      <div className="flex justify-center mb-2">
        <PoteHelado />
      </div>
      <h2 className="flex justify-center text-slate-800 font-semibold  text-xs mb-2">
        {sabor.precio_venta ?? ""} USD | {sabor.envase ?? ""}
      </h2>
      <h2 className="flex justify-center text-slate-800 font-semibold  text-xs mb-2">
        {Number(sabor.precio_venta_cup).toFixed(0) ?? ""} CUP | {sabor.envase ?? ""}
      </h2>
      <h2 className="flex justify-center text-xs text-slate-700"></h2>
      <div className="flex justify-center">
      <BTN_Comprar color={"#e188b5"}/>
      </div>
    </section>
  );
};

export default SeccionComprar;
