import { toLowerCase } from './toLowerCase';

describe('Try LowerCase conversion', () => {
  test('"Generator" must be "generator"', () => {
    expect(toLowerCase('Generator')).toEqual('generator');
  });

  test('"Generator is better" must be "generator is better"', () => {
    expect(toLowerCase('Generator is better')).toEqual('generator is better');
  });

  test('"Generator-is-better" must be "generator-is-better"', () => {
    expect(toLowerCase('Generator-is-better')).toEqual('generator-is-better');
  });

  test('"Generator_is_better" must be "generator_is_better"', () => {
    expect(toLowerCase('Generator_is_better')).toEqual('generator_is_better');
  });

  test('"GeneratorIsBetter" must be "generatorisbetter"', () => {
    expect(toLowerCase('GeneratorIsBetter')).toEqual('generatorisbetter');
  });

  test('"GENERATOR IS BETTER" must be "generator is better"', () => {
    expect(toLowerCase('GENERATOR IS BETTER')).toEqual('generator is better');
  });
});
