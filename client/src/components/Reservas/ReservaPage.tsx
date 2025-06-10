import { getTodosReservasRequest } from "../../api/reservas.api";
import ResumenVenta from "../Ventas/ResumenVenta";
import EstadisticaReserva from "./EstadisticaReserva";

const ReservaPage = () => {
  return (
    <div>
      <ResumenVenta getFacturas={getTodosReservasRequest} />
    </div>
  );
};

export default ReservaPage;
