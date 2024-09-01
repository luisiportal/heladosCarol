import React from "react";

const TotalFactura = ({ factura }) => {
  let total = Number(factura.total_venta) + Number(factura.entrega.envio);
  total = Math.round(total * 10) / 10;
  return (
    <div className="bg-neutral-100 w-2/5 rounded-xl p-2 flex flex-col  justify-center items-center">
      <h2>Total </h2>
      <h2>{total} USD</h2>
    </div>
  );
};

export default TotalFactura;
