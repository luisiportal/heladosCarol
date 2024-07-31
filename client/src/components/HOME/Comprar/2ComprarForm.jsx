import React, { useState, useEffect } from "react";

import { Form, Formik, isInteger } from "formik";
import * as Yup from "yup";

import { useParams } from "react-router-dom";
import { useSabores } from "../../../context/SaboresProvider";
import FormAddProduct from "../../Ventas/FormAddProduct";
import { createVentaRequest } from "../../../api/venta.api";
import Loader from "../../Utilidades/Loader";
import { useAuth } from "../../../context/AuthContext";

const ComprarForm = () => {
  let fechaActual = new Date();
  let fechaEnFormatoISO = fechaActual.toISOString();

  const { loader, setLoader, isOnline, modalActivo, setModalActivo } =
    useAuth();
  const { loadSabores, sabores, setSabores } = useSabores();
  const [selectedOption, setSelectedOption] = useState(null);
  const [pedido, setPedido] = useState({
    cantidad: 0,
    nombre_sabor: "",
  });

  const [totalPagar, setTotalPagar] = useState(0);

  const params = useParams();

  useEffect(() => {
    loadSabores();
  }, []);

  const pagar = async () => {
    try {
      await createVentaRequest(carrito, total_venta, fechaEnFormatoISO);

      setModalActivo({
        mensaje: `Se ha realizado la venta por un total de ${total_venta} cup`,
        activo: true,
      });

      setSelectedOption(null);
      setLoader(false);
      setProductos([]); // esto lo que permite que se actualice el estado de los productos en el selector

      setRecargar(!recargar);
    } catch (error) {
      setLoader(false);

      setModalActivo({
        mensaje: error,
        activo: true,
        errorColor: true,
      });
    }
  };

  const handleChangeMio = (e, values) => {
    e.preventDefault();
    console.log(pedido);
    console.log(e);
  };

  return (
    <div>
      <div className="">
        <div className="flex justify-center items-center pt-14">
          <div>
            <Formik
              initialValues={pedido}
              enableReinitialize={true}
              onSubmit={async (values) => {
                setLoader(true);
                console.log("fgg");
                console.log(values);
                setLoader(false);
              }}
            >
              {({ errors, values, isSubmitting, handleChange }) => (
                <Form>
                  {sabores.map((sabor) => (
                    <div>
                      <label htmlFor={`${sabor.nombre_sabor}`}>
                        {sabor.nombre_sabor}
                      </label>
                      <input
                        type="number"
                        name={`${sabor.nombre_sabor}`}
                        onChange={handleChange}
                        value={values.cantidad}
                      />
                      <h2>{values.cantidad}</h2>
                    </div>
                  ))}
                  <h2>Total {totalPagar}</h2>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className=" bg-heladosCarol_color w-full text-2md text-black font-bold block p-2 rounded-md"
                  >
                    {isSubmitting ? "Guardando..." : "Agregar"}
                  </button>
                </Form>
              )}
            </Formik>
            <div className="flex justify-center items-center mt-4"></div>
          </div>
        </div>
        {loader && <Loader />}
      </div>
    </div>
  );
};

export default ComprarForm;
