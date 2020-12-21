'use strict'

var React = require('react'),
  createCache = require('@emotion/cache'),
  _extends = require('@babel/runtime/helpers/extends'),
  weakMemoize = require('@emotion/weak-memoize'),
  isolatedHoistNonReactStaticsDoNotUseThisInYourCode_dist_emotionReactIsolatedHoistNonReactStaticsDoNotUseThisInYourCode = require('../isolated-hoist-non-react-statics-do-not-use-this-in-your-code/dist/emotion-react-isolated-hoist-non-react-statics-do-not-use-this-in-your-code.cjs.prod.js'),
  utils = require('@emotion/utils'),
  serialize = require('@emotion/serialize')

function _interopDefault(e) {
  return e && e.__esModule
    ? e
    : {
        default: e
      }
}

var createCache__default = _interopDefault(createCache),
  _extends__default = _interopDefault(_extends),
  weakMemoize__default = _interopDefault(weakMemoize),
  isBrowser = 'undefined' != typeof document,
  hasOwnProperty = Object.prototype.hasOwnProperty,
  EmotionCacheContext = React.createContext(
    'undefined' != typeof HTMLElement
      ? createCache__default.default({
          key: 'css'
        })
      : null
  ),
  CacheProvider = EmotionCacheContext.Provider

;(exports.withEmotionCache = function(func) {
  return React.forwardRef(function(props, ref) {
    var cache = React.useContext(EmotionCacheContext)
    return func(props, cache, ref)
  })
}),
  isBrowser ||
    (exports.withEmotionCache = function(func) {
      return function(props) {
        var cache = React.useContext(EmotionCacheContext)
        return null === cache
          ? ((cache = createCache__default.default({
              key: 'css'
            })),
            React.createElement(
              EmotionCacheContext.Provider,
              {
                value: cache
              },
              func(props, cache)
            ))
          : func(props, cache)
      }
    })

var ThemeContext = React.createContext({}),
  useTheme = function() {
    return React.useContext(ThemeContext)
  },
  getTheme = function(outerTheme, theme) {
    if ('function' == typeof theme) {
      var mergedTheme = theme(outerTheme)
      return mergedTheme
    }
    return _extends__default.default({}, outerTheme, theme)
  },
  createCacheWithTheme = weakMemoize__default.default(function(outerTheme) {
    return weakMemoize__default.default(function(theme) {
      return getTheme(outerTheme, theme)
    })
  }),
  ThemeProvider = function(props) {
    var theme = React.useContext(ThemeContext)
    return (
      props.theme !== theme &&
        (theme = createCacheWithTheme(theme)(props.theme)),
      React.createElement(
        ThemeContext.Provider,
        {
          value: theme
        },
        props.children
      )
    )
  }

function withTheme(Component) {
  var componentName = Component.displayName || Component.name || 'Component',
    render = function(props, ref) {
      var theme = React.useContext(ThemeContext)
      return React.createElement(
        Component,
        _extends__default.default(
          {
            theme: theme,
            ref: ref
          },
          props
        )
      )
    },
    WithTheme = React.forwardRef(render)
  return (
    (WithTheme.displayName = 'WithTheme(' + componentName + ')'),
    isolatedHoistNonReactStaticsDoNotUseThisInYourCode_dist_emotionReactIsolatedHoistNonReactStaticsDoNotUseThisInYourCode.default(
      WithTheme,
      Component
    )
  )
}

var sanitizeIdentifier = function(identifier) {
    return identifier.replace(/\$/g, '-')
  },
  typePropName = '__EMOTION_TYPE_PLEASE_DO_NOT_USE__',
  labelPropName = '__EMOTION_LABEL_PLEASE_DO_NOT_USE__',
  createEmotionProps = function(type, props) {
    var newProps = {}
    for (var key in props)
      hasOwnProperty.call(props, key) && (newProps[key] = props[key])
    return (newProps[typePropName] = type), newProps
  },
  Emotion = exports.withEmotionCache(function(props, cache, ref) {
    var cssProp = props.css
    'string' == typeof cssProp &&
      void 0 !== cache.registered[cssProp] &&
      (cssProp = cache.registered[cssProp])
    var type = props[typePropName],
      registeredStyles = [cssProp],
      className = ''
    'string' == typeof props.className
      ? (className = utils.getRegisteredStyles(
          cache.registered,
          registeredStyles,
          props.className
        ))
      : null != props.className && (className = props.className + ' ')
    var serialized = serialize.serializeStyles(
        registeredStyles,
        void 0,
        'function' == typeof cssProp || Array.isArray(cssProp)
          ? React.useContext(ThemeContext)
          : void 0
      ),
      rules = utils.insertStyles(cache, serialized, 'string' == typeof type)
    className += cache.key + '-' + serialized.name
    var newProps = {}
    for (var key in props)
      hasOwnProperty.call(props, key) &&
        'css' !== key &&
        key !== typePropName &&
        (newProps[key] = props[key])
    ;(newProps.ref = ref), (newProps.className = className)
    var ele = React.createElement(type, newProps)
    if (!isBrowser && void 0 !== rules) {
      for (
        var _ref, serializedNames = serialized.name, next = serialized.next;
        void 0 !== next;

      )
        (serializedNames += ' ' + next.name), (next = next.next)
      return React.createElement(
        React.Fragment,
        null,
        React.createElement(
          'style',
          (((_ref = {})['data-emotion'] = cache.key + ' ' + serializedNames),
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

;(exports.CacheProvider = CacheProvider),
  (exports.Emotion = Emotion),
  (exports.ThemeContext = ThemeContext),
  (exports.ThemeProvider = ThemeProvider),
  (exports.createEmotionProps = createEmotionProps),
  (exports.hasOwnProperty = hasOwnProperty),
  (exports.isBrowser = isBrowser),
  (exports.useTheme = useTheme),
  (exports.withTheme = withTheme)
