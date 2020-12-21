import {
  forwardRef as e,
  useContext as t,
  createContext as n,
  createElement as o,
  useRef as r,
  useLayoutEffect as s,
} from 'react'
import l from '@emotion/cache'
import a from '@emotion/weak-memoize'
import i from 'hoist-non-react-statics'
import { getRegisteredStyles as c, insertStyles as u } from '@emotion/utils'
import { serializeStyles as m } from '@emotion/serialize'
import { StyleSheet as p } from '@emotion/sheet'
let d = 'undefined' != typeof document
const f = Object.prototype.hasOwnProperty
let y = n('undefined' != typeof HTMLElement ? l({ key: 'css' }) : null),
  E = y.Provider,
  _ = function (n) {
    return e((e, o) => {
      let r = t(y)
      return n(e, r, o)
    })
  }
function N() {
  return (N =
    Object.assign ||
    function (e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t]
        for (var o in n)
          Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o])
      }
      return e
    }).apply(this, arguments)
}
d ||
  (_ = function (e) {
    return (n) => {
      let o = t(y)
      return null === o
        ? ((o = l({ key: 'css' })), h(y.Provider, { value: o }, e(n, o)))
        : e(n, o)
    }
  })
const g = n({}),
  v = () => t(g)
let O = a((e) =>
  a((t) =>
    ((e, t) => {
      if ('function' == typeof t) {
        const n = t(e)
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
        (null == t || 'object' != typeof t || Array.isArray(t))
      )
        throw new Error(
          '[ThemeProvider] Please make your theme prop a plain object'
        )
      return N({}, e, t)
    })(e, t)
  )
)
const b = (e) => {
  let n = t(g)
  return (
    e.theme !== n && (n = O(n)(e.theme)),
    h(g.Provider, { value: n }, e.children)
  )
}
function $(n) {
  const o = n.displayName || n.name || 'Component'
  let r = e((e, o) => {
    let r = t(g)
    return h(n, N({ theme: r, ref: o }, e))
  })
  return (r.displayName = `WithTheme(${o})`), i(r, n)
}
let w = '__EMOTION_TYPE_PLEASE_DO_NOT_USE__',
  k = '__EMOTION_LABEL_PLEASE_DO_NOT_USE__'
const A = (e, t) => {
  if (
    'production' !== process.env.NODE_ENV &&
    'string' == typeof t.css &&
    -1 !== t.css.indexOf(':')
  )
    throw new Error(
      `Strings are not allowed as css prop values, please wrap it in a css template literal from '@emotion/react' like this: css\`${t.css}\``
    )
  let n = {}
  for (let e in t) f.call(t, e) && (n[e] = t[e])
  if (((n[w] = e), 'production' !== process.env.NODE_ENV)) {
    const e = new Error()
    if (e.stack) {
      let t = e.stack.match(
        /at (?:Object\.|Module\.|)(?:jsx|createEmotionProps).*\n\s+at (?:Object\.|)([A-Z][A-Za-z0-9$]+) /
      )
      t || (t = e.stack.match(/.*\n([A-Z][A-Za-z0-9$]+)@/)),
        t && (n[k] = t[1].replace(/\$/g, '-'))
    }
  }
  return n
}
let D = _((e, n, r) => {
  let s = e.css
  'string' == typeof s && void 0 !== n.registered[s] && (s = n.registered[s])
  let l = e[w],
    a = [s],
    i = ''
  'string' == typeof e.className
    ? (i = c(n.registered, a, e.className))
    : null != e.className && (i = `${e.className} `)
  let p = m(
    a,
    void 0,
    'function' == typeof s || Array.isArray(s) ? t(g) : void 0
  )
  if ('production' !== process.env.NODE_ENV && -1 === p.name.indexOf('-')) {
    let t = e[k]
    t && (p = m([p, 'label:' + t + ';']))
  }
  const y = u(n, p, 'string' == typeof l)
  i += `${n.key}-${p.name}`
  const E = {}
  for (let t in e)
    !f.call(e, t) ||
      'css' === t ||
      t === w ||
      ('production' !== process.env.NODE_ENV && t === k) ||
      (E[t] = e[t])
  ;(E.ref = r), (E.className = i)
  const _ = o(l, E)
  if (!d && void 0 !== y) {
    let e = p.name,
      t = p.next
    for (; void 0 !== t; ) (e += ' ' + t.name), (t = t.next)
    return h(
      Fragment,
      null,
      h('style', {
        'data-emotion': `${n.key} ${e}`,
        dangerouslySetInnerHTML: { __html: y },
        nonce: n.sheet.nonce,
      }),
      _
    )
  }
  return _
})
'production' !== process.env.NODE_ENV &&
  (D.displayName = 'EmotionCssPropInternal')
const x = function (e, t) {
  let n = arguments
  if (null == t || !f.call(t, 'css')) return o.apply(void 0, n)
  let r = n.length,
    s = new Array(r)
  ;(s[0] = D), (s[1] = A(e, t))
  for (let e = 2; e < r; e++) s[e] = n[e]
  return o.apply(null, s)
}
let T = !1,
  P = _((e, n) => {
    'production' === process.env.NODE_ENV ||
      T ||
      (!e.className && !e.css) ||
      (console.error(
        "It looks like you're using the css prop on Global, did you mean to use the styles prop instead?"
      ),
      (T = !0))
    let o = e.styles,
      l = m(
        [o],
        void 0,
        'function' == typeof o || Array.isArray(o) ? t(g) : void 0
      )
    if (!d) {
      let e = l.name,
        t = l.styles,
        o = l.next
      for (; void 0 !== o; ) (e += ' ' + o.name), (t += o.styles), (o = o.next)
      let r = !0 === n.compat,
        s = n.insert('', { name: e, styles: t }, n.sheet, r)
      return r
        ? null
        : h('style', {
            'data-emotion': `${n.key}-global ${e}`,
            dangerouslySetInnerHTML: { __html: s },
            nonce: n.sheet.nonce,
          })
    }
    let a = r()
    return (
      s(() => {
        const e = `${n.key}-global`
        let t = new p({
            key: e,
            nonce: n.sheet.nonce,
            container: n.sheet.container,
            speedy: n.sheet.isSpeedy,
          }),
          o = document.querySelector(`style[data-emotion="${e} ${l.name}"]`)
        return (
          n.sheet.tags.length && (t.before = n.sheet.tags[0]),
          null !== o && t.hydrate([o]),
          (a.current = t),
          () => {
            t.flush()
          }
        )
      }, [n]),
      s(() => {
        void 0 !== l.next && u(n, l.next, !0)
        let e = a.current
        e.tags.length &&
          ((e.before = e.tags[e.tags.length - 1].nextElementSibling),
          e.flush()),
          n.insert('', l, e, !1)
      }, [n, l.name]),
      null
    )
  })
function V(...e) {
  return m(e)
}
'production' !== process.env.NODE_ENV && (P.displayName = 'EmotionGlobal')
const j = (...e) => {
  let t = V(...e)
  const n = `animation-${t.name}`
  return {
    name: n,
    styles: `@keyframes ${n}{${t.styles}}`,
    anim: 1,
    toString() {
      return `_EMO_${this.name}_${this.styles}_EMO_`
    },
  }
}
let S = (e) => {
  let t = e.length,
    n = 0,
    o = ''
  for (; n < t; n++) {
    let t,
      r = e[n]
    if (null != r) {
      switch (typeof r) {
        case 'boolean':
          break
        case 'object':
          if (Array.isArray(r)) t = S(r)
          else {
            'production' !== process.env.NODE_ENV &&
              void 0 !== r.styles &&
              void 0 !== r.name &&
              console.error(
                'You have passed styles created with `css` from `@emotion/react` package to the `cx`.\n`cx` is meant to compose class names (strings) so you should convert those styles to a class name by passing them to the `css` received from <ClassNames/> component.'
              ),
              (t = '')
            for (const e in r) r[e] && e && (t && (t += ' '), (t += e))
          }
          break
        default:
          t = r
      }
      t && (o && (o += ' '), (o += t))
    }
  }
  return o
}
const M = _((e, n) => {
  let o = '',
    r = '',
    s = !1,
    l = (...e) => {
      if (s && 'production' !== process.env.NODE_ENV)
        throw new Error('css can only be used during render')
      let t = m(e, n.registered)
      if (d) u(n, t, !1)
      else {
        let e = u(n, t, !1)
        void 0 !== e && (o += e)
      }
      return d || (r += ` ${t.name}`), `${n.key}-${t.name}`
    },
    a = {
      css: l,
      cx: (...e) => {
        if (s && 'production' !== process.env.NODE_ENV)
          throw new Error('cx can only be used during render')
        return (function (e, t, n) {
          const o = [],
            r = c(e, o, n)
          return o.length < 2 ? n : r + t(o)
        })(n.registered, l, S(e))
      },
      theme: t(g),
    },
    i = e.children(a)
  return (
    (s = !0),
    d || 0 === o.length
      ? i
      : h(
          Fragment,
          null,
          h('style', {
            'data-emotion': `${n.key} ${r.substring(1)}`,
            dangerouslySetInnerHTML: { __html: o },
            nonce: n.sheet.nonce,
          }),
          i
        )
  )
})
if (
  ('production' !== process.env.NODE_ENV &&
    (M.displayName = 'EmotionClassNames'),
  'production' !== process.env.NODE_ENV)
) {
  const e = 'undefined' != typeof document,
    t = 'undefined' != typeof jest
  if (e && !t) {
    const t = e ? window : global,
      n = `__EMOTION_REACT_${'11.1.3'.split('.')[0]}__`
    t[n] &&
      console.warn(
        'You are loading @emotion/react when it is already loaded. Running multiple instances may cause problems. This can happen if multiple versions are used, or if multiple builds of the same version are used.'
      ),
      (t[n] = !0)
  }
}
export {
  E as CacheProvider,
  M as ClassNames,
  P as Global,
  g as ThemeContext,
  b as ThemeProvider,
  x as createElement,
  V as css,
  x as jsx,
  j as keyframes,
  v as useTheme,
  _ as withEmotionCache,
  $ as withTheme,
}
//# sourceMappingURL=emotion-react.modern.js.map
