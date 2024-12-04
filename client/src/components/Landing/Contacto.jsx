import React from "react";
import TituloPagina from "./TituloPagina";
import Telefono from "../Contacto/Telefono";

const Contacto = () => {
  return (
    <div className="pt-16">
      <div className="px-6 m-4 pb-6 pt-2  text-slate-600 text-justify bg-white shadow-md rounded-xl ">
        <TituloPagina titulo={"Contactos"} />

        <a href="mailto:heladoscarol@gmail.com">
          Puede contactarnos mediante el correo{" "}
          <span className="font-semibold">heladoscarol@gmail.com</span>
        </a>
        <section className="flex flex-col items-center mt-4">
          {" "}
          <h2 className="text-lg font-semibold">Teléfonos</h2>
          <Telefono numero={"5355081161"} />
          <Telefono numero={"5355079490"} />
        </section>
      </div>
    </div>
  );
};

export default Contacto;
