import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";

export const Reserva = sequelize.define(
  "reservas",
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
    moneda: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    total_venta: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    tropiPayFee: {
      type: DataTypes.DECIMAL,
      allowNull: true,
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
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "Sin pago",
    },
    fechaEntrega: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    createdAt: false,
  }
);
