import { CORREO_PASS, FRONTEND_URL, GMAIL_KEY } from "../config.js";

import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path";
import Handlebars from "handlebars";
// Definir el helper 'eq'
Handlebars.registerHelper("eq", function (a, b) {
  return a === b;
});

export const EnviarCorreo = async ({
  entrega,
  to,
  subject,
  factura,
  productos,
  total_venta,
  plantilla,
  moneda,
}) => {
  let transporter = nodemailer.createTransport({
    host: "mail.heladoscarol.com", // servidor SMTP del hosting
    port: 465, // 465 para SSL o 587 para STARTTLS
    secure: true, // true si usas 465, false si usas 587
    auth: {
      user: "facturas@heladoscarol.com", // tu correo completo
      pass: CORREO_PASS, // la contraseña del correo en cPanel
    },
  });

  // Configura Handlebars
  const handlebarOptions = {
    viewEngine: {
      extName: ".hbs",
      partialsDir: path.resolve("./views/"), // Ajustar ruta según tu estructura
      defaultLayout: false,
      helpers: {
        eq: (a, b) => a === b, // Agregar el helper 'eq' aquí también
      },
    },
    viewPath: path.resolve("./views/"), // Ajustar ruta según tu estructura
    extName: ".hbs",
  };
  transporter.use("compile", hbs(handlebarOptions));

  // Configurar opciones de correo
  let mailOptions = {
    from: '"Helados Carol" <facturas@heladoscarol.com>',
    to: to,
    subject: subject,
    template: plantilla,
    context: {
      entrega: entrega,
      factura: factura,
      productos: productos,
      total_venta: total_venta,
      moneda: moneda,
    },
    attachments: [
      {
        filename: "logoCarol.jpg",
        path: `${FRONTEND_URL}/logoCarol.jpg`,
        cid: "logoCarol", //same cid value as in the html img src
      },
      {
        filename: "fb",
        path: `${FRONTEND_URL}/fb.png`,
        cid: "fb", //same cid value as in the html img src
      },
      {
        filename: "whatsapp",
        path: `${FRONTEND_URL}/whatsapp.png`,

        cid: "whatsapp", //same cid value as in the html img src
      },
      {
        filename: "instagram",
        path: `${FRONTEND_URL}/instagram.png`,

        cid: "instagram", //same cid value as in the html img src
      },
    ],
  };

  // Enviar el correo
  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Correo enviado: " + info.response);
    return info;
  } catch (error) {
    console.error("Error enviando el correo:", error);
    throw error;
  }
};
