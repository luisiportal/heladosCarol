import React, { useEffect, useState } from "react";

import PrimerElemento from "./PrimerElemento";
import Carrusel from "./Carrusel";
import Reviews from "./Reviews";
import Footer from "./Footer";
import Sabores from "./Sabores";

const HomePage = () => {
  return (
    <div className="pt-10 mt-4 mx-2">
      <PrimerElemento />
      <Carrusel />
      <Sabores />
      <Reviews />
      <Footer />
    </div>
  );
};

export default HomePage;
