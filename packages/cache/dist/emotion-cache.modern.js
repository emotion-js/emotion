import { StyleSheet as e } from '@emotion/sheet'
import {
  dealloc as t,
  alloc as r,
  next as o,
  token as n,
  from as s,
  peek as l,
  delimit as a,
  identifier as i,
  position as c,
  stringify as u,
  COMMENT as p,
  rulesheet as d,
  middleware as h,
  serialize as m,
  compile as f,
  prefixer as y,
} from 'stylis'
import g from '@emotion/weak-memoize'
import v from '@emotion/memoize'
const E = new WeakMap()
let w = (e) => {
    if ('rule' !== e.type || !e.parent || !e.length) return
    let { value: u, parent: p } = e,
      d = e.column === p.column && e.line === p.line
    for (; 'rule' !== p.type; ) if (((p = p.parent), !p)) return
    if (1 === e.props.length && 58 !== u.charCodeAt(0) && !E.get(p)) return
    if (d) return
    E.set(e, !0)
    const h = [],
      m = ((e, u) =>
        t(
          ((e, t) => {
            let r = -1,
              u = 44
            do {
              switch (n(u)) {
                case 0:
                  38 === u && 12 === l() && (t[r] = 1), (e[r] += i(c - 1))
                  break
                case 2:
                  e[r] += a(u)
                  break
                case 4:
                  if (44 === u) {
                    ;(e[++r] = 58 === l() ? '&\f' : ''), (t[r] = e[r].length)
                    break
                  }
                default:
                  e[r] += s(u)
              }
            } while ((u = o()))
            return e
          })(r(e), u)
        ))(u, h),
      f = p.props
    for (let t = 0, r = 0; t < m.length; t++)
      for (let o = 0; o < f.length; o++, r++)
        e.props[r] = h[t] ? m[t].replace(/&\f/g, f[o]) : `${f[o]} ${m[t]}`
  },
  b = (e) => {
    if ('decl' === e.type) {
      var t = e.value
      108 === t.charCodeAt(0) &&
        98 === t.charCodeAt(2) &&
        ((e.return = ''), (e.value = ''))
    }
  },
  k = (e) => 105 === e.type.charCodeAt(1) && 64 === e.type.charCodeAt(0)
const N = (e) => {
  ;(e.type = ''),
    (e.value = ''),
    (e.return = ''),
    (e.children = ''),
    (e.props = '')
}
let A = (e, t, r) => {
    k(e) &&
      (e.parent
        ? (console.error(
            "`@import` rules can't be nested inside other rules. Please move it to the top level and put it before regular rules. Keep in mind that they can only be used within global styles."
          ),
          N(e))
        : ((e, t) => {
            for (let r = e - 1; r >= 0; r--) if (!k(t[r])) return !0
            return !1
          })(t, r) &&
          (console.error(
            "`@import` rules can't be after other rules. Please put your `@import` rules before your other rules."
          ),
          N(e)))
  },
  $ = 'undefined' != typeof document,
  O = $
    ? void 0
    : g(() =>
        v(() => {
          let e = {}
          return (t) => e[t]
        })
      )
const C = [y]
export default (t) => {
  let r = t.key
  if ('production' !== process.env.NODE_ENV && !r)
    throw new Error(
      "You have to configure `key` for your cache. Please make sure it's unique (and not equal to 'css') as it's used for linking styles to your cache.\nIf multiple caches share the same key they might \"fight\" for each other's style elements."
    )
  if ($ && 'css' === r) {
    const e = document.querySelectorAll('style[data-emotion]:not([data-s])')
    Array.prototype.forEach.call(e, (e) => {
      document.head.appendChild(e), e.setAttribute('data-s', '')
    })
  }
  const o = t.stylisPlugins || C
  if ('production' !== process.env.NODE_ENV && /[^a-z-]/.test(r))
    throw new Error(
      `Emotion key must only contain lower case alphabetical characters and - but "${r}" was passed`
    )
  let n,
    s = {}
  const l = []
  let a
  $ &&
    ((n = t.container || document.head),
    Array.prototype.forEach.call(
      document.querySelectorAll('style[data-emotion]'),
      (e) => {
        const t = e.getAttribute('data-emotion').split(' ')
        if (t[0] === r) {
          for (let e = 1; e < t.length; e++) s[t[e]] = !0
          l.push(e)
        }
      }
    ))
  const i = [w, b]
  if (
    ('production' !== process.env.NODE_ENV &&
      i.push(
        ((e) => (t, r, o) => {
          if ('rule' !== t.type) return
          const n = t.value.match(/(:first|:nth|:nth-last)-child/g)
          if (n && !0 !== e.compat) {
            const e = r > 0 ? o[r - 1] : null
            if (
              e &&
              ((e) =>
                !!e &&
                'comm' === e.type &&
                e.children.indexOf(
                  'emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason'
                ) > -1)((s = e.children).length ? s[s.length - 1] : null)
            )
              return
            n.forEach((e) => {
              console.error(
                `The pseudo class "${e}" is potentially unsafe when doing server-side rendering. Try changing it to "${
                  e.split('-child')[0]
                }-of-type".`
              )
            })
          }
          var s
        })({
          get compat() {
            return c.compat
          },
        }),
        A
      ),
    $)
  ) {
    let e
    const t = [
        u,
        'production' !== process.env.NODE_ENV
          ? (t) => {
              t.root ||
                (t.return
                  ? e.insert(t.return)
                  : t.value && t.type !== p && e.insert(`${t.value}{}`))
            }
          : d((t) => {
              e.insert(t)
            }),
      ],
      r = h(i.concat(o, t)),
      n = (e) => m(f(e), r)
    a = (t, r, o, s) => {
      ;(e = o),
        'production' !== process.env.NODE_ENV &&
          void 0 !== r.map &&
          (e = {
            insert: (e) => {
              o.insert(e + r.map)
            },
          }),
        n(t ? `${t}{${r.styles}}` : r.styles),
        s && (c.inserted[r.name] = !0)
    }
  } else {
    const e = h(i.concat(o, [u])),
      t = (t) => m(f(t), e)
    let n = O(o)(r),
      s = (e, r) => {
        let o = r.name
        return (
          void 0 === n[o] && (n[o] = t(e ? `${e}{${r.styles}}` : r.styles)),
          n[o]
        )
      }
    a = (e, t, r, o) => {
      let n = t.name,
        l = s(e, t)
      return void 0 === c.compat
        ? (o && (c.inserted[n] = !0),
          'development' === process.env.NODE_ENV && void 0 !== t.map
            ? l + t.map
            : l)
        : o
        ? void (c.inserted[n] = l)
        : l
    }
  }
  const c = {
    key: r,
    sheet: new e({
      key: r,
      container: n,
      nonce: t.nonce,
      speedy: t.speedy,
      prepend: t.prepend,
    }),
    nonce: t.nonce,
    inserted: s,
    registered: {},
    insert: a,
  }
  return c.sheet.hydrate(l), c
}
//# sourceMappingURL=emotion-cache.modern.js.map
