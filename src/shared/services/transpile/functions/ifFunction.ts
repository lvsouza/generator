export const ifFunction = (value: string): string => {
  const [value1, value2, valueTrue, valueFalse] = value.split('|', 4);
  return (value1 === value2) ? valueTrue : valueFalse;
};
