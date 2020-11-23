import { toCamelCase, toKebabCase, toLowerCase, toUpperCase, toSnakeCase, removeFunctionPattern, findFunctionMatches, toPascalCase, toFirstUpper, toFirstLower } from './functions';
import { IPattern } from '../../interfaces';

export const transpileByPatterns = (valueToReplace: string, patterns: IPattern[]): string => {
  const keys = patterns.map(pattern => ({ key: pattern.key, value: pattern.value?.value }));

  let newValue = valueToReplace;

  const regex = (key: string) => new RegExp('{{' + key + '}}', 'g');

  keys.forEach(({ key, value }) => {
    if (value) {
      newValue = newValue.replace(regex(key), value);
    }
  });

  return newValue;
};

export function traspileFunctions(valueToReplace: string): string {
  const functionsArray = [
    {
      pattern: 'CamelCase',
      fun: toCamelCase
    },
    {
      pattern: 'PascalCase',
      fun: toPascalCase
    },
    {
      pattern: 'SnakeCase',
      fun: toSnakeCase
    },
    {
      pattern: 'KebabCase',
      fun: toKebabCase
    },
    {
      pattern: 'UpperCase',
      fun: toUpperCase
    },
    {
      pattern: 'FirstUpper',
      fun: toFirstUpper
    },
    {
      pattern: 'FirstLower',
      fun: toFirstLower
    },
    {
      pattern: 'LowerCase',
      fun: toLowerCase
    }
  ];

  functionsArray.forEach(({ pattern, fun }) => {
    const matches = findFunctionMatches(valueToReplace, pattern);

    matches?.forEach(match => {
      const cleanValue = removeFunctionPattern(match, pattern);
      valueToReplace = valueToReplace.replace(match, fun(cleanValue));
    });
  });

  return valueToReplace;
}
