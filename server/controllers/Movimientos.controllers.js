import { Op } from "sequelize";
import sequelize from "../db.js";
import { Movimiento } from "../models/Movimientos.model.js";

import { registrarLog } from "./AuditLog.controllers.js";
import { Sabor } from "../models/Sabor.model.js";

export const hacerMovimientoAPi = async (req, res) => {
  try {
    const { existencia, cantidad, id_sabor, creado } = req.body;
    if (req.body.tipo === "Entrada") {
      const response = await Sabor.findByPk(id_sabor);

      response.existencia = Number(cantidad) + Number(existencia);

      await response.save();

      res.json(response);
    }

    if (req.body.tipo === "Salida") {
      const response = await Sabor.findByPk(id_sabor);
      response.existencia = existencia - cantidad;

      await response.save();

      res.json(response);
    }

    regsitrarMovimiento(
      req.body.id_sabor,
      req.body.tipo,
      req.body.sabor,
      req.body.cantidad,
      req.body.creado,
      req
    );
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// regsitrar entrada/ salida  --- movimiento
export const regsitrarMovimiento = async (
  id_sabor,
  tipo,
  sabor,
  cantidad,
  creado,
  req
) => {
  try {
    sequelize.transaction(async (t) => {
      const response = await Movimiento.create(
        {
          id_sabor,
          tipo,
          sabor,
          cantidad,
          creado,
        },
        { transaction: t }
      );
      await registrarLog(
        tipo,
        "Movimiento",
        `  sabor: ${sabor} cantidad: ${cantidad} `,
        req,
        t,
        id_sabor
      );
    });
  } catch (error) {
    console.log("Error al registrar movimiento");
  }
};

// listar movimiemtons

export const getTodosMovimientos = async (req, res) => {
  const { limit, offset } = req.query;

  try {
    const response = await Movimiento.findAll({
      where: {
        id_sabor: {
          [Op.eq]: sequelize.col("movimientos.id_sabor"), // Esto devuelve un booleano
        },
      },
      include: [
        {
          model: Sabor,
          attributes: ["nombre_sabor", "ruta_image"],
          required: true,
        },
      ],
      order: [["createdAt", "DESC"]],
      limit: limit,
    });
    res.json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteMovimiento = async (req, res) => {
  try {
    const { dataValues } = await Movimiento.findByPk(req.params.id);
    console.log(dataValues);
    sequelize.transaction(async (t) => {
      const response = await Movimiento.destroy(
        {
          where: {
            id_movimiento: req.params.id,
          },
        },
        { transaction: t }
      );
      await registrarLog(
        "Elimino",
        "un Movimiento",
        `del ID_Sabor: ${dataValues.id_sabor}  Tipo :${dataValues.tipo}  Cantidad: ${dataValues.cantidad}`,
        req,
        t
      );
      res.sendStatus(204);
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateMovimiento = async (req, res) => {
  const { fecha, id_movimiento } = req.body;

  let fechaConHora = new Date(`${fecha}T08:00:00`);

  sequelize.transaction(async (t) => {
    try {
      const response = await Movimiento.findByPk(id_movimiento);

      response.creado = fechaConHora;
      await response.save({ transaction: t }); // Pasamos la transacción como opción al método save
      res.json(response);
      await registrarLog(
        "Actualizó",
        "Movimiento",
        `${response.id_movimiento} fecha: ${fecha}`,
        req,
        t
      );
    } catch (error) {
      console.error(error);
      // Aquí puedes manejar el error, por ejemplo, enviando una respuesta con un código de estado 500
    }
  });
};
