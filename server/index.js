import express from "express";
import { FRONTEND_URL, PUERTO } from "./config.js";
import indexRoutes from "./routes/index.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import loginRouter from "./routes/login.routes.js";
import sequelize from "./db.js";
import movimientos from "./routes/movimientos.routes.js";
import moneda from "./routes/moneda.routes.js";
import { associations } from "./models/associations.js";
import ventas from "./routes/venta.routes.js";
import audiTlogs from "./routes/audilogs.routes.js";
import cuadre_caja from "./routes/cuadre_caja.routes.js";
import sabores from "./routes/sabores.routes.js";
import reviews from "./routes/reviews.routes.js";
import repartos from "./routes/repartos.routes.js";
import path from "path";
import { fileURLToPath } from "url";
import { sendMessageToNumber } from "./TelegramBot/telegramBot.js";
import rastrearOrden from "./routes/rastrearOrden.routes.js";
import modos from "./routes/Modos.routes.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);
associations();
await sequelize.sync({ alter: true });
sequelize.query(
  'ALTER TABLE public.movimientos ALTER COLUMN "createdAt" SET DEFAULT now();'
);
sequelize.query(
  'ALTER TABLE public.movimientos ALTER COLUMN "updatedAt" SET DEFAULT now();'
);

app.use("/images", express.static(path.join(__dirname, "/public/images")));
app.disable("x-powered-by");
app.use(cookieParser());
app.use(express.json());
app.use(indexRoutes);
app.use(sabores);
app.use(loginRouter);
app.use(movimientos);
app.use(moneda);
app.use(ventas);
app.use(audiTlogs);
app.use(cuadre_caja);
app.use(reviews);
app.use(repartos);
app.use(rastrearOrden);
app.use(modos);

app.listen(PUERTO, () => {
  console.log(`El server esta en el puerto : ${PUERTO}....`);
});
