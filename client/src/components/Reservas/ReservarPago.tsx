import EscojerMetodoPago from "../MetodosPago/EscojerMetodoPago";
import { useMetoPago } from "../../Stores/Pago.store";
import { useState } from "react";

const ReservarPago = () => {
  const { metoPago, setMetoPago } = useMetoPago();
  const [moneda, setMoneda] = useState("");

  return (
    <EscojerMetodoPago
      setMetoPago={setMetoPago}
      setMoneda={setMoneda}
     
    />
  );
};

export default ReservarPago;
