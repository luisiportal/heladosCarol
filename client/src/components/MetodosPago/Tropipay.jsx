import React, { useEffect, useState } from "react";
import { createPagoRequest } from "../../api/venta.api";
import Loader from "../Utilidades/Loader";

const Tropipay = ({ total, setPayLink, payLink, description }) => {
  console.log(total);

  useEffect(() => {
    const loadPaymentLink = async () => {
      const { data } = await createPagoRequest({
        reference: new Date().getTime().toString(),
        description: description,
        totalCobrar: Number(total) * 100,
        fechaFactura: new Date(),
      });
      setPayLink({
        reference: data.reference,
        shortUrl: data.shortUrl,
      });
    };

    loadPaymentLink();
  }, []);

  return (
    <div className="flex flex-col  justify-center text-slate-600 gap-2">
      <h2 className="font-semibold text-slate-700 flex justify-center">
        Pasos para realizar Pago mediante TropiPay
      </h2>
      <h4>
        1- Enviar <span className="font-bold">{Number(total).toFixed(2)} EUR</span> por{" "}
        <span className="font-bold">TropiPay </span>
      </h4>

      <p>
        Una vez que recibamos la confirmación de su pago su orden será aceptada
        y procesada.
      </p>
      {payLink.shortUrl > "" ? (
        <button
          className="flex justify-center opacity-100 transition-all duration-500"
          type="submit"
          onClick={() => (location.href = payLink.shortUrl)}
        >
          <img
            className="w-48 h-12 rounded-lg"
            src="../images/pagarTropiPay.png"
            alt="Pagar con TropiPay"
          />
        </button>
      ) : (
        <div className="flex justify-center font-light bg-slate-800 text-white ">
          "Cargando enlace de pago..."{" "}
          <div className="w-1 h-1">
            <Loader />
          </div>
        </div>
      )}
      <h4 className="flex justify-center">Gracias por elegirnos</h4>
    </div>
  );
};

export default Tropipay;
