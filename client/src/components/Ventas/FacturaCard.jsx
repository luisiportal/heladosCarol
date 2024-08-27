import { deleteFacturaRequest } from "../../api/venta.api";
import { useAuth } from "../../context/AuthContext";
import Edit from "../Movimientos/Edit";
import EditSVG from "../SVG/EditSVG";

import Bton_eliminar_producto from "./Bton_eliminar_producto";
import SaboresFactura from "./CardFacturaItems/SaboresFactura";
import TotalFactura from "./CardFacturaItems/TotalFactura";
import EditFechaFactura from "./EditFechaFactura";

function FacturaCard({ factura, setRecargarFactura, setRecargar, recargar }) {
  const { ventas } = factura;
  const { setModalActivo, modalActivo, editando, setEditando, perfil } =
    useAuth();

  const handleEliminar = async (id) => {
    if (confirm("¿Estás a punto de eliminar una Venta ?")) {
      try {
        const response = await deleteFacturaRequest(id);
        ventas.filter((elem) => elem != id);
        setRecargarFactura(id);

        setModalActivo({
          mensaje: "Eliminado",
          activo: true,
          errorColor: true,
        });
      } catch (error) {}
    } else {
      // El usuario hizo clic en "Cancelar", puedes poner aquí el código para la acción cancelada
    }
  };

  return (
    <div
      className={`mx-4 my-4 md:mx-1 bg-neutral-200 shadow rounded overflow-hidden max-w-md`}
    >
      <div className="text-left text-slate-700 font-semibold w-full h-full align-middle flex flex-col">
        <div className="flex justify-between font-extralight  text-sm m-2">
          {" "}
          {factura.id && <p>Factura : {factura.id}</p>}
          {factura.creado && (
            <p>{new Date(factura.creado).toLocaleString("es-ES")}</p>
          )}
        </div>
        <div className=" bg-fresa rounded-xl text-xs flex gap-2 p-2">
          <SaboresFactura ventas={ventas} envio={factura.entrega.envio} />
          <TotalFactura factura={factura} />
        </div>

        <div className="flex-grow flex flex-col  p-2 text-xs">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <h2 className="">Entregar a : {factura.entrega.beneficiario} </h2>
              <p>
                {" "}
                Dirección : Calle {factura.entrega.calle} #{" "}
                {factura.entrega.numero} entre {factura.entrega.calle1} y{" "}
                {factura.entrega.calle2} Reparto {factura.entrega.reparto}{" "}
              </p>

              <h2>Referencia : {factura.entrega.p_referencia} </h2>
              <h2>Teléfono : {factura.entrega.tel_beneficiario} </h2>
            </div>

            <div className="bg-fresa text-neutral-100 font-semibold rounded-xl text-xs flex gap-2 p-2">
              <h2>Enviado por: {factura.entrega.ordenante} </h2>
              <h2>Contacto: {factura.entrega.contacto_ordenante}</h2>
            </div>
          </div>
        </div>

        {perfil.privilegio == "Administrador" ? (
          <>
            {factura.id && (
              <div>
                <button
                  className="flex"
                  onClick={() => handleEliminar(factura.id)}
                >
                  <Bton_eliminar_producto /> Eliminar Factura
                </button>
              </div>
            )}
            {editando == factura.id && (
              <EditFechaFactura
                factura={factura}
                setEditando={setEditando}
                setRecargar={setRecargar}
                recargar={recargar}
              />
            )}
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default FacturaCard;
