import { toUpperCase } from './toUpperCase';

describe('Try UpperCase conversion', () => {
  test('"Generator" must be "GENERATOR"', () => {
    expect(toUpperCase('Generator')).toEqual('GENERATOR');
  });

  test('"Generator is better" must be "GENERATOR IS BETTER"', () => {
    expect(toUpperCase('Generator is better')).toEqual('GENERATOR IS BETTER');
  });

  test('"Generator-is-better" must be "GENERATOR-IS-BETTER"', () => {
    expect(toUpperCase('Generator-is-better')).toEqual('GENERATOR-IS-BETTER');
  });

  test('"Generator_is_better" must be "GENERATOR_IS_BETTER"', () => {
    expect(toUpperCase('Generator_is_better')).toEqual('GENERATOR_IS_BETTER');
  });

  test('"GeneratorIsBetter" must be "GENERATORISBETTER"', () => {
    expect(toUpperCase('GeneratorIsBetter')).toEqual('GENERATORISBETTER');
  });

  test('"GENERATOR IS BETTER" must be "GENERATOR IS BETTER"', () => {
    expect(toUpperCase('GENERATOR IS BETTER')).toEqual('GENERATOR IS BETTER');
  });
});
