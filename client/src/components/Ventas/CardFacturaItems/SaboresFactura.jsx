import React from "react";

const SaboresFactura = ({ ventas, envio, moneda, tropiPayFee }) => {
  const precioSabor = (producto) => {
    const precio =
      moneda === "CUP"
        ? Number(producto.precio_venta_cup)
        : Number(producto.precio_venta);

    return precio;
  };
console.log(ventas);

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
          <div>
            {sabor.id_factura
              ? sabor.precio_total_sabor
              : precioSabor(sabor) * Number(sabor.cantidad)}

            {" " +moneda}
          </div>
        </div>
      ))}
      <div className="flex justify-end">
        Envio : {envio} {moneda}
      </div>
      {moneda == "EUR" && (
        <div className="flex justify-end text-xs">
          Comisión TropiPay : {Number(tropiPayFee).toFixed(2)} {moneda}
        </div>
      )}
    </div>
  );
};

export default SaboresFactura;
