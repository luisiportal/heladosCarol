import React from "react";
import CartSVG from "../SVG/CartSVG";
import HomeSVG from "../SVG/HomeSVG";
import CallSVG from "../SVG/CallSVG";
import { useNavigate } from "react-router-dom";

const MenuAbajo = () => {
  const navigate = useNavigate();

  return (
    <div className="z-50 flex justify-center items-center gap-14 text-white  bg-fresa h-24 fixed bottom-0 mx-auto menuAbajo shadow-md">
      <button onClick={() => navigate("/")} title="home" className="mt-6 flex flex-col items-center">
        <HomeSVG />
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
    </div>
  );
};

export default MenuAbajo;
