import nodemailer from "nodemailer";
import { GMAIL_KEY } from "../config.js";
import hbs from "nodemailer-express-handlebars";
import path from "path";

export const EnviarCorreo = async (to, subject, text) => {
  // Crear un transportador
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "heladoscarol@gmail.com",
      pass: GMAIL_KEY,
    },
  });

  // Configura Handlebars
  const handlebarOptions = {
    viewEngine: {
      extName: ".hbs",
      partialsDir: path.resolve("../views/"), // Ajustar ruta según tu estructura
      defaultLayout: false,
    },
    viewPath: path.resolve("../views/"), // Ajustar ruta según tu estructura
    extName: ".hbs",
  };
  transporter.use("compile", hbs(handlebarOptions));

  // Configurar opciones de correo
  let mailOptions = {
    from: '"Helados Carol" <heladoscarol@gmail.com>',
    to: to,
    subject: subject,
    text: text,
    template: "email",
    context: {
      // Aquí puedes agregar tus variables para la plantilla
      factura: {
        id: '12345',
        creado: '2024-11-29',
        pasarela: 'USD'
      },
      productos: [
        { nombre_sabor: 'Chocolate', cantidad: 2 },
        { nombre_sabor: 'Vainilla', cantidad: 1 }
      ],
      entrega: {
        beneficiario: 'Juan Pérez',
        calle: 'Primera',
        numero: '123',
        calle1: 'Segunda',
        reparto: 'Centro',
        p_referencia: 'Frente al parque',
        tel_beneficiario: '555-123456',
        ordenante: 'Carlos López',
        contacto_ordenante: 'carlos@example.com',
        observaciones: 'Entregar antes de las 5 PM'
      },
      grandTotalCobrar: '150.00'
    }
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
