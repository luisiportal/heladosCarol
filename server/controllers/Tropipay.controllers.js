import { BACKEND_URL, CLIENT_ID, CLIENT_SECRET } from "../config.js";
import { Factura } from "../models/Facturas.model.js";

export const getNotificationPayment = async (req, res) => {
  console.log(req.body);
  
  const { reference } = req.body.data;
  try {
    const response = await Factura.findOne({
      where: {
        reference: reference,
      },
    });

    response.pagado = "Pagado";
    await response.save();

    res.sendStatus(204);
  } catch (error) {
    console.error(error);
  }
};

export const createPago = async (req, res) => {
  
  const { description, totalCobrar, fechaFactura, reference } = req.body;
  const token = await getAccessToken();

  const notificacionURL = `${BACKEND_URL}/verificarpago`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Aquí agregamos el token Bearer
    },
    body: JSON.stringify({
      reference: reference,
      concept: "Pago a Helados Carol Holguín",
      favorite: true,
      description: description,
      amount: totalCobrar,
      currency: "EUR",
      singleUse: true,
      reasonId: 4,
      expirationDays: 1,
      lang: "es",
      urlSuccess: "https://www.heladoscarol.com/comprar/3",
      urlFailed: "https://www.heladoscarol.com/comprar/0",
      urlNotification: "api.heladoscarol.com/revisarpago",
      serviceDate: fechaFactura,
      directPayment: true,
      paymentMethods: ["EXT", "TPP"],
    }),
  };

  try {
    const response = await fetch(
      "https://tropipay-dev.herokuapp.com/api/v2/paymentcards",
      options
    );
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.log(error);

    console.error("Error en la creación del pago:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getAccessToken = async () => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      grant_type: "client_credentials",
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    }),
  };

  try {
    const response = await fetch(
      "https://tropipay-dev.herokuapp.com/api/v2/access/token",
      options
    );
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Error obteniendo el token de acceso:", error);
    throw error; // Propaga el error para que pueda ser manejado por el llamador
  }
};

export const checkConnection = async () => {
  try {
    const response = await fetch("https://www.google.com", {
      method: "HEAD",
      mode: "no-cors",
    });
    if (response.ok) {
      console.log("Conexión a Internet activa.");
    } else {
      console.log("Error: No se pudo conectar a Internet.");
    }
  } catch (error) {
    console.log("Sin conexión a Internet:", error);
  }
};
