const baseConfig = require('./jest.config.js')

module.exports = Object.assign({}, baseConfig, {
  transformIgnorePatterns: ['dist', 'node_modules'],
  testPathIgnorePatterns: baseConfig.testPathIgnorePatterns.concat(
    'babel-plugin-emotion'
  )
})
