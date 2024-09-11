import React, { useEffect, useState } from "react";
import { getModoCerradoRequest } from "../../api/modos.api";

const MensajeCerrado = ({ modo }) => {
  const renderModoCerrado = () => {
    if (modo.activado === true) {
      return (
        <div className="bg-neutral-200 rounded-lg mt-4 flex flex-col items-center justify-center">
          <img src="/images/cerrado.png " alt="Modo Cerrado Activado" />
          <div className="flex justify-center"><p className="p-2 font-irish">{modo.mensaje}</p></div>
        </div>
      );
    }
  };

  return renderModoCerrado();
};

export default MensajeCerrado;
