import React, { useEffect, useState } from "react";
import LayoutPrincipal from "../../Layouts/LayoutPrincipal";
import { useNavigate, useParams } from "react-router-dom";
import {
  createRepartoRequest,
  getRepartosRequest,
  getUnRepartoRequest,
  updateUnRepartoRequest,
} from "../../api/repartos.api";
import { repartosSchema } from "../../schemas/schemas";
import { Form, Formik } from "formik";
import { useAuth } from "../../context/AuthContext";

const RepartoForm = () => {
  const [reparto, setReparto] = useState({});
  const { setModalActivo } = useAuth();

  const navigate = useNavigate();

  const params = useParams();
  useEffect(() => {
    const cargar = async () => {
      if (params.id) {
        try {
          const { data } = await getUnRepartoRequest(params.id);
          setReparto(data);
        } catch (error) {
          console.log(error);
        }
      }
    };

    cargar();
  }, []);

  const handleSubmit = async (values) => {
    {
      try {
        if (params.id) {
          await updateUnRepartoRequest(params.id, values);

          setModalActivo({
            mensaje: `Se ha actualizado el reparto ${values.reparto}`,
            activo: true,
            navegarA: "/repartos",
          });
        } else {
          await createRepartoRequest(values);

          navigate("/repartos");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <LayoutPrincipal titulo={`${params.id ? "Editar" : "Nuevo"} Reparto`}>
      <Formik
        validationSchema={repartosSchema}
        initialValues={reparto}
        enableReinitialize={true}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleSubmit, errors, values, isSubmitting }) => (
          // FORMULARIO PARA RELLENAR CAMPOS
          <Form
            onSubmit={handleSubmit}
            className="bg-neutral-200 max-w-md rounded-md p-4 mx-auto"
          >
            <label htmlFor="nombre" className="block">
              Reparto:
            </label>
            <input
              type="text"
              name="reparto"
              placeholder=""
              className="px-2 py-1 rounded-sm w-full"
              onChange={handleChange}
              value={values.reparto}
            />
            {errors.reparto && (
              <span className="bg-red-500 p-1 m-1 text-white rounded-lg">
                {errors.reparto}
              </span>
            )}
            <label htmlFor="costo" className="block">
              Costo USD:
            </label>
            <input
              type="text"
              name="costo"
              placeholder=""
              className="px-2 py-1 rounded-sm w-full"
              onChange={handleChange}
              value={values.costo}
            />
            {errors.costo && (
              <span className="bg-red-500 p-1 m-1 text-white rounded-lg">
                {errors.costo}
              </span>
            )}

            <label htmlFor="costo_cup" className="block">
              Costo CUP:
            </label>
            <input
              type="text"
              name="costo_cup"
              placeholder=""
              className="px-2 py-1 rounded-sm w-full"
              onChange={handleChange}
              value={values.costo_cup}
            />
            {errors.costo_cup && (
              <span className="bg-red-500 p-1 m-1 text-white rounded-lg">
                {errors.costo_cup}
              </span>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className=" bg-heladosCarol_color w-full text-2md text-black font-bold block p-2 rounded-md"
            >
              {params.id
                ? "Aplicar cambios"
                : isSubmitting
                  ? "Guardando..."
                  : "Agregar"}
            </button>
          </Form>
        )}
      </Formik>
    </LayoutPrincipal>
  );
};

export default RepartoForm;
