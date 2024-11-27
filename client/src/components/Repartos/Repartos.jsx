import React, { useEffect, useState } from "react";
import LayoutPrincipal from "../../Layouts/LayoutPrincipal";
import { useRequest } from "../../hooks/useFetch";
import { getRepartosRequest } from "../../api/repartos.api";
import EditSVG from "../SVG/EditSVG";
import { useNavigate } from "react-router-dom";
import BTNRedondo from "../Utilidades/BTNRedondo";
import BuscadorRepartos from "./BuscadorRepartos";

const Repartos = () => {
  const { recurso: repartos } = useRequest(getRepartosRequest);
  const [filtroRepartos, setFiltroRepartos] = useState([]);
  const navigate = useNavigate();

  return (
    <LayoutPrincipal titulo={"Repartos"}>
      <BTNRedondo ruta={"/repartos/new"} />
      <BuscadorRepartos
        repartos={repartos}
        setFiltroRepartos={setFiltroRepartos}
      />
      {(filtroRepartos.length > 0 ? filtroRepartos : repartos).map(
        (reparto) => (
          <div
            className="bg-vainilla p-2 gap-2 m-2 rounded-xl text-slate-700"
            key={reparto.id_reparto}
          >
            <h2 className="font-semibold">{reparto.reparto}</h2>
            <h2>Costo USD: {reparto.costo}</h2>
            <h2>Costo CUP: {reparto.costo_cup}</h2>

            <button onClick={() => navigate(`/repartos/${reparto.id_reparto}`)}>
              <EditSVG />
            </button>
          </div>
        )
      )}
    </LayoutPrincipal>
  );
};

export default Repartos;
