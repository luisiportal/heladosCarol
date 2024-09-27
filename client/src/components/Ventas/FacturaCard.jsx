import { useParams } from "react-router-dom";
import {
  confirmarFacturaRequest,
  estadoEntregadaFacturaRequest,
} from "../../api/factura.api";
import { deleteFacturaRequest } from "../../api/venta.api";
import { useAuth } from "../../context/AuthContext";
import { grandTotalFactura } from "../../utils/grandTotalFactura";
import EvidenciaPagoZelle from "../Comprar/SeccionAgregar/EvidenciaPagoZelle";

import CheckedSVG from "../SVG/CheckedSVG";

import ElimiarFacturaBTN from "./CardFacturaItems/ElimiarFacturaBTN";
import SaboresFactura from "./CardFacturaItems/SaboresFactura";
import TotalFactura from "./CardFacturaItems/TotalFactura";
import TruckEntregaSVG from "../SVG/TruckEntregaSVG";

function FacturaCard({
  factura,
  setRecargarFactura,
  setRecargar,
  recargar,
  total,
  file,
}) {
  const { ventas } = factura;
  const {
    setModalActivo,
    perfil,
    setLoader,
  } = useAuth();

  const params = useParams();

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

  const handleConfirmar = async (id) => {
    setLoader(true);
    await confirmarFacturaRequest(id);
    setRecargar(!recargar);
    setLoader(false);
  };
  const handleEstadoEntregada = async (id) => {
    setLoader(true);
    await estadoEntregadaFacturaRequest(id);
    setRecargar(!recargar);
    setLoader(false);
  };

  const grandTotal = grandTotalFactura(
    factura.total_venta,
    factura.entrega.envio
  );

  return (
    <div
      className={`my-4 md:mx-1 bg-neutral-200 shadow rounded overflow-hidden max-w-md`}
    >
      <div className="text-left text-slate-700 font-semibold w-full h-full align-middle flex flex-col">
        <div className="flex justify-between font-extralight  text-sm m-2">
          {" "}
          {factura.id && <p>Factura : {factura.id}</p>}
          {factura.creado && (
            <p>{new Date(factura.creado).toLocaleString("es-ES")}</p>
          )}
        </div>
        <div className=" bg-fresa rounded-xl text-xs flex gap-2 p-2 mx-2">
          <SaboresFactura ventas={ventas} envio={factura.entrega.envio} />
          <TotalFactura total={total ?? grandTotal.toFixed(2)} />
        </div>

        <div className="flex-grow flex flex-col  p-2 text-xs">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <h2 className="">Entregar a : {factura.entrega.beneficiario} </h2>
              <p>
                {" "}
                Dirección : Calle {factura.entrega.calle} #{" "}
                {factura.entrega.numero} entre {factura.entrega.calle1}
                {factura.entrega.calle2} Reparto {factura.entrega.reparto}{" "}
              </p>

              <h2>Referencia : {factura.entrega.p_referencia} </h2>
              <h2>Teléfono : {factura.entrega.tel_beneficiario} </h2>
            </div>

            <div className="bg-fresa text-neutral-100 font-semibold rounded-xl text-xs flex gap-2 p-2">
              <h2>Enviado por: {factura.entrega.ordenante} </h2>
              <h2>Contacto: {factura.entrega.contacto_ordenante}</h2>
            </div>
            {factura.entrega.observaciones && (
              <p>Observaciones : {factura.entrega.observaciones}</p>
            )}
          </div>
        </div>

        <>
          {file || factura.ruta_image ? (
            <div className="flex  justify-center items-center gap-2  p-2 text-xs">
              {" "}
              <h6>Evidencia Pago por Zelle :</h6>
              <EvidenciaPagoZelle
                file={file}
                ruta_image={factura.ruta_image}
                setModalActivo={setModalActivo}
              />
            </div>
          ) : (
            ""
          )}

          {factura.id && (
            <div>
              {factura.confirmado == true ? (
                <>
                  {" "}
                  <h2 className="bg-green-400 flex justify-center text-neutral-100 rounded-lg m-2">
                    {factura.estado}
                  </h2>
                  {perfil.privilegio == "Administrador" ? (
                    <div className="flex  p-2 justify-between">
                      <button
                        className="w-8 h-8"
                        onClick={() => handleEstadoEntregada(factura.id)}
                      >
                        {factura.estado == "Entregada" ? (
                          ""
                        ) : (
                          <TruckEntregaSVG />
                        )}
                      </button>
                      <ElimiarFacturaBTN
                        id={factura.id}
                        handleEliminar={handleEliminar}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                </>
              ) : (
                <>
                  <h2 className="bg-red-400 flex justify-center text-neutral-100 mb-2 rounded-lg m-2">
                    Pendiente a confirmar
                  </h2>
                  {perfil.privilegio == "Administrador" ? (
                    <div className="flex justify-between">
                      <button
                        className="flex bg-fresa rounded-full p-2 text-neutral-100 hover:bg-vainilla hover:text-slate-600  transition-all duration-500"
                        onClick={() => handleConfirmar(factura.id)}
                      >
                        <CheckedSVG /> Confirmar Factura
                      </button>
                      <div className="p-2">
                        <ElimiarFacturaBTN
                          id={factura.id}
                          handleEliminar={handleEliminar}
                        />
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </>
              )}
            </div>
          )}
        </>
      </div>
    </div>
  );
}

export default FacturaCard;
