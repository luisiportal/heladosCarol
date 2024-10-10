import nodemailer from 'nodemailer';
import { GMAIL_KEY } from '../config.js';
// import nodemailer from "nodemailer";

export const EnviarCorreo = async (to, subject, text) => {

  if (!to) return 0;
    // Create a transporter
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "heladoscarol@gmail.com",
        pass: GMAIL_KEY,
      },
    });
  
    // Set up email options
    let mailOptions = {
      from: "heladoscarol@gmail.com",
      to: to,
      subject: subject,
      text: text,
    };
  
    // Send the email
    try {
      let info = await transporter.sendMail(mailOptions);
      console.log("Email sent: " + info.response);
      return info;
    } catch (error) {
     console.log(error);
           
      console.error("Error sending email:", error);
      
    }
  };
  