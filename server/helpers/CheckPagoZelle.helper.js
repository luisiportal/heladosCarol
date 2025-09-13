import { google } from "googleapis";
import { oauth2Client } from "../Gmail/gmailClient.js";
import fs from "fs";
import { Factura } from "../models/Facturas.model.js";
import { PagoZelle } from "../models/PagoZelle.model.js";
import { TOKEN_PATH } from "../config.js";


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

function extraerTransaction(texto) {
  const match = texto.match(/Transaction number\s+(\d+)/);
  return match ? match[1] : null;
}

function loadToken() {
  if (fs.existsSync(TOKEN_PATH)) {
    return JSON.parse(fs.readFileSync(TOKEN_PATH));
  }
  return null;
}

function normalizarNombre(nombre) {
  return nombre.trim().toLowerCase();
}

export const checkPagoZelle = async (persona, monto, id_factura) => {
  try {
    const token = loadToken();
    console.log(token);
    
    oauth2Client.setCredentials(token);

    const gmail = google.gmail({ version: "v1", auth: oauth2Client });

    const response = await gmail.users.messages.list({
      userId: "me",
      q: 'from:no.reply.alerts@chase.com subject:"You received money with Zelle®"',
      maxResults: 20,
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

        const montoRecibido = extraerMonto(detalle.data.snippet);
        const personaRecibido = extraerNombreZelle(detalle.data.snippet);
        const transaction_number = extraerTransaction(detalle.data.snippet);

        const pagoExiste = await PagoZelle.findOne({
          where: { transaction_number: transaction_number },
        });

        if (pagoExiste) return "Ya se utilizó esta transacción";

        if (
          Number(montoRecibido) >= Number(monto) &&
          normalizarNombre(personaRecibido) === normalizarNombre(persona)
        ) {
          if (!pagoExiste) {
            const pagoZelle = await PagoZelle.create({
              persona: personaRecibido,
              monto: montoRecibido,
              id_factura: id_factura,
              transaction_number: transaction_number,
            });

            const factura = await Factura.findByPk(id_factura);
            factura.pagado = "Aceptado Zelle";
            factura.id_zelle = pagoZelle.id;
            await factura.save();
            return "Pago Recibido";
          } else {
            console.log("Ya se utilizo esta transaccion");
          }
        } else {
          return "No logramos encontrar el pago";
        }
      })
    );

    return mensajes;
  } catch (error) {
    console.error("Error al obtener correos:", error);
    console.log("No se pudo acceder a Gmail");
  }
};
