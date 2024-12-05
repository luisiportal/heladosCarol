import { EnviarCorreo } from "../Gmail/NodeMailer.js";

export const NotificarConfirmadoFacturaCliente = (entrega) => {
  EnviarCorreo({
    entrega,
    subject: "Su factura ha sido confirmada",
    to: `${entrega.contacto_ordenante}`,
    plantilla: "confirmar",
  });
};

export const NotificarEntregadoFacturaCliente = (entrega) => {
  EnviarCorreo({
    entrega,
    subject: "Su factura ha sido entregada",
    to: `${entrega.contacto_ordenante}`,
    plantilla: "entregada",
  });
};

export const NotificarFacturaCliente = ({
  entrega,
  factura,
  productos,
  grandTotalCobrar,
  subject,
  to,
  plantilla,
}) => {
  console.log(to);
  console.log("factura");

  console.log(factura);

  EnviarCorreo({
    entrega,
    factura,
    productos,
    grandTotalCobrar,
    subject,
    to,
    plantilla,
  });
};

export const NotificarFactura = ({
  entrega,
  factura,
  productos,
  grandTotalCobrar,
  subject,
  plantilla,
}) => {
  EnviarCorreo({
    entrega,
    factura,
    productos,
    grandTotalCobrar,
    subject,
    to: "heladoscarol@gmail.com",
    plantilla,
  });
};
