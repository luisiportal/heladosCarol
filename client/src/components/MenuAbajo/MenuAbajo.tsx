import React from "react";
import CartSVG from "../SVG/CartSVG";
import HomeSVG from "../SVG/HomeSVG";
import CallSVG from "../SVG/CallSVG";
import { useNavigate } from "react-router-dom";

const MenuAbajo = () => {
  const navigate = useNavigate();

  return (
    <div className="z-50 flex justify-center items-center gap-14 text-white  bg-fresa h-24 fixed bottom-0 mx-auto menuAbajo ">
      <button onClick={() => navigate("/")} title="home" className="mt-8">
        <HomeSVG />
      </button>

      <button
        onClick={() => navigate("/comprar")}
        title="cart"
        className="bg-[#f9a217] rounded-full w-14 h-16 flex justify-center items-center"
      >
        <CartSVG />
      </button>
      <button
        onClick={() => navigate("/contacto")}
        title="call"
        className="mt-8"
      >
        <CallSVG css={"w-10 h-10"} />
      </button>
    </div>
  );
};

export default MenuAbajo;
