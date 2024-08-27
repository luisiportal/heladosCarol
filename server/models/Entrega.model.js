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
  contacto_ordenante: {
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
  calle: {
    type: DataTypes.STRING,
  },
  numero: {
    type: DataTypes.STRING,
  },
  calle1: {
    type: DataTypes.STRING,
  },
  calle2: {
    type: DataTypes.STRING,
  },
  reparto: {
    type: DataTypes.STRING,
  },
  envio: {
    type: DataTypes.DECIMAL(10, 2),
  },

  p_referencia: {
    type: DataTypes.STRING,
  },
});
