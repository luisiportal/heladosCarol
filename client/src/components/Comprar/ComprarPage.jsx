import React, { useState } from "react";
import SeccionAgregarSabores from "./SeccionAgregar/SeccionAgregarSabores";
import SeccionSaboresCarrito from "./SeccionAgregar/SeccionSaboresCarrito";
import { useCarritos } from "../../context/CarritosContext";
import { useAuth } from "../../context/AuthContext";

import RevisarPedido from "./SeccionAgregar/Entrega/RevisarPedido";
import EntregaYenviaForm from "./SeccionAgregar/Entrega/EntregaYenviaForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51PjYBu05bt2PGEkzmE9c5okzdM7GZ5kBLlu3HD7ywTOtuMXKrg9UcSWIxk8izXMc5G9tEpBnxYL0WltTmve3Iwfx00zn0OMthG"
);
const ComprarPage = () => {
  const { recargar, carrito, setCarrito } = useCarritos();
  const { loader, setLoader, setModalActivo } = useAuth();
  const [navegacion, setNavegacion] = useState(1);

  const [entrega, setEntrega] = useState({
    ordenante: "",
    beneficiario: "",
    tel_beneficiario: "",
    direccion: "",
    p_referencia: "",
  });
  return (
    <div>
      Comprar
      {navegacion == 1 && (
        <>
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
      {navegacion == 2 && (
        <Elements stripe={stripePromise}>
          <EntregaYenviaForm
            setNavegacion={setNavegacion}
            entrega={entrega}
            setEntrega={setEntrega}
            setLoader={setLoader}
            carrito={carrito}
            setModalActivo={setModalActivo}
            setCarrito={setCarrito}
            loader={loader}
          />
        </Elements>
      )}
      {navegacion == 3 && <RevisarPedido carrito={carrito} entrega={entrega} />}
    </div>
  );
};

export default ComprarPage;
