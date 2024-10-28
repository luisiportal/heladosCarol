import React, { useState } from "react";
import FacturaCard from "../../../Ventas/FacturaCard";
import MostrarErrorMessage from "../../../ValidacionForm/MostrarErrorMessage";
import { grandTotalFactura } from "../../../../utils/grandTotalFactura";

const RevisarPedido = ({ carrito, entrega, errors, file }) => {
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

  const total = grandTotalFactura(factura.total_venta, factura.entrega.envio);

  return (
    <div>
      <FacturaCard factura={factura} total={total} file={file} />

      <div className="flex flex-col  justify-center text-slate-600 gap-2">
        <h2 className="font-semibold text-slate-700 flex justify-center">
          Pasos para realizar Pago
        </h2>
        <h4>
          1- Enviar <span className="font-bold">{total.toFixed(2)} USD</span>{" "}
          por <span className="font-bold">Zelle</span> al correo
        </h4>
        <span className="font-semibold text-slate-800  flex justify-center">
          heladoscarol@gmail.com
        </span>

        <p>
          Una vez que recibamos la confirmación de su pago su orden será
          aceptada y procesada.
        </p>
        <h4>Gracias por elegirnos</h4>
      </div>
      <MostrarErrorMessage campo={"ruta_image"} errors={errors} />
    </div>
  );
};

export default RevisarPedido;
