import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";

export const Entrega = sequelize.define("entregas", {
  id_entrega: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_factura: {
    type: DataTypes.INTEGER,
  },

  ordenante: {
    type: DataTypes.STRING,
  },
  beneficiario: {
    type: DataTypes.STRING,
  },
  tel_beneficiario: {
    type: DataTypes.STRING,
  },
  direccion: {
    type: DataTypes.STRING,
  },
  p_referencia: {
    type: DataTypes.STRING,
  },
});
