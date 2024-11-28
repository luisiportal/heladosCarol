import sequelize from "../db.js";
import { Factura } from "../models/Facturas.model.js";
import { Venta } from "../models/Ventas.model.js";

import { registrarLog } from "./AuditLog.controllers.js";
import { Movimiento } from "../models/Movimientos.model.js";
import { Entrega } from "../models/Entrega.model.js";
import { Sabor } from "../models/Sabor.model.js";
import { saveImage } from "./upload.multer.js";

import {
  NotificarFactura,
  NotificarFacturaCliente,
} from "./EnviarCorreo.controller.js";
import { enviaNotification } from "./suscriptions.controller.js";

export const createVenta = async (req, res) => {
  let ruta_image = "defaultPerfil.jpg";
  if (req.file !== undefined) {
    ruta_image = req.file.originalname;
  }

  const productos = JSON.parse(req.body.productos);
  const entrega = JSON.parse(req.body.entrega);
  const pasarela = JSON.parse(req.body.pasarela);
  const reference = JSON.parse(req.body.reference);

  const total_venta = productos.reduce(
    (sum, producto) => sum + producto.precio_venta * producto.cantidad,
    0
  );

  let grandTotalCobrar = Number(total_venta) + Number(entrega.envio);

  let fechaActual = new Date();
  let creado = fechaActual.toISOString();

  try {
    await sequelize.transaction(async (t) => {
      // Crear la factura
      const factura = await Factura.create(
        {
          total_venta,
          pasarela,
          reference,
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
          envio: entrega.envio,
          p_referencia: entrega.p_referencia,
          observaciones: entrega.observaciones,
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
      NotificarFactura(productos, factura, entrega, total_venta);
      if (entrega.contacto_ordenante.includes("@")) {
        NotificarFacturaCliente(productos, factura, entrega, total_venta);
      }
    });

    saveImage(req.file, "pagos_facturas");
    enviaNotification({total_venta,pasarela});

    return res.status(200).json({ message: "Ventas creadas correctamente" });
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
