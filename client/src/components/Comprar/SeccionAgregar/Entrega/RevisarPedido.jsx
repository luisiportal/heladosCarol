import React from "react";
import FacturaCard from "../../../Ventas/FacturaCard";
import MostrarErrorMessage from "../../../ValidacionForm/MostrarErrorMessage";
import { grandTotalFactura } from "../../../../utils/grandTotalFactura";
import Zelle from "../../../MetodosPago/Zelle";
import Tropipay from "../../../MetodosPago/Tropipay";
import { useParams } from "react-router-dom";
import MonedaNacional from "../../../MetodosPago/MonedaNacional";

const RevisarPedido = ({
  carrito,
  entrega,
  errors,
  file,
  setZelleok,
  zelleOk,
  metoPago,
  setPayLink,
  payLink,
}) => {
  const params = useParams();
  let totalLocal = 0;
  if (carrito) {
    totalLocal = carrito.reduce(
      (sum, producto) => sum + producto.precio_venta * producto.cantidad,
      0
    );
  }

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

  const handleChangePagoZelle = (e) => {
    console.log(e.target.checked);
    if (!e.target.checked) {
      setZelleok("");
    } else {
      setZelleok("ZelleOk");
    }
  };

  return (
    <div>
      <FacturaCard factura={factura} total={total.toFixed(2)} file={file} />

      {params.id == 3 ? (
        "Pago por TropiPay Correcto"
      ) : (
        <>
          <section>
            {metoPago == "CUP" && <MonedaNacional total={total} />}
            {metoPago == "TropiPay" && (
              <Tropipay
                total={total}
                description={description.toString()}
                setPayLink={setPayLink}
                payLink={payLink}
              />
            )}
            {metoPago == "Zelle" && (
              <>
                <Zelle total={total} />
                <div className="bg-fresa rounded-lg p-5 m-2 mt-5 text-white font-semibold ">
                  <h2>
                    Marque la casilla si ya realizó el pago de{" "}
                    <span className="font-bold">{total.toFixed(2)} USD</span>{" "}
                    por Zelle a
                    <span className="m-1 font-semibold text-slate-800">
                      heladoscarol@gmail.com
                    </span>
                  </h2>
                  <div className="flex justify-center">
                    {" "}
                    <input
                      className="w-8 h-8 items-center"
                      type="checkbox"
                      name="zelleOk"
                      onChange={handleChangePagoZelle}
                    />
                  </div>
                </div>
              </>
            )}
          </section>
        </>
      )}

      <MostrarErrorMessage campo={"ruta_image"} errors={errors} />
    </div>
  );
};

export default RevisarPedido;
