import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";

export const Reparto = sequelize.define("repartos", {
  id_reparto: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  reparto: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  costo: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  costo_cup: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
});
