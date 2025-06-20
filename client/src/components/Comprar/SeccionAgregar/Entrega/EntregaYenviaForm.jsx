import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import * as Yup from "yup";
import NavegacionEntrega from "./NavegacionEntrega";
import DerretidoBeneficiario from "../../../SVG/DerretidoBeneficiario";
import DerretidoDireccion from "../../../SVG/DerretidoDireccion";

import { createVentaRequest } from "../../../../api/venta.api";
import Loader from "../../../Utilidades/Loader";
import InputEntrega from "./InputEntrega";
import RevisarPedido from "./RevisarPedido";
import { getRepartosRequest } from "../../../../api/repartos.api";
import MostrarErrorMessage from "../../../ValidacionForm/MostrarErrorMessage";
import { readLocalStorage } from "../../../../hooks/useLocalStorage";
import { useReserva } from "../../../../Stores/ReservarStore";
import { useParams } from "react-router-dom";

const schema = Yup.object({
  ordenante: Yup.string()
    .required("Falta el Ordenante")
    .matches(
      /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]*$/,
      "Solo se permiten letras en el Ordenante"
    )
    .max(400, "El Ordenante no debe tener más de 400 caracteres"),

  contacto_ordenante: Yup.string()
    .required("Falta contacto del ordenante")
    .matches(
      /^[a-zA-Z-@.0-9 ]*$/,
      "Solo se permiten letras y numeros en el contacto del Ordenante"
    )
    .max(400, "El correo de no debe tener más de 400 caracteres"),
  beneficiario: Yup.string()
    .required("Falta el beneficiario")
    .matches(
      /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]*$/,
      "Solo se permiten letras en el Beneficiario"
    )
    .max(400, "El nombre del Beneficiario no debe tener más de 400 caracteres"),

  tel_beneficiario: Yup.string()
    .required("Falta teléfono beneficiario")
    .matches(
      /^[0-9-+ ]*$/,
      "Solo se permiten números en el teléfono del beneficiario"
    )
    .max(20, "El teléfono no debe tener más de 20 caracteres"),

  calle: Yup.string()
    .required("Falta la Calle")
    .matches(
      /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s0-9-.]*$/,
      "Solo se permiten letras, numeros y espacios en la Calle"
    )
    .max(400, "El nombre de la calle no debe tener más de 400 caracteres"),
  numero: Yup.string()
    .required("Falta la casa o APTO")
    .matches(
      /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s0-9-.]*$/,
      "Solo se permiten letras, números y espacios en Casa o APTO"
    )
    .max(20, "El número de la casa o APTO no debe tener más de 20 caracteres"),

  calle1: Yup.string()
    .required("Falta entre calles o Apto")
    .matches(
      /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s0-9-.]*$/,
      "Solo se permiten letras, números y espacios entre calles o Apto"
    )
    .max(40, "La calle no debe tener más de 400 caracteres"),
  reparto: Yup.string().required("Falta el Reparto"),

  p_referencia: Yup.string()

    .matches(
      /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s0-9]*$/,
      "Solo se permiten letras, números y espacios en Referencia"
    )
    .max(400, "La Referencia no debe tener más de 400 caracteres"),

  observaciones: Yup.string()
    .matches(
      /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s0-9]*$/,
      "Solo se permiten letras, números y espacios en Observaciones"
    )
    .max(400, "No debe tener más de 400 caracteres la observación"),
});

const EntregaYenviaForm = ({
  setNavegacion,
  entrega,
  setEntrega,
  setLoader,
  carrito,
  setModalActivo,
  setCarrito,
  loader,
  navegacion,
  metoPago,
  setMetoPago,
  moneda,
}) => {
  const [repartos, setRepartos] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [file, setFile] = useState();
  const [zelleOk, setZelleok] = useState();
  const [grandTotalFactura, setGrandTotalFactura] = useState({
    total_venta: 0,
    tropiPayFee: 0,
  });

  const { reserva } = useReserva();

  const params = useParams();
  const reservando = params.metodo === "metodo";
  console.log(reservando);

  const [payLink, setPayLink] = useState({
    reference: "",
    shortUrl: "",
  });

  useEffect(() => {
    const cargarRepartos = async () => {
      try {
        setLoader(true);
        const { data } = await getRepartosRequest();
        setRepartos(data);
      } catch (error) {
        alert(error);
      }
      setLoader(false);
    };
    cargarRepartos();

    const entregaLocal = readLocalStorage("entrega");
    if (entregaLocal) {
      setEntrega(entregaLocal);
    }
  }, []);
  const handleSelectChange = (p) => {
    setSelectedOption(p);
    setEntrega({
      ...entrega,
      reparto: p.value,
      envio: p.envio,
    });
  };

  const handleChangeMio = (e) => {
    const { name, value } = e.target;
    setEntrega({ ...entrega, [name]: value });
  };

  const options = repartos.map((reparto) => {
    return {
      value: reparto.reparto,
      label: reparto.reparto,
      envio: metoPago == "CUP" ? reparto.costo_cup : reparto.costo,
    };
  });

  return (
    <div className="mt-14">
      {loader && <Loader />}
      <Formik
        initialValues={entrega}
        enableReinitialize={true}
        validationSchema={schema}
        onSubmit={async (values) => {
          if (metoPago == "") {
            return setModalActivo({
              mensaje: "Debe Escojer una forma de pago",
              activo: true,
              errorColor: true,
            });
          }

          if (metoPago == "Zelle" && !zelleOk) {
            return setModalActivo({
              mensaje:
                "Si usted ya realizó el pago por Zelle marque la casilla de Pago realizado y presione Enviar",
              activo: true,
              errorColor: true,
            });
          }

          setLoader(true);
          setModalActivo({});

          const formData = new FormData();
          formData.append(
            "productos",
            JSON.stringify(!reservando ? carrito : reserva.productos)
          );

          formData.append("entrega", JSON.stringify(values));
          formData.append("pasarela", JSON.stringify(metoPago));
          formData.append("reference", JSON.stringify(payLink.reference));

          if (reservando) {
            formData.append("fechaEntrega", JSON.stringify(reserva.fecha));
            formData.append("reservando", JSON.stringify(reservando || ""));
          } else{
           formData.append("fechaEntrega", JSON.stringify(""));
            formData.append("reservando", JSON.stringify("")); 
          }

          formData.append(
            "granTotalFactura",
            JSON.stringify(grandTotalFactura)
          );

          if (file !== null) {
            formData.append("factura_image", file);
          }

          try {
            const venta = await createVentaRequest(formData);

            if (venta.status == 200) {
              if (metoPago != "TropiPay") {
                setModalActivo({
                  mensaje: venta.data.message,
                  activo: true,
                  navegarA: "/",
                });
              } else {
                location.href = payLink.shortUrl;
                setLoader(true);
              }

              setCarrito([]);
              localStorage.removeItem("entrega");
              localStorage.removeItem("sabores");

              if (metoPago != "TropiPay") {
                setLoader(false);
              }
            }
          } catch (error) {
            console.log(error);
            return setModalActivo({
              mensaje: error.response.data.message,
              activo: true,
              errorColor: true,
            });
          } finally {
            setLoader(false);
          }
        }}
      >
        {({
          handleChange,

          errors,
          values,
          isSubmitting,
          validateForm,
        }) => (
          <Form>
            <section className=" p-2 mx-2 bg-vainilla rounded-xl">
              {navegacion == 2 && (
                <div>
                  {" "}
                  <h2 className="font-inspiration text-2xl flex justify-center p-1">
                    Datos de Entrega
                  </h2>
                  <div className="bg-fresa p-2 mb-2 pt-5 rounded-xl">
                    {" "}
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
                      placeholder={"Correo electrónico"}
                      handlechange={handleChangeMio}
                      value={entrega.contacto_ordenante}
                      errors={errors}
                    />
                  </div>
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
                    placeholder={"Número Casa o Apto"}
                    handlechange={handleChangeMio}
                    value={entrega.numero}
                    errors={errors}
                  />
                  <InputEntrega
                    type={"text"}
                    name={"calle1"}
                    placeholder={"Entre Calles o Edificio"}
                    handlechange={handleChangeMio}
                    value={entrega.calle1}
                    errors={errors}
                  />
                  <div className="left-6 relative bottom-4">
                    <DerretidoDireccion />
                  </div>
                  <Select
                    placeholder="Reparto"
                    className="w-44 mb-4 rounded-lg"
                    name="nombre_sabor"
                    options={options}
                    value={selectedOption}
                    onChange={handleSelectChange}
                    isSearchable
                  />
                  <MostrarErrorMessage campo={"reparto"} errors={errors} />
                  <InputEntrega
                    type={"text"}
                    name={"p_referencia"}
                    placeholder={"Punto Referencia"}
                    handlechange={handleChangeMio}
                    value={entrega.p_referencia}
                    errors={errors}
                  />
                  <InputEntrega
                    type={"text"}
                    name={"observaciones"}
                    handlechange={handleChangeMio}
                    placeholder={"Alguna especificación adicional"}
                    value={entrega.observaciones}
                    errors={errors}
                  />
                </div>
              )}
              {navegacion == 3 && (
                <RevisarPedido
                  carrito={!reservando ? carrito : reserva.productos}
                  entrega={entrega}
                  setNavegacion={setNavegacion}
                  errors={errors}
                  setModalActivo={setModalActivo}
                  file={file}
                  setFile={setFile}
                  metoPago={metoPago}
                  setMetoPago={setMetoPago}
                  setPayLink={setPayLink}
                  payLink={payLink}
                  setZelleok={setZelleok}
                  zelleOk={zelleOk}
                  setGrandTotalFactura={setGrandTotalFactura}
                  moneda={moneda}
                  fechaReserva={reserva?.fecha}
                  reservando={reservando}
                />
              )}

              {navegacion != 0 && (
                <div className="mt-2 mx-2 ">
                  <NavegacionEntrega
                    setNavegacion={setNavegacion}
                    entrega={entrega}
                    navegacion={navegacion}
                    schema={schema}
                    errors={errors}
                    setModalActivo={setModalActivo}
                    carrito={carrito}
                    metoPago={metoPago}
                  />
                </div>
              )}
            </section>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EntregaYenviaForm;
