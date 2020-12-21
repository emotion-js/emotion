'use strict'

Object.defineProperty(exports, '__esModule', {
  value: !0
}),
  require('@babel/runtime/helpers/extends'),
  require('@babel/runtime/helpers/objectWithoutPropertiesLoose'),
  require('@emotion/css-prettifier')

var createSerializer = require('../../dist/create-serializer-a9846073.cjs.prod.js'),
  _createSerializer = createSerializer.createSerializer(),
  test = _createSerializer.test,
  serialize = _createSerializer.serialize

;(exports.serialize = serialize), (exports.test = test)
