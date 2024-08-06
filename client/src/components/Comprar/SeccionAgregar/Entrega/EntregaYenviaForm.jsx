import { Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import NavegacionEntrega from "./NavegacionEntrega";
import DerretidoBeneficiario from "../../../SVG/DerretidoBeneficiario";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import DerretidoDireccion from "../../../SVG/DerretidoDireccion";
import MostrarErrorMessage from "../../../ValidacionForm/MostrarErrorMessage";
import { createVentaRequest } from "../../../../api/venta.api";
import Loader from "../../../Utilidades/Loader";

const schema = Yup.object({
  ordenante: Yup.string()
    .required("Campo requerido")
    .matches(/^[a-zA-Z ]*$/, "Solo se permiten letras")
    .max(20, "El nombre de no debe tener más de 20 caracteres"),
  beneficiario: Yup.string()
    .required("Campo requerido")
    .matches(/^[a-zA-Z ]*$/, "Solo se permiten letras")
    .max(40, "El nombre de no debe tener más de 40 caracteres"),

  tel_beneficiario: Yup.string()
    .required("Campo requerido")
    .matches(/^[0-9 ]*$/, "Solo se permiten numeros")
    .max(8, "El telefono no debe tener más de 20 caracteres"),
  direccion: Yup.string()
    .required("Campo requerido")
    .matches(/^[a-zA-Z0-9-. ]*$/, "Solo se permiten letras y números")
    .max(200, "Dirección no debe tener más de 50 caracteres"),
  p_referencia: Yup.string()
    .required("Campo requerido")
    .matches(/^[a-zA-Z0-9-. ]*$/, "Solo se permiten letras y números")
    .max(40, "Punto Referencia no debe tener más de 40 caracteres"),
});

const EntregaYenviaForm = ({
  setNavegacion,
  entrega,
  setEntrega,
  setLoader,
  carrito,
  total_venta,
  setModalActivo,
  setCarrito,
  loader,
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleChangeMio = (e) => {
    const { name, value } = e.target;
    setEntrega({ ...entrega, [name]: value });
  };
  return (
    <div className="mt-8">
      {loader && <Loader />}
      <Formik
        initialValues={entrega}
        enableReinitialize={true}
        validationSchema={schema}
        onSubmit={async (values) => {
          setLoader(true);

          try {
            const { error, paymentMethod } = await stripe.createPaymentMethod({
              type: "card",
              card: elements.getElement(CardElement),
            });

            if (!error) {
              const { id } = paymentMethod;

              const ordenCompleta = {
                productos: carrito,
                entrega: values,
                total_venta: total_venta,
                id_pago: id,
              };

              await createVentaRequest(ordenCompleta);
              setModalActivo({
                mensaje: "Pago realizado correctamente",
                activo: true,
                navegarA: "/",
              });
              setCarrito([]);
            } else {
              setModalActivo({
                mensaje: `No se ha completado el pago . ${error.message}"}`,
                activo: true,

                errorColor: error,
              });
            }
            setLoader(false);
          } catch (error) {
            console.log(error);
          }
        }}
      >
        {({
          handleChange,

          errors,
          values,
          isSubmitting,
        }) => (
          <Form>
            <section className=" p-4 mx-2 bg-vainilla rounded-xl">
              <h2 className="font-inspiration text-2xl flex justify-center p-1">
                Datos de Entrega
              </h2>
              <input
                className="rounded-xl w-full bg-neutral-200 placeholder:text-slate-800 font-semibold p-2 mb-4"
                type="text"
                name="ordenante"
                placeholder="Ordenante:"
                onChange={handleChangeMio}
                value={entrega.ordenante}
              />
              <MostrarErrorMessage campo={"ordenante"} errors={errors} />
              <div className="flex justify-end relative top-2 right-4">
                <DerretidoBeneficiario />
              </div>
              <input
                className="rounded-xl w-full bg-neutral-200 placeholder:text-slate-800 font-semibold p-2 mb-4"
                type="text"
                placeholder="Beneficiario:"
                name="beneficiario"
                onChange={handleChangeMio}
                value={entrega.beneficiario}
              />
              <MostrarErrorMessage campo={"beneficiario"} errors={errors} />
              <input
                className="rounded-xl w-full bg-neutral-200 placeholder:text-slate-800 font-semibold p-2 mb-4"
                type="text"
                placeholder="Teléfono del Beneficiario:"
                name="tel_beneficiario"
                onChange={handleChangeMio}
                value={entrega.tel_beneficiario}
              />
              <MostrarErrorMessage campo={"tel_beneficiario"} errors={errors} />
              <textarea
                className="rounded-xl w-full bg-neutral-200 placeholder:text-slate-800 font-semibold p-2 mb-4"
                rows="3"
                name="direccion"
                placeholder="Dirección de Entrega:"
                onChange={handleChangeMio}
                value={entrega.direccion}
              />
              <div className="left-6 relative bottom-5">
                <DerretidoDireccion />
              </div>
              <MostrarErrorMessage campo={"direccion"} errors={errors} />
              <input
                className="rounded-xl w-full bg-neutral-200 placeholder:text-slate-800 font-semibold p-2 mb-4"
                type="text"
                name="p_referencia"
                placeholder="Punto Referencia:"
                onChange={handleChangeMio}
                value={entrega.p_referencia}
              />
              <MostrarErrorMessage campo={"p_referencia"} errors={errors} />
              <div className="mt-2 mx-2 ">
                <CardElement />
                <NavegacionEntrega />
              </div>
            </section>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EntregaYenviaForm;
