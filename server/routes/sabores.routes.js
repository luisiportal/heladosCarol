import { Router } from "express";

import { authRequired } from "../middlewares/validateToken.js";
import {
  createSabor,
  deleteSabor,
  getSabor,
  getSaboresBackend,
  getSaboresReservar,
  getTodosSabores,
  updateSabor,
} from "../controllers/Sabores.controllers.js";
import { upload, uploadProducto } from "../controllers/upload.multer.js";
const sabores = Router();

sabores.get("/Sabores", getTodosSabores); // ruta publica
sabores.get("/sabores/areservar", getSaboresReservar);

sabores.get("/Sabores/:id_sabor",  getSabor);
sabores.get("/saborestodos/", getSaboresBackend); // ruta publica

sabores.post(
  "/Sabores",
  authRequired,
  upload.array("ruta_image", 10),
  createSabor
);

sabores.put(
  "/Sabores/:id_sabor",
  authRequired,
  upload.array("ruta_image", 10),
  updateSabor
);

sabores.delete("/Sabores/:id_sabor", authRequired, deleteSabor);

export default sabores;
