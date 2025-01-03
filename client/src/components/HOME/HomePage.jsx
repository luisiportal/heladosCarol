import React, { useEffect } from "react";

import PrimerElemento from "./PrimerElemento";
import Carrusel from "./Carrusel";
import Reviews from "./Reviews";
import Footer from "./Footer";
import Sabores from "./Sabores";
import MensajeCerrado from "../Modos/MensajeCerrado";
import { useModocerrado } from "../Modos/useModoCerrado";
import Horario from "../Horario/Horario";
import { suscribeRequest } from "../../api/notifications";

const HomePage = () => {
  const { modo } = useModocerrado();

  return (
    <div className="pt-10  mx-auto max-w-sm">
      <Horario />
      <PrimerElemento />

      {modo.activado == true ? <MensajeCerrado modo={modo} /> : <Sabores />}

      <Carrusel />
      <Reviews />
      <Footer />
    </div>
  );
};

export default HomePage;
