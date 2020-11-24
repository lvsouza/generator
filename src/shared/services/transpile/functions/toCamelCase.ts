import { removeSpecialCharacter } from './removeSpecialCharacter';

export function toCamelCase(value: string): string {
  return removeSpecialCharacter(value)
    .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
      if (+match === 0) return '';
      return index === 0 ? match.toLowerCase() : match.toUpperCase();
    })
    .replace(/-|_/g, '');
}
