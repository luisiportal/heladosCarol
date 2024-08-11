import sequelize from "../db.js";
import { Factura } from "../models/Facturas.model.js";
import { Venta } from "../models/Ventas.model.js";

import { registrarLog } from "./AuditLog.controllers.js";
import { Movimiento } from "../models/Movimientos.model.js";
import { Entrega } from "../models/Entrega.model.js";
import { Sabor } from "../models/Sabor.model.js";
import Stripe from "stripe";
import { PAYKEY } from "../config.js";
import { StripePayment } from "./StripePayment.controller.js";

const stripe = new Stripe(PAYKEY);

export const createVenta = async (req, res) => {
  const productos = req.body.productos;
  const entrega = req.body.entrega;

  const id_pago = req.body.id_pago;
  const total_venta = productos.reduce(
    (sum, producto) => sum + producto.precio_venta * producto.cantidad,
    0
  );

  let fechaActual = new Date();
  let creado = fechaActual.toISOString();

  try {
    // StripePayment();

    await sequelize.transaction(async (t) => {
      // Crear la factura
      const factura = await Factura.create(
        {
          total_venta,
          id_pago,
          creado,
        },
        { transaction: t }
      );
      await Entrega.create(
        {
          id_factura: factura.id,
          ordenante: entrega.ordenante,
          contacto_ordenante: entrega.contacto_ordenante,
          beneficiario: entrega.beneficiario,
          tel_beneficiario: entrega.tel_beneficiario,
          direccion: entrega.direccion,
          calle: entrega.calle,
          numero: entrega.numero,
          calle1: entrega.calle1,
          calle2: entrega.calle2,
          reparto: entrega.reparto,
          p_referencia: entrega.p_referencia,
        },
        { transaction: t }
      );

      for (const producto of productos) {
        // Crear la venta
        const ventaNueva = await Venta.create(
          {
            id_sabor: producto.id_sabor,
            cantidad: producto.cantidad,
            precio_total_sabor: producto.cantidad * producto.precio_venta,
            id_factura: factura.id,
          },
          { transaction: t }
        );
        await Movimiento.create(
          {
            id_sabor: producto.id_sabor,
            tipo: "Venta",
            cantidad: producto.cantidad,
            id_venta: ventaNueva.id_venta,
          },
          { transaction: t }
        );
      }
    });

    return res.status(200).json({ message: "Ventas creadas correctamente" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
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

export const getTodosVentas = async (req, res) => {
  try {
    const response = await Venta.findAll({
      order: [["id_venta", "DESC"]],
    });
    res.json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const getTodosFacturas = async (req, res) => {
  const { limit, offset } = req.query;

  try {
    const response = await Factura.findAll({
      include: [
        {
          model: Venta,
          required: false,
          include: [
            {
              model: Sabor,
              required: false,
            },
          ],
        },
        { model: Entrega, required: false },
      ],

      order: [["creado", "DESC"]],
      limit: limit,
      offset: offset,
    });

    res.json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteFactura = async (req, res) => {
  try {
    sequelize.transaction(async (t) => {
      const responseVentas = await Venta.destroy({
        where: {
          id_factura: req.params.id,
        },
      });

      const response = await Factura.destroy(
        {
          where: {
            id: req.params.id,
          },
        },
        { transaction: t }
      );
      await registrarLog("Elimino", "Factura", req.params.id, req, t);

      res.sendStatus(204);
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
