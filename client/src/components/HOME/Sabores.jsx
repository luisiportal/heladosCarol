import React, { useEffect, useState } from "react";
import FondoSabor from "./Sabores/FondoSabor";

import DerretidoVainilla2 from "../apariencia/DerretidoVainilla2";
import SeccionComprar from "./Sabores/SeccionComprar";

import Loader from "../Utilidades/Loader";
import { useSabores } from "../../context/SaboresProvider";
import { useAuth } from "../../context/AuthContext";
import ShareButtonFB from "../Social/ShareButtonFB";
import { useNavigate } from "react-router-dom";
import Tinas from "./Tinas";
import Social from "../Social/Social";

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
  const navigate = useNavigate();
  const nombreSaboresMap = sabores
    .filter((sabor) => sabor.existencia > 0)
    .map((sabor) => sabor.nombre_sabor);

  const nombreSabores = nombreSaboresMap.filter((sabor) => sabor !== false);

  const potes = sabores.filter((item) => !item.nombre_sabor.includes("Tina"));

  const tinas = sabores.filter((item) => item.nombre_sabor.includes("Tina"));

  
  const sinPote = potes.map((item) => ({
    nombre_sabor: item.nombre_sabor.replace("Pote", "").trim(),
    color: item.color,
    existencia: item.existencia,
  }));
  return (
    <>
      <div className="bg-neutral-200 rounded-lg mt-4 pt-4">
        <section className="flex items-center justify-between">
          <div className="w-44">
            {sinPote.map(
              (sabor, index) =>
                sabor.existencia > 0 && (
                  <div key={index}>
                    <FondoSabor
                      color={sabor.color}
                      sabor={sabor.nombre_sabor}
                      width={"sabor" + (index + 1)}
                      navigate={navigate}
                    />
                    <div className={`relative bottom-4 izquierda${index}`}>
                      <DerretidoVainilla2 color={"#" + sabor.color} />
                    </div>
                  </div>
                )
            )}
          </div>
          <div>
            <SeccionComprar sabor={sabores[0] ?? ""} navigate={navigate} />
          </div>
        </section>
        <h2 className="flex justify-center font-irish text-2xl py-2">
          <Social sabores={nombreSabores}></Social>
          
        </h2>

        {loader && (
          <div>
            <span>Esperando los sabores</span>
            <Loader />
          </div>
        )}
      </div>
      <section>
        <Tinas tinas={tinas} />
      </section>
    </>
  );
};

export default Sabores;
