import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { getFrase, getTodasFrases, updateFrase } from "../controllers/Frases.controller.js";

const Frases = Router();

Frases.put("/frases/:id", authRequired, updateFrase);
Frases.get("/frases/", getTodasFrases);
Frases.get("/frases/:id", getFrase);
export default Frases;
