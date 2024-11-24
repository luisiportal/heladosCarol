import React from "react";
import ElementoNavbar from "./ElementoNavbar.jsx";
import { Route } from "react-router-dom";

const Navbar = ({ hidden, isAuthenticated }) => {
  return (
    <div className={`${hidden} m-4 md:m-0 lg:flex md:ml-8 font-semibold`}>
      <ElementoNavbar nombre={"Inicio"} href={"/"}></ElementoNavbar>
      <ElementoNavbar nombre={"Descripción Producto"} href={"/descripcion"}></ElementoNavbar>
      <ElementoNavbar nombre={"Historia"} href={"/historia"}></ElementoNavbar>
      <ElementoNavbar nombre={"Contacto"} href={"/contacto"}></ElementoNavbar>
      {/*<ElementoNavbar nombre={"Rastrear Orden"} href={"/ordenes/"}></ElementoNavbar>*/}
    

      {isAuthenticated && (
        <>
        <ElementoNavbar
            nombre={"Facturas"}
            href={"/transacciones"}
          ></ElementoNavbar>
           <ElementoNavbar
            nombre={"Opiniones"}
            href={"/opiniones"}
          ></ElementoNavbar>
          <ElementoNavbar nombre={"Sabores"} href={"/sabores"}></ElementoNavbar>
          <ElementoNavbar
            nombre={"Movimientos"}
            href={"/movimientos"}
          ></ElementoNavbar>
           <ElementoNavbar
            nombre={"Cambio"}
            href={"/cambio"}
          ></ElementoNavbar>
          <ElementoNavbar
            nombre={"Plantilla"}
            href={"/trabajador/plantilla"}
          ></ElementoNavbar>
         
          <ElementoNavbar nombre={"Logs"} href={"/logs"}></ElementoNavbar>
          <ElementoNavbar nombre={"Frases"} href={"/frases"}></ElementoNavbar>
          <ElementoNavbar
            nombre={"Modo Cerrado"}
            href={"/cerrado"}
          ></ElementoNavbar>
        </>
      )}
    </div>
  );
};

export default Navbar;
