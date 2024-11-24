import React, { createContext, useEffect } from "react";
import { useState, useContext } from "react";
import Cookies from "js-cookie";
import {
  cargarPerfilRequest,
  logoutRequest,
  registerRequest,
  verifyTokenRequest,
} from "../api/login.api";
import { readLocalStorage } from "../hooks/useLocalStorage";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within a AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [editando, setEditando] = useState();
  const [user, setUser] = useState(null);
  const [modalActivo, setModalActivo] = useState({
    mensaje: "",
    activo: false,
    navegarA: "",
    errorColor: false,
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [recargar, setRecargar] = useState(null);
  const [isOnline, setIsOnline] = useState(true);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(false);
  const [perfil, setPerfil] = useState({
    username: "",
    nombre: "",
    apellidos: "",
    movil: "",
    puesto: "",
  });

  const signup = async (formData) => {
    try {
      await registerRequest(formData);
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  const login = async (user) => {
    try {
      setLoader(true);
      setUser(user);

      const { data } = await cargarPerfilRequest(user.id_trabajador);
      setIsAuthenticated(true);

      setLoader(false);
      setPerfil(data);
    } catch (error) {
      console.log(error);
      setModalActivo({
        mensaje: error,
        activo: true,
        errorColor: true,
      });
    }
  };

  const cargarPerfil = async (id) => {
    try {
      const { data } = await cargarPerfilRequest(id);
      setPerfil(data);
    } catch (error) {
      console.log(error);
      localStorage.removeItem("user");
      return setModalActivo({
        mensaje: error,
        activo: true,
        errorColor: true,
      });
    }
  };

  const logout = async (user) => {
    try {
      setLoader(true);
      const res = await logoutRequest();
      localStorage.removeItem("user");
      setLoader(false);
      setUser(res.data);
      setIsAuthenticated(false);
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  useEffect(() => {
    async function checkLogin() {
      try {
        const userStorage = readLocalStorage("user");

        const res = await verifyTokenRequest({ token: userStorage.token });

        if (res.status != 200)
          return setModalActivo({
            mensaje: "No hay conexión",
            activo: true,
            errorColor: true,
          });
        if (!res.data) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        setIsAuthenticated(true);

        await cargarPerfil(res.data.id_trabajador);
        setUser(res.data);

        setLoading(false);
      } catch (error) {
        localStorage.removeItem("user");
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
      }
    }
    checkLogin();
  }, [isAuthenticated]);
  return (
    <AuthContext.Provider
      value={{
        signup,
        user,
        isAuthenticated,
        logout,
        errors,
        login,
        loading,
        setIsAuthenticated,
        cargarPerfil,
        setPerfil,
        perfil,
        loader,
        setLoader,
        isOnline,
        setIsOnline,
        modalActivo,
        setModalActivo,
        recargar,
        setRecargar,
        setEditando,
        editando,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
