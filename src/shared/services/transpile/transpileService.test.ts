import { observe } from 'react-observing';

import { IPattern } from '../../interfaces';
import { transpileByPatterns } from './transpileService';

describe('Strings transpile', () => {
  const patterns: IPattern[] = [
    {
      key: 'Entidade',
      value: observe('Grupo de itens'),
      props: {
        displayName: ''
      }
    }
  ];

  test('Value replace', () => {
    expect(transpileByPatterns('key: "{{Entidade}}",', patterns.map(pattern => ({ key: pattern.key, value: pattern.value?.value || '' })))).toBe('key: "Grupo de itens",');
  });

  test('Value replace with KebabCase', () => {
    expect(transpileByPatterns('key: "$KebabCase<({{Entidade}})>",', patterns.map(pattern => ({ key: pattern.key, value: pattern.value?.value || '' })))).toBe('key: "grupo-de-itens",');
  });

  test('Value replace with KebabCase', () => {
    expect(transpileByPatterns('$KebabCase<({{Entidade}})>', patterns.map(pattern => ({ key: pattern.key, value: pattern.value?.value || '' })))).toBe('grupo-de-itens');
  });

  test('Value replace with KebabCase -> PascalCase', () => {
    expect(transpileByPatterns('$PascalCase<($KebabCase<({{Entidade}})>)>', patterns.map(pattern => ({ key: pattern.key, value: pattern.value?.value || '' })))).toBe('GrupoDeItens');
  });

  test('Value replace with KebabCase -> PascalCase -> KebabCase', () => {
    expect(transpileByPatterns('$KebabCase<($PascalCase<($KebabCase<({{Entidade}})>)>)>', patterns.map(pattern => ({ key: pattern.key, value: pattern.value?.value || '' })))).toBe('grupo-de-itens');
  });

  test('Value replace with PascalCase', () => {
    expect(transpileByPatterns('$PascalCase<({{Entidade}})>', patterns.map(pattern => ({ key: pattern.key, value: pattern.value?.value || '' })))).toBe('GrupoDeItens');
  });

  test('Value replace with CamelCase', () => {
    expect(transpileByPatterns('$CamelCase<({{Entidade}})>', patterns.map(pattern => ({ key: pattern.key, value: pattern.value?.value || '' })))).toBe('grupoDeItens');
  });

  test('Value replace with mulple functions', () => {
    expect(transpileByPatterns('$PascalCase<($CamelCase<({{Entidade}})>)>-$CamelCase<({{Entidade}})>-$KebabCase<($CamelCase<({{Entidade}})>)>', patterns.map(pattern => ({ key: pattern.key, value: pattern.value?.value || '' })))).toBe('GrupoDeItens-grupoDeItens-grupo-de-itens');
  });

  test('Value replace with CamelCase', () => {
    expect(transpileByPatterns('fsdfs5$lxckjhl$$$$CamelCase<({{Entidade}})>213213213223333$12132323231', patterns.map(pattern => ({ key: pattern.key, value: pattern.value?.value || '' })))).toBe('fsdfs5$lxckjhl$$$grupoDeItens213213213223333$12132323231');
  });
});
