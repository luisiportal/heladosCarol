import { Router } from "express";
import { createPago, getNotificationPayment } from "../controllers/Tropipay.controllers.js";


const tropipay = Router();

tropipay.post("/verificarpago",getNotificationPayment);


tropipay.post("/pago", createPago);

export default tropipay;
