var e = require('react'),
  t = require('@emotion/cache'),
  r = require('@emotion/weak-memoize'),
  n = require('hoist-non-react-statics'),
  o = require('@emotion/utils'),
  s = require('@emotion/serialize'),
  a = require('@emotion/sheet')
function i(e) {
  return e && 'object' == typeof e && 'default' in e ? e : { default: e }
}
var l = i(t),
  c = i(r),
  u = i(n),
  f = 'undefined' != typeof document,
  p = Object.prototype.hasOwnProperty,
  m = e.createContext(
    'undefined' != typeof HTMLElement ? l.default({ key: 'css' }) : null
  ),
  d = m.Provider
function y() {
  return (y =
    Object.assign ||
    function (e) {
      for (var t = 1; t < arguments.length; t++) {
        var r = arguments[t]
        for (var n in r)
          Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
      }
      return e
    }).apply(this, arguments)
}
;(exports.withEmotionCache = function (t) {
  return e.forwardRef(function (r, n) {
    var o = e.useContext(m)
    return t(r, o, n)
  })
}),
  f ||
    (exports.withEmotionCache = function (t) {
      return function (r) {
        var n = e.useContext(m)
        return null === n
          ? ((n = l.default({ key: 'css' })),
            h(m.Provider, { value: n }, t(r, n)))
          : t(r, n)
      }
    })
var v = e.createContext({}),
  E = c.default(function (e) {
    return c.default(function (t) {
      return (function (e, t) {
        if ('function' == typeof t) {
          var r = t(e)
          if (
            'production' !== process.env.NODE_ENV &&
            (null == r || 'object' != typeof r || Array.isArray(r))
          )
            throw new Error(
              '[ThemeProvider] Please return an object from your theme function, i.e. theme={() => ({})}!'
            )
          return r
        }
        if (
          'production' !== process.env.NODE_ENV &&
          (null == t || 'object' != typeof t || Array.isArray(t))
        )
          throw new Error(
            '[ThemeProvider] Please make your theme prop a plain object'
          )
        return y({}, e, t)
      })(e, t)
    })
  }),
  _ = '__EMOTION_TYPE_PLEASE_DO_NOT_USE__',
  g = '__EMOTION_LABEL_PLEASE_DO_NOT_USE__',
  N = function (e, t) {
    if (
      'production' !== process.env.NODE_ENV &&
      'string' == typeof t.css &&
      -1 !== t.css.indexOf(':')
    )
      throw new Error(
        "Strings are not allowed as css prop values, please wrap it in a css template literal from '@emotion/react' like this: css`" +
          t.css +
          '`'
      )
    var r = {}
    for (var n in t) p.call(t, n) && (r[n] = t[n])
    if (((r[_] = e), 'production' !== process.env.NODE_ENV)) {
      var o = new Error()
      if (o.stack) {
        var s = o.stack.match(
          /at (?:Object\.|Module\.|)(?:jsx|createEmotionProps).*\n\s+at (?:Object\.|)([A-Z][A-Za-z0-9$]+) /
        )
        s || (s = o.stack.match(/.*\n([A-Z][A-Za-z0-9$]+)@/)),
          s && (r[g] = s[1].replace(/\$/g, '-'))
      }
    }
    return r
  },
  x = exports.withEmotionCache(function (t, r, n) {
    var a = t.css
    'string' == typeof a && void 0 !== r.registered[a] && (a = r.registered[a])
    var i = t[_],
      l = [a],
      c = ''
    'string' == typeof t.className
      ? (c = o.getRegisteredStyles(r.registered, l, t.className))
      : null != t.className && (c = t.className + ' ')
    var u = s.serializeStyles(
      l,
      void 0,
      'function' == typeof a || Array.isArray(a) ? e.useContext(v) : void 0
    )
    if ('production' !== process.env.NODE_ENV && -1 === u.name.indexOf('-')) {
      var m = t[g]
      m && (u = s.serializeStyles([u, 'label:' + m + ';']))
    }
    var d = o.insertStyles(r, u, 'string' == typeof i)
    c += r.key + '-' + u.name
    var y = {}
    for (var E in t)
      !p.call(t, E) ||
        'css' === E ||
        E === _ ||
        ('production' !== process.env.NODE_ENV && E === g) ||
        (y[E] = t[E])
    ;(y.ref = n), (y.className = c)
    var N = e.createElement(i, y)
    if (!f && void 0 !== d) {
      for (var x, O = u.name, w = u.next; void 0 !== w; )
        (O += ' ' + w.name), (w = w.next)
      return h(
        Fragment,
        null,
        h(
          'style',
          (((x = {})['data-emotion'] = r.key + ' ' + O),
          (x.dangerouslySetInnerHTML = { __html: d }),
          (x.nonce = r.sheet.nonce),
          x)
        ),
        N
      )
    }
    return N
  })
'production' !== process.env.NODE_ENV &&
  (x.displayName = 'EmotionCssPropInternal')
var O = function (t, r) {
    var n = arguments
    if (null == r || !p.call(r, 'css')) return e.createElement.apply(void 0, n)
    var o = n.length,
      s = new Array(o)
    ;(s[0] = x), (s[1] = N(t, r))
    for (var a = 2; a < o; a++) s[a] = n[a]
    return e.createElement.apply(null, s)
  },
  w = !1,
  b = exports.withEmotionCache(function (t, r) {
    'production' === process.env.NODE_ENV ||
      w ||
      (!t.className && !t.css) ||
      (console.error(
        "It looks like you're using the css prop on Global, did you mean to use the styles prop instead?"
      ),
      (w = !0))
    var n = t.styles,
      i = s.serializeStyles(
        [n],
        void 0,
        'function' == typeof n || Array.isArray(n) ? e.useContext(v) : void 0
      )
    if (!f) {
      for (var l, c = i.name, u = i.styles, p = i.next; void 0 !== p; )
        (c += ' ' + p.name), (u += p.styles), (p = p.next)
      var m = !0 === r.compat,
        d = r.insert('', { name: c, styles: u }, r.sheet, m)
      return m
        ? null
        : h(
            'style',
            (((l = {})['data-emotion'] = r.key + '-global ' + c),
            (l.dangerouslySetInnerHTML = { __html: d }),
            (l.nonce = r.sheet.nonce),
            l)
          )
    }
    var y = e.useRef()
    return (
      e.useLayoutEffect(
        function () {
          var e = r.key + '-global',
            t = new a.StyleSheet({
              key: e,
              nonce: r.sheet.nonce,
              container: r.sheet.container,
              speedy: r.sheet.isSpeedy,
            }),
            n = document.querySelector(
              'style[data-emotion="' + e + ' ' + i.name + '"]'
            )
          return (
            r.sheet.tags.length && (t.before = r.sheet.tags[0]),
            null !== n && t.hydrate([n]),
            (y.current = t),
            function () {
              t.flush()
            }
          )
        },
        [r]
      ),
      e.useLayoutEffect(
        function () {
          void 0 !== i.next && o.insertStyles(r, i.next, !0)
          var e = y.current
          e.tags.length &&
            ((e.before = e.tags[e.tags.length - 1].nextElementSibling),
            e.flush()),
            r.insert('', i, e, !1)
        },
        [r, i.name]
      ),
      null
    )
  })
function S() {
  return s.serializeStyles([].slice.call(arguments))
}
'production' !== process.env.NODE_ENV && (b.displayName = 'EmotionGlobal')
var C = function e(t) {
  for (var r = t.length, n = 0, o = ''; n < r; n++) {
    var s = t[n]
    if (null != s) {
      var a = void 0
      switch (typeof s) {
        case 'boolean':
          break
        case 'object':
          if (Array.isArray(s)) a = e(s)
          else
            for (var i in ('production' !== process.env.NODE_ENV &&
              void 0 !== s.styles &&
              void 0 !== s.name &&
              console.error(
                'You have passed styles created with `css` from `@emotion/react` package to the `cx`.\n`cx` is meant to compose class names (strings) so you should convert those styles to a class name by passing them to the `css` received from <ClassNames/> component.'
              ),
            (a = ''),
            s))
              s[i] && i && (a && (a += ' '), (a += i))
          break
        default:
          a = s
      }
      a && (o && (o += ' '), (o += a))
    }
  }
  return o
}
function k(e, t, r) {
  var n = [],
    s = o.getRegisteredStyles(e, n, r)
  return n.length < 2 ? r : s + t(n)
}
var A = exports.withEmotionCache(function (t, r) {
  var n,
    a = '',
    i = '',
    l = !1,
    c = function () {
      if (l && 'production' !== process.env.NODE_ENV)
        throw new Error('css can only be used during render')
      var e = s.serializeStyles([].slice.call(arguments), r.registered)
      if (f) o.insertStyles(r, e, !1)
      else {
        var t = o.insertStyles(r, e, !1)
        void 0 !== t && (a += t)
      }
      return f || (i += ' ' + e.name), r.key + '-' + e.name
    },
    u = {
      css: c,
      cx: function () {
        if (l && 'production' !== process.env.NODE_ENV)
          throw new Error('cx can only be used during render')
        return k(r.registered, c, C([].slice.call(arguments)))
      },
      theme: e.useContext(v),
    },
    p = t.children(u)
  return (
    (l = !0),
    f || 0 === a.length
      ? p
      : h(
          Fragment,
          null,
          h(
            'style',
            (((n = {})['data-emotion'] = r.key + ' ' + i.substring(1)),
            (n.dangerouslySetInnerHTML = { __html: a }),
            (n.nonce = r.sheet.nonce),
            n)
          ),
          p
        )
  )
})
if (
  ('production' !== process.env.NODE_ENV &&
    (A.displayName = 'EmotionClassNames'),
  'production' !== process.env.NODE_ENV)
) {
  var T = 'undefined' != typeof document,
    D = 'undefined' != typeof jest
  if (T && !D) {
    var P = T ? window : global,
      j = '__EMOTION_REACT_' + '11.1.3'.split('.')[0] + '__'
    P[j] &&
      console.warn(
        'You are loading @emotion/react when it is already loaded. Running multiple instances may cause problems. This can happen if multiple versions are used, or if multiple builds of the same version are used.'
      ),
      (P[j] = !0)
  }
}
;(exports.CacheProvider = d),
  (exports.ClassNames = A),
  (exports.Global = b),
  (exports.ThemeContext = v),
  (exports.ThemeProvider = function (t) {
    var r = e.useContext(v)
    return (
      t.theme !== r && (r = E(r)(t.theme)),
      h(v.Provider, { value: r }, t.children)
    )
  }),
  (exports.createElement = O),
  (exports.css = S),
  (exports.jsx = O),
  (exports.keyframes = function () {
    var e = S.apply(void 0, [].slice.call(arguments)),
      t = 'animation-' + e.name
    return {
      name: t,
      styles: '@keyframes ' + t + '{' + e.styles + '}',
      anim: 1,
      toString: function () {
        return '_EMO_' + this.name + '_' + this.styles + '_EMO_'
      },
    }
  }),
  (exports.useTheme = function () {
    return e.useContext(v)
  }),
  (exports.withTheme = function (t) {
    var r = t.displayName || t.name || 'Component',
      n = e.forwardRef(function (r, n) {
        var o = e.useContext(v)
        return h(t, y({ theme: o, ref: n }, r))
      })
    return (n.displayName = 'WithTheme(' + r + ')'), u.default(n, t)
  })
//# sourceMappingURL=emotion-react.js.map
