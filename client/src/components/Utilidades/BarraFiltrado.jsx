import React, { useEffect, useState } from "react";
import BTNFiltrado from "./BTNFiltrado";

const BarraFiltrado = ({ setFiltroSabores, sabores, order, setOrder }) => {
  const [activeBTN, setActiveBTN] = useState(null);

  const ordenarFecha = () => {
    if (order === "DSC") {
      setOrder("ASC");
      const DSC = sabores.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setFiltroSabores(DSC);
    }
    if (order === "ASC") {
      setOrder("DSC");
      const ASC = sabores.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
      setFiltroSabores(ASC);
    }
  };

  const ordenarPrecio = () => {
    if (order === "DSC") {
      setOrder("ASC");

      const precioDSC = sabores.sort(
        (a, b) => Number(b.precio_venta) - Number(a.precio_venta)
      );

      setFiltroSabores(precioDSC);
    }
    if (order === "ASC") {
      setOrder("DSC");
      const precioASC = sabores.sort(
        (a, b) => Number(a.precio_venta) - Number(b.precio_venta)
      );

      setFiltroSabores(precioASC);
    }
  };

  const ordenarCosto = () => {
    if (order === "DSC") {
      setOrder("ASC");

      const DSC = sabores.sort(
        (a, b) => Number(b.costo_unitario) - Number(a.costo_unitario)
      );

      setFiltroSabores(DSC);
    }
    if (order === "ASC") {
      setOrder("DSC");
      const ASC = sabores.sort(
        (a, b) => Number(a.costo_unitario) - Number(b.costo_unitario)
      );

      setFiltroSabores(ASC);
    }
  };
  const ordenarExistencia = () => {
    if (order === "DSC") {
      setOrder("ASC");

      const DSC = sabores.sort(
        (a, b) => Number(b.existencia) - Number(a.existencia)
      );

      setFiltroSabores(DSC);
    }
    if (order === "ASC") {
      setOrder("DSC");
      const ASC = sabores.sort(
        (a, b) => Number(a.existencia) - Number(b.existencia)
      );

      setFiltroSabores(ASC);
    }
  };
  const ordenarNombre = () => {
    if (order === "DSC") {
      setOrder("ASC");

      const DSC = sabores.sort((a, b) =>
        a.nombre_producto.localeCompare(b.nombre_producto)
      );

      setFiltroSabores(DSC);
    }
    if (order === "ASC") {
      setOrder("DSC");
      const ASC = sabores.sort((a, b) =>
        b.nombre_producto.localeCompare(a.nombre_producto)
      );

      setFiltroSabores(ASC);
    }
  };

  return (
    <div className="flex  flex-wrap justify-center">
      <BTNFiltrado
        handleOrdenar={ordenarFecha}
        campo={"Fecha"}
        tipo={"DSC"}
        estado={order}
        activeBTN={activeBTN === "Fecha"}
        setActiveBTN={setActiveBTN}
      />
      <BTNFiltrado
        handleOrdenar={ordenarPrecio}
        campo={"Precio"}
        tipo={"DSC"}
        estado={order}
        activeBTN={activeBTN === "Precio"}
        setActiveBTN={setActiveBTN}
      />
      <BTNFiltrado
        handleOrdenar={ordenarCosto}
        campo={"Costo"}
        tipo={"DSC"}
        estado={order}
        activeBTN={activeBTN === "Costo"}
        setActiveBTN={setActiveBTN}
      />
      <BTNFiltrado
        handleOrdenar={ordenarNombre}
        campo={"A-Z"}
        tipo={"DSC"}
        estado={order}
        activeBTN={activeBTN === "A-Z"}
        setActiveBTN={setActiveBTN}
      />
      <BTNFiltrado
        handleOrdenar={ordenarExistencia}
        campo={"Existencia"}
        tipo={"DSC"}
        estado={order}
        activeBTN={activeBTN === "Existencia"}
        setActiveBTN={setActiveBTN}
      />
    </div>
  );
};

export default BarraFiltrado;
