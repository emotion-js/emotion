'use strict'

Object.defineProperty(exports, '__esModule', { value: true })

var hashString = require('@emotion/hash')
var unitless = require('@emotion/unitless')
var memoize = require('@emotion/memoize')

function _interopDefault(e) {
  return e && e.__esModule ? e : { default: e }
}

var hashString__default = /*#__PURE__*/ _interopDefault(hashString)
var unitless__default = /*#__PURE__*/ _interopDefault(unitless)
var memoize__default = /*#__PURE__*/ _interopDefault(memoize)

var hyphenateRegex = /[A-Z]|^ms/g
var animationRegex = /_EMO_([^_]+?)_([^]*?)_EMO_/g

var isCustomProperty = function isCustomProperty(property) {
  return property.charCodeAt(1) === 45
}

var isProcessableValue = function isProcessableValue(value) {
  return value != null && typeof value !== 'boolean'
}

var processStyleName = /* #__PURE__ */ memoize__default['default'](function (
  styleName
) {
  return isCustomProperty(styleName)
    ? styleName
    : styleName.replace(hyphenateRegex, '-$&').toLowerCase()
})

var processStyleValue = function processStyleValue(key, value) {
  switch (key) {
    case 'animation':
    case 'animationName': {
      if (typeof value === 'string') {
        return value.replace(animationRegex, function (match, p1, p2) {
          cursor = {
            name: p1,
            styles: p2,
            next: cursor,
          }
          return p1
        })
      }
    }
  }

  if (
    unitless__default['default'][key] !== 1 &&
    !isCustomProperty(key) &&
    typeof value === 'number' &&
    value !== 0
  ) {
    return value + 'px'
  }

  return value
}

function handleInterpolation(mergedProps, registered, interpolation) {
  if (interpolation == null) {
    return ''
  }

  if (interpolation.__emotion_styles !== undefined) {
    return interpolation
  }

  switch (typeof interpolation) {
    case 'boolean': {
      return ''
    }

    case 'object': {
      if (interpolation.anim === 1) {
        cursor = {
          name: interpolation.name,
          styles: interpolation.styles,
          next: cursor,
        }
        return interpolation.name
      }

      if (interpolation.styles !== undefined) {
        var next = interpolation.next

        if (next !== undefined) {
          // not the most efficient thing ever but this is a pretty rare case
          // and there will be very few iterations of this generally
          while (next !== undefined) {
            cursor = {
              name: next.name,
              styles: next.styles,
              next: cursor,
            }
            next = next.next
          }
        }

        var styles = interpolation.styles + ';'

        return styles
      }

      return createStringFromObject(mergedProps, registered, interpolation)
    }

    case 'function': {
      if (mergedProps !== undefined) {
        var previousCursor = cursor
        var result = interpolation(mergedProps)
        cursor = previousCursor
        return handleInterpolation(mergedProps, registered, result)
      }

      break
    }
  } // finalize string values (regular strings and functions interpolated into css calls)

  if (registered == null) {
    return interpolation
  }

  var cached = registered[interpolation]
  return cached !== undefined ? cached : interpolation
}

function createStringFromObject(mergedProps, registered, obj) {
  var string = ''

  if (Array.isArray(obj)) {
    for (var i = 0; i < obj.length; i++) {
      string += handleInterpolation(mergedProps, registered, obj[i]) + ';'
    }
  } else {
    for (var _key in obj) {
      var value = obj[_key]

      if (typeof value !== 'object') {
        if (registered != null && registered[value] !== undefined) {
          string += _key + '{' + registered[value] + '}'
        } else if (isProcessableValue(value)) {
          string +=
            processStyleName(_key) + ':' + processStyleValue(_key, value) + ';'
        }
      } else {
        if (_key === 'NO_COMPONENT_SELECTOR' && 'production' !== 'production') {
          throw new Error(
            'Component selectors can only be used in conjunction with @emotion/babel-plugin.'
          )
        }

        if (
          Array.isArray(value) &&
          typeof value[0] === 'string' &&
          (registered == null || registered[value[0]] === undefined)
        ) {
          for (var _i = 0; _i < value.length; _i++) {
            if (isProcessableValue(value[_i])) {
              string +=
                processStyleName(_key) +
                ':' +
                processStyleValue(_key, value[_i]) +
                ';'
            }
          }
        } else {
          var interpolated = handleInterpolation(mergedProps, registered, value)

          switch (_key) {
            case 'animation':
            case 'animationName': {
              string += processStyleName(_key) + ':' + interpolated + ';'
              break
            }

            default: {
              string += _key + '{' + interpolated + '}'
            }
          }
        }
      }
    }
  }

  return string
}

var labelPattern = /label:\s*([^\s;\n{]+)\s*;/g
// keyframes are stored on the SerializedStyles object as a linked list

var cursor
var serializeStyles = function serializeStyles(args, registered, mergedProps) {
  if (
    args.length === 1 &&
    typeof args[0] === 'object' &&
    args[0] !== null &&
    args[0].styles !== undefined
  ) {
    return args[0]
  }

  var stringMode = true
  var styles = ''
  cursor = undefined
  var strings = args[0]

  if (strings == null || strings.raw === undefined) {
    stringMode = false
    styles += handleInterpolation(mergedProps, registered, strings)
  } else {
    styles += strings[0]
  } // we start at 1 since we've already handled the first arg

  for (var i = 1; i < args.length; i++) {
    styles += handleInterpolation(mergedProps, registered, args[i])

    if (stringMode) {
      styles += strings[i]
    }
  }

  labelPattern.lastIndex = 0
  var identifierName = ''
  var match // https://esbench.com/bench/5b809c2cf2949800a0f61fb5

  while ((match = labelPattern.exec(styles)) !== null) {
    identifierName +=
      '-' + // $FlowFixMe we know it's not null
      match[1]
  }

  var name = hashString__default['default'](styles) + identifierName

  return {
    name: name,
    styles: styles,
    next: cursor,
  }
}

exports.serializeStyles = serializeStyles
