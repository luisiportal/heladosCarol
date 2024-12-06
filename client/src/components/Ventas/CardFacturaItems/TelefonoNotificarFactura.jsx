import React from "react";

const TelefonoNotificarFactura = ({
  numero,
  ventas,
  grandTotal,
  moneda,
  persona,
}) => {
  const items = ventas.map(
    (item) => `${item.cantidad} ${item.sabore.nombre_sabor} `
  );

  const texto = `Hola ${persona}, hemos recibido su factura de ${items} ${
    moneda === "CUP" ? `con un total de ${grandTotal} CUP` : ""
  } . La cual ya está siendo procesada. Helados Carol | www.heladoscarol.com`;

  function agregarPrefijo(numero) {
   
    if (!numero.startsWith("53") && !numero.startsWith("+53")) {
       numero = "53" + numero;
    }
    return numero;
  }

  const resultado = agregarPrefijo(numero);
 

  return (
    <a
      className="flex font-semibold"
      target="_blank"
      href={`https://wa.me/${resultado}?text=${texto}`}
    >
      <img className="w-8 h-8" src="/images/was100.png" alt="WhatsAPP" />
      {numero}
    </a>
  );
};

export default TelefonoNotificarFactura;
