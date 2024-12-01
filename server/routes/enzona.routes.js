import { Router } from "express";
import { createPagoEZ } from "../Pasarelas/Enzona.js";

const enzona = Router();

//tropipay.post("/verificarpagoEnzona",getNotificationPayment);

enzona.post("/pagoEnzona", createPagoEZ);

export default enzona;
