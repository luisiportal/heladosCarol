import React, { useState } from "react";
import FacturaCard from "../../../Ventas/FacturaCard";
import MostrarErrorMessage from "../../../ValidacionForm/MostrarErrorMessage";
import { grandTotalFactura } from "../../../../utils/grandTotalFactura";

const RevisarPedido = ({
  carrito,
  entrega,
  setNavegacion,
  errors,
  setModalActivo,
  file,
  setFile,
}) => {
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
      <FacturaCard factura={factura} total={total} />

      <div className="flex flex-col  justify-center text-slate-600 gap-2">
        <h2 className="font-semibold text-slate-700 flex justify-center">
          Pasos para realizar Pago
        </h2>
        <h4>1- Enviar <span className="font-bold">{total} USD</span> USD por <span className="font-bold">Zelle</span> al correo</h4>
        <span className="font-semibold text-slate-800  flex justify-center">
          heladoscarol@gmail.com
        </span>
        <h4>2- Realizar captura del <span className="font-bold">pago realizado por Zelle</span></h4>
        <h4>3-Subir captura del pago</h4>
        <input
          name="factura_image"
          type="file"
          onChange={(e) => {
            var file = file || e.target.files[0],
              pattern = /^image/,
              reader = new FileReader();
            if (file.size > 5000000) {
              setFile();
              return setModalActivo({
                mensaje: "La imagen es demasiado grande",
                activo: true,
                errorColor: true,
              });
            }

            if (!pattern.test(file.type)) {
              setFile();
              setModalActivo({
                mensaje: "Formato de imagen inválido",
                activo: true,
                errorColor: true,
              });

              return;
            }

            setFile(e.target.files[0]);
          }}
        />
        <p>
          Una vez que recibamos la confirmacion de su pago su orden sera
          aceptada y procesada.
        </p>
        <h4>Gracias por elegirnos</h4>
      </div>
      <MostrarErrorMessage campo={"ruta_image"} errors={errors} />
    </div>
  );
};

export default RevisarPedido;
