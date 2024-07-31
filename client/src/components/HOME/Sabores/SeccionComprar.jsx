import React, { useState } from "react";
import PoteHelado from "./PoteHelado";
import BTN from "./BTN";

import { useNavigate } from "react-router-dom";

const SeccionComprar = () => {
  const navigate = useNavigate();

  return (
    <section className="w-40 pt-12 mr-4">
      <div className="flex justify-center">
        <PoteHelado />
      </div>
      <h2 className="flex justify-center text-slate-700 text-xs">
        Precio: 0.90 USD
      </h2>
      <h2 className="flex justify-center text-xs text-slate-700">
        Capacidad: 12 OZ
      </h2>
     <div className="flex justify-center"> <button onClick={() => navigate("/comprar")}>
        <BTN />
      </button></div>
    </section>
  );
};

export default SeccionComprar;
