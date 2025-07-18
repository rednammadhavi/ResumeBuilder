export const formatCurrency = (number, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        maximumFractionDigits: 6,
    }).format(number);
};

export const formatNumber = (number) => {
    return new Intl.NumberFormat('en-US').format(number);
};

export const formatPercentage = (value) => {
  return `${value?.toFixed(2)}%`;
};
