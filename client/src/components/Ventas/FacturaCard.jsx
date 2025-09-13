import {
  confirmarFacturaRequest,
  estadoEntregadaFacturaRequest,
} from "../../api/factura.api";
import {
  deleteFacturaRequest,
  getReciboPagoZelleRequest,
} from "../../api/venta.api";
import { useAuth } from "../../context/AuthContext";
import EvidenciaPagoZelle from "../Comprar/SeccionAgregar/EvidenciaPagoZelle";
import CheckedSVG from "../SVG/CheckedSVG";
import ElimiarFacturaBTN from "./CardFacturaItems/ElimiarFacturaBTN";
import SaboresFactura from "./CardFacturaItems/SaboresFactura";
import TotalFactura from "./CardFacturaItems/TotalFactura";
import TruckEntregaSVG from "../SVG/TruckEntregaSVG";
import IconoPasarela from "./CardFacturaItems/IconoPasarela";
import { useMetoPago } from "../../Stores/Pago.store";
import TelefonoNotificarFactura from "./CardFacturaItems/TelefonoNotificarFactura";
import { useEffect, useState } from "react";
import { useShowDialogStore } from "../../Stores/ShowDialogStore";
import Dialog from "../Modal/Dialog";
import UpdatrSVG from "../SVG/UpdatrSVG";

function FacturaCard({
  factura,
  setRecargarFactura,
  setRecargar,
  recargar,
  total,
  file,
  setGrandTotalFactura,
  tropiPayFee,
  moneda,
  reservando,
  fechaReserva,
}) {
  const { ventas } = factura;
  const { setModalActivo, perfil, setLoader } = useAuth();
  const { setShowDialog, showDialog } = useShowDialogStore();
  const [dialogProps, setDialogProps] = useState({
    titulo: "",
    pregunta: "",
    handleClick: {},
  });

  const handleCopy = async (numero) => {
    try {
      await navigator.clipboard.writeText(numero);
    } catch (error) {
      console.error("Error al copiar el texto:", error);
    }
  };

  const tropiPayFeeCard = tropiPayFee || factura.tropiPayFee;

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

  useEffect(() => {
    if (!factura.id) {
      if (moneda == "EUR") {
        setGrandTotalFactura({
          total_venta: total,
          tropiPayFee: tropiPayFeeCard,
        });
      } else {
        setGrandTotalFactura({
          total_venta: total,
        });
      }
    }
  }, []);

  const getPagoZelle = async (factura) => {
    setLoader(true);
    const response = await getReciboPagoZelleRequest({
      persona: factura.entrega.ordenante,
      monto: factura.total_venta,
      id_factura: factura.id,
    });

    setRecargarFactura(factura.id);

    setLoader(false);
  };

  return (
    <div
      className={`my-4 md:mx-1 bg-neutral-200 shadow rounded overflow-hidden max-w-md`}
    >
      <Dialog
        dialogProps={dialogProps}
        setShowDialog={setShowDialog}
        showDialog={showDialog}
      />
      {reservando && (
        <div className="bg-yellow-400 p-4 font-bold rounded-xl text-xs flex flex-col gap-2">
          <h2 className="text-sm">Reserva</h2>
          <h2>Esta orden sera entregada el {fechaReserva}</h2>
        </div>
      )}

      <div className="text-left text-slate-700 font-semibold w-full h-full align-middle flex flex-col">
        <div className="flex justify-between items-center font-extralight  text-sm m-2">
          {" "}
          {factura.id && (
            <div className="flex items-center relative group cursor-pointer ">
              {" "}
              {<IconoPasarela pasarela={factura.pasarela} />}
              Factura : {factura.id}
              {factura.pasarela != "CUP" && `-- ${factura.pagado}`}
              {factura.pagado != "Aceptado Zelle" && (
                <button
                  onClick={() => getPagoZelle(factura)}
                  className="w-5 h-5 m-1 hover:bg-vainilla rounded-xl"
                >
                  <UpdatrSVG />
                </button>
              )}
              <div className="bg-white shadow-md rounded-xl absolute top-0 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-500">
                {factura.pagado === "Aceptado Zelle" && (
                  <div className="p-2 font-semibold text-xs leading-relaxed">
                    {" "}
                    <h2 className="font-bold">
                      {" "}
                      {factura.pagos_zelle?.persona}
                    </h2>
                    <h2>
                      Pagado:{" "}
                      <span className="font-bold">
                        {factura.pagos_zelle?.monto} USD
                      </span>{" "}
                    </h2>
                    <h2>
                      Propina:
                      <span className="font-bold">
                        {" "}
                        {Number(factura.pagos_zelle?.monto) -
                          Number(factura.total_venta)}{" "}
                        USD
                      </span>
                    </h2>
                    <h2>
                      Transaccion en Zelle:{" "}
                      {factura.pagos_zelle?.transaction_number}
                    </h2>
                  </div>
                )}
              </div>
            </div>
          )}
          {factura.creado && (
            <p>{new Date(factura.creado).toLocaleString("es-ES")}</p>
          )}
        </div>
        <div className=" bg-fresa rounded-xl text-xs flex gap-2 p-2 mx-2">
          <SaboresFactura
            ventas={ventas}
            envio={factura.entrega.envio}
            moneda={moneda}
            tropiPayFee={tropiPayFeeCard}
          />
          <TotalFactura
            total={Number(total ?? factura.total_venta).toFixed(2)}
            moneda={moneda}
          />
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
              <h2
                className="cursor-pointer"
                onClick={() => handleCopy(factura.entrega.tel_beneficiario)}
              >
                Teléfono : {factura.entrega.tel_beneficiario}{" "}
              </h2>
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
        {factura.fechaEntrega && (
          <h2 className="p-2 bg-yellow-400 font-bold rounded-xl text-xs flex gap-2 mx-2">
            Reserva para el {factura.fechaEntrega}
          </h2>
        )}

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
                        className="w-8"
                        onClick={() => {
                          setShowDialog(true);

                          setDialogProps({
                            titulo: "Entregar Factura",
                            pregunta:
                              "¿Desea marcar la factura como entregada?",
                            textoAceptar: "Si, especial",
                            handleClick: () =>
                              handleEstadoEntregada(factura.id),
                          });
                        }}
                      >
                        {factura.estado == "Entregada" ? (
                          ""
                        ) : (
                          <>
                            <TruckEntregaSVG />
                          </>
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
                  <TelefonoNotificarFactura
                    numero={`${factura.entrega.tel_beneficiario}`}
                    ventas={ventas}
                    grandTotal={factura.total_venta}
                    moneda={factura.moneda}
                    persona={factura.entrega.beneficiario}
                  />
                  {perfil.privilegio == "Administrador" ? (
                    <div className="flex justify-between">
                      <button
                        className="flex bg-fresa rounded-full p-2 text-neutral-100 hover:bg-vainilla hover:text-slate-600  transition-all duration-500"
                        onClick={() => {
                          setShowDialog(true);

                          setDialogProps({
                            titulo: "Confirmar Factura",
                            pregunta: "¿Desea confirmar la factura ?",
                            textoAceptar: "Si, esta bien",
                            handleClick: () => handleConfirmar(factura.id),
                          });
                        }}
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
