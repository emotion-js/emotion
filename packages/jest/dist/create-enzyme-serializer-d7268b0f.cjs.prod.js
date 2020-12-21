'use strict'

var createSerializer = require('./create-serializer-ccca5855.cjs.prod.js')
var enzymeToJson = require('enzyme-to-json')

var enzymeSerializer = enzymeToJson.createSerializer({})

var tickle = function tickle(wrapper) {
  if (typeof wrapper.dive === 'function') {
    wrapper.find('EmotionCssPropInternal').forEach(function (el) {
      return el.dive()
    })
  }

  return wrapper
}

function createEnzymeSerializer(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
    classNameReplacer = _ref.classNameReplacer,
    _ref$DOMElements = _ref.DOMElements,
    DOMElements = _ref$DOMElements === void 0 ? true : _ref$DOMElements

  var emotionSerializer = createSerializer.createSerializer({
    classNameReplacer: classNameReplacer,
    DOMElements: DOMElements,
  })
  return {
    test: function test(node) {
      return enzymeSerializer.test(node) || emotionSerializer.test(node)
    },
    serialize: function serialize(
      node,
      config,
      indentation,
      depth,
      refs,
      printer
    ) {
      if (enzymeSerializer.test(node)) {
        var tickled = tickle(node)
        return enzymeSerializer.print(
          tickled, // https://github.com/facebook/jest/blob/470ef2d29c576d6a10de344ec25d5a855f02d519/packages/pretty-format/src/index.ts#L281
          function (valChild) {
            return printer(valChild, config, indentation, depth, refs)
          }
        )
      } // we know here it had to match against emotionSerializer

      return emotionSerializer.serialize(
        node,
        config,
        indentation,
        depth,
        refs,
        printer
      )
    },
  }
}

exports.createEnzymeSerializer = createEnzymeSerializer
