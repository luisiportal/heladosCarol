import { useCarritoStore } from "../../../../Stores/CarritoStore";
import { useEntregaStore } from "../../../../Stores/EntregaStore";
import { useMonedaStore } from "../../../../Stores/MonedaStore";
import MonedaNacional from "../../../MetodosPago/MonedaNacional";
import Tropipay from "../../../MetodosPago/Tropipay";
import Zelle from "../../../MetodosPago/Zelle";

const MetodosPago = ({
  setZelleok,
  total,
  payLink,
  setPayLink,
  fnTropipay
}: {
  fnTropipay:any;
  total: string;
  setZelleok: React.Dispatch<React.SetStateAction<boolean>>;
  payLink: {
    reference: string;
    shortUrl: string;
  };
  setPayLink: React.Dispatch<
    React.SetStateAction<{
      reference: string;
      shortUrl: string;
    }>
  >;
}) => {
  const { moneda } = useMonedaStore();
  const { productosCarrito } = useCarritoStore();
  const { entrega } = useEntregaStore();

  const description =
    productosCarrito.map(
      (item) => `${item.cantidad} x ${item.producto.nombre_sabor}`
    ) +
    " Envío: " +
    entrega.reparto.costo +
    " EUR ";

  return (
    <div className="mt-4">
      {moneda === "USD" && <Zelle total={total} setZelleok={setZelleok} />}
      {moneda === "CUP" && <MonedaNacional total={total} />}
      {moneda === "EUR" && (
        <Tropipay
        onClick={fnTropipay}
          description={description.toString()}
          payLink={payLink}
          setPayLink={setPayLink}
          total={total}
        />
      )}
    </div>
  );
};

export default MetodosPago;
