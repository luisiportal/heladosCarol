import React from "react";
import HomeSVG from "../SVG/HomeSVG";
import MovimientosSVG from "../SVG/MovimientosSVG";
import OpinionesSVG from "../SVG/OpinionesSVG";
import FacturasSVG from "../SVG/FacturasSVG";
import SaboresSVG from "../SVG/SaboresSVG";

const ItemsAdministrador = ({ navigate }) => {
  return (
    <div className="flex justify-around gap-4">
      <button
        onClick={() => navigate("/")}
        title="home"
        className="mt-6 flex flex-col items-center"
      >
        <HomeSVG css={"w-6 h-6"} />
        <h3 className="text-sm font-semibold">Inicio</h3>
      </button>
      <button
        onClick={() => navigate("/transacciones")}
        title="home"
        className="mt-6 flex flex-col items-center"
      >
        <FacturasSVG />
        <h3 className="text-sm font-semibold">Facturas</h3>
      </button>
      <button
        onClick={() => navigate("/movimientos")}
        title="home"
        className="mt-6 flex flex-col items-center"
      >
        <MovimientosSVG />
        <h3 className="text-sm font-semibold">Movimientos</h3>
      </button>
      <button
        onClick={() => navigate("/sabores")}
        title="home"
        className="mt-6 flex flex-col items-center"
      >
        <SaboresSVG />
        <h3 className="text-sm font-semibold">Sabores</h3>
      </button>
      <button
        onClick={() => navigate("/opiniones")}
        title="home"
        className="mt-6 flex flex-col items-center"
      >
        <OpinionesSVG />
        <h3 className="text-sm font-semibold">Opiniones</h3>
      </button>
    </div>
  );
};

export default ItemsAdministrador;
