import React, { useEffect, useState } from "react";
import ProductoCarrito from "../../Ventas/ProductoCarrito";
import Loader from "../../Utilidades/Loader";
import Btn_Huellas from "../../Btn_Huellas";
import ArrowRight from "../../SVG/ArrowRight";
import { useNavigate } from "react-router-dom";
import {
  readLocalStorage,
  writeLocalStorage,
} from "../../../hooks/useLocalStorage";

const SeccionSaboresCarrito = ({
  carritoLocal,
  carrito,
  loader,
  setCarrito,
  setNavegacion,
  metoPago,
}) => {
  const navigate = useNavigate();
  let totalLocal = 0;
  if (carrito) {
    totalLocal = carrito.reduce(
      (sum, producto) => sum + producto.precio_venta * producto.cantidad,
      0
    );
  }

  useEffect(() => {
    const carritoLocal = readLocalStorage("sabores");
  
    if (carritoLocal && carritoLocal[0]?.metoPago == metoPago) {
      setCarrito(carritoLocal);
    } else {
      setCarrito([]);
    }
  }, []);

  return (
    <div>
      {loader && <Loader />}
      {carrito &&
        carrito.map((sabor) => {
          let totalSabor = Number(sabor.cantidad) * Number(sabor.precio_venta);

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
              carritoLocal={carritoLocal}
              metoPago={metoPago}
            />
          );
        })}
      <div className="flex  justify-end">
        <h2 className="p-2 font-semibold text-slate-800">
          Total a pagar : {totalLocal.toFixed(2)}{" "}
          {metoPago == "CUP" ? "CUP" : "USD"}
        </h2>
        {carrito.length > 0 && (
          <div className="flex  items-center  bg-fresa rounded w-28">
            <Btn_Huellas
              text={`Entrega`}
              disbledText={"Sin productos"}
              disabled={carrito.length ? false : true}
              onclick={() => {
                writeLocalStorage("sabores", carrito);

                setNavegacion(2);
              }}
            />
            <ArrowRight />
          </div>
        )}
      </div>
    </div>
  );
};

export default SeccionSaboresCarrito;
