import React, { useEffect, useState } from "react";
import FondoSabor from "./Sabores/FondoSabor";

import DerretidoVainilla2 from "../apariencia/DerretidoVainilla2";
import SeccionComprar from "./Sabores/SeccionComprar";

import Loader from "../Utilidades/Loader";
import { useSabores } from "../../context/SaboresProvider";
import { useAuth } from "../../context/AuthContext";

const Sabores = () => {

  const { loadSabores, sabores } = useSabores();
  const { loader, setLoader, isOnline } = useAuth();

 

  useEffect(() => {
    const cargarSabores = async () => {
      setLoader(true);
      await loadSabores();
      setLoader(false);
    };
    cargarSabores();
  }, []);


 

  return (
    <div className="bg-neutral-200 rounded-lg mt-4">
      <h2 className="flex justify-center font-irish text-2xl py-2">
        
      </h2>
      <section className="flex items-center justify-between">
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
        <div>
          <SeccionComprar sabor={sabores[0]} />
        </div>
      </section>
      {loader && <div>
        <span>Esperando los sabores</span>
        <Loader /></div>}
    </div>
  );
};

export default Sabores;
