import { Router } from "express";

import { getOrden } from "../controllers/RastrearOrden.controllers.js";
import { authRequired } from "../middlewares/validateToken.js";

const rastrearOrden = Router();

rastrearOrden.get("/ordenes/:contacto", authRequired, getOrden);

export default rastrearOrden;
