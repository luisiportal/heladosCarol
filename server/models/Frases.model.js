import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";

export const Frases = sequelize.define("frases", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  texto: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
