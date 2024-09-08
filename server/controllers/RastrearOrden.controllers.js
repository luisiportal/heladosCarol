import { json, Op } from "sequelize";
import sequelize from "../db.js";
import { Entrega } from "../models/Entrega.model.js";
import { Factura } from "../models/Facturas.model.js";
import { Venta } from "../models/Ventas.model.js";
import { Sabor } from "../models/Sabor.model.js";

export const getOrden = async (req, res) => {
  const id = req.params.contacto;
  try {
    const response = await Factura.findOne({
      where: {
        id: id,
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
        {
          model: Entrega,
          required: false,
        },
      ],
      order: [["creado", "DESC"]],
    });

    if (!response) return res.status(404).json({ message: "No encontrado" });

    res.json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getOrdenPorNumero = async (req, res) => {
  try {
    const tel_beneficiario = req.params.contacto;

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
        {
          model: Entrega,
          required: false,
        },
      ],
      order: [["creado", "DESC"]],
    })
      .then((ordenes) => {
        // Aplicar filter() a la respuesta
        const ordenesEncontradas = ordenes.filter(
          (orden) => orden.entrega.tel_beneficiario == tel_beneficiario
        );
        return ordenesEncontradas;
      })
      .catch((error) => {
        console.error("Error al realizar la consulta:", error);
      });

    if (!response) return res.status(404).json({ message: "No encontrado" });

    res.json(response);
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: error.message });
  }
};
