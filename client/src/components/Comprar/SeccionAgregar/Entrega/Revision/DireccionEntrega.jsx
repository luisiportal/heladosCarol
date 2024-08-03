import React from "react";

const DireccionEntrega = ({entrega}) => {
  return (
    <div>
      {" "}
      <h2>Ordenante:{entrega.ordenante}</h2>
      <h2>Beneficiario:{entrega.beneficiario}</h2>
      <h2>Teléfono del Beneficiario</h2>
      <h2>Entregar en</h2>
      <h2> Punto Referencia:</h2>
      <h2>Ordenante</h2>
    </div>
  );
};

export default DireccionEntrega;
