import React from "react";
import TituloPagina from "./TituloPagina";

const Historia = () => {
  return (
    <div className="pt-16">
     
      <div className="px-6 m-4 pb-6 pt-2  text-slate-600 text-justify bg-white shadow-md rounded-xl leading-relaxed">
      <TituloPagina titulo={"Historia"} />
        <p>
          {" "}
          El <strong>11 de enero del 2020</strong> se realiza en nuestra familia la primera
          producción de helados, un momento lleno de emociones y esperanzas.
        </p>
        <p>
          {" "}
          Se había elaborado una mezcla en estado líquido que al ser procesada
          dio como resultado un producto maravilloso. Ese día, toda la
          producción se obsequió a la familia, vecinos, amistades y compañeros
          de trabajo, de la misma salieron varias experiencias...
        </p>
        <img className='justify-center rounded-xl object-cover object-center my-2 shadow-md' src="/images/lacream.jpeg" alt="Historia Helados Carol" />
        <p>
          {" "}
          En los inicios se produjo cajas de helado de 1 L, vasos y paletas. En
          el año 2022 se decide cambiar el formato y utilizar potes de 12 y 16
          onzas con el nombre "La crema". Los potes de helado gracias a la
          combinación de sus ingredientes (batidos de helado de Hotelsa y
          Vendiser), gozaron de la aceptación de todo el que lo degustó por su
          calidad y originalidad sin gluten.
        </p>

        <p>
          {" "}
          En el año 2023 inmersos en la mejora constante del proceso, se
          modernizó el equipamiento al adquirir una máquina automatica de hacer
          helados duro de alta calidad procedente de México. Además se diseñan y
          lanzan al mercado los primeros potes personalizados bajo la marca 
          <strong> Helados Carol</strong>, bujía inspiradora que hace posible trabajar
          constantemente pensando en la mejora y la satisfacción de nuestros
          clientes, a los cuales agradecemos por su confianza y por ser parte de
          la familia de Helados Carol.
        </p>
      </div>
    </div>
  );
};

export default Historia;
