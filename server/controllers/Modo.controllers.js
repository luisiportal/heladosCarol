import { Modos } from "../models/Modos.model.js";
import { registrarLog } from "./AuditLog.controllers.js";

export const updateModoCerrado = async (req, res) => {
  const { mensaje, activado } = req.body;

  try {
    const response = await Modos.findByPk(1);
    response.activado = activado;
    if (mensaje) {
      response.mensaje = mensaje;
    }

    await response.save();
    res.json(response);
    await registrarLog(activado, "Modo Cerrado", ``, req, t);
  } catch (error) {
    console.error(error);
    // Aquí puedes manejar el error, por ejemplo, enviando una respuesta con un código de estado 500
  }
};

export const getModoCerrado = async (req, res) => {
  try {
    const response = await Modos.findByPk(1);
    if (!response) return res.status(404).json({ message: "No encontrado" });

    res.json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
