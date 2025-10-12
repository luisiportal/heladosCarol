// controllers/gmail.controller.js
import { google } from "googleapis";
import { oauth2Client } from "../Gmail/gmailClient.js";


import {
  extraerMonto,
  extraerNombreZelle,
  extraerTransaction,
} from "../helpers/extraerDatos.js";
import { PagoZelle } from "../models/PagoZelle.model.js";
import { Factura } from "../models/Facturas.model.js";


import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//  Guardar el token
export function saveToken(token) {
  const dir = path.join(__dirname, "private");

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true }); // Crea carpetas anidadas si es necesario
  }

  const tokenPath = path.join(dir, "token_gmail.json");
  fs.writeFileSync(tokenPath, JSON.stringify(token, null, 2), { mode: 0o600 });
}

// Cargar el token
export function loadToken() {
  const tokenPath = path.join(__dirname, "private", "token_gmail.json");

  if (fs.existsSync(tokenPath)) {
    const rawData = fs.readFileSync(tokenPath, "utf-8");
    try {
      return JSON.parse(rawData);
    } catch (error) {
      console.error("Error al parsear el token:", error);
      return null;
    }
  }

  return null;
}

export const iniciarLogin = (req, res) => {
  const token = loadToken();
  if (token) {
    oauth2Client.setCredentials(token);
    res.redirect("gmail");
  } else {
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: ["https://www.googleapis.com/auth/gmail.readonly"],
      prompt: "consent", // fuerza refresh_token en el primer login
    });

    res.redirect(authUrl);
  }
};
export const recibirCallback = async (req, res) => {
  const { code } = req.query;

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    console.log("copiar token");

    console.log(tokens);

    saveToken(tokens);

    const gmail = google.gmail({ version: "v1", auth: oauth2Client });
    const response = await gmail.users.messages.list({
      userId: "me",
      q: 'from:no.reply.alerts@chase.com subject:"You received money with Zelle®"',
    });

    const mensajes = await Promise.all(
      (response.data.messages || []).map(async (msg) => {
        const detalle = await gmail.users.messages.get({
          userId: "me",
          id: msg.id,
        });

        const headers = detalle.data.payload?.headers || [];
        const asunto =
          headers.find((h) => h.name === "Subject")?.value || "Sin asunto";
        const remitente =
          headers.find((h) => h.name === "From")?.value || "Desconocido";

        return {
          id: msg.id,
          asunto,
          remitente,
          resumen: detalle.data.snippet,
        };
      })
    );

    res.json({ cantidad: mensajes.length, mensajes });
  } catch (error) {
    console.error("Error al obtener correos:", error);
    res.status(500).json({ error: "No se pudo acceder a Gmail" });
  }
};

export const gmailInbox = async (req, res) => {
  const token = loadToken();
  oauth2Client.setCredentials(token);

  try {
    const gmail = google.gmail({ version: "v1", auth: oauth2Client });
    const response = await gmail.users.messages.list({
      userId: "me",
      q: 'from:no.reply.alerts@chase.com subject:"You received money with Zelle®"',
      maxResults: 5,
    });

    const mensajes = await Promise.all(
      (response.data.messages || []).map(async (msg) => {
        const detalle = await gmail.users.messages.get({
          userId: "me",
          id: msg.id,
        });

        const headers = detalle.data.payload?.headers || [];
        const asunto =
          headers.find((h) => h.name === "Subject")?.value || "Sin asunto";
        const remitente =
          headers.find((h) => h.name === "From")?.value || "Desconocido";

        const monto = 20;
        const persona = "ELIZABETH SAAVEDRA";

        const montoRecibido = extraerMonto(detalle.data.snippet);
        const personaRecibido = extraerNombreZelle(detalle.data.snippet);

        const pago =
          montoRecibido >= monto && personaRecibido === persona
            ? "Aceptado"
            : "Sin pago";

        return {
          id: msg.id,
          asunto,
          remitente,
          resumen: detalle.data.snippet,
          montoRecibido: montoRecibido,
          personaRecibido: personaRecibido,
          pago: pago,
        };
      })
    );

    res.json({ cantidad: mensajes.length, mensajes });
  } catch (error) {
    console.error("Error al obtener correos:", error);
    res.status(500).json({ error: "No se pudo acceder a Gmail" });
  }
};

export const asociarPagoZelle = async (req, res) => {
  const { persona, monto, id_factura, transaction_number } = req.body;

  const facturaExiste = await Factura.findByPk(id_factura);

  if (!facturaExiste) {
    return res
      .status(404)
      .json({ message: "No existe la factura que intenta asociar" });
  }

  if (facturaExiste.pasarela != "Zelle") {
    return res
      .status(404)
      .json({ message: "La factura introducida no es de Zelle" });
  }

  const pagoExiste = await PagoZelle.findOne({
    where: { id_factura: id_factura },
  });

  if (pagoExiste) {
    return res.status(500).json({
      message: `Ya la factura tiene un pago asociado`,
    });
  }

  try {
    const response = await PagoZelle.create({
      persona,
      monto,
      id_factura,
      transaction_number,
    });

    facturaExiste.pagado = "Aceptado Zelle";
    await facturaExiste.save();
    res.json({ message: "Factura Asociada" });
  } catch (error) {
    res.json({ message: "Error al Asociar" });
  }
};

export const listarPagosZelle = async (req, res) => {
  const token = loadToken();
  oauth2Client.setCredentials(token);

  try {
    const gmail = google.gmail({ version: "v1", auth: oauth2Client });
    const response = await gmail.users.messages.list({
      userId: "me",
      q: 'from:no.reply.alerts@chase.com subject:"You received money with Zelle®"',
      maxResults: 50,
    });

    const mensajes = await Promise.all(
      (response.data.messages || []).map(async (msg) => {
        const detalle = await gmail.users.messages.get({
          userId: "me",
          id: msg.id,
        });

        const headers = detalle.data.payload?.headers || [];
        const asunto =
          headers.find((h) => h.name === "Subject")?.value || "Sin asunto";
        const remitente =
          headers.find((h) => h.name === "From")?.value || "Desconocido";

        const timestamp = parseInt(detalle.data.internalDate, 10);
        const date = new Date(timestamp);

        const montoRecibido = extraerMonto(detalle.data.snippet);
        const personaRecibido = extraerNombreZelle(detalle.data.snippet);
        const transaction_number = extraerTransaction(detalle.data.snippet);

        const pagoExiste = await PagoZelle.findOne({
          where: { transaction_number: transaction_number },
        });

        return {
          id: msg.id,
          asunto,
          remitente,
          resumen: detalle.data.snippet,
          montoRecibido: montoRecibido,
          personaRecibido: personaRecibido,
          utilizado: pagoExiste ? "Ya ha sido asociada" : "Sin asociar",
          transaction_number: transaction_number,

          fecha: date.toLocaleString("es-CU", {
            timeZone: "America/Havana",
            hour12: false, // opcional: para formato 24 horas
          }),
        };
      })
    );

    res.json({ cantidad: mensajes.length, mensajes });
  } catch (error) {
    console.error("Error al obtener correos:", error);
    res.status(500).json({ error: "No se pudo acceder a Gmail" });
  }
};
