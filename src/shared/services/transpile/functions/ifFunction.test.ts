import { ifFunction } from './ifFunction';

describe('Try If function', () => {
  test('"test|test1|True|False" must be "False"', () => {
    expect(ifFunction('test|test1|True|False')).toEqual('False');
  });

  test('"test|test|True|False" must be "True"', () => {
    expect(ifFunction('test|test|True|False')).toEqual('True');
  });
});
