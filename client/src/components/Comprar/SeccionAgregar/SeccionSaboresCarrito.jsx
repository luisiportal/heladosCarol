import React, { useState } from "react";
import ProductoCarrito from "../../Ventas/ProductoCarrito";
import Loader from "../../Utilidades/Loader";
import Btn_Huellas from "../../Btn_Huellas";
import ArrowRight from "../../SVG/ArrowRight";
import { useNavigate } from "react-router-dom";

const SeccionSaboresCarrito = ({
  carrito,
  loader,
  setCarrito,
  setNavegacion,
}) => {
  const navigate = useNavigate();
  let totalLocal = 0;
  if (carrito) {
    totalLocal = carrito.reduce(
      (sum, producto) => sum + producto.precio_venta * producto.cantidad,
      0
    );
    totalLocal = Math.round(totalLocal * 10) / 10;

  }

  return (
    <div>
      {loader && <Loader />}
      {carrito &&
        carrito.map((sabor) => {
          let totalSabor =
            Number(sabor.cantidad) * Number(sabor.precio_venta);
            totalSabor = Math.round(totalSabor * 10) / 10;
          const miArray = [16, 32, 40];
          const indiceAleatorio = Math.floor(Math.random() * miArray.length);
          const right = miArray[indiceAleatorio];
    
          
          
          return (
            <ProductoCarrito
              sabor={sabor}
              key={sabor.id_sabor}
              setCarrito={setCarrito}
              carrito={carrito}
              total_sabor={totalSabor}
              right={right}
            />
          );
        })}
      <div className="flex  justify-end">
        <h2 className="p-2 font-semibold text-slate-800">
          Total a pagar : {totalLocal} USD
        </h2>
        {carrito.length > 0 && (
          <div className="flex  items-center  bg-fresa rounded w-28">
            <Btn_Huellas
              text={`Entrega`}
              disbledText={"Sin productos"}
              disabled={carrito.length ? false : true}
              onclick={() => setNavegacion(2)}
            />
            <ArrowRight />
          </div>
        )}
      </div>
    </div>
  );
};

export default SeccionSaboresCarrito;
