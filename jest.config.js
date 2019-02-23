const { aliases } = require('preconstruct')

module.exports = {
  transform: {
    '\\.css$': '<rootDir>/test/styleTransform.js',
    '^.+\\.js?$': 'babel-jest'
  },
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/__fixtures__/',
    '/site/',
    '.tsx?'
  ],
  moduleNameMapper: aliases.jest(),
  setupFilesAfterEnv: ['<rootDir>/test/testSetup.js'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/packages/babel-plugin-emotion/test/util.js'
  ]
}
