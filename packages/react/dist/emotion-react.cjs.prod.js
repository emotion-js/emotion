'use strict'

Object.defineProperty(exports, '__esModule', {
  value: !0
})

var React = require('react')

require('@emotion/cache')

var emotionElement = require('./emotion-element-3a01c80e.cjs.prod.js')

require('@babel/runtime/helpers/extends'),
  require('@emotion/weak-memoize'),
  require('hoist-non-react-statics'),
  require('../isolated-hoist-non-react-statics-do-not-use-this-in-your-code/dist/emotion-react-isolated-hoist-non-react-statics-do-not-use-this-in-your-code.cjs.prod.js')

var utils = require('@emotion/utils'),
  serialize = require('@emotion/serialize'),
  sheet = require('@emotion/sheet'),
  pkg = {
    name: '@emotion/react',
    version: '11.1.3',
    main: 'dist/emotion-react.cjs.js',
    module: 'dist/emotion-react.esm.js',
    browser: {
      './dist/emotion-react.cjs.js': './dist/emotion-react.browser.cjs.js',
      './dist/emotion-react.esm.js': './dist/emotion-react.browser.esm.js'
    },
    types: 'types/index.d.ts',
    files: [
      'src',
      'dist',
      'jsx-runtime',
      'jsx-dev-runtime',
      'isolated-hoist-non-react-statics-do-not-use-this-in-your-code',
      'types/*.d.ts',
      'macro.js',
      'macro.d.ts',
      'macro.js.flow'
    ],
    sideEffects: !1,
    author: 'mitchellhamilton <mitchell@mitchellhamilton.me>',
    license: 'MIT',
    scripts: {
      'test:typescript': 'dtslint types'
    },
    dependencies: {
      '@babel/runtime': '^7.7.2',
      '@emotion/cache': '^11.1.3',
      '@emotion/serialize': '^1.0.0',
      '@emotion/sheet': '^1.0.1',
      '@emotion/utils': '^1.0.0',
      '@emotion/weak-memoize': '^0.2.5',
      'hoist-non-react-statics': '^3.3.1'
    },
    peerDependencies: {
      '@babel/core': '^7.0.0',
      react: '>=16.8.0'
    },
    peerDependenciesMeta: {
      '@babel/core': {
        optional: !0
      },
      '@types/react': {
        optional: !0
      }
    },
    devDependencies: {
      '@babel/core': '^7.7.2',
      '@emotion/css': '11.1.3',
      '@emotion/css-prettifier': '1.0.0',
      '@emotion/server': '11.0.0',
      '@emotion/styled': '11.0.0',
      '@types/react': '^16.9.11',
      dtslint: '^0.3.0',
      'html-tag-names': '^1.1.2',
      react: '16.14.0',
      'svg-tag-names': '^1.1.1'
    },
    repository:
      'https://github.com/emotion-js/emotion/tree/master/packages/react',
    publishConfig: {
      access: 'public'
    },
    'umd:main': 'dist/emotion-react.umd.min.js',
    preconstruct: {
      entrypoints: [
        './index.js',
        './jsx-runtime.js',
        './jsx-dev-runtime.js',
        './isolated-hoist-non-react-statics-do-not-use-this-in-your-code.js'
      ],
      umdName: 'emotionReact'
    }
  },
  jsx = function(type, props) {
    var args = arguments
    if (null == props || !emotionElement.hasOwnProperty.call(props, 'css'))
      return React.createElement.apply(void 0, args)
    var argsLength = args.length,
      createElementArgArray = new Array(argsLength)
    ;(createElementArgArray[0] = emotionElement.Emotion),
      (createElementArgArray[1] = emotionElement.createEmotionProps(
        type,
        props
      ))
    for (var i = 2; i < argsLength; i++) createElementArgArray[i] = args[i]
    return React.createElement.apply(null, createElementArgArray)
  },
  warnedAboutCssPropForGlobal = !1,
  Global = emotionElement.withEmotionCache(function(props, cache) {
    var styles = props.styles,
      serialized = serialize.serializeStyles(
        [styles],
        void 0,
        'function' == typeof styles || Array.isArray(styles)
          ? React.useContext(emotionElement.ThemeContext)
          : void 0
      )
    if (!emotionElement.isBrowser) {
      for (
        var _ref,
          serializedNames = serialized.name,
          serializedStyles = serialized.styles,
          next = serialized.next;
        void 0 !== next;

      )
        (serializedNames += ' ' + next.name),
          (serializedStyles += next.styles),
          (next = next.next)
      var shouldCache = !0 === cache.compat,
        rules = cache.insert(
          '',
          {
            name: serializedNames,
            styles: serializedStyles
          },
          cache.sheet,
          shouldCache
        )
      return shouldCache
        ? null
        : React.createElement(
            'style',
            (((_ref = {})['data-emotion'] =
              cache.key + '-global ' + serializedNames),
            (_ref.dangerouslySetInnerHTML = {
              __html: rules
            }),
            (_ref.nonce = cache.sheet.nonce),
            _ref)
          )
    }
    var sheetRef = React.useRef()
    return (
      React.useLayoutEffect(
        function() {
          var key = cache.key + '-global',
            sheet$1 = new sheet.StyleSheet({
              key: key,
              nonce: cache.sheet.nonce,
              container: cache.sheet.container,
              speedy: cache.sheet.isSpeedy
            }),
            node = document.querySelector(
              'style[data-emotion="' + key + ' ' + serialized.name + '"]'
            )
          return (
            cache.sheet.tags.length && (sheet$1.before = cache.sheet.tags[0]),
            null !== node && sheet$1.hydrate([node]),
            (sheetRef.current = sheet$1),
            function() {
              sheet$1.flush()
            }
          )
        },
        [cache]
      ),
      React.useLayoutEffect(
        function() {
          void 0 !== serialized.next &&
            utils.insertStyles(cache, serialized.next, !0)
          var sheet = sheetRef.current
          if (sheet.tags.length) {
            var element = sheet.tags[sheet.tags.length - 1].nextElementSibling
            ;(sheet.before = element), sheet.flush()
          }
          cache.insert('', serialized, sheet, !1)
        },
        [cache, serialized.name]
      ),
      null
    )
  })

function css() {
  for (
    var _len = arguments.length, args = new Array(_len), _key = 0;
    _key < _len;
    _key++
  )
    args[_key] = arguments[_key]
  return serialize.serializeStyles(args)
}

var keyframes = function() {
    var insertable = css.apply(void 0, arguments),
      name = 'animation-' + insertable.name
    return {
      name: name,
      styles: '@keyframes ' + name + '{' + insertable.styles + '}',
      anim: 1,
      toString: function() {
        return '_EMO_' + this.name + '_' + this.styles + '_EMO_'
      }
    }
  },
  classnames = function classnames(args) {
    for (var len = args.length, i = 0, cls = ''; i < len; i++) {
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

var isBrowser,
  isJest,
  globalContext,
  globalKey,
  ClassNames = emotionElement.withEmotionCache(function(props, cache) {
    var _ref,
      rules = '',
      serializedHashes = '',
      css = function() {
        for (
          var _len = arguments.length, args = new Array(_len), _key = 0;
          _key < _len;
          _key++
        )
          args[_key] = arguments[_key]
        var serialized = serialize.serializeStyles(args, cache.registered)
        if (emotionElement.isBrowser) utils.insertStyles(cache, serialized, !1)
        else {
          var res = utils.insertStyles(cache, serialized, !1)
          void 0 !== res && (rules += res)
        }
        return (
          emotionElement.isBrowser ||
            (serializedHashes += ' ' + serialized.name),
          cache.key + '-' + serialized.name
        )
      },
      content = {
        css: css,
        cx: function() {
          for (
            var _len2 = arguments.length, args = new Array(_len2), _key2 = 0;
            _key2 < _len2;
            _key2++
          )
            args[_key2] = arguments[_key2]
          return merge(cache.registered, css, classnames(args))
        },
        theme: React.useContext(emotionElement.ThemeContext)
      },
      ele = props.children(content)
    return (
      !0,
      emotionElement.isBrowser || 0 === rules.length
        ? ele
        : React.createElement(
            React.Fragment,
            null,
            React.createElement(
              'style',
              (((_ref = {})['data-emotion'] =
                cache.key + ' ' + serializedHashes.substring(1)),
              (_ref.dangerouslySetInnerHTML = {
                __html: rules
              }),
              (_ref.nonce = cache.sheet.nonce),
              _ref)
            ),
            ele
          )
    )
  })

;(exports.CacheProvider = emotionElement.CacheProvider),
  (exports.ThemeContext = emotionElement.ThemeContext),
  (exports.ThemeProvider = emotionElement.ThemeProvider),
  (exports.useTheme = emotionElement.useTheme),
  Object.defineProperty(exports, 'withEmotionCache', {
    enumerable: !0,
    get: function() {
      return emotionElement.withEmotionCache
    }
  }),
  (exports.withTheme = emotionElement.withTheme),
  (exports.ClassNames = ClassNames),
  (exports.Global = Global),
  (exports.createElement = jsx),
  (exports.css = css),
  (exports.jsx = jsx),
  (exports.keyframes = keyframes)
