import sequelize from "../db.js";
import { Reparto } from "../models/Reparto.model.js";
import { registrarLog } from "./AuditLog.controllers.js";

// listar todas los repartos
export const getTodosRepartos = async (req, res) => {
  try {
    const response = await Reparto.findAll({
      order: [["id_reparto", "DESC"]],
    });

    res.json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const getUnReparto = async (req, res) => {
  try {
    const id_reparto = req.params.id;

    const response = await Reparto.findByPk(id_reparto);
    if (!response) return res.status(404).json({ message: "No encontrado" });

    res.json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const crearReparto = async (req, res) => {
  try {
    const { reparto, costo, costo_cup } = req.body;
    const response = await Reparto.create({
      reparto,
      costo,
      costo_cup,
    });

    res.json({
      reparto,
      costo,
      costo_cup,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateReparto = async (req, res) => {
  const id_reparto = req.params.id;

  const { reparto, costo, costo_cup } = req.body;

  sequelize.transaction(async (t) => {
    try {
      const response = await Reparto.findByPk(id_reparto);
      response.reparto = reparto;
      response.costo = costo;
      response.costo_cup = costo_cup;

      await response.save({ transaction: t }); // Pasamos la transacción como opción al método save
      res.json(response);
      await registrarLog(
        "Actualizó",
        "Reparto",
        `${response.reparto} costo USD: ${response.costo} costo CUP: ${response.costo_cup}`,
        req,
        t
      );
    } catch (error) {
      console.error(error);
      // Aquí puedes manejar el error, por ejemplo, enviando una respuesta con un código de estado 500
    }
  });
};
