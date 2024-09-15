import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { getFrase, getTodasFrases, updateFrase } from "../controllers/Frases.controller.js";

const frases = Router();

frases.put("/frases/:id", authRequired, updateFrase);
frases.get("/frases/", getTodasFrases);
frases.get("/frases/:id", getFrase);
export default frases;
