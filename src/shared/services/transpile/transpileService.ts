import { toCamelCase, toKebabCase, toLowerCase, toUpperCase, toSnakeCase, toPascalCase, toFirstUpper, toFirstLower, ifFunction } from './functions';
import { IPattern } from '../../interfaces';

/**
 * Transform specific patterns in the middle of a string
 *  - Accepted standards:
 *    - "PascalCase"
 *    - "FirstUpper"
 *    - "FirstLower"
 *    - "CamelCase"
 *    - "SnakeCase"
 *    - "KebabCase"
 *    - "UpperCase"
 *    - "LowerCase"
 *
 * @param valueToReplace Value that will be analyzed and transformed
 */
const traspileFunctions = (valueToReplace: string): string => {
  const functiondNames = ['PascalCase', 'FirstUpper', 'FirstLower', 'CamelCase', 'SnakeCase', 'KebabCase', 'UpperCase', 'LowerCase', 'If'];
  const functionsGroup: { [key: string]: (value: string) => string } = {
    PascalCase: toPascalCase,
    FirstUpper: toFirstUpper,
    FirstLower: toFirstLower,
    CamelCase: toCamelCase,
    SnakeCase: toSnakeCase,
    KebabCase: toKebabCase,
    UpperCase: toUpperCase,
    LowerCase: toLowerCase,
    If: ifFunction
  };

  // Find the first pattern
  const dollarSignIndex = valueToReplace.match(/\$[A-Za-z]*<\(/)?.index;
  if (!Number.isInteger(dollarSignIndex) || dollarSignIndex === -1 || dollarSignIndex === undefined || dollarSignIndex === null) return valueToReplace; // $
  const rest = valueToReplace.substring(dollarSignIndex + 1);
  const start = valueToReplace.substr(0, dollarSignIndex);

  // Find the opening of the first parenthesis
  const openParentheses = rest.indexOf('<(');
  if (openParentheses === -1) return valueToReplace; // <(

  // Pega o nome da função
  const functionName = rest.substr(0, openParentheses);
  if (!functiondNames.includes(functionName)) return valueToReplace;

  // At that moment I send to this function recursively the rest of the content that can be transformed into other functions
  const rest2 = traspileFunctions(rest.substring(openParentheses + 2));

  // Find the closing of the first parentheses
  const closeParentheses = rest2.indexOf(')>');
  if (closeParentheses === -1) return valueToReplace; // )>
  const rest3 = rest2.substring(closeParentheses + 2);
  const content = rest2.substring(0, closeParentheses);

  return start + functionsGroup[functionName](content) + rest3;
};

/**
 * Transform specific patterns in the middle of a string
 * @param valueToReplace Value that will be analyzed and transformed
 * @param patterns Patterns
 */
export const transpileByPatterns = (valueToReplace: string, patterns: IPattern[]): string => {
  const keys = patterns.map(pattern => ({ key: pattern.key, value: pattern.value?.value || '' }));

  keys.forEach(({ key, value }) => {
    if (value === undefined || value === null) value = '';

    valueToReplace = valueToReplace.replace(new RegExp('{{' + key + '}}', 'g'), String(value));
  });

  return traspileFunctions(valueToReplace);
};
