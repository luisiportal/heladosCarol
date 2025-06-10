import { getTodosReservasRequest } from "../../api/reservas.api";
import ResumenVenta from "../Ventas/ResumenVenta";

const ReservaPage = () => {
  return (
    <div>
      <ResumenVenta getFacturas={getTodosReservasRequest} estadistica={true} />
    </div>
  );
};

export default ReservaPage;
