module.exports = {
    preset: 'ts-jest',
    transform: {
      '^.+\\.(ts|tsx)$': 'babel-jest',
    },
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'tsx', 'js'],
  };
  