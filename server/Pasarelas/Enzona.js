import { CONSUMER_KEY, CONSUMER_SECRET } from "../config.js";

export const createPagoEZ = async (req, res) => {
  const { description, totalCobrar, fechaFactura, reference } = req.body;
  const token = await getAccessTokenEnzona();
  console.log(token);
};


export const getAccessTokenEnzona = async () => {
  // Codifica las credenciales en Base64
  const credentials = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString('base64');

  const options = {
    method: "POST",
    headers: {
      "Authorization": `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  };

  try {
    const response = await fetch("https://api.enzona.net/token", options);
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

