// Convert the number to a formatted string
export const addCurrency = num => {
  return `Rs.${num?.toLocaleString('en-PK')}`;
};
