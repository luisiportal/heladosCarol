// controllers/gmail.controller.js
import { google } from "googleapis";
import { oauth2Client } from "../Gmail/gmailClient.js";

import fs from "fs";
import path from "path";

function extraerMonto(texto) {
  const regex = /Amount\s+\$([0-9]+\.[0-9]{2})/;
  const match = texto.match(regex);
  return match ? parseFloat(match[1]) : null;
}

function extraerNombreZelle(texto) {
  const regex = /Zelle\s+®\s+payment\s+(.*?)\s+sent/i;
  const match = texto.match(regex);
  return match ? match[1].trim() : null;
}

const TOKEN_PATH = path.resolve("./token.json");

function saveToken(token) {
  fs.writeFileSync(TOKEN_PATH, JSON.stringify(token));
}

function loadToken() {
  if (fs.existsSync(TOKEN_PATH)) {
    return JSON.parse(fs.readFileSync(TOKEN_PATH));
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
