import React, { useEffect, useState } from "react";
import HomeSVG from "../SVG/HomeSVG";
import CartSVG from "../SVG/CartSVG";
import CallSVG from "../SVG/CallSVG";

const ItemPublicos = ({ navigate, carrito }) => {
  const [cantCarrito, setCantCarrito] = useState(0);

  useEffect(() => {
    setCantCarrito(carrito.length);
  }, [carrito]);
console.log(carrito);

  return (
    <>
      {" "}
      <button
        onClick={() => navigate("/")}
        title="home"
        className="mt-6 flex flex-col items-center"
      >
        <HomeSVG css={"w-10 h-10"} />
        <h3 className="text-sm font-semibold">Inicio</h3>
      </button>
      <button
        onClick={() => navigate("/comprar")}
        title="cart"
        className="relative bg-[#f9a217] rounded-full w-16 h-16 flex justify-center items-center shadow-md"
      >
        <CartSVG />
        <h3 className="absolute right-2 top-8 bg-slate-700 rounded-full p-2 w-6 h-6 flex justify-center items-center font-bold">
          {cantCarrito}
        </h3>
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
