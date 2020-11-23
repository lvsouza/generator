export function removeFunctionPattern(value: string, key: string): string {
  return value.replace(new RegExp('(\\$' + key + '\\()|(\\))', 'g'), '');
};
