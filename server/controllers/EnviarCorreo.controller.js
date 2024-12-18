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
  total_venta,
  subject,
  to,
  plantilla,
  moneda,
}) => {
  console.log(to);
  console.log("factura");

  console.log(factura);

  EnviarCorreo({
    entrega,
    factura,
    productos,
    total_venta,
    subject,
    to,
    plantilla,
    moneda,
  });
};

export const NotificarFactura = ({
  entrega,
  factura,
  productos,
  total_venta,
  subject,
  plantilla,
  moneda,
}) => {
  EnviarCorreo({
    entrega,
    factura,
    productos,
    total_venta,
    subject,
    to: "heladoscarol@gmail.com",
    plantilla,
    moneda,
  });
};
