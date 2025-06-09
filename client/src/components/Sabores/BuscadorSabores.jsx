import React, { useEffect, useState } from "react";
import BuscarSVG from "../SVG/BuscarSVG";
import Loader from "../Utilidades/Loader";
import BarraFiltrado from "../Utilidades/BarraFiltrado";
import SaborCard from "./SaborCard";
import { getSaboresBackendRequest } from "../../api/sabores.api";

const BuscadorSabores = ({ loader, setLoader }) => {
  const [sabores, setSabores] = useState([]);
  const [filtroSabores, setFiltroSabores] = useState([]);
  const [order, setOrder] = useState("DSC");
  useEffect(() => {
    try {
      const cargar = async () => {
        setLoader(true);
        const response = await getSaboresBackendRequest();
        setSabores(response.data);
        setLoader(false);
      };
      cargar();
    } catch (error) {
      console.log(error);
    }
  }, [filtroSabores]);

  const handleChange = (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      const response = sabores.filter((sabor) =>
        sabor.nombre_sabor.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setTimeout(() => setLoader(false), 500);
      return setFiltroSabores(response);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <BarraFiltrado
        setFiltroSabores={setFiltroSabores}
        sabores={sabores}
        filtroSabores={filtroSabores}
        order={order}
        setOrder={setOrder}
      />

      <div className="flex gap-4 bg-white text-slate-900 font-bold text-sm m-2 shadow-md rounded-md text-center  md:w-2/5 lg:w-1/5 mx-5 ">
        <label htmlFor="buscarProducto"> </label>

        <BuscarSVG />

        <input
          className="w-full rounded-md"
          type="text"
          onChange={handleChange}
          placeholder="Buscar productos"
        />
      </div>
      <div className="grid sm:grid-cols-1 gap-2 xl:grid-cols-4 mt-8 ">
        {loader && <Loader />}
        {(filtroSabores.length > 0 ? filtroSabores : sabores).map((sabor) => (
          <SaborCard sabor={sabor} key={sabor.id_sabor} />
        ))}
      </div>
    </div>
  );
};

export default BuscadorSabores;
