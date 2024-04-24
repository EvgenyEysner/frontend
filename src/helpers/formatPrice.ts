export const formatPrice = (amout: number) => {
  return new Intl.NumberFormat("ru-Ru", {
    style: "currency",
    currency: "RUB",
  }).format(amout);
};
