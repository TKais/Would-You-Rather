const path = require('path');

module.exports = {
  moduleFileExtensions: ['js'],
  testEnvironment: 'jest-environment-node',
  transform: {},
  // transform: {
  //   '^.+\\.(js)?$': 'babel-jest'
  // },
  testRegex: "((\\.|/*.)(spec))\\.js?$",
  transformIgnorePatterns: [path.resolve(__dirname, '/node_modules/'), path.resolve(__dirname, '/src/')],
  moduleNameMapper: {
    "\\.(css|less)$": path.resolve(__dirname, "/__mocks__/styleMock.js")
  }
};
