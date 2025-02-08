import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";

export const Imagen = sequelize.define("imagenes", {
  id_imagen: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  ruta_image: {
    type: DataTypes.STRING,
  },
  id_recurso: {
    type: DataTypes.INTEGER,
  },
});
