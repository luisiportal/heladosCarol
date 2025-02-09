import React from "react";
import CartSVG from "../SVG/CartSVG";
import HomeSVG from "../SVG/HomeSVG";
import CallSVG from "../SVG/CallSVG";
import { useNavigate } from "react-router-dom";
import ItemPublicos from "./ItemPublicos";
import ItemsAdministrador from "./ItemsAdministrador";
import { useAuth } from "../../context/AuthContext";

const MenuAbajo = () => {
  const navigate = useNavigate();
  const { perfil } = useAuth();

  return (
    <div className="z-50 flex justify-center items-center gap-14 text-white  bg-fresa h-24 fixed bottom-0 mx-auto menuAbajo shadow-md border-slate-800">
      {perfil.privilegio === "Administrador" ? (
        <ItemsAdministrador navigate={navigate} />
      ) : (
        <ItemPublicos navigate={navigate} />
      )}
    </div>
  );
};

export default MenuAbajo;
