'use strict'

var createSerializer = require('./create-serializer-ccca5855.cjs.prod.js'),
  enzymeToJson = require('enzyme-to-json'),
  enzymeSerializer = enzymeToJson.createSerializer({}),
  tickle = function(wrapper) {
    return (
      'function' == typeof wrapper.dive &&
        wrapper.find('EmotionCssPropInternal').forEach(function(el) {
          return el.dive()
        }),
      wrapper
    )
  }

function createEnzymeSerializer(_temp) {
  var _ref = void 0 === _temp ? {} : _temp,
    classNameReplacer = _ref.classNameReplacer,
    _ref$DOMElements = _ref.DOMElements,
    DOMElements = void 0 === _ref$DOMElements || _ref$DOMElements,
    emotionSerializer = createSerializer.createSerializer({
      classNameReplacer: classNameReplacer,
      DOMElements: DOMElements
    })
  return {
    test: function(node) {
      return enzymeSerializer.test(node) || emotionSerializer.test(node)
    },
    serialize: function(node, config, indentation, depth, refs, printer) {
      if (enzymeSerializer.test(node)) {
        var tickled = tickle(node)
        return enzymeSerializer.print(tickled, function(valChild) {
          return printer(valChild, config, indentation, depth, refs)
        })
      }
      return emotionSerializer.serialize(
        node,
        config,
        indentation,
        depth,
        refs,
        printer
      )
    }
  }
}

exports.createEnzymeSerializer = createEnzymeSerializer
