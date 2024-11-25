import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { suscribe } from "../controllers/suscriptions.controller.js";

const suscription = Router();

suscription.post("/suscription", authRequired, suscribe);

export default suscription;