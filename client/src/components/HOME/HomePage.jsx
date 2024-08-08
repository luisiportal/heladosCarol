import React, { useEffect, useState } from "react";

import PrimerElemento from "./PrimerElemento";
import Carrusel from "./Carrusel";
import Reviews from "./Reviews";
import Footer from "./Footer";
import Sabores from "./Sabores";


const HomePage = () => {
  return (
    <div className="pt-10 mt-4 mx-auto max-w-sm">
      <PrimerElemento />

      <Sabores />
      <Carrusel />
      <Reviews />
      <Footer />
    </div>
  );
};

export default HomePage;
