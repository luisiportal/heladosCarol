import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import { loginRequest } from "../../api/login.api";
import MostrarErrorMessage from "../ValidacionForm/MostrarErrorMessage";
import Loader from "../Utilidades/Loader";
import {
  readLocalStorage,
  writeLocalStorage,
} from "../../hooks/useLocalStorage";
import ActivarDesactModo from "../ModoOffline/ActivarDesactModo";
import ImagenPrincipal from "../HOME/ImagenPrincipal";

const Login = () => {
  const {
    isAuthenticated,
    errors,
    login,
    loader,
    setLoader,
    isOnline,
    setIsOnline,
    setIsAuthenticated,
  } = useAuth();
  const [credencial_invalida, setCredencial_invalida] = useState(null);
  const { setModalActivo, modalActivo } = useAuth();

  useEffect(() => {}, [isAuthenticated]);
  return (
    <div>
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={Yup.object({
          username: Yup.string()
            .required("Campo requerido")
            .max(20, "Credencial incorrecta"),
          password: Yup.string()
            .required("Campo requerido")
            .max(20, "Credencial incorrecta")
            .matches(/^[a-zA-Z0-9-. ]*$/, "Solo se permiten letras y números"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            setLoader(true);
            const response = await loginRequest(values);

            if (response.status != 200) {
              setLoader(false);
              throw new Error("No hay conexión");
            } else {
              writeLocalStorage("user", response.data);
              login(response.data);
              setIsAuthenticated(true);
              //descargarTodos(); // alamcena en el local storage los datos para que esten disponibles sin conexion
              setLoader(false);
            }
          } catch (error) {
            console.log(error);
            
            setLoader(false);

            if (error.message.includes("Network Error")) {
              setModalActivo({
                mensaje: "No hay conexión",
                activo: true,
                errorColor: true,
              });

              let modoSinConexion = confirm(
                "¿Quieres activar el modo sin conexión?"
              );

              if (modoSinConexion) {
                setIsOnline(false);

                setModalActivo({
                  mensaje: "Modo sin conexión activado",
                  activo: true,
                  errorColor: true,
                });
              } else {
                setIsOnline(true);
              }

              return;
            }

            if (error.response.status === 400) {
              setCredencial_invalida("Credenciales inválidas");
            } else if (error.message === "No hay conexión") {
              setCredencial_invalida("No hay conexión con el servidor");
            }
            setTimeout(() => {
              setCredencial_invalida(null);
            }, 2000);

            console.error(error);
          }
        }}
      >
        {({ isSubmitting, errors, handleChange }) => (
          <Form>
            <div className="h-screen ">
              <section className="w-full">
                <ImagenPrincipal />
                <div>
                  <div className="flex flex-col items-center mt-5 p-5 gap-3">
                    <h2 className="font-irish font-bold text-2xl">Entrar</h2>{" "}
                    <input
                      className="bg-neutral-200 rounded-md  placeholder:text-black p-2"
                      type="text"
                      name="username"
                      placeholder="Usuario"
                      onChange={handleChange}
                    />
                    <MostrarErrorMessage campo={"username"} errors={errors} />
                    <input
                      className="bg-neutral-200 rounded-md  placeholder:text-black p-2"
                      type="password"
                      name="password"
                      placeholder="Contraseña"
                      onChange={handleChange}
                    />
                    <MostrarErrorMessage campo={"password"} errors={errors} />
                    {credencial_invalida && (
                      <span className="bg-red-500 p-1 m-1 rounded">
                        {credencial_invalida}
                      </span>
                    )}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-fresa rounded-md p-2 text-white font-semibold"
                    >
                      Iniciar sesión
                    </button>
                  </div>
                </div>
              </section>
              {loader && <Loader />}
            </div>
          </Form>
        )}
      </Formik>

      <ActivarDesactModo setIsOnline={setIsOnline} isOnline={isOnline} />
    </div>
  );
};

export default Login;
