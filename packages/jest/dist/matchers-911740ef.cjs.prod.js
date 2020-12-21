'use strict'

var createSerializer = require('./create-serializer-ccca5855.cjs.prod.js'),
  chalk = require('chalk'),
  stylis = require('stylis'),
  specificity = require('specificity')

function _interopDefault(e) {
  return e && e.__esModule
    ? e
    : {
        default: e
      }
}

var chalk__default = _interopDefault(chalk)

function isA(typeName, value) {
  return Object.prototype.toString.apply(value) === '[object ' + typeName + ']'
}

function isAsymmetric(obj) {
  return obj && isA('Function', obj.asymmetricMatch)
}

function valueMatches(declaration, value) {
  return value instanceof RegExp
    ? value.test(declaration.children)
    : isAsymmetric(value)
      ? value.asymmetricMatch(declaration.children)
      : value === declaration.children
}

function toHaveStyleRule(received, property, value, options) {
  void 0 === options && (options = {})
  var _options = options,
    target = _options.target,
    media = _options.media,
    classNames = createSerializer.getClassNamesFromNodes([received]),
    cssString = createSerializer.getStylesFromClassNames(
      classNames,
      createSerializer.getStyleElements()
    ),
    preparedRules = stylis.compile(cssString)
  media &&
    (preparedRules = createSerializer.getMediaRules(preparedRules, media))
  var result = preparedRules
    .filter(function(rule) {
      return (
        'rule' === rule.type &&
        createSerializer.hasClassNames(classNames, rule.props, target)
      )
    })
    .reduce(function(acc, rule) {
      var lastMatchingDeclaration = createSerializer.findLast(
        rule.children,
        function(dec) {
          return 'decl' === dec.type && dec.props === property
        }
      )
      return lastMatchingDeclaration
        ? acc.concat(
            rule.props.map(function(selector) {
              return {
                selector: selector,
                declaration: lastMatchingDeclaration
              }
            })
          )
        : acc
    }, [])
    .sort(function(_ref, _ref2) {
      var selectorA = _ref.selector,
        selectorB = _ref2.selector
      return specificity.compare(selectorA, selectorB)
    })
    .pop()
  if (!result)
    return {
      pass: !1,
      message: function() {
        return 'Property not found: ' + property
      }
    }
  var declaration = result.declaration,
    pass = valueMatches(declaration, value)
  return {
    pass: pass,
    message: function() {
      return (
        'Expected ' +
        property +
        (pass ? ' not ' : ' ') +
        'to match:\n  ' +
        chalk__default.default.green(value) +
        '\nReceived:\n  ' +
        chalk__default.default.red(declaration.children)
      )
    }
  }
}

var matchers = {
  toHaveStyleRule: toHaveStyleRule
}

exports.matchers = matchers
