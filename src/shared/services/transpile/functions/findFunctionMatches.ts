export function findFunctionMatches(value: string, fun: string): RegExpMatchArray | null {
  return value.match(new RegExp('\\$' + fun + '\\((.*?)\\)', 'g'));
};
