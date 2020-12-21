'use strict'

Object.defineProperty(exports, '__esModule', { value: true })

var React = require('react')
require('@emotion/cache')
var emotionElement = require('./emotion-element-deca0de5.cjs.dev.js')
require('@babel/runtime/helpers/extends')
require('@emotion/weak-memoize')
require('hoist-non-react-statics')
require('../isolated-hoist-non-react-statics-do-not-use-this-in-your-code/dist/emotion-react-isolated-hoist-non-react-statics-do-not-use-this-in-your-code.cjs.dev.js')
var utils = require('@emotion/utils')
var serialize = require('@emotion/serialize')
var sheet = require('@emotion/sheet')

var pkg = {
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
  sideEffects: false,
  author: 'mitchellhamilton <mitchell@mitchellhamilton.me>',
  license: 'MIT',
  scripts: {
    'test:typescript': 'dtslint types'
  },
  dependencies: {
    '@babel/runtime': '^7.12.5',
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
      optional: true
    },
    '@types/react': {
      optional: true
    }
  },
  devDependencies: {
    '@babel/core': '^7.12.10',
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
}

var jsx = function jsx(type, props) {
  var args = arguments

  if (props == null || !emotionElement.hasOwnProperty.call(props, 'css')) {
    // $FlowFixMe
    return React.createElement.apply(undefined, args)
  }

  var argsLength = args.length
  var createElementArgArray = new Array(argsLength)
  createElementArgArray[0] = emotionElement.Emotion
  createElementArgArray[1] = emotionElement.createEmotionProps(type, props)

  for (var i = 2; i < argsLength; i++) {
    createElementArgArray[i] = args[i]
  } // $FlowFixMe

  return React.createElement.apply(null, createElementArgArray)
}

var warnedAboutCssPropForGlobal = false // maintain place over rerenders.
// initial render from browser, insertBefore context.sheet.tags[0] or if a style hasn't been inserted there yet, appendChild
// initial client-side render from SSR, use place of hydrating tag

var Global = /* #__PURE__ */ emotionElement.withEmotionCache(function(
  props,
  cache
) {
  if (
    process.env.NODE_ENV !== 'production' &&
    !warnedAboutCssPropForGlobal && // check for className as well since the user is
    // probably using the custom createElement which
    // means it will be turned into a className prop
    // $FlowFixMe I don't really want to add it to the type since it shouldn't be used
    (props.className || props.css)
  ) {
    console.error(
      "It looks like you're using the css prop on Global, did you mean to use the styles prop instead?"
    )
    warnedAboutCssPropForGlobal = true
  }

  var styles = props.styles
  var serialized = serialize.serializeStyles(
    [styles],
    undefined,
    typeof styles === 'function' || Array.isArray(styles)
      ? React.useContext(emotionElement.ThemeContext)
      : undefined
  )

  if (!emotionElement.isBrowser) {
    var _ref

    var serializedNames = serialized.name
    var serializedStyles = serialized.styles
    var next = serialized.next

    while (next !== undefined) {
      serializedNames += ' ' + next.name
      serializedStyles += next.styles
      next = next.next
    }

    var shouldCache = cache.compat === true
    var rules = cache.insert(
      '',
      {
        name: serializedNames,
        styles: serializedStyles
      },
      cache.sheet,
      shouldCache
    )

    if (shouldCache) {
      return null
    }

    return /*#__PURE__*/ React.createElement(
      'style',
      ((_ref = {}),
      (_ref['data-emotion'] = cache.key + '-global ' + serializedNames),
      (_ref.dangerouslySetInnerHTML = {
        __html: rules
      }),
      (_ref.nonce = cache.sheet.nonce),
      _ref)
    )
  } // yes, i know these hooks are used conditionally
  // but it is based on a constant that will never change at runtime
  // it's effectively like having two implementations and switching them out
  // so it's not actually breaking anything

  var sheetRef = React.useRef()
  React.useLayoutEffect(
    function() {
      var key = cache.key + '-global'
      var sheet$1 = new sheet.StyleSheet({
        key: key,
        nonce: cache.sheet.nonce,
        container: cache.sheet.container,
        speedy: cache.sheet.isSpeedy
      }) // $FlowFixMe

      var node = document.querySelector(
        'style[data-emotion="' + key + ' ' + serialized.name + '"]'
      )

      if (cache.sheet.tags.length) {
        sheet$1.before = cache.sheet.tags[0]
      }

      if (node !== null) {
        sheet$1.hydrate([node])
      }

      sheetRef.current = sheet$1
      return function() {
        sheet$1.flush()
      }
    },
    [cache]
  )
  React.useLayoutEffect(
    function() {
      if (serialized.next !== undefined) {
        // insert keyframes
        utils.insertStyles(cache, serialized.next, true)
      }

      var sheet = sheetRef.current

      if (sheet.tags.length) {
        // if this doesn't exist then it will be null so the style element will be appended
        var element = sheet.tags[sheet.tags.length - 1].nextElementSibling
        sheet.before = element
        sheet.flush()
      }

      cache.insert('', serialized, sheet, false)
    },
    [cache, serialized.name]
  )
  return null
})

if (process.env.NODE_ENV !== 'production') {
  Global.displayName = 'EmotionGlobal'
}

function css() {
  for (
    var _len = arguments.length, args = new Array(_len), _key = 0;
    _key < _len;
    _key++
  ) {
    args[_key] = arguments[_key]
  }

  return serialize.serializeStyles(args)
}

var keyframes = function keyframes() {
  var insertable = css.apply(void 0, arguments)
  var name = 'animation-' + insertable.name // $FlowFixMe

  return {
    name: name,
    styles: '@keyframes ' + name + '{' + insertable.styles + '}',
    anim: 1,
    toString: function toString() {
      return '_EMO_' + this.name + '_' + this.styles + '_EMO_'
    }
  }
}

var classnames = function classnames(args) {
  var len = args.length
  var i = 0
  var cls = ''

  for (; i < len; i++) {
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
          if (
            process.env.NODE_ENV !== 'production' &&
            arg.styles !== undefined &&
            arg.name !== undefined
          ) {
            console.error(
              'You have passed styles created with `css` from `@emotion/react` package to the `cx`.\n' +
                '`cx` is meant to compose class names (strings) so you should convert those styles to a class name by passing them to the `css` received from <ClassNames/> component.'
            )
          }

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

var ClassNames = /* #__PURE__ */ emotionElement.withEmotionCache(function(
  props,
  cache
) {
  var rules = ''
  var serializedHashes = ''
  var hasRendered = false

  var css = function css() {
    if (hasRendered && process.env.NODE_ENV !== 'production') {
      throw new Error('css can only be used during render')
    }

    for (
      var _len = arguments.length, args = new Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      args[_key] = arguments[_key]
    }

    var serialized = serialize.serializeStyles(args, cache.registered)

    if (emotionElement.isBrowser) {
      utils.insertStyles(cache, serialized, false)
    } else {
      var res = utils.insertStyles(cache, serialized, false)

      if (res !== undefined) {
        rules += res
      }
    }

    if (!emotionElement.isBrowser) {
      serializedHashes += ' ' + serialized.name
    }

    return cache.key + '-' + serialized.name
  }

  var cx = function cx() {
    if (hasRendered && process.env.NODE_ENV !== 'production') {
      throw new Error('cx can only be used during render')
    }

    for (
      var _len2 = arguments.length, args = new Array(_len2), _key2 = 0;
      _key2 < _len2;
      _key2++
    ) {
      args[_key2] = arguments[_key2]
    }

    return merge(cache.registered, css, classnames(args))
  }

  var content = {
    css: css,
    cx: cx,
    theme: React.useContext(emotionElement.ThemeContext)
  }
  var ele = props.children(content)
  hasRendered = true

  if (!emotionElement.isBrowser && rules.length !== 0) {
    var _ref

    return /*#__PURE__*/ React.createElement(
      React.Fragment,
      null,
      /*#__PURE__*/ React.createElement(
        'style',
        ((_ref = {}),
        (_ref['data-emotion'] =
          cache.key + ' ' + serializedHashes.substring(1)),
        (_ref.dangerouslySetInnerHTML = {
          __html: rules
        }),
        (_ref.nonce = cache.sheet.nonce),
        _ref)
      ),
      ele
    )
  }

  return ele
})

if (process.env.NODE_ENV !== 'production') {
  ClassNames.displayName = 'EmotionClassNames'
}

if (process.env.NODE_ENV !== 'production') {
  var isBrowser = typeof document !== 'undefined' // #1727 for some reason Jest evaluates modules twice if some consuming module gets mocked with jest.mock

  var isJest = typeof jest !== 'undefined'

  if (isBrowser && !isJest) {
    var globalContext = isBrowser ? window : global
    var globalKey = '__EMOTION_REACT_' + pkg.version.split('.')[0] + '__'

    if (globalContext[globalKey]) {
      console.warn(
        'You are loading @emotion/react when it is already loaded. Running ' +
          'multiple instances may cause problems. This can happen if multiple ' +
          'versions are used, or if multiple builds of the same version are ' +
          'used.'
      )
    }

    globalContext[globalKey] = true
  }
}

exports.CacheProvider = emotionElement.CacheProvider
exports.ThemeContext = emotionElement.ThemeContext
exports.ThemeProvider = emotionElement.ThemeProvider
exports.useTheme = emotionElement.useTheme
Object.defineProperty(exports, 'withEmotionCache', {
  enumerable: true,
  get: function() {
    return emotionElement.withEmotionCache
  }
})
exports.withTheme = emotionElement.withTheme
exports.ClassNames = ClassNames
exports.Global = Global
exports.createElement = jsx
exports.css = css
exports.jsx = jsx
exports.keyframes = keyframes
