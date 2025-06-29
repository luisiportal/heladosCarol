import { useParams } from "react-router-dom";
import LayoutPrincipal from "../../Layouts/LayoutPrincipal";
import { precioMoneda } from "../Comprar/SeccionAgregar/Entrega/precioMoneda";
import BTN_MePago from "./BTN_MePago";

const EscojerMetodoPago = ({ setNavegacion, setMetoPago, setMoneda }) => {
    const params = useParams();
  const reservando = params.metodo
  const handleMetoPago = async (metodo) => {
    setMetoPago(metodo);
    setMoneda(precioMoneda(metodo));
   setNavegacion(!reservando ? 1 : 2);

  };

  return (
    <LayoutPrincipal titulo={"Método de Pago"}>
      <h2 className="flex justify-center text-slate-700 font-semibold">
        Por favor escoja el método de pago de su preferencia
      </h2>{" "}
      <section className="flex flex-col  items-center gap-4 justify-center mt-4 my-4 h-60">
        <BTN_MePago
          name={"Zelle"}
          imagen={"zelle.png"}
          onclick={() => handleMetoPago("Zelle")}
        />

        <BTN_MePago
          name={"TropiPay"}
          imagen={"tropipay.jpg"}
          onclick={() => handleMetoPago("TropiPay")}
        />
        <BTN_MePago
          name={"Moneda Nacional CUP"}
          imagen={"billete500cup.jpg"}
          onclick={() => handleMetoPago("CUP")}
        />
      </section>
    </LayoutPrincipal>
  );
};

export default EscojerMetodoPago;
