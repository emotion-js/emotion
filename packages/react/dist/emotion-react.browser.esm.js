import { createElement, useContext, useRef, useLayoutEffect } from 'react'
import '@emotion/cache'
import {
  h as hasOwnProperty,
  E as Emotion,
  c as createEmotionProps,
  w as withEmotionCache,
  T as ThemeContext
} from './emotion-element-a8309070.browser.esm.js'
export {
  C as CacheProvider,
  T as ThemeContext,
  a as ThemeProvider,
  u as useTheme,
  w as withEmotionCache,
  b as withTheme
} from './emotion-element-a8309070.browser.esm.js'
import '@babel/runtime/helpers/extends'
import '@emotion/weak-memoize'
import 'hoist-non-react-statics'
import '../isolated-hoist-non-react-statics-do-not-use-this-in-your-code/dist/emotion-react-isolated-hoist-non-react-statics-do-not-use-this-in-your-code.browser.esm.js'
import { insertStyles, getRegisteredStyles } from '@emotion/utils'
import { serializeStyles } from '@emotion/serialize'
import { StyleSheet } from '@emotion/sheet'

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
      optional: true
    },
    '@types/react': {
      optional: true
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
}

var jsx = function jsx(type, props) {
  var args = arguments

  if (props == null || !hasOwnProperty.call(props, 'css')) {
    // $FlowFixMe
    return createElement.apply(undefined, args)
  }

  var argsLength = args.length
  var createElementArgArray = new Array(argsLength)
  createElementArgArray[0] = Emotion
  createElementArgArray[1] = createEmotionProps(type, props)

  for (var i = 2; i < argsLength; i++) {
    createElementArgArray[i] = args[i]
  } // $FlowFixMe

  return createElement.apply(null, createElementArgArray)
}

var warnedAboutCssPropForGlobal = false // maintain place over rerenders.
// initial render from browser, insertBefore context.sheet.tags[0] or if a style hasn't been inserted there yet, appendChild
// initial client-side render from SSR, use place of hydrating tag

var Global = /* #__PURE__ */ withEmotionCache(function(props, cache) {
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
  var serialized = serializeStyles(
    [styles],
    undefined,
    typeof styles === 'function' || Array.isArray(styles)
      ? useContext(ThemeContext)
      : undefined
  )
  // but it is based on a constant that will never change at runtime
  // it's effectively like having two implementations and switching them out
  // so it's not actually breaking anything

  var sheetRef = useRef()
  useLayoutEffect(
    function() {
      var key = cache.key + '-global'
      var sheet = new StyleSheet({
        key: key,
        nonce: cache.sheet.nonce,
        container: cache.sheet.container,
        speedy: cache.sheet.isSpeedy
      }) // $FlowFixMe

      var node = document.querySelector(
        'style[data-emotion="' + key + ' ' + serialized.name + '"]'
      )

      if (cache.sheet.tags.length) {
        sheet.before = cache.sheet.tags[0]
      }

      if (node !== null) {
        sheet.hydrate([node])
      }

      sheetRef.current = sheet
      return function() {
        sheet.flush()
      }
    },
    [cache]
  )
  useLayoutEffect(
    function() {
      if (serialized.next !== undefined) {
        // insert keyframes
        insertStyles(cache, serialized.next, true)
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

  return serializeStyles(args)
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
  var rawClassName = getRegisteredStyles(
    registered,
    registeredStyles,
    className
  )

  if (registeredStyles.length < 2) {
    return className
  }

  return rawClassName + css(registeredStyles)
}

var ClassNames = /* #__PURE__ */ withEmotionCache(function(props, cache) {
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

    var serialized = serializeStyles(args, cache.registered)

    {
      insertStyles(cache, serialized, false)
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
    theme: useContext(ThemeContext)
  }
  var ele = props.children(content)
  hasRendered = true

  return ele
})

if (process.env.NODE_ENV !== 'production') {
  ClassNames.displayName = 'EmotionClassNames'
}

if (process.env.NODE_ENV !== 'production') {
  var isBrowser = 'object' !== 'undefined' // #1727 for some reason Jest evaluates modules twice if some consuming module gets mocked with jest.mock

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

export { ClassNames, Global, jsx as createElement, css, jsx, keyframes }
