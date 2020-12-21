import e from '@emotion/css-prettifier'
import t from 'chalk'
import { compile as n } from 'stylis'
import { compare as r } from 'specificity'
function o() {
  return (o =
    Object.assign ||
    function (e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t]
        for (var r in n)
          Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
      }
      return e
    }).apply(this, arguments)
}
function c(e, t) {
  return `emotion-${t}`
}
const s = /^e[a-zA-Z0-9]+[0-9]+$/,
  i = 'undefined' != typeof document
function l(e, t) {
  return [].concat(...e.map(t))
}
function a(e, t) {
  return t ? e.concat(t.split(' ')) : e
}
function u(e) {
  return e.prop('className') && 'string' == typeof e.type()
}
function f(e) {
  return (
    e.$$typeof === Symbol.for('react.test.json') ||
    e.$$typeof === Symbol.for('react.element')
  )
}
const p = /^((HTML|SVG)\w*)?Element$/
function m(e) {
  return e.reduce(
    (e, t) =>
      'function' == typeof t.findWhere
        ? (function (e, t) {
            return a(
              e,
              (function (e) {
                return (e && e.prop('className')) || ''
              })(
                (function (e) {
                  const t = e.findWhere(u)
                  return t.length ? t.first() : null
                })(
                  (function (e) {
                    return (
                      'function' == typeof e.dive && 'string' != typeof e.type()
                    )
                  })(t)
                    ? t.dive()
                    : t
                )
              )
            )
          })(e, t)
        : '[cheerio object]' === t.cheerio
        ? (function (e, t) {
            return a(e, t.attr('class'))
          })(e, t)
        : f(t)
        ? (function (e, { props: t = {} }) {
            return a(e, t.className || t.class)
          })(e, t)
        : (function (e, t) {
            return a(e, t.getAttribute('class'))
          })(e, t),
    []
  )
}
const d = /^@keyframes\s+(animation-[^{\s]+)+/,
  y = /\/\*[\s\S]*?\*\//g,
  h = (e) => {
    const t = e.textContent
    return t
      ? [t]
      : e.sheet
      ? [].slice.call(e.sheet.cssRules).map((e) => e.cssText)
      : []
  }
function g(e, t) {
  if (!e.length) return ''
  const n = E(t)
  if (!n.length) return ''
  const r = e.find((e) => /^e[a-z0-9]+$/.test(e)),
    o = `(${n.join('|')})-`,
    c = new RegExp(r ? `^(${o}|${r})` : `^${o}`),
    s = e.filter((e) => c.test(e))
  if (!s.length) return ''
  const i = new RegExp('\\.(?:' + s.map((e) => `(${e})`).join('|') + ')'),
    a = l(t, h)
  let u = a
    .map((e) => {
      const t = e.match(i)
      return t
        ? [
            e,
            (function (e, t, n) {
              for (let t = 1; t < e.length; t++) if (n(e[t])) return t
              return -1
            })(t, 0, Boolean),
          ]
        : null
    })
    .filter(Boolean)
    .sort(([e, t], [n, r]) => t - r)
    .map(([e]) => e)
    .join('')
  const f = ((e) =>
      e.reduce((e, t) => {
        const n = t.match(d)
        if (null !== n) {
          const r = n[1]
          void 0 === e[r] && (e[r] = ''), (e[r] += t)
        }
        return e
      }, {}))(a),
    p = Object.keys(f)
  let m = ''
  if (p.length) {
    const e = new RegExp(p.join('|'), 'g'),
      t = {}
    let n = 0
    ;(u = u.replace(
      e,
      (e) => (
        void 0 === t[e] && ((t[e] = 'animation-' + n++), (m += f[e])), t[e]
      )
    )),
      (m = m.replace(e, (e) => t[e]))
  }
  return (m + u).replace(y, '')
}
function _() {
  if (!i)
    throw new Error(
      'jest-emotion requires jsdom. See https://jestjs.io/docs/en/configuration#testenvironment-string for more information.'
    )
  return Array.from(document.querySelectorAll('style[data-emotion]'))
}
function E(e) {
  var t
  return ((t = e.map((e) => e.getAttribute('data-emotion'))),
  Array.from(new Set(t))).filter(Boolean)
}
function $(e, t) {
  return e.some((e) => t.includes(e))
}
function O(e, t = []) {
  if (Array.isArray(e)) {
    for (let n of e) O(n, t)
    return t
  }
  if (('object' == typeof e && t.push(e), e.children))
    for (let n of e.children) O(n, t)
  return t
}
function j(e, t) {
  return Object.defineProperties(e, Object.getOwnPropertyDescriptors(t))
}
function S(e, t) {
  if (Array.isArray(e)) return e.map((e) => S(e, t))
  const n = t(e)
  return n !== e && n.children
    ? j(n, { children: l(S(n.children, t), (e) => e) })
    : n
}
function b(e = {}) {
  const t = (function (e, t) {
    if (null == e) return {}
    var n,
      r,
      o = {},
      c = Object.keys(e)
    for (r = 0; r < c.length; r++) t.indexOf((n = c[r])) >= 0 || (o[n] = e[n])
    return o
  })(e, [
    'css',
    '__EMOTION_TYPE_PLEASE_DO_NOT_USE__',
    '__EMOTION_LABEL_PLEASE_DO_NOT_USE__',
  ])
  return (t.css = 'unknown styles'), t
}
function v(e, t) {
  if (Array.isArray(e)) for (const n of e) v(n, t)
  else {
    if (e.children) for (const n of e.children) v(n, t)
    if (e.props) {
      const { className: n } = e.props
      n ? $(n.split(' '), t) && delete e.props.css : delete e.props.className
    }
  }
}
function N({ classNameReplacer: t, DOMElements: n = !0 } = {}) {
  const r = new WeakSet()
  return {
    test: (e) =>
      e &&
      !((e) => r.has(e))(e) &&
      (f(e) ||
        (n &&
          (function (e) {
            return (
              1 === e.nodeType &&
              e.constructor &&
              e.constructor.name &&
              p.test(e.constructor.name)
            )
          })(e))),
    serialize: function (n, i, a, u, p, d) {
      const y = _(),
        h = E(y),
        N = S(
          n,
          ((e, t) => (t) => {
            if ((n = t) !== Object(n)) return t
            var n, r
            if (
              (r = t).$$typeof === Symbol.for('react.test.json') &&
              'EmotionCssPropInternal' === r.type
            ) {
              const n = l((t.props.css.name || '').split(' '), (t) =>
                e.map((e) => `${e}-${t}`)
              )
              if (
                $(
                  n,
                  l(t.children || [], ({ props: e = {} }) =>
                    (e.className || '').split(' ')
                  ).filter(Boolean)
                )
              )
                return t.children
              {
                const e = [t.props.className]
                    .concat(n)
                    .filter(Boolean)
                    .join(' '),
                  r = t.props.__EMOTION_TYPE_PLEASE_DO_NOT_USE__,
                  c = 'string' == typeof r ? r : r.name
                return o({}, t, {
                  props: b(o({}, t.props, { className: e })),
                  type: c,
                })
              }
            }
            return (function (e) {
              return (
                e.$$typeof === Symbol.for('react.element') &&
                e.type.$$typeof === Symbol.for('react.forward_ref') &&
                'EmotionCssPropInternal' === e.type.displayName
              )
            })(t)
              ? o({}, t, {
                  props: b(t.props),
                  type: t.props.__EMOTION_TYPE_PLEASE_DO_NOT_USE__,
                })
              : f(t)
              ? j({}, t)
              : t
          })(h)
        ),
        A = O(N),
        w = m(A),
        T = (function (t, n, r) {
          return e(g(t, n), r)
        })(w, y, i.indent)
      v(N, w), A.forEach(r.add, r)
      const P = d(N, i, a, u, p)
      return (
        A.forEach(r.delete, r),
        ((e, t, n, r, o = c) => {
          let i = 0,
            l = new RegExp(`^(${r.join('|')})-`)
          return e.reduce((e, t) => {
            if (l.test(t) || s.test(t)) {
              const n = new RegExp(
                t.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'),
                'g'
              )
              return e.replace(n, o(t, i++))
            }
            return e
          }, `${t}${t ? '\n\n' : ''}${n}`)
        })(w, T, P, h, t)
      )
    },
  }
}
let A = {
  toHaveStyleRule: function (e, o, c, s = {}) {
    const { target: i, media: a } = s,
      u = m([e]),
      f = g(u, _())
    let p = n(f)
    a &&
      (p = (function (e, t) {
        return l(
          e.filter(
            (e) =>
              '@media' === e.type &&
              e.value.replace(/\s/g, '').includes(t.replace(/\s/g, ''))
          ),
          (e) => e.children
        )
      })(p, a))
    const d = p
      .filter(
        (e) =>
          'rule' === e.type &&
          (function (e, t, n) {
            return t.some((t) => {
              if (!n) {
                const n =
                  (r = t.split(' ')).length > 0 ? r[r.length - 1] : void 0
                return !!n && e.includes(n.slice(1))
              }
              var r
              return n instanceof RegExp ? n.test(t) : t.includes(n)
            })
          })(u, e.props, i)
      )
      .reduce((e, t) => {
        const n = (function (e, t) {
          for (let t = e.length - 1; t >= 0; t--)
            if ('decl' === (n = e[t]).type && n.props === o) return e[t]
          var n
        })(t.children)
        return n
          ? e.concat(t.props.map((e) => ({ selector: e, declaration: n })))
          : e
      }, [])
      .sort(({ selector: e }, { selector: t }) => r(e, t))
      .pop()
    if (!d) return { pass: !1, message: () => `Property not found: ${o}` }
    const { declaration: y } = d,
      h = (function (e, t) {
        return t instanceof RegExp
          ? t.test(e.children)
          : (n = t) &&
            '[object Function]' ===
              Object.prototype.toString.apply(n.asymmetricMatch)
          ? t.asymmetricMatch(e.children)
          : t === e.children
        var n
      })(y, c)
    return {
      pass: h,
      message: () =>
        `Expected ${o}${h ? ' not ' : ' '}to match:\n  ${t.green(
          c
        )}\nReceived:\n  ${t.red(y.children)}`,
    }
  },
}
export { N as createSerializer, A as matchers }
//# sourceMappingURL=emotion-jest.modern.js.map
