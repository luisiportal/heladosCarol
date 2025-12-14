import { Form, Formik } from "formik";
import Loader from "../../Utilidades/Loader";
import { useQuery } from "@tanstack/react-query";
import { getRepartosRequest } from "../../../api/repartos.api";
import { Entrega, Reparto } from "../../../types/General.types";
import { useLoader } from "../../../Stores/loaderStore";
import { useState } from "react";
import { EntregaSchema } from "../Schema/EntregaSchema";
import { useModal } from "../../../Stores/modalStore";
import { Link, useNavigate, useParams } from "react-router-dom";
import InputEntrega from "../../Comprar/SeccionAgregar/Entrega/InputEntrega";
import DerretidoBeneficiario from "../../SVG/DerretidoBeneficiario";
import DerretidoDireccion from "../../SVG/DerretidoDireccion";
import MostrarErrorMessage from "../../ValidacionForm/MostrarErrorMessage";

import Select from "react-select";
import TituloModulo from "../DesingSystem/TituloModulo";
import { useEntregaStore } from "../../../Stores/EntregaStore";
import ArrowLeftSVG from "../../SVG/ArrowLeftSVG";
import ArrowRight from "../../SVG/ArrowRight";
import TruckSVG from "../../SVG/TruckSVG";

const EntregaPage = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const { entrega, setEntrega } = useEntregaStore();
  const { loader } = useLoader();
  const { setModal } = useModal();
  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: ["repartos"],
    queryFn: () => getRepartosRequest(),
  });

  const repartosLeegados = data?.data;
  const repartos = repartosLeegados as Reparto[] 
  const options  = repartos.map((reparto) => {
    return {
      value: reparto.reparto,
      label: reparto.reparto,
      costo_cup: reparto.costo_cup,
      costo: reparto.costo,
    };
  });

  const onSubmit = (values: Entrega) => {
    if (!selectedOption) {
      return setModal({
        mensaje: "Falta el Reparto",
        activo: true,
        errorColor: true,
      });
    }

    setEntrega({
      ...values,
      reparto: selectedOption ?? ({} as Reparto),
    });

    navigate("/pasarela");
  };

  const handleSelectChange = (p:any) => {
    setSelectedOption(p);
  };
  return (
    <div className=" bg-vainilla rounded-xl pt-14">
      {loader && <Loader />}
      <Formik
        initialValues={entrega}
        enableReinitialize={true}
        validationSchema={EntregaSchema}
        onSubmit={onSubmit}
      >
        {({
          handleChange,

          errors,
          values,
          isSubmitting,
          validateForm,
        }) => (
          <Form>
            <div className="pb-52 m-2 -mt-2">
              {" "}
              <div className="flex flex-col items-center justify-center">
                <TituloModulo titulo="Datos de Entrega" />
                <div className="flex justify-center items-center gap-2 -mt-5 mb-2 text-xs font-light font-serif text-slate-700 ">
                  <div className="w-5">
                    <TruckSVG />
                  </div>
                  2 Horas aprox.
                </div>
              </div>
              <div className="bg-fresa p-2 mb-2 pt-5 rounded-xl">
                {" "}
                <InputEntrega
                  type={"text"}
                  name={"ordenante"}
                  placeholder={"Ordenante"}
                  handlechange={handleChange}
                  value={values.ordenante}
                  errors={errors}
                />
                <div className="flex justify-end relative top-2 right-4">
                  <DerretidoBeneficiario />
                </div>
                <InputEntrega
                  type={"text"}
                  name={"contacto_ordenante"}
                  placeholder={"Correo electrónico"}
                  handlechange={handleChange}
                  value={values.contacto_ordenante}
                  errors={errors}
                />
              </div>
              <InputEntrega
                type={"text"}
                name={"beneficiario"}
                placeholder={"Beneficiario"}
                handlechange={handleChange}
                value={values.beneficiario}
                errors={errors}
              />
              <InputEntrega
                type={"text"}
                name={"tel_beneficiario"}
                placeholder={"Teléfono de beneficiario"}
                handlechange={handleChange}
                value={values.tel_beneficiario}
                errors={errors}
              />
              <label>Dirección de Entrega:</label>
              <InputEntrega
                type={"text"}
                name={"calle"}
                placeholder={"Calle"}
                handlechange={handleChange}
                value={values.calle}
                errors={errors}
              />
              <InputEntrega
                type={"text"}
                name={"numero"}
                placeholder={"Número Casa o Apto"}
                handlechange={handleChange}
                value={values.numero}
                errors={errors}
              />
              <InputEntrega
                type={"text"}
                name={"calle1"}
                placeholder={"Entre Calles o Edificio"}
                handlechange={handleChange}
                value={values.calle1}
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
                handlechange={handleChange}
                value={values.p_referencia}
                errors={errors}
              />
              <InputEntrega
                type={"text"}
                name={"observaciones"}
                handlechange={handleChange}
                placeholder={"Alguna especificación adicional"}
                value={values.observaciones}
                errors={errors}
              />
              <div className="flex justify-between">
                {" "}
                <Link
                  to={"/carrito"}
                  className="flex gap-2 items-center bg-fresa rounded-xl text-black font-bold h-10  p-2 "
                >
                  <ArrowLeftSVG />
                  <button>Carrito</button>
                </Link>
                <button
                  type="submit"
                  className="flex gap-2 items-center bg-fresa rounded-xl text-black font-bold h-10  p-2 "
                >
                  Continuar <ArrowRight />
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EntregaPage;
