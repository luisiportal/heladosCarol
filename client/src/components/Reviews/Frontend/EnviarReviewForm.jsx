import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import MostrarErrorMessage from "../../ValidacionForm/MostrarErrorMessage";
import { createReviewRequest } from "../../../api/reviews.api";
import { useAuth } from "../../../context/AuthContext";

const EnviarReviewForm = () => {
  const { loader, setLoader, setModalActivo } = useAuth();
  const MAX_CHARACTER_LIMIT = 500;
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
        /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\d.,¡?!]+$/,
        "Solo se permiten letras y números"
      )
      .min(1, "Comenta algo más por favor")
      .max(500, "Es un poco extenso su comentario"),
  });
  const handleSubmit = async (values) => {
    try {
      setLoader(true);
      await createReviewRequest(values);

      setEnviado(true);
      setRespMessage("Hemos recibido su comentario");
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
      <div className="p-2">
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
                      className="block border-2 border-gray-300 rounded-md p-2 mb-2"
                      onChange={handleChange}
                      value={values.autor}
                    />
                    <MostrarErrorMessage campo={"autor"} errors={errors} />
                  </label>

                  <div className="block">
                    <label>
                      Texto del Comentario:
                      <textarea
                        rows="3"
                        name="comentario"
                        className="block border-2 border-gray-300 rounded-md p-2 min-w-full mb-2"
                        onChange={handleChange}
                        value={values.comentario}
                      />
                      <MostrarErrorMessage
                        campo={"comentario"}
                        errors={errors}
                      />
                    </label>
                    <p>
                      Conteo de caracteres: {characterCount}/
                      {MAX_CHARACTER_LIMIT}
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-right"
                  >
                    Enviar
                  </button>
                </Form>
              )}
            </div>
          )}
        </Formik>

        {enviado && (
          <div className="bg-slate-600 z-50 h-auto p-14 bg-black/50 flex flex-1 justify-center items-center rounded">
            {" "}
            <h2 className="text-white font-semibold text-l">{respMessage}</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnviarReviewForm;