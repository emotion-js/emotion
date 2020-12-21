'use strict'

Object.defineProperty(exports, '__esModule', {
  value: !0
})

var hashString = require('@emotion/hash'),
  unitless = require('@emotion/unitless'),
  memoize = require('@emotion/memoize')

function _interopDefault(e) {
  return e && e.__esModule
    ? e
    : {
        default: e
      }
}

var contentValuePattern,
  contentValues,
  oldProcessStyleValue,
  msPattern,
  hyphenPattern,
  hyphenatedCache,
  hashString__default = _interopDefault(hashString),
  unitless__default = _interopDefault(unitless),
  memoize__default = _interopDefault(memoize),
  ILLEGAL_ESCAPE_SEQUENCE_ERROR =
    "You have illegal escape sequence in your template literal, most likely inside content's property value.\nBecause you write your CSS inside a JavaScript string you actually have to do double escaping, so for example \"content: '\\00d7';\" should become \"content: '\\\\00d7';\".\nYou can read more about this here:\nhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences",
  UNDEFINED_AS_OBJECT_KEY_ERROR =
    "You have passed in falsy value as style object's key (can happen when in example you pass unexported component as computed key).",
  hyphenateRegex = /[A-Z]|^ms/g,
  animationRegex = /_EMO_([^_]+?)_([^]*?)_EMO_/g,
  isCustomProperty = function(property) {
    return 45 === property.charCodeAt(1)
  },
  isProcessableValue = function(value) {
    return null != value && 'boolean' != typeof value
  },
  processStyleName = memoize__default.default(function(styleName) {
    return isCustomProperty(styleName)
      ? styleName
      : styleName.replace(hyphenateRegex, '-$&').toLowerCase()
  }),
  processStyleValue = function(key, value) {
    switch (key) {
      case 'animation':
      case 'animationName':
        if ('string' == typeof value)
          return value.replace(animationRegex, function(match, p1, p2) {
            return (
              (cursor = {
                name: p1,
                styles: p2,
                next: cursor
              }),
              p1
            )
          })
    }
    return 1 === unitless__default.default[key] ||
      isCustomProperty(key) ||
      'number' != typeof value ||
      0 === value
      ? value
      : value + 'px'
  }

function handleInterpolation(mergedProps, registered, interpolation) {
  if (null == interpolation) return ''
  if (void 0 !== interpolation.__emotion_styles) return interpolation
  switch (typeof interpolation) {
    case 'boolean':
      return ''

    case 'object':
      if (1 === interpolation.anim)
        return (
          (cursor = {
            name: interpolation.name,
            styles: interpolation.styles,
            next: cursor
          }),
          interpolation.name
        )
      if (void 0 !== interpolation.styles) {
        var next = interpolation.next
        if (void 0 !== next)
          for (; void 0 !== next; )
            (cursor = {
              name: next.name,
              styles: next.styles,
              next: cursor
            }),
              (next = next.next)
        var styles = interpolation.styles + ';'
        return styles
      }
      return createStringFromObject(mergedProps, registered, interpolation)

    case 'function':
      if (void 0 !== mergedProps) {
        var previousCursor = cursor,
          result = interpolation(mergedProps)
        return (
          (cursor = previousCursor),
          handleInterpolation(mergedProps, registered, result)
        )
      }
      break

    case 'string':
  }
  if (null == registered) return interpolation
  var cached = registered[interpolation]
  return void 0 !== cached ? cached : interpolation
}

function createStringFromObject(mergedProps, registered, obj) {
  var string = ''
  if (Array.isArray(obj))
    for (var i = 0; i < obj.length; i++)
      string += handleInterpolation(mergedProps, registered, obj[i]) + ';'
  else
    for (var _key in obj) {
      var value = obj[_key]
      if ('object' != typeof value)
        null != registered && void 0 !== registered[value]
          ? (string += _key + '{' + registered[value] + '}')
          : isProcessableValue(value) &&
            (string +=
              processStyleName(_key) +
              ':' +
              processStyleValue(_key, value) +
              ';')
      else if (
        !Array.isArray(value) ||
        'string' != typeof value[0] ||
        (null != registered && void 0 !== registered[value[0]])
      ) {
        var interpolated = handleInterpolation(mergedProps, registered, value)
        switch (_key) {
          case 'animation':
          case 'animationName':
            string += processStyleName(_key) + ':' + interpolated + ';'
            break

          default:
            string += _key + '{' + interpolated + '}'
        }
      } else
        for (var _i = 0; _i < value.length; _i++)
          isProcessableValue(value[_i]) &&
            (string +=
              processStyleName(_key) +
              ':' +
              processStyleValue(_key, value[_i]) +
              ';')
    }
  return string
}

var sourceMapPattern,
  cursor,
  labelPattern = /label:\s*([^\s;\n{]+)\s*;/g

var serializeStyles = function(args, registered, mergedProps) {
  if (
    1 === args.length &&
    'object' == typeof args[0] &&
    null !== args[0] &&
    void 0 !== args[0].styles
  )
    return args[0]
  var stringMode = !0,
    styles = ''
  cursor = void 0
  var strings = args[0]
  null == strings || void 0 === strings.raw
    ? ((stringMode = !1),
      (styles += handleInterpolation(mergedProps, registered, strings)))
    : (styles += strings[0])
  for (var i = 1; i < args.length; i++)
    (styles += handleInterpolation(mergedProps, registered, args[i])),
      stringMode && (styles += strings[i])
  labelPattern.lastIndex = 0
  for (
    var match, identifierName = '';
    null !== (match = labelPattern.exec(styles));

  )
    identifierName += '-' + match[1]
  var name = hashString__default.default(styles) + identifierName
  return {
    name: name,
    styles: styles,
    next: cursor
  }
}

exports.serializeStyles = serializeStyles
