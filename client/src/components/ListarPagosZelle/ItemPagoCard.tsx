import { useState } from "react";
import { PagoZelle } from "../../types/General.types";
import CheckSVG from "../SVG/CheckSVG";
import LinkSVG from "../SVG/LinkSVG";
import { asociarPagoZelleRequest } from "../../api/venta.api";
import { useModal } from "../../Stores/modalStore";
import { useLoader } from "../../Stores/loaderStore";

const ItemPagoCard = ({ pago }: { pago: PagoZelle }) => {
      const { setModal } = useModal();
  const { setLoader } = useLoader();
  const [facturaID, setFacturaID] = useState(0);


  const [showInput, setShowInput] = useState(false);

  const asociarPago = async () => {
    try {
      setLoader(true);
      const response = await asociarPagoZelleRequest({
        id_factura: facturaID,
        persona: pago.personaRecibido,
        monto: pago.montoRecibido,
        transaction_number: pago.transaction_number,
      });

      setModal({
        mensaje: response.data.message,
        activo: true,
        navegarA:"/transacciones"
      });
    } catch (error) {
        console.log(error);
        
      setModal({
        mensaje: error.response.data.message,
        activo: true,
        errorColor: true,
      });
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="bg-neutral-200 rounded-lg p-2 my-5">
      <h2 className="font-light">{pago.fecha}</h2>
      <div className="flex justify-between  ">
        <h2 className="w-52 font-bold">{pago.personaRecibido}</h2>
        <h2 className="font-bold">{pago.montoRecibido} USD</h2>
      </div>
      <div className="flex items-center gap-1">
        {" "}
        <h2 className="text-xs">{pago.utilizado}</h2>
        {pago.utilizado === "Sin asociar" && showInput === false && (
          <button
            onClick={() => setShowInput(true)}
            title="Asociar a Factura"
            className="hover:bg-vainilla rounded-full p-1"
          >
            <LinkSVG />
          </button>
        )}
        {showInput && (
          <div className=" flex items-center gap-1">
            <input
              onChange={(e) => setFacturaID(Number(e.target.value))}
              title="ID Factura"
              type="number"
              className="rounded-md w-14 h-5 p-1 text-center"
            />
            <button
              title="Aceptar"
              className="hover:bg-vainilla rounded-full p-1"
              onClick={() => asociarPago()}
            >
              <CheckSVG />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemPagoCard;
