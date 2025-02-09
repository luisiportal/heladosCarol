import React from "react";
import TituloPagina from "./TituloPagina";
import Telefono from "../Contacto/Telefono";
import LayoutPrincipal from "../../Layouts/LayoutPrincipal";

const Contacto = () => {
  return (
    <LayoutPrincipal>
      {" "}
      <div className="h-screen">
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
    </LayoutPrincipal>
  );
};

export default Contacto;
