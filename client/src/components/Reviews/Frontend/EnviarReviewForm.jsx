import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import MostrarErrorMessage from "../../ValidacionForm/MostrarErrorMessage";
import { createReviewRequest } from "../../../api/reviews.api";
import { useAuth } from "../../../context/AuthContext";

const EnviarReviewForm = () => {
  const { loader, setLoader, setModalActivo } = useAuth();
  const MAX_CHARACTER_LIMIT = 500;
  const [file, setFile] = useState();
  const [enviado, setEnviado] = useState(false);
  const [respMessage, setRespMessage] = useState("");
  const [characterCount, setCharacterCount] = useState(0);
  const [comentario, setComentario] = useState({
    autor: "",
    comentario: "",
  });

  const schema = Yup.object().shape({
    autor: Yup.string()
      .required("Campo requerido")
      .matches(
        /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ .-]*$/,
        "Solo se permiten letras y números"
      )
      .max(40, "El nombre de autor es demasiado largo"),
    comentario: Yup.string()
      .required("Cuidado no ha comentado")
      .matches(
        /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\d,.]+$/,
        "Solo se permiten letras y números"
      )
      .min(1, "Comenta algo más por favor")
      .max(500, "Es un poco extenso su comentario"),
  });
  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("autor", values.autor);
    formData.append("comentario", values.comentario);

    if (file !== null) {
      formData.append("ruta_image", file);
    }

    try {
      setLoader(true);
      await createReviewRequest(formData);

      setEnviado(true);
      setRespMessage("Gracias por su opinión");
    } catch (error) {
      setEnviado(false);
      setRespMessage("Ha ocurrido un error. Vuelva a intentarlo");
      console.log(error);
    }
    setLoader(false);
  };

  const handleTextareaChange = (values) => {
    const content = values.comentario;
    // Actualiza el conteo de caracteres
    setCharacterCount(content.length);
  };

  return (
    <div>
      <div className="p-2 mb-10">
        <Formik
          initialValues={comentario}
          onSubmit={handleSubmit}
          validationSchema={schema}
        >
          {({ isSubmitting, errors, values, handleChange }) => (
            <div>
              {!enviado && (
                <Form className="z-0">
                  <label>
                    Nombre:
                    <input
                      type="text"
                      name="autor"
                      className="block border-2 border-gray-300 rounded-xl p-1 mb-2"
                      onChange={handleChange}
                      value={values.autor}
                    />
                    <MostrarErrorMessage campo={"autor"} errors={errors} />
                  </label>

                  <div className="block">
                    <label>
                      Texto del Comentario:
                      <textarea
                        rows="2"
                        name="comentario"
                        className="block border-2 border-gray-300 rounded-xl p-1 min-w-full mb-2"
                        onChange={handleChange}
                        value={values.comentario}
                      />
                      <MostrarErrorMessage
                        campo={"comentario"}
                        errors={errors}
                      />
                    </label>
                  </div>
                  <label htmlFor="ruta_image" className="block">
                    Imagen de Perfil
                  </label>
                  {
                    /*muestra la imagen preview */ file && (
                      <img
                        className="w-20 h-20 rounded-full mr-2  border-white border-2"
                        src={URL.createObjectURL(file)}
                        alt=""
                      />
                    )
                  }
                  <input
                    name="ruta_image"
                    type="file"
                    onChange={(e) => {
                      var file = file || e.target.files[0],
                        pattern = /^image/,
                        reader = new FileReader();
                      if (file.size > 2000000) {
                        setFile();
                       return setModalActivo({
                          mensaje: "La imagen es demasiado grande",
                          activo: true,
                          errorColor: true,
                        });
                      }

                      if (!pattern.test(file.type)) {
                        setFile();
                        setModalActivo({
                          mensaje: "Formato de imagen inválido",
                          activo: true,
                          errorColor: true,
                        });

                        return;
                      }

                      setFile(e.target.files[0]);
                    }}
                  />
                  <MostrarErrorMessage campo={"ruta_image"} errors={errors} />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-fresa hover:bg-fresa-700 text-white font-bold py-2 px-4 rounded float-right"
                  >
                    Enviar
                  </button>
                </Form>
              )}
            </div>
          )}
        </Formik>

        {enviado && (
          <div className="z-50 h-auto p-14 flex flex-1 justify-center items-center rounded">
            {" "}
            <h2 className="text-slate-800 font-semibold text-md">
              {respMessage}
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnviarReviewForm;
