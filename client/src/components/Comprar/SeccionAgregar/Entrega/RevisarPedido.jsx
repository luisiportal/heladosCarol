import React, { useState } from "react";
import FacturaCard from "../../../Ventas/FacturaCard";
import MostrarErrorMessage from "../../../ValidacionForm/MostrarErrorMessage";

const RevisarPedido = ({ carrito, entrega, setNavegacion,errors,setModalActivo,file,setFile }) => {





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
      <input
        name="factura_image"
        type="file"
        onChange={(e) => {
          var file = file || e.target.files[0],
            pattern = /^image/,
            reader = new FileReader();
          if (file.size > 2000000) {
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
      <MostrarErrorMessage campo={"ruta_image"} errors={errors} />
    </div>
  );
};

export default RevisarPedido;
