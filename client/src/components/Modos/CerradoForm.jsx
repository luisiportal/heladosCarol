import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import MostrarErrorMessage from "../ValidacionForm/MostrarErrorMessage";
import { updateModoCerradoRequest } from "../../api/modos.api.js";
import { useAuth } from "../../context/AuthContext.jsx";
import { useModocerrado } from "./useModoCerrado.js";
import { useModal } from "../../Stores/modalStore.ts";
const CerradoForm = () => {
  const { setLoader } = useAuth();
  const { setModal } = useModal();

  const { modo, setModo } = useModocerrado();

  const schema = Yup.object().shape({
    mensaje: Yup.string().matches(
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\d,.]+$/,
      "Solo se permiten letras y números"
    ),
  });

  const handleSubmit = async (values) => {
    if (!values.activado) {
      return setModal({
        mensaje: "Debe seleccionar Abierto o Cerrado",
        activo: true,
        errorColor: true,
      });
    }
    try {
      setLoader(true);
      const response = await updateModoCerradoRequest(values);
      setModal({
        mensaje: `Modo Cerrado ${
          values.activado == "true" ? "Activado" : "Desactivado"
        }`,
        activo: true,
      });
    } catch (error) {
      console.log(error);
    }
    setLoader(false);
  };

  return (
    <div className="p-2 mb-10">
      <Formik
        initialValues={modo}
        onSubmit={handleSubmit}
        validationSchema={schema}
      >
        {({ isSubmitting, errors, values, handleChange }) => (
          <div>
            <Form className="z-0 mt-20 flex flex-col ">
              <div className="flex justify-center gap-4">
                {" "}
                <label>
                  <input
                    type="radio"
                    name="activado"
                    value="false"
                    checked={values.activado === "false"}
                    onChange={handleChange}
                  />
                  Abierto
                </label>
                <label>
                  <input
                    type="radio"
                    name="activado"
                    value="true"
                    checked={values.activado === "true"}
                    onChange={handleChange}
                  />
                  Cerrado
                </label>
              </div>

              <div>
                <label className="block" htmlFor="mensajeActual">
                  Esta puesto : {modo.mensaje}{" "}
                </label>

                <label>
                  Mensaje nuevo:
                  <input
                    type="text"
                    name="mensaje"
                    placeholder={modo.mensaje}
                    className="block border-2 border-gray-300 rounded-xl p-1 mb-2 w-full"
                    onChange={handleChange}
                    value={values.mensaje}
                  />
                  <MostrarErrorMessage campo={"mensaje"} errors={errors} />
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-fresa hover:bg-fresa-700 text-white font-bold py-2 px-4 rounded float-right"
              >
                Aceptar
              </button>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default CerradoForm;
