import React from "react";
import FacturaCard from "../../../Ventas/FacturaCard";
import MostrarErrorMessage from "../../../ValidacionForm/MostrarErrorMessage";
import { grandTotalFactura } from "../../../../utils/grandTotalFactura";
import BTN_MePago from "../../../MetodosPago/BTN_MePago";
import Zelle from "../../../MetodosPago/Zelle";
import Tropipay from "../../../MetodosPago/Tropipay";

const RevisarPedido = ({ carrito, entrega, errors, file,setMetoPago,metoPago }) => {

  let totalLocal = 0;
  if (carrito) {
    totalLocal = carrito.reduce(
      (sum, producto) => sum + producto.precio_venta * producto.cantidad,
      0
    );
  }

  const handleMetoPago = (metodo) => {
    setMetoPago(metodo);
    console.log(metodo);
  };

  const factura = {
    ventas: carrito,
    entrega,
    total_venta: totalLocal,
  };

  const total = grandTotalFactura(factura.total_venta, factura.entrega.envio);

  return (
    <div>
      <FacturaCard factura={factura} total={total} file={file} />

      <h2 className="flex justify-center text-slate-700 font-semibold">
        Escoja el método de pago de su preferencia
      </h2>
      <section className="flex gap-4 justify-center mt-2">
        <BTN_MePago
          name={"Zelle"}
          imagen={"zelle.png"}
          onclick={() => handleMetoPago("Zelle")}
        />
        <BTN_MePago
          name={"TropiPay"}
          imagen={"tropipay.jpg"}
          onclick={() => handleMetoPago("TropiPay")}
        />
      </section>
      <section>{metoPago == "TropiPay" ? <Tropipay total={total} /> : <Zelle total={total} />}</section>

      <MostrarErrorMessage campo={"ruta_image"} errors={errors} />
    </div>
  );
};

export default RevisarPedido;
