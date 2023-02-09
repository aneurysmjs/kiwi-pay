const paths = require('./config/paths');

module.exports = {
  verbose: true,
  collectCoverageFrom: ['src/**/*.{js,jsx,mjs,ts,tsx}'],
  // A list of paths to modules that run some code to configure
  // or set up the testing framework before each test.
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,mjs,ts,tsx}',
    '<rootDir>/src/**/?(*.)(spec|test).{js,jsx,mjs,ts,tsx}',
  ],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@[/](.+)': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.(sc|c)ss$': '<rootDir>/config/jest/cssTransform.js',
    // '^(?!.*\\.(js|jsx|mjs|css|json|ts|tsx)$)': '<rootDir>/config/jest/fileTransform.js',
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|ts|tsx)$'],
  moduleDirectories: paths.resolveModules,
  moduleFileExtensions: ['js', 'json', 'jsx', 'node', 'mjs', 'ts', 'tsx'],
};
