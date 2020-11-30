export const ifFunction = (value: string) => {
  const [value1, value2, valueTrue, valueFalse] = value.split('|');
  return (value1 === value2) ? valueTrue : valueFalse;
};
