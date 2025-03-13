export const formatCurrency = (value: number): string => {
  if (!value && value !== 0) return '--';

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};

export const formatLargeNumber = (value: number): string => {
  if (!value && value !== 0) return '--';

  const suffixes = ['', 'K', 'M', 'B', 'T'];
  let suffixIndex = 0;
  let formattedValue = value;

  while (formattedValue >= 1000 && suffixIndex < suffixes.length - 1) {
    formattedValue /= 1000;
    suffixIndex++;
  }

  const formatted = formattedValue.toFixed(1);
  return `${formatted.endsWith('.0') ? formatted.slice(0, -2) : formatted}${suffixes[suffixIndex]}`;
};
