import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";

export const Sabor = sequelize.define("sabores", {
  id_sabor: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  nombre_sabor: {
    type: DataTypes.STRING,
  },
  color: {
    type: DataTypes.STRING,
  },
  envase: {
    type: DataTypes.STRING,
  },

  existencia: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  costo_unitario: {
    type: DataTypes.DECIMAL(10, 2),
  },
  costo_total: {
    type: DataTypes.DECIMAL(10, 2),
  },

  precio_venta: {
    type: DataTypes.DECIMAL(10, 2),
    
  },
  precio_venta_cup: {
    type: DataTypes.DECIMAL(10, 2),
    
  },
  costo_usd: {
    type: DataTypes.DECIMAL(10, 2),
    
  },
  costo_euro: {
    type: DataTypes.DECIMAL(10, 2),
    
  },
  costo_zelle: {
    type: DataTypes.DECIMAL(10, 2),
    
  },
  costo_mlc: {
    type: DataTypes.DECIMAL(10, 2),
    
  },
  stockMinimo: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },

  ruta_image: {
    type: DataTypes.STRING,
  },
 
   

});


