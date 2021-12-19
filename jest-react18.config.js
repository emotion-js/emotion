const baseConfig = require('./jest.config.js')

module.exports = Object.assign({}, baseConfig, {
  moduleNameMapper: {
    '^react($|\\/.+)': 'react18$1',
    '^react-dom($|\\/.+)': 'react18-dom$1'
  }
})
