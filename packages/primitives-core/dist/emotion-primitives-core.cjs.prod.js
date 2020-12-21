'use strict'

Object.defineProperty(exports, '__esModule', {
  value: !0
})

var transform = require('css-to-react-native'),
  React = require('react'),
  react = require('@emotion/react')

function _interopDefault(e) {
  return e && e.__esModule
    ? e
    : {
        default: e
      }
}

var styles,
  transform__default = _interopDefault(transform)

function interleave(vals) {
  for (
    var strings = vals[0], finalArray = [strings[0]], i = 1, len = vals.length;
    i < len;
    i++
  )
    finalArray.push(vals[i]),
      void 0 !== strings[i] && finalArray.push(strings[i])
  return finalArray
}

var lastType,
  generated = {},
  buffer = ''

function handleInterpolation(interpolation, i, arr) {
  var type = typeof interpolation
  if (
    ('string' === type &&
      (interpolation = interpolation.replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, '')),
    'function' !== type)
  ) {
    var isIrrelevant = null == interpolation || 'boolean' === type,
      isRnStyle =
        ('object' === type && !Array.isArray(interpolation)) ||
        'number' === type
    if ('string' === lastType && (isRnStyle || isIrrelevant)) {
      var converted = convertStyles(buffer)
      void 0 !== converted && styles.push(converted), (buffer = '')
    }
    if (!isIrrelevant) {
      if (
        'string' === type &&
        ((buffer += interpolation), arr.length - 1 === i)
      ) {
        var _converted = convertStyles(buffer)
        void 0 !== _converted && styles.push(_converted), (buffer = '')
      }
      isRnStyle && styles.push(interpolation),
        Array.isArray(interpolation) &&
          interpolation.forEach(handleInterpolation, this),
        (lastType = type)
    }
  } else
    void 0 === this ||
      handleInterpolation.call(this, interpolation(this), i, arr)
}

function createCss(StyleSheet) {
  return function() {
    var vals,
      prevBuffer = buffer
    ;(styles = []), (buffer = ''), (lastType = void 0)
    for (
      var _len = arguments.length, args = new Array(_len), _key = 0;
      _key < _len;
      _key++
    )
      args[_key] = arguments[_key]
    vals = null == args[0] || void 0 === args[0].raw ? args : interleave(args)
    try {
      vals.forEach(handleInterpolation, this)
    } finally {
      buffer = prevBuffer
    }
    var hash = JSON.stringify(styles)
    if (!generated[hash]) {
      var styleSheet = StyleSheet.create({
        generated: StyleSheet.flatten(styles)
      })
      generated[hash] = styleSheet.generated
    }
    return generated[hash]
  }
}

var propertyValuePattern = /\s*([^\s]+)\s*:\s*(.+?)\s*$/

function convertPropertyValue(style) {
  var match = propertyValuePattern.exec(style)
  null !== match && ' ' !== match[2] && (match.shift(), this.push(match))
}

function convertStyles(str) {
  if ('' !== str.trim()) {
    var stylePairs = []
    str.split(';').forEach(convertPropertyValue, stylePairs)
    try {
      return transform__default.default(stylePairs)
    } catch (error) {
      var msg = error.message
      if (msg.includes('Failed to parse declaration')) {
        var values = msg
            .replace('Failed to parse declaration ', '')
            .replace(/"/g, '')
            .trim()
            .split(':'),
          errorMsg =
            "'" +
            values[0] +
            "' shorthand property requires units for example - " +
            values[0] +
            ': 20px or ' +
            values[0] +
            ': 10px 20px 40px 50px'
        console.error(errorMsg)
      }
    }
  }
}

var testOmitPropsOnComponent = function(prop) {
  return 'theme' !== prop && 'as' !== prop
}

function createStyled(StyleSheet, _temp) {
  var _ref$getShouldForward = (void 0 === _temp ? {} : _temp)
      .getShouldForwardProp,
    getShouldForwardProp =
      void 0 === _ref$getShouldForward
        ? function() {
            return testOmitPropsOnComponent
          }
        : _ref$getShouldForward,
    css = createCss(StyleSheet)
  return function createEmotion(component, options) {
    var shouldForwardProp =
        options && options.shouldForwardProp
          ? options.shouldForwardProp
          : void 0,
      defaultShouldForwardProp =
        shouldForwardProp || getShouldForwardProp(component),
      shouldUseAs = !defaultShouldForwardProp('as')
    return function() {
      for (
        var styles,
          _len = arguments.length,
          rawStyles = new Array(_len),
          _key = 0;
        _key < _len;
        _key++
      )
        rawStyles[_key] = arguments[_key]
      styles =
        null == rawStyles[0] || void 0 === rawStyles[0].raw
          ? rawStyles
          : interleave(rawStyles)
      var Styled = React.forwardRef(function(props, ref) {
        var finalTag = (shouldUseAs && props.as) || component,
          mergedProps = props
        if (null == props.theme) {
          for (var key in ((mergedProps = {}), props))
            mergedProps[key] = props[key]
          mergedProps.theme = React.useContext(react.ThemeContext)
        }
        var finalShouldForwardProp =
            shouldUseAs && void 0 === shouldForwardProp
              ? getShouldForwardProp(finalTag)
              : defaultShouldForwardProp,
          newProps = {}
        for (var _key2 in props)
          (shouldUseAs && 'as' === _key2) ||
            (finalShouldForwardProp(_key2) && (newProps[_key2] = props[_key2]))
        return (
          (newProps.style = [css.apply(mergedProps, styles), props.style]),
          (newProps.ref = ref),
          React.createElement(finalTag, newProps)
        )
      })
      return (
        (Styled.withComponent = function(newComponent) {
          return createEmotion(newComponent).apply(void 0, styles)
        }),
        (Styled.displayName = 'emotion(' + getDisplayName(component) + ')'),
        Styled
      )
    }
  }
}

var getDisplayName = function(primitive) {
  return 'string' == typeof primitive
    ? primitive
    : primitive.displayName || primitive.name || 'Styled'
}

;(exports.createCss = createCss), (exports.createStyled = createStyled)
