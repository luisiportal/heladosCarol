import webPush from "web-push";

export const suscribe = async (req, res) => {
  const pushSubscription = req.body;

  // Responde inmediatamente al cliente para confirmar la recepción
  res.status(200).json("Subscription received");

  // Define el payload de la notificación
  const payload = JSON.stringify({
    title: "Mi Notificación",
    message: "Este es el mensaje",
  });

  try {
    // Envía la notificación push
    await webPush.sendNotification(pushSubscription, payload);
    console.log("Notificación enviada con éxito");
  } catch (error) {
    console.error("Error al enviar la notificación:", error);
  }
};
