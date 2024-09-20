import { Router } from "express";

import { authRequired } from "../middlewares/validateToken.js";
import {
  createVenta,
  deleteFactura,
  getTodosFacturas,
} from "../controllers/Venta.controller.js";
import { uploadFactura } from "../controllers/upload.multer.js";
import { confirmarFactura, estadoFacturaEntregada, updateFechaFactura } from "../controllers/Facturas.controller.js";

const ventas = Router();

ventas.post("/ventas",uploadFactura.single("factura_image"),  createVenta);
ventas.get("/ventas", authRequired, getTodosFacturas);
ventas.delete("/facturas/:id", deleteFactura);
ventas.put("/facturas/", authRequired, updateFechaFactura);
ventas.put("/facturas/confirmar/:id", authRequired, confirmarFactura);
ventas.put("/facturas/entregada/:id", authRequired, estadoFacturaEntregada);

export default ventas;
