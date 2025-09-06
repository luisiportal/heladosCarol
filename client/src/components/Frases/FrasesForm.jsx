import  {  useState } from "react";
import { Formik, Form,  } from "formik";
import * as Yup from "yup";

import MostrarErrorMessage from "../ValidacionForm/MostrarErrorMessage";
import { useAuth } from "../../context/AuthContext.jsx";
import { useFrase } from "./useFrasehook.js";
import { updateFrase } from "../../api/frases.api.js";
import { useParams } from "react-router-dom";
import { useModal } from "../../Stores/modalStore.ts";
const FrasesForm = () => {
  const { setLoader } = useAuth();
  const {setModal}= useModal()
  const params = useParams();
  const { frase } = useFrase(params.id);
  const [first, setfirst] = useState({
    texto: "",
  });

  const schema = Yup.object().shape({
    mensaje: Yup.string().matches(
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\d,.]+$/,
      "Solo se permiten letras y números"
    ),
  });

  const handleSubmit = async (values) => {
    try {
      setLoader(true);
      const response = await updateFrase(params.id,values);
      setModal({
        mensaje: `Frase actualizada`,
        activo: true,
      });
    } catch (error) {
      console.log(error);
    }
    setLoader(false);
  };

  return (
    <div className="p-2 mb-10">
      <Formik
        initialValues={first}
        onSubmit={handleSubmit}
        validationSchema={schema}
      >
        {({ isSubmitting, errors, values, handleChange }) => (
          <div>
            <Form className="z-0 mt-20 flex flex-col ">
              <div>
                <label className="block" htmlFor="mensajeActual">
                  Esta puesto : {frase.texto}{" "}
                </label>

                <label>
                  Frase nueva:
                  <input
                    type="text"
                    name="texto"
                    placeholder={frase.texto}
                    className="block border-2 border-gray-300 rounded-xl p-1 mb-2 w-full"
                    onChange={handleChange}
                    value={values.texto}
                  />
                  <MostrarErrorMessage campo={"texto"} errors={errors} />
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-fresa hover:bg-fresa-700 text-white font-bold py-2 px-4 rounded float-right"
              >
                Aceptar
              </button>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default FrasesForm;
