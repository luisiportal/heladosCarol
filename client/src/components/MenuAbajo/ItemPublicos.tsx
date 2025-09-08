import React, { useEffect, useState } from "react";
import HomeSVG from "../SVG/HomeSVG";
import CallSVG from "../SVG/CallSVG";
import CarritoCantidadBoton from "./CarritoCantidadBoton";
import { Link } from "react-router-dom";

const ItemPublicos = ({ navigate, carrito }) => {
  return (
    <>
      {" "}
      <button
        onClick={() => navigate("/")}
        title="home"
        className="mt-6 flex flex-col items-center"
      >
        <HomeSVG css={"w-8 h-8"} />
        <h3 className="text-sm font-semibold">Inicio</h3>
      </button>
      <Link className="flex flex-col items-center justify-center" to={"/carrito"}>
        <CarritoCantidadBoton cantCarrito={carrito.length} />
        <h2 className="text-sm font-semibold">Pagar</h2>
      </Link>
      <button
        onClick={() => navigate("/contacto")}
        title="call"
        className="mt-6 flex flex-col items-center"
      >
        <CallSVG css={"w-10 h-10"} />
        <h3 className="text-sm font-semibold">Contacto</h3>
      </button>
    </>
  );
};

export default ItemPublicos;
