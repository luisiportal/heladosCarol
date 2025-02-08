import { Form, Formik, useFormik } from "formik";
import { useSabores } from "../../context/SaboresProvider";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Loader from "../Utilidades/Loader";
import { saboresSchema } from "../../schemas/schemas";
import Unchecked from "../SVG/Unchecked";

const SaboresForm = () => {
  const { createSabor, getSabor, updateSabor } = useSabores();

  const { loader, setLoader, setModalActivo } = useAuth();
  const [files, setFiles] = useState([]);
  const [imagenes, setImagenes] = useState([]);
  const [imgToDelete, setImgToDelete] = useState([]);

  const [sabor, setSabor] = useState({
    nombre_sabor: "",
    envase: "",
    color: "",
    categoria: "",
    costo_unitario: 0,
    precio_venta: 0,
    stockMinimo: 0,
    home_img: "no",
    description: "",
  });

  useEffect(() => {
    const loadSabor = async () => {
      if (params.id_sabor) {
        const sabor = await getSabor(params.id_sabor);
        setSabor(sabor);
        setImagenes(sabor.imagenes);
        setLoader(false);
      }
    };
    loadSabor();
  }, []);

  const params = useParams();

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("nombre_sabor", values.nombre_sabor);
    formData.append("categoria", values.categoria);
    formData.append("description", values.description);
    formData.append("envase", values.envase);
    formData.append("color", values.color);
    formData.append("costo_unitario", values.costo_unitario);
    formData.append("precio_venta", values.precio_venta);
    formData.append("stockMinimo", values.stockMinimo || 0);
    formData.append("existencia", values.existencia || 0);
    formData.append("home_img", values.home_img);
    if (imgToDelete.length > 0) {
      formData.append("imgToDelete", imgToDelete);
    }

    if (files.length > 0) {

      for (let i = 0; i < files.length; i++) {
        formData.append("ruta_image", files[i]);
      }
    }

    try {
      setLoader(true);
      if (params.id_sabor) {
        const updateResponse = await updateSabor(params.id_sabor, formData); // onlinne

        setModalActivo({
          mensaje: updateResponse,
          activo: true,
          navegarA: "/sabores",
        });
      } else {
        const createResponse = await createSabor(formData);

        setModalActivo({
          mensaje: createResponse,
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
  const deleteOnline = (id_imagen) => {
    console.log(id_imagen);
    
    setImgToDelete([...imgToDelete, id_imagen]);
    const delonline = imagenes.filter(
      (imgdel) => imgdel.id_imagen !== id_imagen
    );
    setImagenes(delonline);
  };

  const deleteIMG = (index) => {

    const deleteItem = files.filter((file, i) => i !== index);
    setFiles(deleteItem);
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
          validationSchema={saboresSchema}
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
              <section className="flex flex-wrap gap-2">
                {imagenes.length > 0 &&
                  imagenes.map((imagen) => (
                    <div className="relative">
                      {" "}
                      <img
                        key={imagen.id_imagen} // Asegúrate de que cada imagen tenga una clave única para React
                        className="w-20 h-20 shadow-xl border-slate-50 border-spacing-2 rounded-md"
                        src={`${
                          import.meta.env.VITE_BACKEND_URL
                        }/images/productos/${imagen.ruta_image}`}
                        alt={imagen.descripcion || "Imagen de sabor"} // Proporciona una descripción alternativa
                      />
                      <button type="button"
                        className="absolute top-0 z-50"
                        onClick={() => deleteOnline(imagen.id_imagen)}
                      >
                        <Unchecked />
                      </button>
                    </div>
                  ))}

                {
                  /*muestra la imagen preview */ files.length > 0 &&
                    files.map((file, index) => (
                      <div className="relative" key={index}>
                        <img
                          className="w-20 h-20 shadow-xl border-slate-50 border-spacing-2 rounded-md"
                          src={URL.createObjectURL(file)}
                          alt=""
                        />
                        <button
                          className="absolute top-0 z-50"
                          onClick={() => deleteIMG(index)}
                        >
                          <Unchecked />
                        </button>
                      </div>
                    ))
                }
              </section>
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
              <label htmlFor="categoria" className="block">
                * Categoría:
              </label>
              <select
                name="categoria"
                value={values.categoria}
                onChange={handleChange}
              >
                <option value="Ninguna">Ninguna</option>
                <option value="Potes">Potes</option>
                <option value="Tinas">Tinas</option>
                <option value="Combos">Combos</option>
              </select>
              <label htmlFor="description" className="block">
                {" "}
                Descripción
              </label>
              <textarea
                name="description"
                className="w-full"
                rows={4}
                onChange={handleChange}
                value={values.description}
              ></textarea>
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
                <span className="bg-red-500 p-1 m-1">{errors.envase}</span>
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

              <label htmlFor="mos" className="block">
                Mostrar imagen en Precio
              </label>
              <div className="flex gap-3">
                <label>
                  <input
                    id="home_img_true"
                    type="radio"
                    name="home_img"
                    value="si"
                    checked={values.home_img === "si"}
                    onChange={handleChange}
                  />
                  Mostrar
                </label>
                <label>
                  <input
                    id="home_img_false"
                    type="radio"
                    name="home_img"
                    value="no"
                    checked={values.home_img === "no"}
                    onChange={handleChange}
                  />
                  Ocultar
                </label>
              </div>
              <label htmlFor="ruta_image" className="block"></label>
              <input
                name="ruta_image"
                type="file"
                multiple
                onChange={(e) => {
                  setFiles([...files, ...e.target.files]);
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
