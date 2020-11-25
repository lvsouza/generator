import { toCamelCase, toKebabCase, toLowerCase, toUpperCase, toSnakeCase, toPascalCase, toFirstUpper, toFirstLower } from './functions';
import { IPattern } from '../../interfaces';

export const transpileByPatterns = (valueToReplace: string, patterns: IPattern[]): string => {
  const keys = patterns.map(pattern => ({ key: pattern.key, value: pattern.value?.value }));

  keys.forEach(({ key, value }) => {
    if (value) {
      valueToReplace = valueToReplace.replace(new RegExp('{{' + key + '}}', 'g'), value);
    }
  });

  return valueToReplace;
};

export const traspileFunctions = (valueToReplace: string): string => {
  const functionsGroup: { [key: string]: (value: string) => string } = {
    PascalCase: toPascalCase,
    FirstUpper: toFirstUpper,
    FirstLower: toFirstLower,
    CamelCase: toCamelCase,
    SnakeCase: toSnakeCase,
    KebabCase: toKebabCase,
    UpperCase: toUpperCase,
    LowerCase: toLowerCase
  };

  let start = '';

  // Acha o primeiro cifrão
  const dollarSignIndex = valueToReplace.indexOf('$');
  if (dollarSignIndex === -1) return valueToReplace; // $
  const rest = valueToReplace.substring(dollarSignIndex + 1);
  start = valueToReplace.substr(0, dollarSignIndex);

  // Acha a abertura do primeiro parenteses
  const openParentheses = rest.indexOf('(');
  if (openParentheses === -1) return valueToReplace; // (

  // Transform funções internas
  const rest2 = traspileFunctions(rest.substring(openParentheses + 1));

  // Pega o nome da função
  const functionName = rest.substr(0, openParentheses);

  // Acha a abertura do primeiro parenteses
  const closeParentheses = rest2.indexOf(')');
  if (closeParentheses === -1) return valueToReplace; // )
  const rest3 = rest2.substring(closeParentheses + 1);
  const content = rest2.substring(0, closeParentheses);

  return start + functionsGroup[functionName](content) + rest3;
};
