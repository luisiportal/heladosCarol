export const tropiPayFeeGet = (total) => {
  return ((total * 3.45) / 100 + 0.5).toFixed(2);
};
