import { toFirstLower } from './toFirstLower';

describe('Try FirstLower conversion', () => {
  test('"Generator" must be "generator"', () => {
    expect(toFirstLower('Generator')).toEqual('generator');
  });

  test('"Generator is better" must be "generator is better"', () => {
    expect(toFirstLower('Generator is better')).toEqual('generator is better');
  });

  test('"generator-is-better" must be "generator-is-better"', () => {
    expect(toFirstLower('generator-is-better')).toEqual('generator-is-better');
  });

  test('"generator_is_better" must be "generator_is_better"', () => {
    expect(toFirstLower('generator_is_better')).toEqual('generator_is_better');
  });

  test('"generatorIsBetter" must be "generatorIsBetter"', () => {
    expect(toFirstLower('generatorIsBetter')).toEqual('generatorIsBetter');
  });

  test('" GeneratorIsBetter" must be " generatorIsBetter"', () => {
    expect(toFirstLower(' GeneratorIsBetter')).toEqual(' GeneratorIsBetter');
  });

  test('"GENERATOR IS BETTER" must be "gENERATOR IS BETTER"', () => {
    expect(toFirstLower('GENERATOR IS BETTER')).toEqual('gENERATOR IS BETTER');
  });
});
