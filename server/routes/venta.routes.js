import { Router } from "express";

import { authRequired } from "../middlewares/validateToken.js";
import {
  createVenta,
  deleteFactura,
  getTodosFacturas,
  updateFechaFactura,
} from "../controllers/Venta.controller.js";
import { uploadFactura } from "../controllers/upload.multer.js";

const ventas = Router();

ventas.post("/ventas",uploadFactura.single("factura_image"),  createVenta);
ventas.get("/ventas", authRequired, getTodosFacturas);
ventas.delete("/facturas/:id", deleteFactura);
ventas.put("/facturas/", authRequired, updateFechaFactura);

export default ventas;
