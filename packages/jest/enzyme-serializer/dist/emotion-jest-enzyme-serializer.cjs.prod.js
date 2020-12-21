'use strict'

Object.defineProperty(exports, '__esModule', {
  value: !0
}),
  require('@babel/runtime/helpers/extends'),
  require('@babel/runtime/helpers/objectWithoutPropertiesLoose'),
  require('@emotion/css-prettifier'),
  require('../../dist/create-serializer-a9846073.cjs.prod.js'),
  require('enzyme-to-json')

var createEnzymeSerializer = require('../../dist/create-enzyme-serializer-4857aa8e.cjs.prod.js'),
  _createEnzymeSerializ = createEnzymeSerializer.createEnzymeSerializer(),
  test = _createEnzymeSerializ.test,
  serialize = _createEnzymeSerializ.serialize

;(exports.serialize = serialize), (exports.test = test)
