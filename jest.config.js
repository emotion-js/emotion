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
  setupTestFrameworkScriptFile: '<rootDir>/test/testSetup.js'
}
