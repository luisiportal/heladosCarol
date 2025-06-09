import { Router } from "express";

import { authRequired } from "../middlewares/validateToken.js";
import {
  
  deleteFactura,
} from "../controllers/Venta.controller.js";
import { confirmarFactura, estadoFacturaEntregada } from "../controllers/Facturas.controller.js";
import { getReservasFacturas } from "../controllers/ReservaController.js";

const reservas = Router();


reservas.get("/reservas", authRequired, getReservasFacturas);
reservas.delete("/facturas/:id", deleteFactura);
reservas.put("/facturas/confirmar/:id", authRequired, confirmarFactura);
reservas.put("/facturas/entregada/:id", authRequired, estadoFacturaEntregada);

export default reservas;
