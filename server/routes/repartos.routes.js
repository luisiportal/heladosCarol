import { Router } from "express";

import { getTodosRepartos } from "../controllers/Repartos.controllers.js";

const repartos = Router();

repartos.get("/repartos", getTodosRepartos);

export default repartos;
