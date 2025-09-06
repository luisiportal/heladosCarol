import sequelize from "../db.js";
import { Factura } from "../models/Facturas.model.js";
import { Venta } from "../models/Ventas.model.js";

import { registrarLog } from "./AuditLog.controllers.js";
import { Movimiento } from "../models/Movimientos.model.js";
import { Entrega } from "../models/Entrega.model.js";
import { Sabor } from "../models/Sabor.model.js";
import { saveImage } from "./upload.multer.js";
import { Op } from "sequelize";

import {
  NotificarFactura,
  NotificarFacturaCliente,
} from "./EnviarCorreo.controller.js";
import { enviaNotification } from "./suscriptions.controller.js";
import { checkExistencia } from "./utilidadades/checkExistencia.js";
import { Modos } from "../models/Modos.model.js";

export const createVenta = async (req, res) => {
  let ruta_image = "defaultPerfil.jpg";
  if (req.file !== undefined) {
    ruta_image = req.file.originalname;
  }

  const productos = req.body.productos;
  const entrega = req.body.entrega;
  const pasarela = req.body.pasarela;
  const reference = req.body.reference;
  const fechaEntrega = req.body.fechaEntrega;
  const reservando = req.body.reservando;
  const granTotalFactura = req.body.granTotalFactura;
  const tropiPayFee = req.body.tropiPayFee;
  try {
    const cerrado = await Modos.findByPk(1);

    if (cerrado && cerrado.activado === true) {
      // Validación segura
      return res
        .status(500)
        .json({ message: `Lo sentimos ${cerrado.mensaje}` });
    }

    const check = await checkExistencia({ productos: productos });

    if (check) {
      return res.status(500).json({ message: `${check} Producto agotado` });
    }
  } catch (error) {
    console.error("Error al procesar la solicitud:", error); // Mensaje más informativo
    return res.status(500).json({
      message:
        "Se produjo un error al procesar la solicitud. Por favor, inténtalo de nuevo más tarde.",
    });
  }

  const moneda = req.body.moneda;
  //v1  const { total_venta, tropiPayFee } = JSON.parse(req.body.granTotalFactura);

  let fechaActual = new Date();
  let creado = fechaActual.toISOString();
  const total_venta = granTotalFactura;
  try {
    await sequelize.transaction(async (t) => {
      // Crear la factura
      const factura = await Factura.create(
        {
          total_venta: granTotalFactura,
          tropiPayFee,
          pasarela,
          reference,
          creado,
          moneda,
          fechaEntrega,
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
          reparto: entrega.reparto.reparto,
          envio: entrega.reparto.envio,
          p_referencia: entrega.p_referencia,
          observaciones: entrega.observaciones,
        },
        { transaction: t }
      );

      const calcularPrecioUnitario = (producto) => {
        const precioUnitario =
          moneda == "CUP" ? producto.precio_venta_cup : producto.precio_venta;
        return precioUnitario;
      };

      for (const producto of productos) {
        // Crear la venta
        const ventaNueva = await Venta.create(
          {
            id_sabor: producto.producto.id_sabor,
            cantidad: producto.cantidad,
            precio_total_sabor:
              producto.cantidad * calcularPrecioUnitario(producto.producto),
            id_factura: factura.id,
          },
          { transaction: t }
        );
        await Movimiento.create(
          {
            id_sabor: producto.producto.id_sabor,
            tipo: "Venta",
            cantidad: producto.cantidad,
            id_venta: ventaNueva.id_venta,
          },
          { transaction: t }
        );
      }
      NotificarFactura({
        entrega,
        factura,
        total_venta,
        productos,
        subject: "Nueva Factura pendiente de aprobación",
        plantilla: "nueva",
        moneda,
      });
      if (entrega.contacto_ordenante.includes("@")) {
        NotificarFacturaCliente({
          entrega,
          factura,
          productos,
          total_venta,
          subject: "Nueva Factura pendiente de aprobación",
          to: `${entrega.contacto_ordenante}`,
          plantilla: "nueva",
          moneda,
        });
      }
    });

    saveImage(req.file, "pagos_facturas");
    enviaNotification({
      total_venta,
      pasarela,
      ordenante: entrega.ordenante,
    });

    return res.status(200).json({
      message: reservando
        ? "Se ha realizado su reserva"
        : "Venta creada correctamente",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
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
      where: {
        fechaEntrega: {
          [Op.or]: [null, ""],
        },
      },

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
