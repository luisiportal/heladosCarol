export const precioMoneda = (metoPago) => {
    let moneda = "";
    if (metoPago == "CUP") {
      moneda = "CUP";
    }
    if (metoPago == "Zelle") {
      moneda = "USD";
    }
    if (metoPago == "TropiPay") {
      moneda = "EUR";
    }
    return moneda;
  };