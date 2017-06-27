require('babel-register')

module.exports = function (context, opts) {
  return { plugins: [[require('../src/babel'), opts]] }
}
