'use strict'

Object.defineProperty(exports, '__esModule', { value: true })

var createCache = require('@emotion/cache')
var serialize = require('@emotion/serialize')
var utils = require('@emotion/utils')

function _interopDefault(e) {
  return e && e.__esModule ? e : { default: e }
}

var createCache__default = /*#__PURE__*/ _interopDefault(createCache)

function insertWithoutScoping(cache, serialized) {
  if (cache.inserted[serialized.name] === undefined) {
    return cache.insert('', serialized, cache.sheet, true)
  }
}

function merge(registered, css, className) {
  var registeredStyles = []
  var rawClassName = utils.getRegisteredStyles(
    registered,
    registeredStyles,
    className
  )

  if (registeredStyles.length < 2) {
    return className
  }

  return rawClassName + css(registeredStyles)
}

var createEmotion = function createEmotion(options) {
  var cache = createCache__default['default'](options) // $FlowFixMe

  cache.sheet.speedy = function(value) {
    if (process.env.NODE_ENV !== 'production' && this.ctr !== 0) {
      throw new Error('speedy must be changed before any rules are inserted')
    }

    this.isSpeedy = value
  }

  cache.compat = true

  var css = function css() {
    for (
      var _len = arguments.length, args = new Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      args[_key] = arguments[_key]
    }

    var serialized = serialize.serializeStyles(
      args,
      cache.registered,
      undefined
    )
    utils.insertStyles(cache, serialized, false)
    return cache.key + '-' + serialized.name
  }

  var keyframes = function keyframes() {
    for (
      var _len2 = arguments.length, args = new Array(_len2), _key2 = 0;
      _key2 < _len2;
      _key2++
    ) {
      args[_key2] = arguments[_key2]
    }

    var serialized = serialize.serializeStyles(args, cache.registered)
    var animation = 'animation-' + serialized.name
    insertWithoutScoping(cache, {
      name: serialized.name,
      styles: '@keyframes ' + animation + '{' + serialized.styles + '}'
    })
    return animation
  }

  var injectGlobal = function injectGlobal() {
    for (
      var _len3 = arguments.length, args = new Array(_len3), _key3 = 0;
      _key3 < _len3;
      _key3++
    ) {
      args[_key3] = arguments[_key3]
    }

    var serialized = serialize.serializeStyles(args, cache.registered)
    insertWithoutScoping(cache, serialized)
  }

  var cx = function cx() {
    for (
      var _len4 = arguments.length, args = new Array(_len4), _key4 = 0;
      _key4 < _len4;
      _key4++
    ) {
      args[_key4] = arguments[_key4]
    }

    return merge(cache.registered, css, classnames(args))
  }

  return {
    css: css,
    cx: cx,
    injectGlobal: injectGlobal,
    keyframes: keyframes,
    hydrate: function hydrate(ids) {
      ids.forEach(function(key) {
        cache.inserted[key] = true
      })
    },
    flush: function flush() {
      cache.registered = {}
      cache.inserted = {}
      cache.sheet.flush()
    },
    // $FlowFixMe
    sheet: cache.sheet,
    cache: cache,
    getRegisteredStyles: utils.getRegisteredStyles.bind(null, cache.registered),
    merge: merge.bind(null, cache.registered, css)
  }
}

var classnames = function classnames(args) {
  var cls = ''

  for (var i = 0; i < args.length; i++) {
    var arg = args[i]
    if (arg == null) continue
    var toAdd = void 0

    switch (typeof arg) {
      case 'boolean':
        break

      case 'object': {
        if (Array.isArray(arg)) {
          toAdd = classnames(arg)
        } else {
          toAdd = ''

          for (var k in arg) {
            if (arg[k] && k) {
              toAdd && (toAdd += ' ')
              toAdd += k
            }
          }
        }

        break
      }

      default: {
        toAdd = arg
      }
    }

    if (toAdd) {
      cls && (cls += ' ')
      cls += toAdd
    }
  }

  return cls
}

exports.default = createEmotion
