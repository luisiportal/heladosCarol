import { BACKEND_URL, CLIENT_ID, CLIENT_SECRET } from "../config.js";

export const getNotificationPayment = async (req, res) => {
  const { bankOrderCode, userPassword, originalCurrencyAmount } =
    req.body.data;

  const { signaturev2 } = req.body.charges;
  const { clientEmail } = req.body.clientData;
  const signatureLocal = sha256(
    bankOrderCode + clientEmail + sha1(userPassword) + originalCurrencyAmount
  );

  if (signaturev2 == signatureLocal) {
    console.log("sirvio");
  } else {
    console.log("nada no es");
  }

  console.log(req.body);

  res.status(204);
};

export const createPago = async (req, res) => {
  const { description, totalCobrar, fechaFactura } = req.body;
  const token = await getAccessToken();
  const notificacionURL = `${BACKEND_URL}/verificarpago`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Aquí agregamos el token Bearer
    },
    body: JSON.stringify({
      reference: "Helados Carol Holguín",
      concept: "Pago a Helados Carol Holguín",
      favorite: true,
      description: description,
      amount: totalCobrar,
      currency: "EUR",
      singleUse: true,
      reasonId: 4,
      expirationDays: 1,
      lang: "es",
      urlSuccess: "https://www.heladoscarol.com/pagoOk",
      urlFailed: "https://www.heladoscarol.com/payment-ko",
      urlNotification: notificacionURL,
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
