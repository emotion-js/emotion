require('babel-register')

module.exports = {
  plugins: [[require('../src/babel'), { extract: false }]]
}
