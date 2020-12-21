'use strict'

Object.defineProperty(exports, '__esModule', { value: true })

require('@babel/runtime/helpers/extends')
require('@babel/runtime/helpers/objectWithoutPropertiesLoose')
require('@babel/runtime/helpers/createForOfIteratorHelperLoose')
require('@emotion/css-prettifier')
require('../../dist/create-serializer-ecf19941.cjs.dev.js')
require('enzyme-to-json')
var createEnzymeSerializer = require('../../dist/create-enzyme-serializer-5c0707a6.cjs.dev.js')

var _createEnzymeSerializ = createEnzymeSerializer.createEnzymeSerializer(),
  test = _createEnzymeSerializ.test,
  serialize = _createEnzymeSerializ.serialize

exports.serialize = serialize
exports.test = test
