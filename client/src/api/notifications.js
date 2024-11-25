import axios from "./axios.js";

const PUBLICWpKey = import.meta.env.WEBPUSH_PUBLIC;

export const suscribeRequest = async () => {
  if ("serviceWorker" in navigator) {
    try {
      // Verifica si el navegador soporta Service Workers
      const registration = await navigator.serviceWorker.register(`/sw.js`, {
        scope: "/",
      });
      console.log("Service Worker registrado con éxito:", registration);

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: PUBLICWpKey,
      });

      await axios.post(`/suscription`, JSON.stringify(subscription));
      console.log("Solicitud de suscripción realizada con éxito");
    } catch (error) {
      console.error(`Falló el registro con el error: ${error}`);
    }
  } else {
    console.log("Service Worker no es soportado por este navegador.");
  }
};
