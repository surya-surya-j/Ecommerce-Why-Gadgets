const displayINRCurrency = (num) => {
  const formmatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  });
  return formmatter.format(num);
};

export default displayINRCurrency;
