import React from "react";
import PotesCard from "./PotesCard";
import TituloModulo from "../DesingSystem/TituloModulo";
import { Sabor } from "../../../types/General.types";

const PotesAgotados = () => {
 const sabores: Sabor[] = [
  {
    id_sabor: "fresa01",
    nombre_sabor: "Fresa",
    categoria: "Frutal",
    color: "#ff4d6d",
    reservar: false,
    existencia: 120,
    ruta_image: "/images/fresa.png",
    costo_unitario: 0.85,
    precio_venta: 0.85,
    precio_venta_cup: 255,
    home_img: "/home/fresa.jpg",
    envase: "4L",
    stockMinimo: 20,
    description: "Helado cremoso de fresa natural con trozos suaves.",
    nuevo: true,
  },
  {
    id_sabor: "choco01",
    nombre_sabor: "Chocolate",
    categoria: "Clásico",
    color: "#4b2e2e",
    reservar: false,
    existencia: 95,
    ruta_image: "/images/chocolate.png",
    costo_unitario: 0.85,
    precio_venta: 0.85,
    precio_venta_cup: 255,
    home_img: "/home/chocolate.jpg",
    envase: "4L",
    stockMinimo: 25,
    description: "Chocolate intenso con textura suave y cobertura ligera.",
    nuevo: false,
  },
  {
    id_sabor: "vainilla01",
    nombre_sabor: "Vainilla",
    categoria: "Clásico",
    color: "#f3e5ab",
    reservar: false,
    existencia: 110,
    ruta_image: "/images/vainilla.png",
    costo_unitario: 0.85,
    precio_venta: 0.85,
    precio_venta_cup: 255,
    home_img: "/home/vainilla.jpg",
    envase: "4L",
    stockMinimo: 20,
    description: "Vainilla cremosa con aroma natural y textura ligera.",
    nuevo: false,
  },
];


  return (
    <section>
      <TituloModulo titulo={"Potes de Helado"} />
      <section className="w-full overflow-x-auto relative pointer-events-none">
        <div className="flex gap-3 w-max pb-2">
          {sabores.map((sabor) => (
            <PotesCard
              sabor={sabor}
              key={sabor.id_sabor}
              css="w-[132px] h-48"
            />
          ))}

          <div className="absolute left-1/2 top-8 -translate-x-1/2  p-2 font-bold text-white    bg-red-500 rounded-xl w-60 text-center">
            Agotados por alta demanda. Estamos trabajando para volver a servirte.
            <h4 className="font-light text-xs text-right">
              volvemos mañana...Gracias
            </h4>
          </div>
        </div>
      </section>
    </section>
  );
};

export default PotesAgotados;
