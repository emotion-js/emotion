import e from 'through'
import t from 'html-tokenize'
import n from 'multipipe'
import { cache as r } from '@emotion/css'
const o = (e) => (t) => {
  let n,
    r = new RegExp(`${e.key}-([a-zA-Z0-9-_]+)`, 'gm'),
    o = { html: t, ids: [], css: '' },
    i = {}
  for (; null !== (n = r.exec(t)); ) void 0 === i[n[1]] && (i[n[1]] = !0)
  return (
    (o.ids = Object.keys(e.inserted).filter((t) => {
      if (
        (void 0 !== i[t] || void 0 === e.registered[`${e.key}-${t}`]) &&
        !0 !== e.inserted[t]
      )
        return (o.css += e.inserted[t]), !0
    })),
    o
  )
}
function i(e, t, n, r) {
  return `<style data-emotion="${e} ${t.substring(1)}"${r}>${n}</style>`
}
const s = (e, t) => (n) => {
    const { inserted: r, key: o, registered: s } = e,
      c = new RegExp(`<|${o}-([a-zA-Z0-9-_]+)`, 'gm'),
      d = {}
    let l = '',
      u = '',
      m = ''
    for (const e in r)
      if (r.hasOwnProperty(e)) {
        const t = r[e],
          n = `${o}-${e}`
        !0 !== t && void 0 === s[n] && ((m += t), (u += ` ${e}`))
      }
    '' !== m && (l = i(o, u, m, t))
    let $,
      f = '',
      y = '',
      a = 0
    for (; null !== ($ = c.exec(n)); ) {
      if ('<' === $[0]) {
        '' !== f && ((l += i(o, f, y, t)), (f = ''), (y = '')),
          (l += n.substring(a, $.index)),
          (a = $.index)
        continue
      }
      const e = $[1],
        s = r[e]
      !0 === s ||
        void 0 === s ||
        d[e] ||
        ((d[e] = !0), (y += s), (f += ` ${e}`))
    }
    return (l += n.substring(a)), l
  },
  c = (r, o) => () => {
    let i = {}
    const s = t(),
      c = e(
        function (e) {
          let [t, n] = e
          if ('open' === t) {
            let e,
              t = '',
              s = {},
              c = n.toString(),
              d = new RegExp(`${r.key}-([a-zA-Z0-9-_]+)`, 'gm')
            for (; null !== (e = d.exec(c)); )
              null !== e && void 0 === i[e[1]] && (s[e[1]] = !0)
            Object.keys(r.inserted).forEach((e) => {
              !0 !== r.inserted[e] &&
                void 0 === i[e] &&
                (!0 === s[e] ||
                  (void 0 === r.registered[`${r.key}-${e}`] && (s[e] = !0))) &&
                ((i[e] = !0), (t += r.inserted[e]))
            }),
              '' !== t &&
                this.queue(
                  `<style data-emotion="${r.key} ${Object.keys(s).join(
                    ' '
                  )}"${o}>${t}</style>`
                )
          }
          this.queue(n)
        },
        function () {
          this.queue(null)
        }
      )
    return n(s, c)
  },
  {
    extractCritical: d,
    renderStylesToString: l,
    renderStylesToNodeStream: u,
  } = (function (e) {
    !0 !== e.compat && (e.compat = !0)
    const t = void 0 !== e.nonce ? ` nonce="${e.nonce}"` : ''
    return {
      extractCritical: o(e),
      renderStylesToString: s(e, t),
      renderStylesToNodeStream: c(e, t),
    }
  })(r)
export {
  d as extractCritical,
  u as renderStylesToNodeStream,
  l as renderStylesToString,
}
//# sourceMappingURL=emotion-server.modern.js.map
