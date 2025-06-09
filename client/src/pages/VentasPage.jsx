import React from "react";
import ResumenVenta from "../components/Ventas/ResumenVenta";
import { getTodosFacturasRequest } from "../api/venta.api";

const VentasPage = () => {
  return (
    <section>
      <ResumenVenta getFacturas={getTodosFacturasRequest} />
    </section>
  );
};

export default VentasPage;
