import React from "react";

const SaboresFactura = ({ ventas, envio,metoPago }) => {
  return (
    <div className="bg-neutral-100 rounded-xl flex flex-col justify-center p-3 w-full">
      {ventas.map((sabor, index) => (
        <div key={index} className="flex gap-6 justify-between">
          <div>
            <div className="flex justify-between">
              <div>
                <h2>
                  {sabor.cantidad}x{" "}
                  {sabor.sabore?.nombre_sabor ?? sabor.nombre_sabor}
                </h2>
              </div>
            </div>
          </div>
          <div >
            {sabor.precio_total_sabor ?? sabor.precio_venta * sabor.cantidad}
            {(metoPago == "CUP") ? " CUP" : " USD"}
          </div>
        </div>
      ))}
      <div className="flex justify-end">Envio : {envio} {(metoPago == "CUP") ? " CUP" : " USD"}</div>
    </div>
  );
};

export default SaboresFactura;
