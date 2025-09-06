import { useState } from "react";
import { useCarritoStore } from "../../../Stores/CarritoStore";
import { useEntregaStore } from "../../../Stores/EntregaStore";
import EntregaREviusarSection from "./EntregaREviusarSection";
import MetodosPago from "./MetodosPago/MetodosPago";
import PRoductosRevisarSection from "./PRoductosRevisarSection";
import { useMonedaStore } from "../../../Stores/MonedaStore";
import { useModal } from "../../../Stores/modalStore";
import { Link } from "react-router-dom";
import ArrowLeftSVG from "../../SVG/ArrowLeftSVG";
import ArrowRight from "../../SVG/ArrowRight";
import { createVentaRequest } from "../../../api/venta.api";
import { calcTotalProducto } from "../../../utils/util";
import { tropiPayFeeGet } from "../../Ventas/tropiPayFeeGet";
import { useLoader } from "../../../Stores/loaderStore";

const RevisarPedidoPage = () => {
  const { setLoader } = useLoader();
  const { entrega } = useEntregaStore();
  const { productosCarrito,setProductosCarrito } = useCarritoStore();
  const { moneda } = useMonedaStore();
  const [zelleOk, setZelleok] = useState(false);
  const { setModal } = useModal();
  const envio =
    moneda === "CUP" ? entrega.reparto.costo_cup : entrega.reparto.costo;

  const totalProductos = calcTotalProducto(productosCarrito, moneda);
  const productos_envio = Number(totalProductos) + Number(envio);
  const granTotalFactura = productos_envio.toFixed(2);
  const [payLink, setPayLink] = useState({
    reference: "",
    shortUrl: "",
  });
  const getPasarela = () => {
    switch (moneda) {
      case "USD":
        return "Zelle";
      case "CUP":
        return "CUP";
      case "EUR":
        return "TropiPay";
    }
  };

  const pasarela = getPasarela();

  const enviarFactura = async () => {
    if (moneda === "USD" && !zelleOk) {
      return setModal({
        mensaje:
          "Si usted ya realizó el pago por Zelle marque la casilla de Pago realizado y presione Enviar",
        activo: true,
        errorColor: true,
      });
    }

    const ventaCompleta = {
      productos: productosCarrito,
      moneda: moneda,
      entrega: entrega,
      pasarela: pasarela,
      reference: payLink.reference,
      granTotalFactura: granTotalFactura,
      tropiPayFee:
        pasarela === "TropiPay" ? tropiPayFeeGet(granTotalFactura) : 0,
    };

    try {
      const venta = await createVentaRequest(ventaCompleta);

      setModal({
        mensaje: venta.data.message,
        activo: true,
        navegarA: "/",
      });
      setProductosCarrito([])
      localStorage.removeItem("entrega");
      localStorage.removeItem("carrito");
    } catch (error) {
      console.log(error);
      return setModal({
        mensaje: error.response.data.message,
        activo: true,
        errorColor: true,
      });
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="bg-vainilla rounded-xl p-3 pt-20 text-left align-middle text-slate-700 font-semibold h-fit pb-28">
      <div className="bg-neutral-200 p-2 rounded-xl">
        <PRoductosRevisarSection
          granTotalFactura={granTotalFactura}
          productosCarrito={productosCarrito}
          envio={envio}
        />
        <EntregaREviusarSection entrega={entrega} />
      </div>
      <MetodosPago
        setZelleok={setZelleok}
        total={granTotalFactura}
        payLink={payLink}
        setPayLink={setPayLink}
      />
      <div className="flex justify-between">
        {" "}
        <Link
          to={"/carrito"}
          className="flex gap-2 items-center bg-neutral-300 rounded-xl text-black font-bold h-10 w-24  p-2 "
        >
          <ArrowLeftSVG />
          <button>Carrito</button>
        </Link>
        <button
          type="button"
          className="flex gap-2 items-center justify-center bg-fresa rounded-xl text-black font-bold w-40 h-10  p-2 "
          onClick={() => enviarFactura()}
        >
          Enviar Pedido <ArrowRight />
        </button>
      </div>
    </div>
  );
};
export default RevisarPedidoPage;
