import { useEffect, useState } from "react";
import ItemStadistica from "./ItemStadistica";

const EstadisticaReserva = ({ facturas }) => {
  const ventas = facturas.flatMap((factura) => factura.ventas);
  // combo 1--- 1 tina y 1 cake chiquito
  // combo 2--- 1 tina y 1 cake mediano
  // combo 3--- 5 potes y 1 cake chiquito

  const cantidadCombos = (nombre) => {
    return ventas.filter((item) => item.sabore.nombre_sabor === nombre).length;
  };

  const porDia = (dia) => {
    return facturas.filter((item) => item.fechaEntrega === dia).length;
  };

  const cantCakeMediano = cantidadCombos("Combo 2");
  const cantCakeChiquito =
    cantidadCombos("Combo 1") + cantidadCombos("Combo 3");
  const cantPotes = cantidadCombos("Combo 3") * 5;
  const cantTinas = cantidadCombos("Combo 1") + cantidadCombos("Combo 2");

  const sabado = porDia("sabado");
  const domingo = porDia("domingo");

  return (
    <div className="bg-neutral-200 pt-10">
      <div className="flex justify-center gap-2">
        {" "}
        <ItemStadistica nombre={"Cakes Chiquitos"} valor={cantCakeChiquito} />
        <ItemStadistica nombre={"Cakes Medianos"} valor={cantCakeMediano} />
      </div>
      <div className="flex justify-center">
        {" "}
        <ItemStadistica nombre={"Tinas"} valor={cantTinas} />
        <ItemStadistica nombre={"Potes"} valor={cantPotes} />
        <ItemStadistica nombre={"Sábado"} valor={sabado} color1="bg-yellow-400" color2="bg-yellow-200 text-neutral-900" />
        <ItemStadistica nombre={"Domingo"} valor={domingo} color1="bg-yellow-400" color2="bg-yellow-200 text-neutral-900" />

      </div>
    </div>
  );
};

export default EstadisticaReserva;
