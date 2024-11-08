import React from "react";
import FacturaCard from "../../../Ventas/FacturaCard";
import MostrarErrorMessage from "../../../ValidacionForm/MostrarErrorMessage";
import { grandTotalFactura } from "../../../../utils/grandTotalFactura";
import BTN_MePago from "../../../MetodosPago/BTN_MePago";
import Zelle from "../../../MetodosPago/Zelle";
import Tropipay from "../../../MetodosPago/Tropipay";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../../context/AuthContext";

const RevisarPedido = ({
  carrito,
  entrega,
  errors,
  file,
  setMetoPago,
  metoPago,
  setPayLink,
}) => {
  const { perfil } = useAuth();
  const params = useParams();
  let totalLocal = 0;
  if (carrito) {
    totalLocal = carrito.reduce(
      (sum, producto) => sum + producto.precio_venta * producto.cantidad,
      0
    );
  }

  const handleMetoPago = (metodo) => {
    setMetoPago(metodo);
    console.log(metodo);
  };

  const factura = {
    ventas: carrito,
    entrega,
    total_venta: totalLocal,
  };

  const total = grandTotalFactura(factura.total_venta, factura.entrega.envio);
  const envio = entrega.envio;
  const sabores = carrito.map(
    (item) => item.cantidad + "x " + item.nombre_sabor
  );
  const description = sabores + " Envio: " + envio;
  console.log(description);

  return (
    <div>
      <FacturaCard factura={factura} total={total.toFixed(2)} file={file} />

      {params.id == 3 ? (
        "Pago por TropiPay Correcto"
      ) : (
        <>
          {" "}
          <h2 className="flex justify-center text-slate-700 font-semibold">
            Escoja el método de pago de su preferencia
          </h2>{" "}
          <section className="flex gap-4 justify-center mt-2">
            <BTN_MePago
              name={"Zelle"}
              imagen={"zelle.png"}
              onclick={() => handleMetoPago("Zelle")}
            />
            {perfil.privilegio == "Administrador" && (
              <BTN_MePago
                name={"TropiPay"}
                imagen={"tropipay.jpg"}
                onclick={() => handleMetoPago("TropiPay")}
              />
            )}
          </section>
          <section>
            {metoPago == "TropiPay" ? (
              <Tropipay
                total={total}
                description={description.toString()}
                setPayLink={setPayLink}
              />
            ) : (
              <Zelle total={total} />
            )}
          </section>
        </>
      )}

      <MostrarErrorMessage campo={"ruta_image"} errors={errors} />
    </div>
  );
};

export default RevisarPedido;
