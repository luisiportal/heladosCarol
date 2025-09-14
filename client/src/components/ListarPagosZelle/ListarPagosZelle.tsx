import { useQuery } from "@tanstack/react-query";
import { getPagosRecibidosZelleRequest } from "../../api/venta.api";
import ArrowLeftSVG from "../SVG/ArrowLeftSVG";
import { Link } from "react-router-dom";
import { PagoZelle } from "../../types/General.types";
import ItemPagoCard from "./ItemPagoCard";
import Loader from "../Utilidades/Loader";

const ListarPagosZelle = () => {

  const { data,isLoading } = useQuery({
    queryKey: ["pagosrecibidoszelle"],
    queryFn: () => getPagosRecibidosZelleRequest(),
  });
 if (isLoading) return <Loader/>

  const pagosZelle = data ?? ([] as PagoZelle[]);
  console.log(pagosZelle);

  return (
    <div className=" w-full  pt-20 px-1 rounded-xl">
      <Link
        to={"/transacciones"}
        className="flex items-center gap-2 text-sm font-semibold"
      >
        {" "}
        <ArrowLeftSVG /> Facturas
      </Link>

      <div className="bg-white p-2 rounded-xl">
        <div className="flex gap-5 justify-between bg-vainilla rounded-xl p-2 font-bold">
          <h2>Enviado Por:</h2> <h2>Monto</h2>{" "}
        </div>
        {(pagosZelle as PagoZelle[]).map((pago, index) => (
          <ItemPagoCard pago={pago} key={index} />
        ))}
      </div>
    </div>
  );
};

export default ListarPagosZelle;
