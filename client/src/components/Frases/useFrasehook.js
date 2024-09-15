import { useEffect, useState } from "react";
import { get1Frase } from "../../api/frases.api";

export const useFrase = (id) => {
  const [frase, setFrase] = useState({
    texto: "",
  });

  useEffect(() => {
    const cargarFrase = async () => {
      try {
        const response = await get1Frase(id);

        setFrase(response.data);
      } catch (error) {
        console.log(error);
        
      }
    };
    cargarFrase();
  }, []);

  return { frase, setFrase };
};
