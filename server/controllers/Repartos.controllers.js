import { Reparto } from "../models/Reparto.model.js";

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
