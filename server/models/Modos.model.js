import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";

export const Modos = sequelize.define("modos", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  modo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  activado: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },

  mensaje: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});
