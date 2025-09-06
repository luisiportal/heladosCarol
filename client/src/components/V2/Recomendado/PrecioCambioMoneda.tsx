import { useMonedaStore } from "../../../Stores/MonedaStore";
import { Sabor } from "../../../types/General.types";

const PrecioCambioMoneda = ({ producto }: { producto: Sabor }) => {
  const { moneda } = useMonedaStore();

  const precio = moneda === "CUP" ? parseInt(producto?.precio_venta_cup.toString()) : producto?.precio_venta;

  return (
    <h2 className="font-bold text-4xl flex">
      {precio}
      <span className="font-semibold text-neutral-500 text-sm uppercase mt-1 ml-1">
        {moneda}
      </span>
    </h2>
  );
};

export default PrecioCambioMoneda;
