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

  const matchOptions = valueToReplace.match(/\$[A-Za-z]*\((.*)\)/);
  if (!matchOptions) return valueToReplace;

  const functionGroupName = matchOptions[0].match(/[^(|^$|^)]([A-Za-z]*)/);
  if (!functionGroupName) return valueToReplace;

  const cleanValue = traspileFunctions(matchOptions[1]);

  try {
    valueToReplace = valueToReplace.replace(matchOptions[0], functionsGroup[functionGroupName[0]](cleanValue));
  } catch (e) {
    throw new Error(`"${functionGroupName[0]}" is not a valid function`);
  }

  return valueToReplace;
};
