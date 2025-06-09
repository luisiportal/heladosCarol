import { Factura } from "../models/Facturas.model.js";
import { Venta } from "../models/Ventas.model.js";

import { Entrega } from "../models/Entrega.model.js";
import { Sabor } from "../models/Sabor.model.js";
import { Op } from "sequelize";

export const getReservasFacturas = async (req, res) => {
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
     where: {
        fechaEntrega: {
          [Op.or]: ["sabado", "domingo"],
        },
      },
      order: [["creado", "DESC"]],
      limit: limit,
      offset: offset,
    });

    res.json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
