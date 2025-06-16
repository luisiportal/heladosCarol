import React, { useEffect, useState } from "react";
import FondoSabor from "./Sabores/FondoSabor";

import DerretidoVainilla2 from "../apariencia/DerretidoVainilla2";
import SeccionComprar from "./Sabores/SeccionComprar";

import Loader from "../Utilidades/Loader";
import { useSabores } from "../../context/SaboresProvider";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Social from "../Social/Social";
import TinasHome from "../MostrarTinas/TinasHome";
import CombosHome from "../Combos/CombosHome";

const Sabores = () => {
  const { loadSabores, sabores } = useSabores();
  const { loader, setLoader, perfil } = useAuth();

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


  const potes = sabores.filter(
    (item) => item.categoria === "Potes" && item.existencia >= 1
  );

  const tinas = sabores.filter(
    (item) => item.categoria === "Tinas" && item.existencia >= 1
  );
  const combos = sabores.filter(
    (item) => item.categoria === "Combos" && item.existencia >= 1
  );

  const sinPote = potes.map((item) => ({
    nombre_sabor: item.nombre_sabor.replace("Pote", "").trim(),
    color: item.color,
    existencia: item.existencia,
  }));
  return (
    <>
      {sabores.length > 0 && <div className="bg-neutral-200 rounded-lg mt-4 pt-4">
        <section className="flex items-center justify-between">
          <div className="w-44">
            {sinPote.map((sabor, index) => (
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
            ))}
          </div>
          <div>
            <SeccionComprar sabor={potes[0] ?? ""} navigate={navigate} />
          </div>
        </section>
        <h2 className="flex justify-center font-irish text-2xl py-2">
        </h2>

        {loader && (
          <div>
            <span>Esperando los sabores</span>
            <Loader />
          </div>
        )}
      </div>}
      <section>
        <CombosHome combos={combos} />
        <TinasHome tinas={tinas} />
      </section>
    </>
  );
};

export default Sabores;
