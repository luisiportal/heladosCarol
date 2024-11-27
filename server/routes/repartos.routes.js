import { Router } from "express";

import { crearReparto, getTodosRepartos, getUnReparto, updateReparto } from "../controllers/Repartos.controllers.js";
import { authRequired } from "../middlewares/validateToken.js";

const repartos = Router();

repartos.get("/repartos", getTodosRepartos);
repartos.get("/repartos/:id", getUnReparto);
repartos.put("/repartos/:id", authRequired, updateReparto);
repartos.post("/repartos/", authRequired, crearReparto);



export default repartos;
