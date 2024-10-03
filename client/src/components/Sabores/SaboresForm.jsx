import { Form, Formik, useFormik } from "formik";
import { useSabores } from "../../context/SaboresProvider";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useAuth } from "../../context/AuthContext";
import Loader from "../Utilidades/Loader";

const schema = Yup.object().shape({
  nombre_sabor: Yup.string().required("Nombre producto requerido"),
  envase: Yup.string().required("Envase requerido"),
  costo_unitario: Yup.number()
    .typeError("Debes escribir solo números")
    .positive("El precio debe ser mayor que cero")
    .required("Costo Requerido"),
  precio_venta: Yup.number()
    .typeError("Debes escribir solo números")
    .positive("El precio debe ser mayor que cero")
    .required("Precio Requerido"),
  color: Yup.string(),
  stockMinimo: Yup.number().typeError("Debes escribir solo números"),
});

const SaboresForm = () => {
  const { createSabor, getSabor, updateSabor } = useSabores();

  const { loader, setLoader,  setModalActivo } =
    useAuth();
  const [file, setFile] = useState();
  const [sabor, setSabor] = useState({
    nombre_sabor: "",
    envase:"",
    description_producto: "",
    costo_unitario: 0,
    precio_venta: 0,
    categoria: "Sin categoria",
  });

  useEffect(() => {
    const loadSabor = async () => {
   
      if (params.id_sabor) {
        setLoader(true);
        const sabor = await getSabor(params.id_sabor);
        setSabor(sabor);
        (e) => {
          setFile(e.target.files[0]);
        };
        setLoader(false);
      }
    };
    loadSabor();
  }, []);

  const params = useParams();


  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("nombre_sabor", values.nombre_sabor);
    formData.append("envase", values.envase);
    formData.append("color", values.color);
    formData.append("costo_unitario", values.costo_unitario);
    formData.append("precio_venta", values.precio_venta);

    formData.append("stockMinimo", values.stockMinimo || 0);
    formData.append("existencia", values.existencia || 0);

    if (file !== null) {
      formData.append("ruta_image", file);
    }

    try {
      setLoader(true);
      if (params.id_sabor) {
        await updateSabor(params.id_sabor, formData); // onlinne

        setModalActivo({
          mensaje: "Sabor Actualizado",
          activo: true,
          navegarA: "/sabores",
        });
      } else {
        await createSabor(formData);

        setModalActivo({
          mensaje: "Se ha creado el producto correctamente",
          activo: true,
          navegarA: "/sabores",
        });
      }
    } catch (error) {
      console.log(error);

      setModalActivo({
        mensaje: "Error al actualizar producto  " + error,
        activo: true,
        errorColor: true,
      });
    }
    setLoader(false);
  };

  return (
    <div className="mx-2 bg-neutral-200 rounded-md p-4">
      <h1 className="text-sm font-bold text-white">
        {params.id_sabor ? "Editar Sabor" : "Agregar sabor"}
      </h1>

      <div className="mt-8">
        <Formik
          initialValues={sabor}
          enableReinitialize={true}
          onSubmit={handleSubmit}
          validationSchema={schema}
        >
          {({
            handleChange,
            handleSubmit,
            errors,
            values,
            isSubmitting,
            resetForm,
          }) => (
            // FORMULARIO PARA RELLENAR CAMPOS
            <Form className="bg-neutral-200 max-w-md rounded-md p-4 mx-auto">
              {
                /*muestra la imagen preview */ file && (
                  <img
                    className="w-40 h-40 shadow-xl border-slate-50 border-spacing-2 rounded-md"
                    src={URL.createObjectURL(file)}
                    alt=""
                  />
                )
              }
              <label htmlFor="nombre" className="block">
                * Sabor:
              </label>
              <input
                type="text"
                name="nombre_sabor"
                placeholder=""
                className="my-2 px-2 py-1 rounded-sm w-full"
                value={values.nombre_sabor}
                onChange={handleChange}
              />
              {errors.nombre_sabor && (
                <span className="bg-red-500 p-1 m-1">
                  {errors.nombre_sabor}
                </span>
              )}
                <label htmlFor="envase" className="block">
                * Envase:
              </label>
              <input
                type="text"
                name="envase"
                placeholder=""
                className="my-2 px-2 py-1 rounded-sm w-full"
                value={values.envase}
                onChange={handleChange}
              />
               {errors.nombre_sabor && (
                <span className="bg-red-500 p-1 m-1">
                  {errors.envase}
                </span>
              )}
              <label htmlFor="color" className="block">
                *Color:
              </label>
              <input
                type="text"
                name="color"
                placeholder=""
                className="px-2 py-1 rounded-sm w-full"
                onChange={handleChange}
                value={values.color}
              />
              {errors.color && (
                <span className="bg-red-500 p-1 m-1">{errors.color}</span>
              )}

              <label htmlFor="costo" className="block">
                *Costo:
              </label>
              <input
                type="number"
                name="costo_unitario"
                placeholder=""
                className="px-2 py-1 rounded-sm w-full"
                onChange={handleChange}
                value={values.costo_unitario}
              />
              {errors.costo_unitario && (
                <span className="bg-red-500 p-1 m-1">
                  {errors.costo_unitario}
                </span>
              )}
              <label htmlFor="precio_venta" className="block">
                Precio Venta:
              </label>
              <input
                type="number"
                name="precio_venta"
                placeholder=""
                className="my-2 px-2 py-1 rounded-sm w-full"
                onChange={handleChange}
                value={values.precio_venta}
              />
              {errors.precio_venta && (
                <span className="bg-red-500 p-1 m-1">
                  {errors.precio_venta}
                </span>
              )}

              <label htmlFor="stockMinimo" className="block">
                Cant mínima:
              </label>
              <input
                type="number"
                name="stockMinimo"
                placeholder=""
                className="my-2 px-2 py-1 rounded-sm w-full"
                onChange={handleChange}
                value={values.stockMinimo}
              />
              {errors.stockMinimo && (
                <span className="bg-red-500 p-1 m-1">{errors.stockMinimo}</span>
              )}

              <label htmlFor="ruta_image" className="block"></label>
              <input
                name="ruta_image"
                type="file"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className=" bg-heladosCarol_color w-full text-2md text-black font-bold block p-2 rounded-md"
              >
                {params.id_sabor
                  ? "Aplicar cambios"
                  : isSubmitting
                    ? "Guardando..."
                    : "Agregar"}
              </button>
              <br />
            </Form>
          )}
        </Formik>
      </div>
      {loader && <Loader />}
    </div>
  );
};

export default SaboresForm;
