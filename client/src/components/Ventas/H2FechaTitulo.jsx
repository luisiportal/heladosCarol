import React, { useState } from "react";
import FacturaCard from "./FacturaCard";
import { useNavigate } from "react-router-dom";
import EstadisticaReserva from "../Reservas/EstadisticaReserva";

const H2FechaTitulo = ({
  fecha,
  facturas,
  setFacturas,
  opciones,
  setRecargarFactura,
  setRecargar,
  recargar,
}) => {
  const navigate = useNavigate();
  const [fechaCuadre, setFechacuadre] = useState();
  const facturasMismafecha = facturas.filter(
    (factura) =>
      new Date(factura.creado).toLocaleDateString("es-ES", opciones) == fecha
  );

  const totalVentaDia = facturasMismafecha.reduce(
    (sum, factura) => sum + Number(factura.total_venta),
    0
  );

  return (
    <section className="flex flex-1 flex-col" key={fecha}>
      <h2 className="p-4">
        {fecha} Venta {totalVentaDia}
      </h2>

      {facturasMismafecha.map((factura) => {
        return (
          <FacturaCard
            moneda={factura.moneda}
            factura={factura}
            setFacturas={setFacturas}
            key={factura.id}
            setRecargarFactura={setRecargarFactura}
            recargar={recargar}
            setRecargar={setRecargar}
          />
        );
      })}
    </section>
  );
};

export default H2FechaTitulo;
