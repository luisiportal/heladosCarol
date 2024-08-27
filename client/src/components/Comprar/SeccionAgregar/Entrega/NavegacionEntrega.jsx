import React from "react";
import Btn_Huellas from "../../../Btn_Huellas";
import ArrowRight from "../../../SVG/ArrowRight";

import ArrowLeftSVG from "../../../SVG/ArrowLeftSVG";
import { validateYupSchema } from "formik";

const NavegacionEntrega = ({
  setNavegacion,
  navegacion,
  schema,
  entrega,
  errors,
  setModalActivo,
}) => {
  return (
    <div className="flex  justify-between">
      <div className="flex  items-center justify-center  bg-fresa  w-28 rounded-xl">
        <ArrowLeftSVG />
        <Btn_Huellas text={`Sabores`} onclick={() => setNavegacion(1)} />
      </div>
      <div>
        {" "}
        {navegacion != 2 && (
          <Btn_Huellas
            text={`Entrega`}
            type={"button"}
            onclick={() => setNavegacion(2)}
          />
        )}
      </div>

      <div className="flex items-center justify-center  bg-fresa rounded-xl w-28">
        {navegacion == 2 && (
          <Btn_Huellas
            text={`Continuar`}
            type={"button"}
            onclick={() => {
              setNavegacion(3);
            }}
          />
        )}
        {navegacion == 3 && (
          <Btn_Huellas
            text={`Pagar`}
            type={"submit"}
            onclick={() => {
              if (errors) {
                console.log(errors);

                return setModalActivo({
                  mensaje: "Faltan datos por llenar en la entrega",
                  activo: true,
                  errorColor: true,
                });
              }
            }}
          />
        )}
        <ArrowRight />
      </div>
    </div>
  );
};

export default NavegacionEntrega;
