require('@babel/register')
require('module-alias').addAliases(require('lerna-alias').rollup())

module.exports = require('babel-plugin-emotion')
