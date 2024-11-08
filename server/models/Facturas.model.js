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
    pasarela: {
      type: DataTypes.STRING,
      allowNull: true,
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
      allowNull: true,
    },
    reference: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pagado: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    userId: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    createdAt: false,
  }
);
