import React from "react";
import { useNavigate } from "react-router-dom";
import BTN from "./BTN";

const BTN_Comprar = ({color}) => {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate("/comprar")}>
      <BTN  color={color}/>
    </button>
  );
};

export default BTN_Comprar;
