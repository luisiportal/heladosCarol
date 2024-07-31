import { useContext, useState } from "react";
import { SaboresContext } from "./SaboresContext";
import {
  cargarPlantillaTrabajadores,
  deleteTrabajadorRequest,
} from "../api/login.api";
import {
  createSaborRequest,
  deleteSaborRequest,
  getSaboresRequest,
  getSaborRequest,
  updateSaborRequest,
} from "../api/sabores.api";

export const useSabores = () => {
  const context = useContext(SaboresContext);
  if (!context === undefined) {
    throw new Error("No hay contexto provider");
  }
  return context;
};

export const SaboresContextProvider = ({ children }) => {
  const [sabores, setSabores] = useState([]);
  const [trabajadores, setTrabajadores] = useState([]);

  async function loadTrabajadores() {
    const response = await cargarPlantillaTrabajadores();
    setTrabajadores(response.data);
  }

  const deleteTrabajador = async (id) => {
    try {
      const response = await deleteTrabajadorRequest(id);
      setTrabajadores(
        trabajadores.filter((trabajador) => trabajador.id_trabajador !== id)
      );

      setModalActivo({
        mensaje: "Se ha eliminado el trabajador correctamente",
        activo: true,
        errorColor: true,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const loadSabores = async () => {
    console.log("llamado");
    const response = await getSaboresRequest();
    console.log(response);
    setSabores(response.data);
  };

  const deleteSabor = async (id_sabor) => {
    try {
      const response = await deleteSaborRequest(id_sabor);
      setSabores(sabores.filter((sabor) => sabor.id_sabor !== id_sabor));
    } catch (error) {
      console.error(error);
    }
  };
  const createSabor = async (formData) => {
    try {
      await createSaborRequest(formData);
      // setTasks([...tasks, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const getSabor = async (id_sabor) => {
    try {
      const response = await getSaborRequest(id_sabor);

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateSabor = async (id_sabor, formData) => {
    try {
      const response = await updateSaborRequest(id_sabor, formData);

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SaboresContext.Provider
      value={{
        loadSabores,
        sabores,
        setSabores,
        createSabor,
        deleteSabor,
        getSabor,
        updateSabor,
        deleteTrabajador,
        loadTrabajadores,
        trabajadores,
        setSabores,
      }}
    >
      {children}
    </SaboresContext.Provider>
  );
};
