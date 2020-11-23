import { removeSpecialCharacter } from './removeSpecialCharacter';

export function toPascalCase(value: string): string {
  return removeSpecialCharacter(value.replace(/\s+(.)/g, (_, group) => group.toUpperCase()));
}
