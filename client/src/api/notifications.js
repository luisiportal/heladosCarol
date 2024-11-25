import axios from "./axios.js";

const PUBLICWpKey = import.meta.env.WEBPUSH_PUBLIC;

const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("./sw.js", {
        scope: "/",
      });
      if (registration.installing) {
        console.log("Instalando el Service worker");
      } else if (registration.waiting) {
        console.log("Service worker instalado");
      } else if (registration.active) {
        console.log("Service worker activo");
      }
    } catch (error) {
      console.error(`Falló el registro con el ${error}`);
    }
  }
};

export const suscribeRequest = async () => {
  const suscription = registerServiceWorker();
  await axios.post(`/suscription`, JSON.stringify(suscription));
};
