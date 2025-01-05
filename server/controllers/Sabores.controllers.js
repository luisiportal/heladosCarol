import { saveImage } from "./upload.multer.js";

import sequelize from "../db.js";

import { registrarLog } from "./AuditLog.controllers.js";
import { Sabor } from "../models/Sabor.model.js";
import { Moneda } from "../models/Monedas.model.js";

// listar todas los sabores

export const getTodosSabores = async (req, res) => {
  try {
    const response = await Sabor.findAll({
      order: [["existencia", "DESC"]],
    });
    res.json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// listar un sabor
export const getSabor = async (req, res) => {
  try {
    const id_sabor = req.params.id_sabor;

    const response = await Sabor.findByPk(id_sabor);
    if (!response) return res.status(404).json({ message: "No encontrado" });

    res.json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// crear una sabor
export const createSabor = async (req, res) => {
  let ruta_image = "default.jpg";
  if (req.file !== undefined) {
    ruta_image = req.file.originalname;
  }
  const { precio: usd } = await Moneda.findByPk(2);

  try {
    const {
      nombre_sabor,
      color,
      envase,
      existencia,
      stockMinimo,
      precio_venta,
      costo_unitario,
      home_img,
    } = req.body;

    // Iniciar una transacción

    try {
      sequelize.transaction(async (t) => {
        const response = await Sabor.create(
          {
            nombre_sabor,
            precio_venta,
            costo_unitario,
            color,
            existencia,
            stockMinimo,
            envase,
            ruta_image,
            home_img,
            precio_venta_cup: Math.round(precio_venta * usd),
          },
          { transaction: t }
        );

        await registrarLog("Creó", ` Sabor`, `  ${nombre_sabor}`, req, t);

        // Si todo salió bien, hacemos commit de la transacción

        res.json({
          id_sabor: response.insertId,
          nombre_sabor,
          precio_venta,
          costo_unitario,
          color,
          existencia,
          stockMinimo,
          envase,
          ruta_image,
        });
      });
    } catch (error) {
      // Si algo salió mal, revertimos la transacción
      await t.rollback();
      return res.status(500).json({ message: error.message });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  saveImage(req.file, "productos");
};

// actualizar

export const updateSabor = async (req, res) => {
  const { precio: usd } = await Moneda.findByPk(2);
  try {
    sequelize.transaction(async (t) => {
      const id_sabor = req.params.id_sabor;
      let ruta_image = "";
      if (req.file !== undefined) {
        ruta_image = req.file.originalname;
      }
      const {
        nombre_sabor,
        color,
        envase,
        existencia,
        stockMinimo,
        precio_venta,
        costo_unitario,
        home_img,
      } = req.body;
      console.log(home_img);

      const response = await Sabor.findByPk(id_sabor);
      response.nombre_sabor = nombre_sabor;
      response.precio_venta = precio_venta;
      response.costo_unitario = costo_unitario;
      response.color = color;
      response.envase = envase;
      response.home_img = home_img;
      response.precio_venta_cup = Math.round(precio_venta * usd);
      ruta_image && (response.ruta_image = ruta_image);
      response.stockMinimo = stockMinimo;

      await response.save({ transaction: t });

      await registrarLog(
        "Actualizó",
        "Sabor",
        `${response.nombre_sabor}   `,
        req,
        t
      ); // Asegúrate de que registrarLog acepta la transacción como argumento
      saveImage(req.file, "productos");
      res.json(response);
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// borrar

export const deleteSabor = async (req, res) => {
  const { id_sabor } = req.params;
  console.log(id_sabor);
  
  try {
    sequelize.transaction(async (t) => {
      const saborTraidoDB = await Sabor.findByPk(id_sabor);
console.log(saborTraidoDB);

      const response = await Sabor.destroy(
        {
          where: {
            id_sabor: id_sabor,
          },
        },
        { transaction: t }
      );
      await registrarLog(
        "Eliminó",
        "Sabor",
        `${saborTraidoDB.nombre_sabor} cantidad : ${saborTraidoDB.existencia}`,
        req,
        t,
        req.params.id_sabor
      );
      res.sendStatus(204);
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
