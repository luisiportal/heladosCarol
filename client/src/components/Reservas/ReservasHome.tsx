import React from "react";
import BTN from "../HOME/Sabores/BTN";
import { Link } from "react-router-dom";

const ReservasHome = () => {
  return (
    <div className="m-2">

      <Link to={"/reservar"} className="flex flex-col items-center justify-center">
        <img
          className="rounded-lg mb-2"
          src="images/padres.jpg"
          alt="Feliciades Papá"
        />
        <BTN color={"#f9a217"} texto="Reservar" />
      </Link>
    </div>
  );
};

export default ReservasHome;
