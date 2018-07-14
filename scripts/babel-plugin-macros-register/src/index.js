require('@babel/register')
let aliases = require('lerna-alias').rollup()
delete aliases['emotion']
delete aliases['react-emotion']
require('module-alias').addAliases(aliases)

module.exports = require('babel-plugin-macros')
