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
import { upload } from "../controllers/upload.multer.js";
import { getEstadistica } from "../controllers/Productos.controllers.js";
import {
  gmailInbox,
  iniciarLogin,
  recibirCallback,
} from "../controllers/GmailControllers.js";
const sabores = Router();

sabores.get("/Sabores", getTodosSabores); // ruta publica
sabores.get("/sabores/areservar", getSaboresReservar);
sabores.get("/estadistica", getEstadistica);

sabores.get("/correo", iniciarLogin); // Redirige a Google
sabores.get("/oauth2callback", recibirCallback); // Recibe el code y muestra correos
sabores.get("/gmail", gmailInbox); // Recibe el code y muestra correos

sabores.get("/Sabores/:id_sabor", getSabor);
sabores.get("/saborestodos/", getSaboresBackend); // ruta publica

sabores.post(
  "/Sabores",
  authRequired,
  upload.array("ruta_image", 10),
  createSabor,
);

sabores.put(
  "/Sabores/:id_sabor",
  authRequired,
  upload.array("ruta_image", 10),
  updateSabor,
);

sabores.delete("/Sabores/:id_sabor", authRequired, deleteSabor);

export default sabores;
