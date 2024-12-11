import sequelize from "../db.js";
import { Entrega } from "../models/Entrega.model.js";
import { Factura } from "../models/Facturas.model.js";
import { registrarLog } from "./AuditLog.controllers.js";
import {
  NotificarConfirmadoFacturaCliente,
  NotificarEntregadoFacturaCliente,
} from "./EnviarCorreo.controller.js";

export const confirmarFactura = async (req, res) => {
  const id = req.params.id;

  try {
    const response = await Factura.findByPk(id);
    const entrega = await Entrega.findOne({
      where: {
        id_factura: id,
      },
    });

    response.confirmado = true;
    response.estado = "Aceptada";
    await response.save();
    res.json(response);
    await registrarLog("Confirmo", "Factura", `${response.id}`, req, "");
    if (entrega.contacto_ordenante.includes("@")) {
      NotificarConfirmadoFacturaCliente(entrega);

    }
  } catch (error) {
    console.error(error);
  }
};
export const estadoFacturaEntregada = async (req, res) => {
  const id = req.params.id;

  try {
    const response = await Factura.findByPk(id);
    const entrega = await Entrega.findOne({
      where: {
        id_factura: id,
      },
    });

    response.estado = "Entregada";
    await response.save();
    res.json(response);
    await registrarLog("Confirmo", "Factura", `${response.id}`, req, "");
    if (entrega.contacto_ordenante.includes("@")) {
      NotificarEntregadoFacturaCliente(entrega);
    }
  } catch (error) {
    console.error(error);
  }
};

export const updateFechaFactura = async (req, res) => {
  const { fecha, id } = req.body;

  let fechaConHora = new Date(`${fecha}T08:00:00`);

  sequelize.transaction(async (t) => {
    try {
      const response = await Factura.findByPk(id);

      response.creado = fechaConHora;
      await response.save({ transaction: t }); // Pasamos la transacción como opción al método save
      res.json(response);
      await registrarLog(
        "Actualizó",
        "Transacción",
        `${response.id} fecha: ${fecha}`,
        req,
        t
      );
    } catch (error) {
      console.error(error);
      // Aquí puedes manejar el error, por ejemplo, enviando una respuesta con un código de estado 500
    }
  });
};
