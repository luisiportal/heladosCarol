import { Producto } from "./Producto.model.js";
import { Movimiento } from "./Movimientos.model.js";
import { Venta } from "./Ventas.model.js";
import { Factura } from "./Facturas.model.js";
import { Trabajador } from "./Trabajador.model.js";
import { AuditLog } from "./AuditLog.model.js";
import { Sabor } from "./Sabor.model.js";
import { Entrega } from "./Entrega.model.js";

export const associations = () => {
  Sabor.hasMany(Movimiento, {
    foreignKey: "id_sabor",
    onDelete: "CASCADE",
    hooks: true,
  });

  Movimiento.belongsTo(Sabor, { foreignKey: "id_sabor" });
};

Factura.hasMany(Venta, {
  foreignKey: "id_factura",
  onDelete: "CASCADE",
  hooks: true,
});

Venta.belongsTo(Factura, { foreignKey: "id_factura" });
Entrega.belongsTo(Factura, { foreignKey: "id_factura" });
Entrega.hasOne(Factura, {
  foreignKey: "id",
  onDelete: "CASCADE",
  hooks: true,
});

Venta.belongsTo(Sabor, { foreignKey: "id_sabor" });
Producto.hasMany(Venta, {
  foreignKey: "id_sabor",
  onDelete: "CASCADE",
  hooks: true,
});

Trabajador.hasMany(AuditLog, { foreignKey: "id_usuario" });
AuditLog.belongsTo(Trabajador, { foreignKey: "id_usuario" });

Venta.hasOne(Movimiento, {
  foreignKey: "id_venta", // Aquí está la corrección
  onDelete: "CASCADE",
  hooks: true,
});
