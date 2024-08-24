import { deleteFacturaRequest } from "../../api/venta.api";
import { useAuth } from "../../context/AuthContext";
import Edit from "../Movimientos/Edit";
import EditSVG from "../SVG/EditSVG";

import Bton_eliminar_producto from "./Bton_eliminar_producto";
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
          <p>Factura : {factura.id}</p>
          <p>
            {new Date(factura.creado).toLocaleString("es-ES")}{" "}
            <button onClick={() => setEditando(factura.id)}>
              <EditSVG />
            </button>
          </p>
        </div>
        <div className="bg-fresa rounded-2xl text-slate-900 font-extralight p-2 px-6 shadow-xl drop-shadow-xl mx-4">
          {ventas.map((sabor) => (
            <div className="flex justify-between" key={sabor.id_venta}>
              <div className="flex text-xl">
                <h2>
                  {" "}
                  {sabor.cantidad}x{" "}
                  {sabor.sabore?.nombre_sabor ?? sabor.nombre_sabor}
                </h2>
              </div>

              <h2>
                {sabor.precio_total_sabor ??
                  sabor.precio_venta * sabor.cantidad}{" "}
                USD
              </h2>
            </div>
          ))}
          <p className="text-right">Total {factura.total_venta} USD</p>
        </div>

        <div className="flex-grow flex flex-col space-y-2 font-light  p-4">
          <p>Entregar a:</p>
          <div className="flex flex-col gap-4 ml-4">
            <div>
              <h2>
                <h2>Beneficiario : {factura.entrega.beneficiario} </h2>
                Dirección : Calle {factura.entrega.calle} #{" "}
                {factura.entrega.numero} entre {factura.entrega.calle1} y{" "}
                {factura.entrega.calle2} Reparto {factura.entrega.reparto}{" "}
              </h2>
              <h2>Referencia : {factura.entrega.p_referencia} </h2>
              <h2>Teléfono : {factura.entrega.tel_beneficiario} </h2>
            </div>

            <div>
              <h2>Enviado por: {factura.entrega.ordenante} </h2>
              <h2>Contacto: {factura.entrega.contacto_ordenante}</h2>
            </div>
          </div>
        </div>

        {perfil.privilegio == "Administrador" ? (
          <>
            {" "}
            <div>
              <button
                className="flex"
                onClick={() => handleEliminar(factura.id)}
              >
                <Bton_eliminar_producto /> Eliminar Factura
              </button>
            </div>
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
