import { Telegraf } from "telegraf";
import axios from "axios";
import { TBOT } from "../config.js";

const bot = new Telegraf(TBOT);

// Función para enviar un mensaje a un número específico
export const sendMessageToNumber = async (number, message) => {
  const params = {
    chat_id: number,
    text: message,
  };
  // Enviar el mensaje
  bot.telegram
    .sendMessage(params.chat_id, params.text)
    .then(() => {
      console.log("Mensaje enviado con éxito");
    })
    .catch((error) => {
      console.error("Error al enviar el mensaje:", error);
    });

  // Iniciar el bot
  bot.launch();
};
