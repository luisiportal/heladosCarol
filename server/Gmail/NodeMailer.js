import nodemailer from "nodemailer";
import { GMAIL_KEY } from "../config.js";
import hbs from "nodemailer-express-handlebars";
import path from "path";
import Handlebars from "handlebars";

// Definir el helper 'eq'
Handlebars.registerHelper("eq", function (a, b) {
  return a === b;
});

export const EnviarCorreo = async ({
  to,
  subject,
  factura,
  productos,
  entrega,
  grandTotalCobrar,
}) => {


  console.log(factura);
  
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
    from: '"Helados Carol" <heladoscarol@gmail.com>',
    to: to,
    subject: subject,
    template: "email",
    context: {
      factura,
      productos,
      entrega,
      grandTotalCobrar,
    },
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
