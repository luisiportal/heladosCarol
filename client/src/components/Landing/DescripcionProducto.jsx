import React from "react";
import TituloPagina from "./TituloPagina";

const DescripcionProducto = () => {
  return (
    <div className=" pt-20">
       <TituloPagina titulo={"Descripción del Producto"}/>
   <div className="px-6  text-slate-600">
 
      <p>
        Producimos un excelente helado con materias primas importadas y
        garantizadas.Helados Carol se distingue por su cremosidad, agradable
        textura y su exquisito sabor. 
      </p>
      <img className='w-full h-80 rounded-xl object-cover object-center my-2' src="/images/descripcionproducto.jpg" alt="Proceso de elboración" />
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
