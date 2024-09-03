import React, { useState } from "react";
import * as Yup from "yup";
import { Form, Formik, isInteger } from "formik";
import FormAddProduct from "../../Ventas/FormAddProduct";
import { useSabores } from "../../../context/SaboresProvider";

const SeccionAgregarSabores = ({
  recargar,
  setLoader,
  carrito,
  setCarrito,
  setModalActivo,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [movimiento, setMovimiento] = useState({
    cantidad: "",
    nombre_sabor: "",
    color: "",
  });

  const schema = Yup.object().shape({
    cantidad: Yup.number()
      .max(
        movimiento.existencia,
        "La cantidad no puede ser mayor que la existencia"
      )
      .required("Este campo es requerido")
      .min(1, "Cantidad vacia"),
  });

  return (
    <div className="flex justify-center items-center pt-14">
      <div>
        <Formik
          initialValues={movimiento}
          enableReinitialize={true}
          validationSchema={schema}
          onSubmit={async (values, { resetForm }) => {
            setLoader(true);

            if (
              !carrito.some(
                (sabor) => sabor.nombre_sabor === values.nombre_sabor
              )
            ) {
              setCarrito([...carrito, values]);
            } else {
              setModalActivo({
                mensaje: `Ya este producto ha sido agregado`,
                activo: true,
                errorColor: true,
              });
            }
            resetForm();
            setSelectedOption(null);
            setLoader(false);
          }}
        >
          {({
            handleChange,

            errors,
            values,
            isSubmitting,
          }) => (
            <Form>
              <FormAddProduct
                setMovimiento={setMovimiento}
                handleChange={handleChange}
                movimiento={movimiento}
                values={values}
                errors={errors}
                isSubmitting={isSubmitting}
                recargar={recargar}
                setSelectedOption={setSelectedOption}
                selectedOption={selectedOption}
              />
            </Form>
          )}
        </Formik>
        <div className="flex justify-center items-center mt-4"></div>
      </div>
    </div>
  );
};

export default SeccionAgregarSabores;
