import React, { useState } from "react";
import PoteHelado from "./PoteHelado";
import BTN from "./BTN";

const SeccionComprar = ({navigate}) => {
  

  return (
    <section className="w-40 pt-12 mr-4">
      <div className="flex justify-center mb-2">
        <PoteHelado />
      </div>
      <h2 className="flex justify-center text-slate-700 text-xs">
       
      </h2>
      <h2 className="flex justify-center text-xs text-slate-700">
       
      </h2>
     <div className="flex justify-center"> <button onClick={() => navigate("/comprar")}>
        <BTN />
      </button></div>
    </section>
  );
};

export default SeccionComprar;
