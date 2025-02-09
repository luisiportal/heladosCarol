import React, { useEffect, useState } from "react";
import SeccionAgregarSabores from "./SeccionAgregar/SeccionAgregarSabores";
import SeccionSaboresCarrito from "./SeccionAgregar/SeccionSaboresCarrito";
import { useCarritos } from "../../context/CarritosContext";
import { useAuth } from "../../context/AuthContext";

import EntregaYenviaForm from "./SeccionAgregar/Entrega/EntregaYenviaForm";
import Horario from "../Horario/Horario";
import { useParams } from "react-router-dom";
import EscojerMetodoPago from "../MetodosPago/EscojerMetodoPago";
import { useMetoPago } from "../../Stores/Pago.store";

const ComprarPage = () => {
  const { recargar, carrito, setCarrito } = useCarritos();
  const { loader, setLoader, setModalActivo } = useAuth();
  const [navegacion, setNavegacion] = useState(0);
  const { metoPago, setMetoPago } = useMetoPago();
  const params = useParams();

  useEffect(() => {
    if (params.id == 3) {
      setNavegacion(3);
      setModalActivo({
        mensaje: "Su orden ha sido creada",
        activo: true,
        navegarA: "/",
      });
    }
    if (params.id == 0) {
      setNavegacion(3);
      setModalActivo({
        mensaje: "No se pudo validar el pago",
        activo: true,
        navegarA: "/",
      });
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
    <div className="mb-40">
      Comprar
      {navegacion == 0 && (
        <EscojerMetodoPago
          setNavegacion={setNavegacion}
          setMetoPago={setMetoPago}
        />
      )}
      {navegacion == 1 && (
        <>
          <Horario />
          <SeccionAgregarSabores
            recargar={recargar}
            setLoader={setLoader}
            carrito={carrito}
            setCarrito={setCarrito}
            setModalActivo={setModalActivo}
            metoPago={metoPago}
          />
          <SeccionSaboresCarrito
            carrito={carrito}
            loader={loader}
            setCarrito={setCarrito}
            setNavegacion={setNavegacion}
            metoPago={metoPago}
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
          metoPago={metoPago}
          setMetoPago={setMetoPago}
        />
      )}
    </div>
  );
};

export default ComprarPage;
