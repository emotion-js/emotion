const baseConfig = require('./jest.config.js')

module.exports = Object.assign({}, baseConfig, {
  moduleNameMapper: {
    '^react($|\\/.+)': 'react19$1',
    '^react-dom($|\\/.+)': 'react19-dom$1',
    '^react-test-renderer($|\\/.+)': 'react19-test-renderer$1'
  }
})
