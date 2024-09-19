import { EnviarCorreo } from "../Gmail/NodeMailer.js";

() => {};

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

export const NotificarFacturaCliente = (
  productos,
  factura,
  entrega,
  total_venta
) => {
  let grandTotalCobrar = Number(total_venta) + Number(entrega.envio);
  grandTotalCobrar = Math.round(grandTotalCobrar * 10) / 10;

  EnviarCorreo(
    `${entrega.contacto_ordenante}`,
    "Nueva Factura pendiente de aprobación",
    `Datos de la Factura: \n
        Factura ${factura.id}: \n
        Fecha: ${factura.creado}\n
        Sabores: ${productos.map(
          (producto) =>
            ` ${producto.nombre_sabor} Cantidad : ${producto.cantidad} \n`
        )}

        ------------------------------------------------------------------------------------------------------------------\n
        Entrega: \n
        Entregar a : ${entrega.beneficiario} \n
        Dirección : Calle ${entrega.calle} # ${entrega.numero} entre ${
      entrega.calle1
    } y ${entrega.calle2} Reparto ${entrega.reparto}\n
        Referencia : ${entrega.p_referencia}\n
        Teléfono :${entrega.tel_beneficiario} \n
        Enviado Por: ${entrega.ordenante} \n
        Contacto: ${entrega.contacto_ordenante}\n
        Observaciones: ${entrega.observaciones} \n
  
  
        Total : ${grandTotalCobrar} USD \n
        https://www.heladoscarol.com`
  );
};

export const NotificarFactura = (productos, factura, entrega, total_venta) => {
  EnviarCorreo(
    "heladoscarol@gmail.com",
    "Nueva Factura pendiente de aprobación",
    `Datos de la Factura: \n
        Factura ${factura.id}: \n
        Fecha: ${factura.creado}\n
      Sabores: ${productos.map(
        (producto) =>
          ` ${producto.nombre_sabor} Cantidad : ${producto.cantidad} \n`
      )}

        ------------------------------------------------------------------------------------------------------------------\n
        Entrega: \n
        Entregar a : ${entrega.beneficiario} \n
        Dirección : Calle ${entrega.calle} # ${entrega.numero} entre ${
      entrega.calle1
    } y ${entrega.calle2} Reparto ${entrega.reparto}\n
        Referencia : ${entrega.p_referencia}\n
        Teléfono :${entrega.tel_beneficiario} \n
        Enviado Por: ${entrega.ordenante} \n
        Contacto: ${entrega.contacto_ordenante}\n
        Observaciones: ${entrega.observaciones} \n
  
  
        Total : ${total_venta} USD \n
        https://www.heladoscarol.com`
  );
};
