import e from '@emotion/cache'
import { serializeStyles as t } from '@emotion/serialize'
import { getRegisteredStyles as r, insertStyles as s } from '@emotion/utils'
function i(e, t) {
  if (void 0 === e.inserted[t.name]) return e.insert('', t, e.sheet, !0)
}
function n(e, t, s) {
  const i = [],
    n = r(e, i, s)
  return i.length < 2 ? s : n + t(i)
}
let o = (e) => {
  let t = ''
  for (let r = 0; r < e.length; r++) {
    let s,
      i = e[r]
    if (null != i) {
      switch (typeof i) {
        case 'boolean':
          break
        case 'object':
          if (Array.isArray(i)) s = o(i)
          else {
            s = ''
            for (const e in i) i[e] && e && (s && (s += ' '), (s += e))
          }
          break
        default:
          s = i
      }
      s && (t && (t += ' '), (t += s))
    }
  }
  return t
}
const {
  flush: l,
  hydrate: a,
  cx: c,
  merge: d,
  getRegisteredStyles: m,
  injectGlobal: f,
  keyframes: h,
  css: u,
  sheet: g,
  cache: y,
} = ((l) => {
  let a = e({ key: 'css' })
  ;(a.sheet.speedy = function (e) {
    if ('production' !== process.env.NODE_ENV && 0 !== this.ctr)
      throw new Error('speedy must be changed before any rules are inserted')
    this.isSpeedy = e
  }),
    (a.compat = !0)
  let c = (...e) => {
    let r = t(e, a.registered, void 0)
    return s(a, r, !1), `${a.key}-${r.name}`
  }
  return {
    css: c,
    cx: (...e) => n(a.registered, c, o(e)),
    injectGlobal: (...e) => {
      let r = t(e, a.registered)
      i(a, r)
    },
    keyframes: (...e) => {
      let r = t(e, a.registered),
        s = `animation-${r.name}`
      return i(a, { name: r.name, styles: `@keyframes ${s}{${r.styles}}` }), s
    },
    hydrate(e) {
      e.forEach((e) => {
        a.inserted[e] = !0
      })
    },
    flush() {
      ;(a.registered = {}), (a.inserted = {}), a.sheet.flush()
    },
    sheet: a.sheet,
    cache: a,
    getRegisteredStyles: r.bind(null, a.registered),
    merge: n.bind(null, a.registered, c),
  }
})()
export {
  y as cache,
  u as css,
  c as cx,
  l as flush,
  m as getRegisteredStyles,
  a as hydrate,
  f as injectGlobal,
  h as keyframes,
  d as merge,
  g as sheet,
}
//# sourceMappingURL=emotion-css.modern.js.map
