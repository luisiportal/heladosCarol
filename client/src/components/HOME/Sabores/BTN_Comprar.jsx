import React from "react";
import { useNavigate } from "react-router-dom";
import BTN from "./BTN";
import { useCarritos } from "../../../context/CarritosContext";

const BTN_Comprar = ({ color, producto }) => {
  const { carrito, setCarrito } = useCarritos();

  const navigate = useNavigate();
  
  return (
    <button
      onClick={() => {
        if (
          producto &&
          !carrito.some((sabor) => sabor.nombre_sabor === producto.nombre_sabor)
        ) {
          setCarrito((prevCarrito) => [
            ...prevCarrito,
            {
              cantidad: 1,
              id_sabor: producto.id_sabor,
              nombre_sabor: producto.nombre_sabor,
              color: producto.color,
              precio_venta: producto.precio_venta,
              precio_venta_cup: producto.precio_venta_cup,
            },
          ]);
          
        }

        navigate("/comprar");
      }}
    >
      <BTN color={color} />
    </button>
  );
};

export default BTN_Comprar;
