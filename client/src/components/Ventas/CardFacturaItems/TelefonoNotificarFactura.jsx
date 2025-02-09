import React from "react";
import CallSVG from "../../SVG/CallSVG";
import TextSVG from "../../SVG/TextSVG";

const TelefonoNotificarFactura = ({
  numero,
  ventas,
  grandTotal,
  moneda,
  persona,
}) => {
  const items = ventas.map(
    (item) => `<<${item.cantidad} ${item.sabore.nombre_sabor} >> `
  );

  const texto = `Hola ${persona}, hemos recibido su factura de ${items} ${
    moneda === "CUP" ? `con un total de ${grandTotal} CUP` : ""
  } . La cual ya está siendo procesada.Díganos si se le puede enviar en estos momentos.  Helados Carol | www.heladoscarol.com`;

  function agregarPrefijo(numero) {
    if (!numero.startsWith("53") && !numero.startsWith("+53")) {
      numero = "53" + numero;
    }
    return numero;
  }

  const resultado = agregarPrefijo(numero);

  return (
    <>
      {" "}
      <div className="flex p-2 justify-between items-center">
        <a href={`sms:${resultado}?body=${texto}`} className="flex gap-1"> <TextSVG/> Enviar SMS</a>
        <a href={`tel:${resultado}`} className="flex gap-1"><CallSVG css={"w-6 h-6"}/> LLamar</a>
        <a
          className="flex font-semibold"
          target="_blank"
          href={`https://wa.me/${resultado}?text=${texto}`}
        >
          <img className="w-8 h-8" src="/images/was100.png" alt="WhatsAPP" />
          {numero}
        </a>
      </div>
    </>
  );
};

export default TelefonoNotificarFactura;
