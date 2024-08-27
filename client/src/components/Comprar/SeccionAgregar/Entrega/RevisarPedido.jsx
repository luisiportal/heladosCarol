import React from "react";
import FacturaCard from "../../../Ventas/FacturaCard";

const RevisarPedido = ({ carrito, entrega, setNavegacion }) => {
  let totalLocal = 0;
  if (carrito) {
    totalLocal = carrito.reduce(
      (sum, producto) => sum + producto.precio_venta * producto.cantidad,
      0
    );
  }

  const factura = {
    ventas: carrito,
    entrega,
    total_venta: totalLocal,
  
  };

  return (
    <div>
      <h2>Productos</h2>

      <FacturaCard factura={factura} />
    </div>
  );
};

export default RevisarPedido;
