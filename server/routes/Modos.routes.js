import { Router } from "express";
import { getModoCerrado, updateModoCerrado } from "../controllers/Modo.controllers.js";
import { authRequired } from "../middlewares/validateToken.js";



const modos = Router();

modos.put("/cerrado",authRequired, updateModoCerrado);
modos.get("/cerrado", getModoCerrado);

export default modos;
