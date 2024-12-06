export const grandTotalFactura = (totalVenta, envio) => {
  let total = Number(totalVenta) + Number(envio);
  return total.toFixed(2);
};
