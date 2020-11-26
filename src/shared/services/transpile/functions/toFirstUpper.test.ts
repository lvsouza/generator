import { toFirstUpper } from './toFirstUpper';

describe('Try FirstUpper conversion', () => {
  test('"Generator" must be "Generator"', () => {
    expect(toFirstUpper('Generator')).toEqual('Generator');
  });

  test('"Generator is better" must be "Generator is better"', () => {
    expect(toFirstUpper('Generator is better')).toEqual('Generator is better');
  });

  test('"generator-is-better" must be "Generator-is-better"', () => {
    expect(toFirstUpper('generator-is-better')).toEqual('Generator-is-better');
  });

  test('"generator_is_better" must be "Generator_is_better"', () => {
    expect(toFirstUpper('generator_is_better')).toEqual('Generator_is_better');
  });

  test('"generatorIsBetter" must be "GeneratorIsBetter"', () => {
    expect(toFirstUpper('generatorIsBetter')).toEqual('GeneratorIsBetter');
  });

  test('" generatorIsBetter" must be " generatorIsBetter"', () => {
    expect(toFirstUpper(' generatorIsBetter')).toEqual(' generatorIsBetter');
  });

  test('"GENERATOR IS BETTER" must be "GENERATOR IS BETTER"', () => {
    expect(toFirstUpper('GENERATOR IS BETTER')).toEqual('GENERATOR IS BETTER');
  });
});
