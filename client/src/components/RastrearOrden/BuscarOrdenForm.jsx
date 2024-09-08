import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { rastrearOrdenRequest } from "../../api/rastrearOrden";

import MostrarErrorMessage from "../ValidacionForm/MostrarErrorMessage";
const BuscarOrdenForm = ({ setLoader, setOrden, setModalActivo}) => {
  const [buscarfactura, setBuscarFactura] = useState({
    contacto: "",
  });

  const schema = Yup.object().shape({
    contacto: Yup.string()
      .required("Campo requerido")
      .matches(/^[0-9-+ ]*$/, "Solo se permiten numeros")
      .max(20, "El telefono no debe tener más de 20 caracteres"),
  });
  const handleSubmit = async (values) => {
    try {
      setLoader(true);
      const response = await rastrearOrdenRequest(values.contacto);
    
      


      setOrden(response.data);
    } catch (error) {
      console.log(error.response.status);
      
      if(error.response.status == "404"){
        {
          return setModalActivo({
            mensaje: "No Encontrado",
            activo: true,
            errorColor: true,
          });
        }
      }
      console.log(error);
    }
    setLoader(false);
  };

  return (
    <div className="p-2 mb-10">
      <Formik
        initialValues={buscarfactura}
        onSubmit={handleSubmit}
        validationSchema={schema}
      >
        {({ isSubmitting, errors, values, handleChange }) => (
          <div>
            <Form className="z-0 mt-20">
              <label>
                Teléfono Beneficiario:
                <input
                  type="text"
                  name="contacto"
                  className="block border-2 border-gray-300 rounded-xl p-1 mb-2"
                  onChange={handleChange}
                  value={values.contacto}
                />
                <MostrarErrorMessage campo={"contacto"} errors={errors} />
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-fresa hover:bg-fresa-700 text-white font-bold py-2 px-4 rounded float-right"
              >
                Buscar
              </button>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default BuscarOrdenForm;
