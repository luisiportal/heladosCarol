import sequelize from "../db.js";

import { registrarLog } from "./AuditLog.controllers.js";
import { Sabor } from "../models/Sabor.model.js";
import { Moneda } from "../models/Monedas.model.js";
import { Imagen } from "../models/Imagenes.model.js";
import { deleteImagenesSabores } from "./utilidadades/deleteImagenesSabores.js";
import path from "path";
import fs from "fs";
//import { resizeSharp } from "./utilidadades/sharpResize.js";
import { Op } from "sequelize";
import { log } from "console";
// listar todas los sabores
export const getSaboresBackend = async (req, res) => {
  try {
    const response = await Sabor.findAll({
      order: [["existencia", "DESC"]],

      include: [
        {
          model: Imagen,
          required: false,
        },
      ],
    });
    res.json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const getTodosSabores = async (req, res) => {
  try {
    const response = await Sabor.findAll({
      order: [["existencia", "DESC"]],
      where: { reservar: false, existencia: { [Op.gte]: 1 } },

      include: [
        {
          model: Imagen,
          required: false,
        },
      ],
    });
    res.json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const getSaboresReservar = async (req, res) => {
  try {
    const response = await Sabor.findAll({
      where: { reservar: true, existencia: { [Op.gte]: 1 } },
      order: [["existencia", "DESC"]],
      include: [
        {
          model: Imagen,
          required: false,
        },
      ],
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

    const response = await Sabor.findByPk(id_sabor, {
      include: [
        {
          model: Imagen,
          required: false,
        },
      ],
    });

    if (!response) return res.status(404).json({ message: "No encontrado" });

    res.json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// crear una sabor
export const createSabor = async (req, res) => {
  let ruta_image = "default.jpg";
  let files = [];
  if (req.files.length > 0) {
    files = req.files;
    //ruta_image = req.files[0].originalname;
  }

  const { precio: usd } = await Moneda.findByPk(2);

  try {
    const {
      nombre_sabor,
      categoria,
      description,
      color,
      envase,
      existencia,
      stockMinimo,
      precio_venta,
      precio_venta_cup,
      costo_unitario,
      home_img,
      reservar,
      nuevo,
    } = req.body;

    // Iniciar una transacción

    try {
      sequelize.transaction(async (t) => {
        const responseSabor = await Sabor.create(
          {
            nombre_sabor,
            categoria,
            description,
            precio_venta,
            costo_unitario,
            color,
            existencia,
            stockMinimo,
            envase,
            ruta_image,
            home_img,
            precio_venta_cup,
            reservar,
            nuevo,
          },
          { transaction: t },
        );

        try {
          const outputPath = path.join(
            "./public",
            "images",
            "productos",
            `producto_${file.originalname}`,
          );
          for (const file of files) {
            //await resizeSharp(file);

            // Ruta donde quieres guardar la imagen
            const dir = path.dirname(outputPath);
            const filePath = path.join(dir, `${file.originalname}`);
            // Guardar físicamente el archivo en disco
            fs.writeFileSync(filePath, file.buffer);

            await Imagen.create(
              {
                ruta_image: `producto_${file.originalname}`,
                id_recurso: responseSabor.id_sabor,
              },
              { transaction: t },
            );
          }
        } catch (error) {
          console.log("Error al eliminar imágenes:", error);
        }

        await registrarLog("Creó", ` Sabor`, `  ${nombre_sabor}`, req, t);

        // Si todo salió bien, hacemos commit de la transacción

        res.status(201).send("Producto Creado");
      });
    } catch (error) {
      // Si algo salió mal, revertimos la transacción
      await t.rollback();
      return res.status(500).json({ message: error.message });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// actualizar

export const updateSabor = async (req, res) => {
  const imgToDelete = req.body.imgToDelete
    ? JSON.parse(req.body.imgToDelete)
    : "";

  let files = [];
  if (req.files.length > 0) {
    files = req.files;
    //ruta_image = req.files[0].originalname;
  }
  try {
    sequelize.transaction(async (t) => {
      const id_sabor = req.params.id_sabor;
      let ruta_image = "";

      const {
        nombre_sabor,
        categoria,
        description,
        color,
        envase,
        stockMinimo,
        precio_venta,
        precio_venta_cup,
        costo_unitario,
        home_img,
        reservar,
        nuevo,
      } = req.body;

      await deleteImagenesSabores(imgToDelete);

      const response = await Sabor.findByPk(id_sabor);
      response.nombre_sabor = nombre_sabor;
      response.categoria = categoria;
      response.description = description;
      response.precio_venta = precio_venta;
      response.costo_unitario = costo_unitario;
      response.color = color;
      response.envase = envase;
      response.home_img = home_img;
      response.precio_venta_cup = precio_venta_cup;
      ruta_image && (response.ruta_image = ruta_image);
      response.stockMinimo = stockMinimo;
      response.reservar = reservar;
      response.nuevo = nuevo;

      await response.save({ transaction: t });

      for (const file of files) {
     
        // await resizeSharp(file);


        await Imagen.create(
          {
            ruta_image: `${file.filename}`,

            id_recurso: id_sabor,
          },
          { transaction: t },
        );
      }

      await registrarLog(
        "Actualizó",
        "Sabor",
        `${response.nombre_sabor}   `,
        req,
        t,
      ); // Asegúrate de que registrarLog acepta la transacción como argumento
      res.status(201).send("Producto Actualizado");
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
        { transaction: t },
      );
      await registrarLog(
        "Eliminó",
        "Sabor",
        `${saborTraidoDB.nombre_sabor} cantidad : ${saborTraidoDB.existencia}`,
        req,
        t,
        req.params.id_sabor,
      );
      res.sendStatus(204);
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
