module.exports = {
  clearMocks: true,
  collectCoverageFrom: [
    'src/**/*.ts'
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coverageReporters: [
    'json',
    'lcov'
  ],
  testEnvironment: 'node',
  testMatch: [
    '<rootDir>/src/**/*.(spec|test).ts'
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  }
  // preset: 'ts-jest'
};
