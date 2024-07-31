import React, { useEffect, useState } from "react";
import FondoSabor from "./Sabores/FondoSabor";

import DerretidoVainilla2 from "../apariencia/DerretidoVainilla2";
import SeccionComprar from "./Sabores/SeccionComprar";
import { useSabores } from "../../context/SaboresProvider";

const Sabores = () => {
  const { loadSabores, sabores } = useSabores();
  const [comprando, setComprando] = useState(0);

  useEffect(() => {
    loadSabores();
  }, []);

  return (
    <div className="bg-neutral-200 rounded-lg mx-2">
      <h2 className="flex justify-center font-inspiration text-4xl py-2">
        Sabores
      </h2>
      <section className="flex justify- items-center">
        <div className="w-44">
          {sabores.map(
            (sabor, index) =>
              sabor.existencia > 0 && (
                <div key={index}>
                  <FondoSabor
                    color={"bg-" + sabor.color}
                    sabor={sabor.nombre_sabor}
                    width={"sabor" + (index + 1)}
                  />
                  <div className={`relative bottom-4 izquierda${index}`}>
                    <DerretidoVainilla2 color={"#" + sabor.color} />
                  </div>
                </div>
              )
          )}
        </div>
        <SeccionComprar />
      </section>
    </div>
  );
};

export default Sabores;
