import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";

export const Review = sequelize.define("reviews", {
  id_review: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  autor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ruta_image: {
    type: DataTypes.STRING,
    defaultValue: "defaultPerfil.jpg",
  },

  comentario: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sabor_preferido: {
    type: DataTypes.STRING,
  },
  publicado: {
    type: DataTypes.BOOLEAN,
  },
});
