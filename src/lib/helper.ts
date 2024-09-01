export const formatDate = (date: Date | string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
};

export const formatMoney = (value: number) => {
  const millions = value / 1000000;
  return millions % 1 === 0 ? millions : millions.toFixed(2);
};
