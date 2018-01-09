const { jest: lernaAliases } = require('lerna-alias')

module.exports = {
  transform: {
    '\\.css$': '<rootDir>/test/styleTransform.js',
    '^.+\\.js?$': 'babel-jest',
  },
  moduleNameMapper: lernaAliases(),
  setupTestFrameworkScriptFile: '<rootDir>/test/testSetup.js',
  coveragePathIgnorePatterns: [
    '<rootDir>/packages/emotion-utils/src/stylis.js',
  ],
}
