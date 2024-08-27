import React from "react";
import BTNHOME from "../HOME/elementos/BTNHOME";

const BTNCargarMas = ({
  estado,
  setEstado,
  getRecurso,
  setLoader,
  recargarFactura,
  setRecargarFactura,
  loadFechas,
  texto,
}) => {
  return (
    <div>
      {" "}
      <BTNHOME
        texto={texto || "Cargar +"}
        handleClick={async () => {
          setLoader(true);
          const response = await getRecurso(estado.length + 10);

          setEstado(response.data);
          loadFechas ? loadFechas(estado) : "";
          setLoader(false);
        }}
      />
    </div>
  );
};

export default BTNCargarMas;
