import { EnviarCorreo } from "../Gmail/NodeMailer.js";

export const NotificarConfirmadoFacturaCliente = (entrega) => {
  EnviarCorreo(
    `${entrega.contacto_ordenante}`,
    "Su factura ha sido confirmada",
    `Hola ${entrega.ordenante} , hemos confimado su pago y su orden ya esta en proceso de entrega. \n Atentamente https://www.heladoscarol.com`
  );
};

export const NotificarEntregadoFacturaCliente = (entrega) => {
  EnviarCorreo(
    `${entrega.contacto_ordenante}`,
    "Su factura ha sido entregada",
    `Hola ${entrega.ordenante} , su orden ha sido entregada. \n 
      Puede dejarnos su opinión en https://www.heladoscarol.com`
  );
};

export const NotificarFacturaCliente = ({
  entrega,
  factura,
  productos,
  grandTotalCobrar,
  subject,
  to,
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
  });
};

export const NotificarFactura = ({
  entrega,
  factura,
  productos,
  grandTotalCobrar,
  subject,
}) => {
  EnviarCorreo({
    entrega,
    factura,
    productos,
    grandTotalCobrar,
    to: "heladoscarol@gmail.com",
  });
};
