import React from "react";
import { CarritosProvaider } from "../context/CarritosContext";
import { Route, Routes } from "react-router-dom";

import VentasPage from "../pages/VentasPage";

const VentasRoutes = () => {
  return (
    <CarritosProvaider>
      <Routes>
        <Route path="/" element={<VentasPage />} />
      </Routes>
    </CarritosProvaider>
  );
};

export default VentasRoutes;
