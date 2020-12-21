import {
  forwardRef as e,
  useContext as r,
  createContext as n,
  createElement as t,
  useRef as o,
  useLayoutEffect as s,
} from 'react'
import a from '@emotion/cache'
import i from '@emotion/weak-memoize'
import c from 'hoist-non-react-statics'
import { getRegisteredStyles as l, insertStyles as u } from '@emotion/utils'
import { serializeStyles as m } from '@emotion/serialize'
import { StyleSheet as f } from '@emotion/sheet'
var p = 'undefined' != typeof document,
  d = Object.prototype.hasOwnProperty,
  v = n('undefined' != typeof HTMLElement ? a({ key: 'css' }) : null),
  y = v.Provider,
  E = function (n) {
    return e(function (e, t) {
      var o = r(v)
      return n(e, o, t)
    })
  }
function _() {
  return (_ =
    Object.assign ||
    function (e) {
      for (var r = 1; r < arguments.length; r++) {
        var n = arguments[r]
        for (var t in n)
          Object.prototype.hasOwnProperty.call(n, t) && (e[t] = n[t])
      }
      return e
    }).apply(this, arguments)
}
p ||
  (E = function (e) {
    return function (n) {
      var t = r(v)
      return null === t
        ? ((t = a({ key: 'css' })), h(v.Provider, { value: t }, e(n, t)))
        : e(n, t)
    }
  })
var N = n({}),
  g = function () {
    return r(N)
  },
  O = i(function (e) {
    return i(function (r) {
      return (function (e, r) {
        if ('function' == typeof r) {
          var n = r(e)
          if (
            'production' !== process.env.NODE_ENV &&
            (null == n || 'object' != typeof n || Array.isArray(n))
          )
            throw new Error(
              '[ThemeProvider] Please return an object from your theme function, i.e. theme={() => ({})}!'
            )
          return n
        }
        if (
          'production' !== process.env.NODE_ENV &&
          (null == r || 'object' != typeof r || Array.isArray(r))
        )
          throw new Error(
            '[ThemeProvider] Please make your theme prop a plain object'
          )
        return _({}, e, r)
      })(e, r)
    })
  }),
  b = function (e) {
    var n = r(N)
    return (
      e.theme !== n && (n = O(n)(e.theme)),
      h(N.Provider, { value: n }, e.children)
    )
  }
function w(n) {
  var t = n.displayName || n.name || 'Component',
    o = e(function (e, t) {
      var o = r(N)
      return h(n, _({ theme: o, ref: t }, e))
    })
  return (o.displayName = 'WithTheme(' + t + ')'), c(o, n)
}
var k = '__EMOTION_TYPE_PLEASE_DO_NOT_USE__',
  A = '__EMOTION_LABEL_PLEASE_DO_NOT_USE__',
  D = function (e, r) {
    if (
      'production' !== process.env.NODE_ENV &&
      'string' == typeof r.css &&
      -1 !== r.css.indexOf(':')
    )
      throw new Error(
        "Strings are not allowed as css prop values, please wrap it in a css template literal from '@emotion/react' like this: css`" +
          r.css +
          '`'
      )
    var n = {}
    for (var t in r) d.call(r, t) && (n[t] = r[t])
    if (((n[k] = e), 'production' !== process.env.NODE_ENV)) {
      var o = new Error()
      if (o.stack) {
        var s = o.stack.match(
          /at (?:Object\.|Module\.|)(?:jsx|createEmotionProps).*\n\s+at (?:Object\.|)([A-Z][A-Za-z0-9$]+) /
        )
        s || (s = o.stack.match(/.*\n([A-Z][A-Za-z0-9$]+)@/)),
          s && (n[A] = s[1].replace(/\$/g, '-'))
      }
    }
    return n
  },
  x = E(function (e, n, o) {
    var s = e.css
    'string' == typeof s && void 0 !== n.registered[s] && (s = n.registered[s])
    var a = e[k],
      i = [s],
      c = ''
    'string' == typeof e.className
      ? (c = l(n.registered, i, e.className))
      : null != e.className && (c = e.className + ' ')
    var f = m(
      i,
      void 0,
      'function' == typeof s || Array.isArray(s) ? r(N) : void 0
    )
    if ('production' !== process.env.NODE_ENV && -1 === f.name.indexOf('-')) {
      var v = e[A]
      v && (f = m([f, 'label:' + v + ';']))
    }
    var y = u(n, f, 'string' == typeof a)
    c += n.key + '-' + f.name
    var E = {}
    for (var _ in e)
      !d.call(e, _) ||
        'css' === _ ||
        _ === k ||
        ('production' !== process.env.NODE_ENV && _ === A) ||
        (E[_] = e[_])
    ;(E.ref = o), (E.className = c)
    var g = t(a, E)
    if (!p && void 0 !== y) {
      for (var O, b = f.name, w = f.next; void 0 !== w; )
        (b += ' ' + w.name), (w = w.next)
      return h(
        Fragment,
        null,
        h(
          'style',
          (((O = {})['data-emotion'] = n.key + ' ' + b),
          (O.dangerouslySetInnerHTML = { __html: y }),
          (O.nonce = n.sheet.nonce),
          O)
        ),
        g
      )
    }
    return g
  })
'production' !== process.env.NODE_ENV &&
  (x.displayName = 'EmotionCssPropInternal')
var T = function (e, r) {
    var n = arguments
    if (null == r || !d.call(r, 'css')) return t.apply(void 0, n)
    var o = n.length,
      s = new Array(o)
    ;(s[0] = x), (s[1] = D(e, r))
    for (var a = 2; a < o; a++) s[a] = n[a]
    return t.apply(null, s)
  },
  P = !1,
  V = E(function (e, n) {
    'production' === process.env.NODE_ENV ||
      P ||
      (!e.className && !e.css) ||
      (console.error(
        "It looks like you're using the css prop on Global, did you mean to use the styles prop instead?"
      ),
      (P = !0))
    var t = e.styles,
      a = m(
        [t],
        void 0,
        'function' == typeof t || Array.isArray(t) ? r(N) : void 0
      )
    if (!p) {
      for (var i, c = a.name, l = a.styles, d = a.next; void 0 !== d; )
        (c += ' ' + d.name), (l += d.styles), (d = d.next)
      var v = !0 === n.compat,
        y = n.insert('', { name: c, styles: l }, n.sheet, v)
      return v
        ? null
        : h(
            'style',
            (((i = {})['data-emotion'] = n.key + '-global ' + c),
            (i.dangerouslySetInnerHTML = { __html: y }),
            (i.nonce = n.sheet.nonce),
            i)
          )
    }
    var E = o()
    return (
      s(
        function () {
          var e = n.key + '-global',
            r = new f({
              key: e,
              nonce: n.sheet.nonce,
              container: n.sheet.container,
              speedy: n.sheet.isSpeedy,
            }),
            t = document.querySelector(
              'style[data-emotion="' + e + ' ' + a.name + '"]'
            )
          return (
            n.sheet.tags.length && (r.before = n.sheet.tags[0]),
            null !== t && r.hydrate([t]),
            (E.current = r),
            function () {
              r.flush()
            }
          )
        },
        [n]
      ),
      s(
        function () {
          void 0 !== a.next && u(n, a.next, !0)
          var e = E.current
          e.tags.length &&
            ((e.before = e.tags[e.tags.length - 1].nextElementSibling),
            e.flush()),
            n.insert('', a, e, !1)
        },
        [n, a.name]
      ),
      null
    )
  })
function j() {
  return m([].slice.call(arguments))
}
'production' !== process.env.NODE_ENV && (V.displayName = 'EmotionGlobal')
var S = function () {
    var e = j.apply(void 0, [].slice.call(arguments)),
      r = 'animation-' + e.name
    return {
      name: r,
      styles: '@keyframes ' + r + '{' + e.styles + '}',
      anim: 1,
      toString: function () {
        return '_EMO_' + this.name + '_' + this.styles + '_EMO_'
      },
    }
  },
  M = function e(r) {
    for (var n = r.length, t = 0, o = ''; t < n; t++) {
      var s = r[t]
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
function I(e, r, n) {
  var t = [],
    o = l(e, t, n)
  return t.length < 2 ? n : o + r(t)
}
var L = E(function (e, n) {
  var t,
    o = '',
    s = '',
    a = !1,
    i = function () {
      if (a && 'production' !== process.env.NODE_ENV)
        throw new Error('css can only be used during render')
      var e = m([].slice.call(arguments), n.registered)
      if (p) u(n, e, !1)
      else {
        var r = u(n, e, !1)
        void 0 !== r && (o += r)
      }
      return p || (s += ' ' + e.name), n.key + '-' + e.name
    },
    c = {
      css: i,
      cx: function () {
        if (a && 'production' !== process.env.NODE_ENV)
          throw new Error('cx can only be used during render')
        return I(n.registered, i, M([].slice.call(arguments)))
      },
      theme: r(N),
    },
    l = e.children(c)
  return (
    (a = !0),
    p || 0 === o.length
      ? l
      : h(
          Fragment,
          null,
          h(
            'style',
            (((t = {})['data-emotion'] = n.key + ' ' + s.substring(1)),
            (t.dangerouslySetInnerHTML = { __html: o }),
            (t.nonce = n.sheet.nonce),
            t)
          ),
          l
        )
  )
})
if (
  ('production' !== process.env.NODE_ENV &&
    (L.displayName = 'EmotionClassNames'),
  'production' !== process.env.NODE_ENV)
) {
  var C = 'undefined' != typeof document,
    z = 'undefined' != typeof jest
  if (C && !z) {
    var H = C ? window : global,
      Z = '__EMOTION_REACT_' + '11.1.3'.split('.')[0] + '__'
    H[Z] &&
      console.warn(
        'You are loading @emotion/react when it is already loaded. Running multiple instances may cause problems. This can happen if multiple versions are used, or if multiple builds of the same version are used.'
      ),
      (H[Z] = !0)
  }
}
export {
  y as CacheProvider,
  L as ClassNames,
  V as Global,
  N as ThemeContext,
  b as ThemeProvider,
  T as createElement,
  j as css,
  T as jsx,
  S as keyframes,
  g as useTheme,
  E as withEmotionCache,
  w as withTheme,
}
//# sourceMappingURL=emotion-react.esm.js.map
