const { jest: lernaAliases } = require('lerna-alias')

module.exports = {
  transform: {
    '\\.css$': '<rootDir>/test/styleTransform.js',
    '^.+\\.js?$': 'babel-jest'
  },
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ],
  moduleNameMapper: lernaAliases(),
  setupTestFrameworkScriptFile: '<rootDir>/test/testSetup.js',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/packages/babel-plugin-emotion/test/util.js'
  ]
}
