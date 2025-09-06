import React from "react";
import { Entrega } from "../../../types/General.types";

const EntregaREviusarSection = ({ entrega }: { entrega: Entrega }) => {

    
  const handleCopy = async (numero) => {
    try {
      await navigator.clipboard.writeText(numero);
    } catch (error) {
      console.error("Error al copiar el texto:", error);
    }
  };
  return (
    <div className="flex-grow flex flex-col  p-2 text-xs">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <h2 className="">Entregar a : {entrega.beneficiario} </h2>
          <p>
            {" "}
            Dirección : Calle {entrega.calle} # {entrega.numero}{" "}
            entre {entrega.calle1}
            {entrega.calle2} Reparto {entrega.reparto.reparto}{" "}
          </p>

          <h2>Referencia : {entrega.p_referencia} </h2>
          <h2
            className="cursor-pointer"
            onClick={() => handleCopy(entrega.tel_beneficiario)}
          >
            Teléfono : {entrega.tel_beneficiario}{" "}
          </h2>
        </div>

        <div className="bg-fresa text-neutral-100 font-semibold rounded-xl text-xs flex gap-2 p-2">
          <h2>Enviado por: {entrega.ordenante} </h2>
          <h2>Contacto: {entrega.contacto_ordenante}</h2>
        </div>
        {entrega.observaciones && (
          <p>Observaciones : {entrega.observaciones}</p>
        )}
      </div>
    </div>
  );
};

export default EntregaREviusarSection;
