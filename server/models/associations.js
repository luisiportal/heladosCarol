import { Producto } from "./Producto.model.js";
import { Movimiento } from "./Movimientos.model.js";
import { Venta } from "./Ventas.model.js";
import { Factura } from "./Facturas.model.js";
import { Trabajador } from "./Trabajador.model.js";
import { AuditLog } from "./AuditLog.model.js";
import { Sabor } from "./Sabor.model.js";
import { Entrega } from "./Entrega.model.js";
import { Imagen } from "./Imagenes.model.js";
import { PagoZelle } from "./PagoZelle.model.js";

export const associations = () => {

  // Sabores ↔ Movimientos
  Sabor.hasMany(Movimiento, {
    foreignKey: "id_sabor",
    onDelete: "CASCADE",
    hooks: true,
  });
  Movimiento.belongsTo(Sabor, { foreignKey: "id_sabor" });

  // Factura ↔ Ventas
  Factura.hasMany(Venta, {
    foreignKey: "id_factura",
    onDelete: "CASCADE",
    hooks: true,
  });
  Venta.belongsTo(Factura, { foreignKey: "id_factura" });

  // Entrega ↔ Factura
  Entrega.belongsTo(Factura, {
    foreignKey: "id_factura",
    onDelete: "CASCADE",
    hooks: true,
  });
  Entrega.hasOne(Factura, {
    foreignKey: "id",
    onDelete: "CASCADE",
    hooks: true,
  });
  Factura.hasOne(Entrega, {
    foreignKey: "id_factura",
    onDelete: "CASCADE",
    hooks: true,
  });

  // Venta ↔ Sabor
  Venta.belongsTo(Sabor, { foreignKey: "id_sabor" });

  // Producto ↔ Ventas
  Producto.hasMany(Venta, {
    foreignKey: "id_sabor",
    onDelete: "CASCADE",
    hooks: true,
  });

  // Trabajador ↔ AuditLog
  Trabajador.hasMany(AuditLog, { foreignKey: "id_usuario" });
  AuditLog.belongsTo(Trabajador, { foreignKey: "id_usuario" });

  // Venta ↔ Movimiento
  Venta.hasOne(Movimiento, {
    foreignKey: "id_venta",
    onDelete: "CASCADE",
    hooks: true,
  });

  // Sabor ↔ Imagen
  Sabor.hasMany(Imagen, {
    foreignKey: "id_recurso",
    onDelete: "CASCADE",
  });
  Imagen.belongsTo(Sabor, {
    foreignKey: "id_sabor",
    onDelete: "CASCADE",
  });

  // Factura ↔ PagoZelle
  Factura.hasOne(PagoZelle, {
    foreignKey: "id_factura",
    onDelete: "CASCADE",
  });
  PagoZelle.belongsTo(Factura, {
    foreignKey: "id_factura",
    onDelete: "CASCADE",
  });
};
