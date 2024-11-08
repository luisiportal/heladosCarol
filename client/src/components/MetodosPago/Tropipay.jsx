import React, { useEffect, useState } from "react";
import { createPagoRequest } from "../../api/venta.api";

const Tropipay = ({
  total,
  setPayLink,
  reference,
  description,
  totalCobrar,
}) => {
  useEffect(() => {
    const loadPaymentLink = async () => {
      const { data } = await createPagoRequest({
        reference: reference,
        description: description,
        totalCobrar: totalCobrar,
        fechaFactura: new Date(),
      });

      setPayLink(data.shortUrl);
    };

    loadPaymentLink();
  }, []);

  return (
    <div className="flex flex-col  justify-center text-slate-600 gap-2">
      <h2 className="font-semibold text-slate-700 flex justify-center">
        Pasos para realizar Pago mediante TropiPay
      </h2>
      <h4>
        1- Enviar <span className="font-bold">{total.toFixed(2)} USD</span> por{" "}
        <span className="font-bold">TropiPay </span>
        
      </h4>

      <p>
        Una vez que recibamos la confirmación de su pago su orden será aceptada
        y procesada.
      </p>
      <h4>Gracias por elegirnos</h4>
    </div>
  );
};

export default Tropipay;
