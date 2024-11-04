import React from "react";
import Btn_Huellas from "../../../Btn_Huellas";
import ArrowRight from "../../../SVG/ArrowRight";

import ArrowLeftSVG from "../../../SVG/ArrowLeftSVG";
import { Formik, validateYupSchema } from "formik";
import { writeLocalStorage } from "../../../../hooks/useLocalStorage";

const NavegacionEntrega = ({
  setNavegacion,
  navegacion,
  schema,
  entrega,
  errors,
  setModalActivo,
  carrito,
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
              schema
                .validate(entrega)
                .then(() => {
                  ///guardar local storage
                  writeLocalStorage("entrega",entrega);
                  setNavegacion(3);
                })
                .catch((err) => {
                  setModalActivo({
                    mensaje: `${err.errors}`,
                    activo: true,
                    errorColor: true,
                  });
                });
            }}
          />
        )}
        {navegacion == 3 && (
          <Btn_Huellas
            text={`Enviar`}
            type={"submit"}
            onclick={() => {
              validateYupSchema(entrega, schema);
              if (errors) {
                return setModalActivo({
                  mensaje:
                    "Revise los datos de Entrega antes de enviar la orden",
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
