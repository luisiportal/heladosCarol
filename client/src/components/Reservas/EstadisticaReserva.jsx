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

  const cantCakeMediano = cantidadCombos("Combo 2");
  const cantCakeChiquito =
    cantidadCombos("Combo 1") + cantidadCombos("Combo 3");
  const cantPotes = cantidadCombos("Combo 3") * 5;
  const cantTinas = cantidadCombos("Combo 1") + cantidadCombos("Combo 2");


  return (
    <div className="bg-neutral-200 pt-10">
    
      <div className="flex justify-center gap-2">
        {" "}
        <ItemStadistica nombre={"Cakes Chiquitos"} valor={cantCakeChiquito} />
        <ItemStadistica nombre={"Cakes Medianos"} valor={cantCakeMediano} />
      </div>
      <div className="flex justify-center gap-14">
        {" "}
        <ItemStadistica nombre={"Tinas"} valor={cantTinas} />
        <ItemStadistica nombre={"Potes"} valor={cantPotes} />
      </div>
    </div>
  );
};

export default EstadisticaReserva;
