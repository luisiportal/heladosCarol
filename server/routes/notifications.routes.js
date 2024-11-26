import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  enviaNotification,
  suscribe,
} from "../controllers/suscriptions.controller.js";

const suscription = Router();

suscription.post("/suscription", suscribe);

//suscription.post("/pushnotifation", enviaNotification);

export default suscription;
