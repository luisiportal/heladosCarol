import React, { useEffect } from "react";
import Carrusel from "./Carrusel";
import Reviews from "./Reviews";
import Footer from "./Footer";
import Sabores from "./Sabores";
import MensajeCerrado from "../Modos/MensajeCerrado";
import { useModocerrado } from "../Modos/useModoCerrado";
import Horario from "../Horario/Horario";
import SliderBanner from "../HeroSlider/SliderBanner.tsx";
import PrimerElemento from "./PrimerElemento.jsx";
import ReservasHome from "../Reservas/ReservasHome.tsx";

const HomePage = () => {
  const { modo } = useModocerrado();

  return (
    <div className="pt-10  mx-auto max-w-sm">
      <Horario />
      <ReservasHome/>
      <SliderBanner/>

      {modo.activado == true ? <MensajeCerrado modo={modo} /> : <Sabores />}
      <Carrusel />

      <Reviews />
      <Footer />
    </div>
  );
};

export default HomePage;
