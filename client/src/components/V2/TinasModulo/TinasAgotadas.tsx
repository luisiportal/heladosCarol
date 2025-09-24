import React from "react";
import ImagenModuloAgotados from "./ImagenModuloAgotados";
import TituloModulo from "../DesingSystem/TituloModulo";

const TinasAgotadas = () => {
  return (
    <>
      <TituloModulo titulo="Tinas de Helados Carol" />
      <div className="relative h-72 flex justify-center">
        <ImagenModuloAgotados imagen="tina2.jpg"   css="translate-x-10" />
        <ImagenModuloAgotados imagen="2.webp" css="translate-x-0 translate-y-8" />
        <ImagenModuloAgotados imagen="tina3.jpg" css="-translate-x-10 translate-y-16" />
        <div className="absolute left-1/2  top-28 -translate-x-1/2  p-2 font-bold text-white text-2xl bg-red-500 rounded-xl w-60 text-center">
          Agotadas por Hoy
          <h4 className="font-light text-xs text-right">volvemos mañana...</h4>
        </div>
      </div>
    </>
  );
};

export default TinasAgotadas;
