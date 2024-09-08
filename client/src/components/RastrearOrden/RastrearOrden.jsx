import React, { useEffect, useState } from "react";

import { useAuth } from "../../context/AuthContext";
import BuscarOrdenForm from "./BuscarOrdenForm";
import FacturaCard from "../Ventas/FacturaCard";
const RastrearOrden = () => {
  const { loader, setLoader, setModalActivo } = useAuth();
  const [orden, setOrden] = useState();


  const mostrarOrdenes = () => {
    if (orden) {
      return <FacturaCard factura={orden} />;
    } else {
      <h2></h2>;
    }
  };

  return (
    <div>
      <BuscarOrdenForm setLoader={setLoader} setOrden={setOrden} setModalActivo={setModalActivo} />
      {mostrarOrdenes()}
    </div>
  );
};

export default RastrearOrden;
