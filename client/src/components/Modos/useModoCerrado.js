import { useEffect, useState } from "react";
import { getModoCerradoRequest } from "../../api/modos.api";

export const useModocerrado = () => {
  const [modo, setModo] = useState({
    activado: false,
    mensaje: "",
  });

  useEffect(() => {
    const cargarModo = async () => {
      const response = await getModoCerradoRequest();
      setModo(response.data);
    };

    cargarModo();
  }, []);

  return { modo, setModo };
};
