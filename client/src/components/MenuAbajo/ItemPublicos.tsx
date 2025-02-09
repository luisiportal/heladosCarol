import React from "react";
import HomeSVG from "../SVG/HomeSVG";
import CartSVG from "../SVG/CartSVG";
import CallSVG from "../SVG/CallSVG";

const ItemPublicos = ({ navigate }) => {
  return (
    <>
      {" "}
      <button
        onClick={() => navigate("/")}
        title="home"
        className="mt-6 flex flex-col items-center"
      >
        <HomeSVG css={"w-10 h-10"}/>
        <h3 className="text-sm font-semibold">Inicio</h3>
      </button>
      <button
        onClick={() => navigate("/comprar")}
        title="cart"
        className="bg-[#f9a217] rounded-full w-14 h-16 flex justify-center items-center shadow-md"
      >
        <CartSVG />
      </button>
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
