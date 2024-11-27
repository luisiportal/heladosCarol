import React from "react";
import BuscarSVG from "../SVG/BuscarSVG";
import { useAuth } from "../../context/AuthContext";

const BuscadorRepartos = ({repartos,setFiltroRepartos}) => {
  const { setLoader } = useAuth();

  const handleChange = (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      const response = repartos.filter((reparto) =>
        reparto.reparto.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setTimeout(() => setLoader(false), 500);
      return setFiltroRepartos(response);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="flex gap-4 bg-white text-slate-900 font-bold text-sm m-2 shadow-md rounded-md text-center  md:w-2/5 lg:w-1/5 mx-5 ">
      <label htmlFor="buscarReparto"> </label>

      <BuscarSVG />

      <input
        className="w-full rounded-md"
        type="text"
        onChange={handleChange}
        placeholder="Buscar reparto"
      />
    </div>
  );
};

export default BuscadorRepartos;
