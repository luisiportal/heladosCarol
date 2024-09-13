import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import { cargarPerfilRequest } from "../api/login.api";

const ProtectedRoutes = () => {
  const { loading, user, isAuthenticated, setPerfil } = useAuth();

  if (loading) return <h1>Cargando</h1>;
  useEffect(() => {
    const cargarPerfil = async () => {
      const { data } = await cargarPerfilRequest(user.id);
      setPerfil(data);
    };
    cargarPerfil();
  }, []);

  if (!isAuthenticated) return <Navigate to="/" replace />;

  return <Outlet></Outlet>;
};

export default ProtectedRoutes;
