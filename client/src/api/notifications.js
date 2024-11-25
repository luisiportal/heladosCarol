import axios from "./axios.js";

const PUBLICWpKey = import.meta.env.VITE_WEBPUSH_PUBLIC;

export const suscribeRequest = async () => {
  if ("serviceWorker" in navigator) {
    try {
      // Solicitar permisos de notificaciones dentro de un evento generado por el usuario
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        throw new Error("Permiso para notificaciones denegado");
      }

      // Registrar el Service Worker
      const registration = await navigator.serviceWorker.register("/sw.js", {
        scope: "/",
      });
      console.log("Service Worker registrado con éxito:", registration);

      // Suscribirse a las notificaciones push
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: PUBLICWpKey,
      });

      // Convertir la suscripción a JSON
      const dataJson = JSON.stringify(subscription);
      console.log(dataJson);

      // Enviar la suscripción al servidor como JSON
      await axios.post(`/suscription`, dataJson, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      console.log("Solicitud de suscripción realizada con éxito");
    } catch (error) {
      console.error(`Falló el registro con el error: ${error}`);
    }
  } else {
    console.log("Service Worker no es soportado por este navegador.");
  }
};
