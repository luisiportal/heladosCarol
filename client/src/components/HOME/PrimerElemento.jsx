import React from "react";
import ImagenPrincipal from "./ImagenPrincipal";
import { useFrase } from "../Frases/useFrasehook"; 

const PrimerElemento = () => {
  const {frase} = useFrase(1);

  return (
    <div className="flex justify-center mt-4">
      <h2 className=" flex font-irish text-xl bordeFrase border-spacing-14 mx-2">
        {frase.texto}
      </h2>
      <ImagenPrincipal />
    </div>
  );
};

export default PrimerElemento;
