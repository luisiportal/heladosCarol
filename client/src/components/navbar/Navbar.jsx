import React from "react";
import ElementoNavbar from "./ElementoNavbar.jsx";

const Navbar = ({ hidden }) => {
  return (
    <div className={`${hidden} m-4 md:m-0 lg:flex md:ml-8 font-semibold`}>
      <ElementoNavbar nombre={"Inicio"} href={"/"}></ElementoNavbar>
      <ElementoNavbar nombre={"Sabores"} href={"/sabores"}></ElementoNavbar>

      <ElementoNavbar
        nombre={"Movimientos"}
        href={"/movimientos"}
      ></ElementoNavbar>

      <ElementoNavbar nombre={"Tipo Cambio"} href={"/cambio"}></ElementoNavbar>
      <ElementoNavbar
        nombre={"Facturas"}
        href={"/transacciones"}
      ></ElementoNavbar>

      
        <ElementoNavbar
          nombre={"Plantilla"}
          href={"/trabajador/plantilla"}
        ></ElementoNavbar>
     

      <ElementoNavbar nombre={"Logs"} href={"/logs"}></ElementoNavbar>
    </div>
  );
};

export default Navbar;
