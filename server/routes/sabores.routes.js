import { Router } from "express";

import { authRequired } from "../middlewares/validateToken.js";
import { createSabor, deleteSabor, getSabor, getTodosSabores, updateSabor } from "../controllers/Sabores.controllers.js";
import { uploadProducto } from "../controllers/upload.multer.js";
const sabores = Router();

sabores.get("/Sabores", getTodosSabores); // ruta publica

sabores.get("/Sabores/:id_sabor",authRequired, getSabor);

sabores.post(
  "/Sabores",authRequired,
  uploadProducto.single("ruta_image"),
  createSabor
);

sabores.put(
  "/Sabores/:id_sabor",authRequired,
  uploadProducto.single("ruta_image"),
  updateSabor
);

sabores.delete("/Sabores/:id_sabor",authRequired, deleteSabor);

export default sabores;
