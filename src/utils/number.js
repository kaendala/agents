const formatCurrency = (locales, currency, fractionDigits, number) => {
  const formatted = formatNumber(locales, currency, fractionDigits, number)
  return '$' + formatted;
};
const formatNumber= (locales, currency, fractionDigits, number) => {
  const formatted = new Intl.NumberFormat(locales, {
    currency: currency,
    minimumFractionDigits: fractionDigits,
  }).format(number);
  return formatted;
};
const removeCurrencyFormat = value => {
  return value.replace(/[,.]/g, '').replace('$', '');
  };

export {
  formatCurrency,
  removeCurrencyFormat,
  formatNumber
};
