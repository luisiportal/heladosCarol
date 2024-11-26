import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";

export const Suscription = sequelize.define("suscriptions", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  endpoint: {
    type: DataTypes.STRING,
  },

  p256dh: {
    type: DataTypes.STRING,
  },

  auth: {
    type: DataTypes.STRING,
  },
});