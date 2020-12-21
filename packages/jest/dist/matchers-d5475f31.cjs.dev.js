'use strict'

var createSerializer = require('./create-serializer-ecf19941.cjs.dev.js')
var chalk = require('chalk')
var stylis = require('stylis')
var specificity = require('specificity')

function _interopDefault(e) {
  return e && e.__esModule ? e : { default: e }
}

var chalk__default = /*#__PURE__*/ _interopDefault(chalk)

/*
 * Taken from
 * https://github.com/facebook/jest/blob/be4bec387d90ac8d6a7596be88bf8e4994bc3ed9/packages/expect/src/jasmine_utils.js#L234
 */

function isA(typeName, value) {
  return Object.prototype.toString.apply(value) === '[object ' + typeName + ']'
}
/*
 * Taken from
 * https://github.com/facebook/jest/blob/be4bec387d90ac8d6a7596be88bf8e4994bc3ed9/packages/expect/src/jasmine_utils.js#L36
 */

function isAsymmetric(obj) {
  return obj && isA('Function', obj.asymmetricMatch)
}

function valueMatches(declaration, value) {
  if (value instanceof RegExp) {
    return value.test(declaration.children)
  }

  if (isAsymmetric(value)) {
    return value.asymmetricMatch(declaration.children)
  }

  return value === declaration.children
}

function toHaveStyleRule(received, property, value, options) {
  if (options === void 0) {
    options = {}
  }

  var _options = options,
    target = _options.target,
    media = _options.media
  var classNames = createSerializer.getClassNamesFromNodes([received])
  var cssString = createSerializer.getStylesFromClassNames(
    classNames,
    createSerializer.getStyleElements()
  )
  var preparedRules = stylis.compile(cssString)

  if (media) {
    preparedRules = createSerializer.getMediaRules(preparedRules, media)
  }

  var result = preparedRules
    .filter(function (rule) {
      return (
        rule.type === 'rule' &&
        createSerializer.hasClassNames(classNames, rule.props, target)
      )
    })
    .reduce(function (acc, rule) {
      var lastMatchingDeclaration = createSerializer.findLast(
        rule.children,
        function (dec) {
          return dec.type === 'decl' && dec.props === property
        }
      )

      if (!lastMatchingDeclaration) {
        return acc
      }

      return acc.concat(
        rule.props.map(function (selector) {
          return {
            selector: selector,
            declaration: lastMatchingDeclaration,
          }
        })
      )
    }, [])
    .sort(function (_ref, _ref2) {
      var selectorA = _ref.selector
      var selectorB = _ref2.selector
      return specificity.compare(selectorA, selectorB)
    })
    .pop()

  if (!result) {
    return {
      pass: false,
      message: function message() {
        return 'Property not found: ' + property
      },
    }
  }

  var declaration = result.declaration
  var pass = valueMatches(declaration, value)

  var message = function message() {
    return (
      'Expected ' +
      property +
      (pass ? ' not ' : ' ') +
      'to match:\n' +
      ('  ' + chalk__default['default'].green(value) + '\n') +
      'Received:\n' +
      ('  ' + chalk__default['default'].red(declaration.children))
    )
  }

  return {
    pass: pass,
    message: message,
  }
}

var matchers = {
  toHaveStyleRule: toHaveStyleRule,
}

exports.matchers = matchers
