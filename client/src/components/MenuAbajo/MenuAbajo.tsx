import React from "react";
import { useNavigate } from "react-router-dom";
import ItemPublicos from "./ItemPublicos";
import ItemsAdministrador from "./ItemsAdministrador";
import { useAuth } from "../../context/AuthContext";

const MenuAbajo = ({ carrito }) => {
  const navigate = useNavigate();
  const { perfil } = useAuth();

  return (
    <div className="z-50 flex justify-center items-center gap-14 text-white  bg-fresa h-20 fixed bottom-0 mx-auto menuAbajo shadow-md border-slate-800">
      {perfil.privilegio === "Administrador" ? (
        <ItemsAdministrador navigate={navigate} />
      ) : (
        <ItemPublicos navigate={navigate} carrito={carrito} />
      )}
    </div>
  );
};

export default MenuAbajo;
