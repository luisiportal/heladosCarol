import React from "react";

const TotalFactura = ({ factura }) => {
  return (
    <div className="bg-neutral-100 w-2/5 rounded-xl p-2 flex flex-col  justify-center items-center">
      
      <h2>Total </h2>
      <h2>{Number(factura.total_venta) + Number(factura.entrega.envio)} USD</h2>
    </div>
  );
};

export default TotalFactura;
