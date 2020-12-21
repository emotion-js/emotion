'use strict'

Object.defineProperty(exports, '__esModule', {
  value: !0
})

var createCache = require('@emotion/cache'),
  serialize = require('@emotion/serialize'),
  utils = require('@emotion/utils')

function _interopDefault(e) {
  return e && e.__esModule
    ? e
    : {
        default: e
      }
}

var createCache__default = _interopDefault(createCache)

function insertWithoutScoping(cache, serialized) {
  if (void 0 === cache.inserted[serialized.name])
    return cache.insert('', serialized, cache.sheet, !0)
}

function merge(registered, css, className) {
  var registeredStyles = [],
    rawClassName = utils.getRegisteredStyles(
      registered,
      registeredStyles,
      className
    )
  return registeredStyles.length < 2
    ? className
    : rawClassName + css(registeredStyles)
}

var createEmotion = function(options) {
    var cache = createCache__default.default(options)
    ;(cache.sheet.speedy = function(value) {
      this.isSpeedy = value
    }),
      (cache.compat = !0)
    var css = function() {
      for (
        var _len = arguments.length, args = new Array(_len), _key = 0;
        _key < _len;
        _key++
      )
        args[_key] = arguments[_key]
      var serialized = serialize.serializeStyles(args, cache.registered, void 0)
      return (
        utils.insertStyles(cache, serialized, !1),
        cache.key + '-' + serialized.name
      )
    }
    return {
      css: css,
      cx: function() {
        for (
          var _len4 = arguments.length, args = new Array(_len4), _key4 = 0;
          _key4 < _len4;
          _key4++
        )
          args[_key4] = arguments[_key4]
        return merge(cache.registered, css, classnames(args))
      },
      injectGlobal: function() {
        for (
          var _len3 = arguments.length, args = new Array(_len3), _key3 = 0;
          _key3 < _len3;
          _key3++
        )
          args[_key3] = arguments[_key3]
        var serialized = serialize.serializeStyles(args, cache.registered)
        insertWithoutScoping(cache, serialized)
      },
      keyframes: function() {
        for (
          var _len2 = arguments.length, args = new Array(_len2), _key2 = 0;
          _key2 < _len2;
          _key2++
        )
          args[_key2] = arguments[_key2]
        var serialized = serialize.serializeStyles(args, cache.registered),
          animation = 'animation-' + serialized.name
        return (
          insertWithoutScoping(cache, {
            name: serialized.name,
            styles: '@keyframes ' + animation + '{' + serialized.styles + '}'
          }),
          animation
        )
      },
      hydrate: function(ids) {
        ids.forEach(function(key) {
          cache.inserted[key] = !0
        })
      },
      flush: function() {
        ;(cache.registered = {}), (cache.inserted = {}), cache.sheet.flush()
      },
      sheet: cache.sheet,
      cache: cache,
      getRegisteredStyles: utils.getRegisteredStyles.bind(
        null,
        cache.registered
      ),
      merge: merge.bind(null, cache.registered, css)
    }
  },
  classnames = function classnames(args) {
    for (var cls = '', i = 0; i < args.length; i++) {
      var arg = args[i]
      if (null != arg) {
        var toAdd = void 0
        switch (typeof arg) {
          case 'boolean':
            break

          case 'object':
            if (Array.isArray(arg)) toAdd = classnames(arg)
            else
              for (var k in ((toAdd = ''), arg))
                arg[k] && k && (toAdd && (toAdd += ' '), (toAdd += k))
            break

          default:
            toAdd = arg
        }
        toAdd && (cls && (cls += ' '), (cls += toAdd))
      }
    }
    return cls
  }

exports.default = createEmotion
