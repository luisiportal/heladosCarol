import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

// Define el tipo de la función recursoRequest

// Hook personalizado useRequest
export const useRequest = (recursoRequest, limit) => {
  const [recurso, setRecurso] = useState([]);
  const { loader, setLoader} = useAuth();


  useEffect(() => {
    const cargarRecurso = async () => {
      try {
        setLoader(true);
        const { data } = await recursoRequest(limit);
        setRecurso(data);
      } catch (error) {
        console.error("Error al cargar el recurso:", error);
      } finally {
        setTimeout(() => setLoader(false), 700 );
      }
    };
    cargarRecurso();
  }, [recursoRequest]);

  return recurso;
};
