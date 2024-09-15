import { Frases } from "../models/Frases.model.js";

export const updateFrase = async (req, res) => {
  console.log(req.body);
  
  const { texto } = req.body;
  const { id } = req.params;
  try {
    const response = await Frases.findByPk(id);
    response.texto = texto;

    await response.save();
    res.json(response);
  } catch (error) {
    console.error(error);
  }
};
export const getTodasFrases = async (req, res) => {
    try {
      const response = await Frases.findAll({
      });
      res.json(response);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  // li

export const getFrase = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await Frases.findByPk(id);

    res.json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
