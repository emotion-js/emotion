const { jest: lernaAliases } = require('lerna-alias')
const baseConfig = require('./jest.config.js')

module.exports = Object.assign({}, baseConfig, {
  moduleNameMapper: lernaAliases({ sourceDirectory: false }),
  transformIgnorePatterns: ['dist', 'node_modules'],
  testPathIgnorePatterns: baseConfig.testPathIgnorePatterns.concat(
    'babel-plugin-emotion'
  )
})
