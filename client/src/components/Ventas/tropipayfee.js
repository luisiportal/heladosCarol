export const tropiPayFee = (total) => {
  return ((total * 3.45) / 100 + 0.5).toFixed(2);
};
