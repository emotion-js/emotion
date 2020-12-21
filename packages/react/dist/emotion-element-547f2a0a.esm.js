import {
  createContext,
  forwardRef,
  useContext,
  createElement,
  Fragment
} from 'react'
import createCache from '@emotion/cache'
import _extends from '@babel/runtime/helpers/esm/extends'
import weakMemoize from '@emotion/weak-memoize'
import hoistNonReactStatics from '../isolated-hoist-non-react-statics-do-not-use-this-in-your-code/dist/emotion-react-isolated-hoist-non-react-statics-do-not-use-this-in-your-code.esm.js'
import { getRegisteredStyles, insertStyles } from '@emotion/utils'
import { serializeStyles } from '@emotion/serialize'

var isBrowser = typeof document !== 'undefined'
var hasOwnProperty = Object.prototype.hasOwnProperty

var EmotionCacheContext = /* #__PURE__ */ createContext(
  // we're doing this to avoid preconstruct's dead code elimination in this one case
  // because this module is primarily intended for the browser and node
  // but it's also required in react native and similar environments sometimes
  // and we could have a special build just for that
  // but this is much easier and the native packages
  // might use a different theme context in the future anyway
  typeof HTMLElement !== 'undefined'
    ? /* #__PURE__ */ createCache({
        key: 'css'
      })
    : null
)
var CacheProvider = EmotionCacheContext.Provider

var withEmotionCache = function withEmotionCache(func) {
  // $FlowFixMe
  return /*#__PURE__*/ forwardRef(function(props, ref) {
    // the cache will never be null in the browser
    var cache = useContext(EmotionCacheContext)
    return func(props, cache, ref)
  })
}

if (!isBrowser) {
  withEmotionCache = function withEmotionCache(func) {
    return function(props) {
      var cache = useContext(EmotionCacheContext)

      if (cache === null) {
        // yes, we're potentially creating this on every render
        // it doesn't actually matter though since it's only on the server
        // so there will only every be a single render
        // that could change in the future because of suspense and etc. but for now,
        // this works and i don't want to optimise for a future thing that we aren't sure about
        cache = createCache({
          key: 'css'
        })
        return /*#__PURE__*/ createElement(
          EmotionCacheContext.Provider,
          {
            value: cache
          },
          func(props, cache)
        )
      } else {
        return func(props, cache)
      }
    }
  }
}

var ThemeContext = /* #__PURE__ */ createContext({})
var useTheme = function useTheme() {
  return useContext(ThemeContext)
}

var getTheme = function getTheme(outerTheme, theme) {
  if (typeof theme === 'function') {
    var mergedTheme = theme(outerTheme)

    if (
      process.env.NODE_ENV !== 'production' &&
      (mergedTheme == null ||
        typeof mergedTheme !== 'object' ||
        Array.isArray(mergedTheme))
    ) {
      throw new Error(
        '[ThemeProvider] Please return an object from your theme function, i.e. theme={() => ({})}!'
      )
    }

    return mergedTheme
  }

  if (
    process.env.NODE_ENV !== 'production' &&
    (theme == null || typeof theme !== 'object' || Array.isArray(theme))
  ) {
    throw new Error(
      '[ThemeProvider] Please make your theme prop a plain object'
    )
  }

  return _extends({}, outerTheme, {}, theme)
}

var createCacheWithTheme = /* #__PURE__ */ weakMemoize(function(outerTheme) {
  return weakMemoize(function(theme) {
    return getTheme(outerTheme, theme)
  })
})
var ThemeProvider = function ThemeProvider(props) {
  var theme = useContext(ThemeContext)

  if (props.theme !== theme) {
    theme = createCacheWithTheme(theme)(props.theme)
  }

  return /*#__PURE__*/ createElement(
    ThemeContext.Provider,
    {
      value: theme
    },
    props.children
  )
}
function withTheme(Component) {
  var componentName = Component.displayName || Component.name || 'Component'

  var render = function render(props, ref) {
    var theme = useContext(ThemeContext)
    return /*#__PURE__*/ createElement(
      Component,
      _extends(
        {
          theme: theme,
          ref: ref
        },
        props
      )
    )
  } // $FlowFixMe

  var WithTheme = /*#__PURE__*/ forwardRef(render)
  WithTheme.displayName = 'WithTheme(' + componentName + ')'
  return hoistNonReactStatics(WithTheme, Component)
}

// thus we only need to replace what is a valid character for JS, but not for CSS

var sanitizeIdentifier = function sanitizeIdentifier(identifier) {
  return identifier.replace(/\$/g, '-')
}

var typePropName = '__EMOTION_TYPE_PLEASE_DO_NOT_USE__'
var labelPropName = '__EMOTION_LABEL_PLEASE_DO_NOT_USE__'
var createEmotionProps = function createEmotionProps(type, props) {
  if (
    process.env.NODE_ENV !== 'production' &&
    typeof props.css === 'string' && // check if there is a css declaration
    props.css.indexOf(':') !== -1
  ) {
    throw new Error(
      "Strings are not allowed as css prop values, please wrap it in a css template literal from '@emotion/react' like this: css`" +
        props.css +
        '`'
    )
  }

  var newProps = {}

  for (var key in props) {
    if (hasOwnProperty.call(props, key)) {
      newProps[key] = props[key]
    }
  }

  newProps[typePropName] = type

  if (process.env.NODE_ENV !== 'production') {
    var error = new Error()

    if (error.stack) {
      // chrome
      var match = error.stack.match(
        /at (?:Object\.|Module\.|)(?:jsx|createEmotionProps).*\n\s+at (?:Object\.|)([A-Z][A-Za-z0-9$]+) /
      )

      if (!match) {
        // safari and firefox
        match = error.stack.match(/.*\n([A-Z][A-Za-z0-9$]+)@/)
      }

      if (match) {
        newProps[labelPropName] = sanitizeIdentifier(match[1])
      }
    }
  }

  return newProps
}
var Emotion = /* #__PURE__ */ withEmotionCache(function(props, cache, ref) {
  var cssProp = props.css // so that using `css` from `emotion` and passing the result to the css prop works
  // not passing the registered cache to serializeStyles because it would
  // make certain babel optimisations not possible

  if (typeof cssProp === 'string' && cache.registered[cssProp] !== undefined) {
    cssProp = cache.registered[cssProp]
  }

  var type = props[typePropName]
  var registeredStyles = [cssProp]
  var className = ''

  if (typeof props.className === 'string') {
    className = getRegisteredStyles(
      cache.registered,
      registeredStyles,
      props.className
    )
  } else if (props.className != null) {
    className = props.className + ' '
  }

  var serialized = serializeStyles(
    registeredStyles,
    undefined,
    typeof cssProp === 'function' || Array.isArray(cssProp)
      ? useContext(ThemeContext)
      : undefined
  )

  if (
    process.env.NODE_ENV !== 'production' &&
    serialized.name.indexOf('-') === -1
  ) {
    var labelFromStack = props[labelPropName]

    if (labelFromStack) {
      serialized = serializeStyles([
        serialized,
        'label:' + labelFromStack + ';'
      ])
    }
  }

  var rules = insertStyles(cache, serialized, typeof type === 'string')
  className += cache.key + '-' + serialized.name
  var newProps = {}

  for (var key in props) {
    if (
      hasOwnProperty.call(props, key) &&
      key !== 'css' &&
      key !== typePropName &&
      (process.env.NODE_ENV === 'production' || key !== labelPropName)
    ) {
      newProps[key] = props[key]
    }
  }

  newProps.ref = ref
  newProps.className = className
  var ele = /*#__PURE__*/ createElement(type, newProps)

  if (!isBrowser && rules !== undefined) {
    var _ref

    var serializedNames = serialized.name
    var next = serialized.next

    while (next !== undefined) {
      serializedNames += ' ' + next.name
      next = next.next
    }

    return /*#__PURE__*/ createElement(
      Fragment,
      null,
      /*#__PURE__*/ createElement(
        'style',
        ((_ref = {}),
        (_ref['data-emotion'] = cache.key + ' ' + serializedNames),
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
  Emotion.displayName = 'EmotionCssPropInternal'
}

export {
  CacheProvider as C,
  Emotion as E,
  ThemeContext as T,
  ThemeProvider as a,
  withTheme as b,
  createEmotionProps as c,
  hasOwnProperty as h,
  isBrowser as i,
  useTheme as u,
  withEmotionCache as w
}
