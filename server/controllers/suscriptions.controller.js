import webPush from "web-push";
import { WEBPUSH_PRIVATE, WEBPUSH_PUBLIC } from "../config.js";
import PushNotifications from "node-pushnotifications";
import { Suscription } from "../models/suscription.model.js";

export const suscribe = async (req, res) => {
  // Get pushSubscription object
  const subscription = req.body;

  const { endpoint } = req.body;
  const { p256dh, auth } = req.body.keys;

  saveSuscriptionBD({ endpoint, auth, p256dh }); /// guarda los datos de la suscripcion

  const settings = {
    web: {
      vapidDetails: {
        subject: "mailto:heladoscarol@gmail.com", // REPLACE_WITH_YOUR_EMAIL
        publicKey: WEBPUSH_PUBLIC,
        privateKey: WEBPUSH_PRIVATE,
      },
      gcmAPIKey: "gcmkey",
      TTL: 2419200,
      contentEncoding: "aes128gcm",
      headers: {},
    },
    isAlwaysUseFCM: false,
  };

  // Send 201 - resource created
  const push = new PushNotifications(settings);

  // Create payload
  const payload = { title: "Escuchando notificaciones", body:"Derritiendo Corazones", };
  push.send(subscription, payload, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });
};

export const enviaNotification = async () => {
  const subscriptions = await Suscription.findAll();

  const settings = {
    web: {
      vapidDetails: {
        subject: "mailto:heladoscarol@gmail.com", // REPLACE_WITH_YOUR_EMAIL
        publicKey: WEBPUSH_PUBLIC,
        privateKey: WEBPUSH_PRIVATE,
      },
      gcmAPIKey: "gcmkey",
      TTL: 2419200,
      contentEncoding: "aes128gcm",
      headers: {},
    },
    isAlwaysUseFCM: false,
  };

  // Send 201 - resource created
  const push = new PushNotifications(settings);

  const payload = JSON.stringify({
    title: "Nueva Factura",
    body: "Se ha generado una nueva factura.",
  });

  subscriptions.forEach((subscription) => {
    const pushSubscription = {
      endpoint: subscription.endpoint,
      keys: {
        p256dh: subscription.p256dh,
        auth: subscription.auth,
      },
    };

    push.send(pushSubscription, payload, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    });
  });

  //res.status(204).json();
};

const saveSuscriptionBD = async ({ endpoint, auth, p256dh }) => {
  try {
    const existe = await Suscription.findOne({
      where: { auth: auth },
    });
    if (!existe) {
      const response = await Suscription.create({ endpoint, p256dh, auth });
    }
  } catch (error) {
    console.log(error);
  }
};
