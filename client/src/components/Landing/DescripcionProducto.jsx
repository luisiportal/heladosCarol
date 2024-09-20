import React from "react";
import TituloPagina from "./TituloPagina";

const DescripcionProducto = () => {
  return (
    <div className=" pt-16">
  <div className="px-6 m-4 pb-6 pt-2  text-slate-600 text-justify bg-white shadow-md rounded-xl flex flex-col leading-relaxed">
  <TituloPagina titulo={"Descripción Producto"} />
 
      <p>
        Producimos un excelente helado con materias primas importadas y
        garantizadas.Helados Carol se distingue por su cremosidad, agradable
        textura y su exquisito sabor. 
      </p>
      <img className='justify-center rounded-xl object-cover object-center my-2 shadow-lg' src="/images/descripcionproducto.jpeg" alt="Proceso de elboración" />
      <p>Se elabora con tecnología original y el
        proceso consta de varias fases: mezclado, homogenizado, pasteurizado,
        madurado y batido, que resultan en un producto final con la calidad que
        nos caracteriza. </p>
        <p>Se trabaja con dedicación, amor y esmero pensando
        siempre en la satisfacción del cliente principalmente de nuestros niños
        y ancianos.</p>
   </div>
    </div>
  );
};

export default DescripcionProducto;
