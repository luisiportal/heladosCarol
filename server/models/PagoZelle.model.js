import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";

export const PagoZelle = sequelize.define("pagos_zelle", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  persona: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  monto: {
    type: DataTypes.DECIMAL,
    allowNull: false,

  },
   transaction_number: {
    type: DataTypes.STRING,
    allowNull: false,

  },


});
