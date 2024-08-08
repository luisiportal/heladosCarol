export const StripePayment = async () => {
  const payment = await stripe.paymentIntents.create({
    amount: total_venta * 100,
    currency: "USD",
    description: "Potes de Helado Carol",
    payment_method: id_pago,
    confirm: true,
    return_url: "http://localhost:5173",
  });
};
