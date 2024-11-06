import React, { useEffect, useState } from "react";
import SeccionAgregarSabores from "./SeccionAgregar/SeccionAgregarSabores";
import SeccionSaboresCarrito from "./SeccionAgregar/SeccionSaboresCarrito";
import { useCarritos } from "../../context/CarritosContext";
import { useAuth } from "../../context/AuthContext";

import EntregaYenviaForm from "./SeccionAgregar/Entrega/EntregaYenviaForm";
import Horario from "../Horario/Horario";
import { useParams } from "react-router-dom";

const ComprarPage = () => {
  const { recargar, carrito, setCarrito } = useCarritos();
  const { loader, setLoader, setModalActivo } = useAuth();
  const [navegacion, setNavegacion] = useState(1);

  const params = useParams();

  useEffect(() => {
    console.log(params);
    
    if (params.id == 3) {
      setNavegacion(3);
    }
  }, []);

  const [entrega, setEntrega] = useState({
    ordenante: "",
    contacto_ordenante: "",
    beneficiario: "",
    tel_beneficiario: "",
    direccion: "",
    calle: "",
    numero: "",
    calle1: "",
    calle2: "",
    reparto: "",
    p_referencia: "",
    observaciones: "",
  });

  return (
    <div className="pt-10">
      Comprar
      {navegacion == 1 && (
        <>
          <Horario />
          <SeccionAgregarSabores
            recargar={recargar}
            setLoader={setLoader}
            carrito={carrito}
            setCarrito={setCarrito}
            setModalActivo={setModalActivo}
          />
          <SeccionSaboresCarrito
            carrito={carrito}
            loader={loader}
            setCarrito={setCarrito}
            setNavegacion={setNavegacion}
          />
        </>
      )}
      {navegacion != 1 && (
        <EntregaYenviaForm
          navegacion={navegacion}
          setNavegacion={setNavegacion}
          entrega={entrega}
          setEntrega={setEntrega}
          setLoader={setLoader}
          carrito={carrito}
          setModalActivo={setModalActivo}
          setCarrito={setCarrito}
          loader={loader}
        />
      )}
    </div>
  );
};

export default ComprarPage;
