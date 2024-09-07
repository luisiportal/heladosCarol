import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";

export const Factura = sequelize.define(
  "facturas",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_pago: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    confirmado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    estado: {
      type: DataTypes.STRING,

      defaultValue: "Sin confirmar",
    },

    total_venta: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },

    creado: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    ruta_image: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    createdAt: false,
  }
);
