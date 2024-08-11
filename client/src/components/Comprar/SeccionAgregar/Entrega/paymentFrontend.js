export const paymentFrontend = async () => {

    
  const { error, paymentMethod } = await stripe.createPaymentMethod({
    type: "card",
    card: elements.getElement(CardElement),
  });
  return {error, paymentMethod};
};
