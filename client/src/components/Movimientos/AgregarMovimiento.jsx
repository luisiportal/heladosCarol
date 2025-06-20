import React, { useState, useEffect } from "react";

import { Form, Formik } from "formik";

import * as Yup from "yup";
import { hacerMoviemientoRequest } from "../../api/movimientos.api";
import BotoneraEntrada_Salida from "../BotoneraEntrada_Salida";
import { useAuth } from "../../context/AuthContext";
import Loader from "../Utilidades/Loader";

import { useSabores } from "../../context/SaboresProvider";
import { writeLocalStorageCrearMovimiento } from "../../hooks/useLocalStorage";
import SelectorProductos from "./SelectorProductos";
import { useNavigate } from "react-router-dom";
import { getSaboresBackendRequest } from "../../api/sabores.api";

const AgregarMovimiento = (tipo) => {
  const [sabores, setSabores] = useState([]);

  const [estadoEnviar, setEstadoEnviar] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const { loader, setLoader, isOnline, modalActivo, setModalActivo } =
    useAuth();
  const [movimiento, setMovimiento] = useState({
    cantidad: "",
    sabor: "",
    tipo: tipo.tipo,
  });
  const navigate = useNavigate();

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
  }, [estadoEnviar]);

  let fechaActual = new Date();
  let createdAt = fechaActual.toISOString();

  const schemaSalida = Yup.object().shape({
    cantidad: Yup.number()
      .max(
        movimiento.existencia,
        "La cantidad no puede ser mayor que la existencia"
      )
      .required("Este campo es requerido"),
  });

  const schema = Yup.object().shape({
    cantidad: Yup.number().required("Este campo es requerido"),
  });

  const handleSelectChange = (p) => {
    setSelectedOption(p);

    setMovimiento({
      ...movimiento,
      id_sabor: p.value,
      sabor: p.label.split("Precio")[0].trim(),
      existencia: p.existencia,
      createdAt: createdAt,
    });
  };

  return (
    <div>
      <div>
        <div className="flex justify-center items-center pt-10">
          <div>
            <Formik
              initialValues={movimiento}
              enableReinitialize={true}
              validationSchema={
                movimiento.tipo === "Salida" ? schemaSalida : schema
              }
              onSubmit={async (values, { resetForm }) => {
                try {
                  setLoader(true);
                  if (!isOnline) {
                    writeLocalStorageCrearMovimiento(
                      values,
                      movimiento.producto
                    );
                  } else {
                    await hacerMoviemientoRequest(values);
                  }

                  setModalActivo({
                    mensaje: `Movimiento de ${tipo.tipo} realizado`,
                    activo: true,
                    errorColor: tipo.tipo == "Salida",
                  });

                  resetForm();
                  setSelectedOption(null);
                  setEstadoEnviar(!estadoEnviar);
                  navigate("/movimientos");
                } catch (error) {
                  console.error(error);
                }
                setLoader(false);
              }}
            >
              {({ handleChange, resetForm, errors, values, isSubmitting }) => (
                <Form>
                  <div className="bg-neutral-200 mt-6">
                    <BotoneraEntrada_Salida></BotoneraEntrada_Salida>
                    <h1 className=" text-slate-900 text-xl mb-2 p-4">
                      {"Estas a punto de hacer un movimiento de " + tipo.tipo}
                    </h1>
                    <SelectorProductos
                      sabores={sabores}
                      handleSelectChange={handleSelectChange}
                      selectedOption={selectedOption}
                    />
                    <div className="text-slate-900 p-4">
                      <label className="p-2" htmlFor="cantidad">
                        Cantidad :
                      </label>
                      <input
                        className="text-black"
                        name="cantidad"
                        type="text"
                        onChange={handleChange}
                        value={values.cantidad}
                      />
                      {errors.cantidad && (
                        <span className="bg-red-500 p-1 m-1">
                          {errors.cantidad}
                        </span>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className=" bg-heladosCarol_color w-full text-2md text-black font-bold block p-2 rounded-md"
                    >
                      {isSubmitting ? "Guardando..." : "Agregar"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
            <div className="flex justify-center items-center mt-4"></div>
          </div>
          {loader && <Loader />}
        </div>
      </div>
    </div>
  );
};

export default AgregarMovimiento;
