const baseConfig = require('./jest.config.js')

module.exports = Object.assign({}, baseConfig, {
  testEnvironmentOptions: {
    ...baseConfig.testEnvironmentOptions,
    customExportConditions:
      baseConfig.testEnvironmentOptions.customExportConditions.filter(
        c => c !== 'development'
      )
  }
})
