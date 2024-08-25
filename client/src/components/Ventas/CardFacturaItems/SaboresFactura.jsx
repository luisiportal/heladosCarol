import React from "react";

const SaboresFactura = ({ ventas }) => {
  return (
    <div className="bg-neutral-300 rounded-xl flex flex-col justify-center p-3 w-full">
      {ventas.map((sabor) => (
        <div className="flex gap-6 justify-between">
          {" "}
          <div key={sabor.id_venta}>
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
            {sabor.precio_total_sabor ?? sabor.precio_venta * sabor.cantidad}{" "}
            USD
          </div>
        </div>
      ))}
    </div>
  );
};

export default SaboresFactura;
