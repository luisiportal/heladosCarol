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
import InputEntrega from "./InputEntrega";

const schema = Yup.object({
  ordenante: Yup.string()
    .required("Campo requerido")
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]*$/, "Solo se permiten letras")
    .max(100, "El nombre no debe tener más de 20 caracteres"),

  contacto_ordenante: Yup.string()
    .required("Campo requerido")
    .matches(/^[a-zA-Z-@.0-9 ]*$/, "Solo se permiten letras")
    .max(50, "El nombre de no debe tener más de 50 caracteres"),
  beneficiario: Yup.string()
    .required("Campo requerido")
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]*$/, "Solo se permiten letras")
    .max(100, "El nombre de no debe tener más de 40 caracteres"),

  tel_beneficiario: Yup.string()
    .required("Campo requerido")
    .matches(/^[0-9-+ ]*$/, "Solo se permiten numeros")
    .max(20, "El telefono no debe tener más de 20 caracteres"),

  calle: Yup.string()
    .required("Campo requerido")
    .matches(
      /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s0-9-.]*$/,
      "Solo se permiten letras, números y espacios"
    )
    .max(20, "El nombre no debe tener más de 20 caracteres"),

  calle1: Yup.string()
    .required("Campo requerido")
    .matches(
      /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s0-9-.]*$/,
      "Solo se permiten letras, números y espacios"
    )
    .max(20, "El nombre no debe tener más de 20 caracteres"),
  calle2: Yup.string()
    .required("Campo requerido")
    .matches(
      /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s0-9-.]*$/,
      "Solo se permiten letras, números y espacios"
    )
    .max(20, "El nombre no debe tener más de 20 caracteres"),
  reparto: Yup.string()
    .required("Campo requerido")
    .matches(
      /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s0-9-.]*$/,
      "Solo se permiten letras, números y espacios"
    )
    .max(20, "El nombre no debe tener más de 20 caracteres"),
  p_referencia: Yup.string()
    .required("Campo requerido")
    .matches(
      /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s0-9]*$/,
      "Solo se permiten letras, números y espacios"
    )
    .max(40, "El nombre no debe tener más de 20 caracteres"),
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
            const ordenCompleta = {
              productos: carrito,
              entrega: values,
              total_venta: total_venta,
              //  id_pago: id,
            };

            await createVentaRequest(ordenCompleta);
            setModalActivo({
              mensaje: "Pago realizado correctamente",
              activo: true,
              navegarA: "/",
            });
            setCarrito([]);

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
              <InputEntrega
                type={"text"}
                name={"ordenante"}
                placeholder={"Ordenante"}
                handlechange={handleChangeMio}
                value={entrega.ordenante}
                errors={errors}
              />

              <div className="flex justify-end relative top-2 right-4">
                <DerretidoBeneficiario />
              </div>
              <InputEntrega
                type={"text"}
                name={"contacto_ordenante"}
                placeholder={"Correo o teléfono"}
                handlechange={handleChangeMio}
                value={entrega.contacto_ordenante}
                errors={errors}
              />
              <InputEntrega
                type={"text"}
                name={"beneficiario"}
                placeholder={"Beneficiario"}
                handlechange={handleChangeMio}
                value={entrega.beneficiario}
                errors={errors}
              />
              <InputEntrega
                type={"text"}
                name={"tel_beneficiario"}
                placeholder={"Teléfono de beneficiario"}
                handlechange={handleChangeMio}
                value={entrega.tel_beneficiario}
                errors={errors}
              />
              <label>Dirección de Entrega:</label>
              <div className="flex gap-1">
                <InputEntrega
                  type={"text"}
                  name={"calle"}
                  placeholder={"Calle"}
                  handlechange={handleChangeMio}
                  value={entrega.calle}
                  errors={errors}
                />
                <InputEntrega
                  type={"text"}
                  name={"numero"}
                  placeholder={"Número Casa"}
                  handlechange={handleChangeMio}
                  value={entrega.numero}
                  errors={errors}
                />
              </div>
              <InputEntrega
                type={"text"}
                name={"calle1"}
                placeholder={"Entre Calle"}
                handlechange={handleChangeMio}
                value={entrega.calle1}
                errors={errors}
              />
              <InputEntrega
                type={"text"}
                name={"calle2"}
                placeholder={"Entre calle"}
                handlechange={handleChangeMio}
                value={entrega.calle2}
                errors={errors}
              />
              <InputEntrega
                type={"text"}
                name={"reparto"}
                placeholder={"Reparto"}
                handlechange={handleChangeMio}
                value={entrega.reparto}
                errors={errors}
              />
              <div className="left-6 relative bottom-4">
                <DerretidoDireccion />
              </div>

              <InputEntrega
                type={"text"}
                name={"p_referencia"}
                placeholder={"Punto Referencia"}
                handlechange={handleChangeMio}
                value={entrega.p_referencia}
                errors={errors}
              />
              <div className="mt-2 mx-2 ">
                <CardElement />
                <NavegacionEntrega setNavegacion={setNavegacion} />
              </div>
            </section>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EntregaYenviaForm;
