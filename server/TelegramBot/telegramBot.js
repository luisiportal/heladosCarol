import { Telegraf } from 'telegraf';
import axios from 'axios';
import { TBOT } from '../config.js';

const bot = new Telegraf(TBOT);

// Función para enviar un mensaje a un número específico
export const sendMessageToNumber = async (number, message) => {
  const url = `https://api.telegram.org/${TBOT}/sendMessage`;
  const params = {
    chat_id: number,
    text: message,
  };
  try {
    const response = await axios.post(url, params);
    console.log('Mensaje enviado:', response.data);
  } catch (error) {
    console.error('Error enviando mensaje:', error);
  }
};

// Enviar un mensaje al iniciar el bot
bot.start((ctx) => {
  ctx.reply('¡Hola! Soy tu bot.');
  sendMessageToNumber('50154565', 'Este es un mensaje de prueba.');
});

bot.launch();
console.log('Bot iniciado');
