import e from '@emotion/hash'
import o from '@emotion/unitless'
import t from '@emotion/memoize'
const n =
  "You have illegal escape sequence in your template literal, most likely inside content's property value.\nBecause you write your CSS inside a JavaScript string you actually have to do double escaping, so for example \"content: '\\00d7';\" should become \"content: '\\\\00d7';\".\nYou can read more about this here:\nhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences"
let r = /[A-Z]|^ms/g,
  s = /_EMO_([^_]+?)_([^]*?)_EMO_/g
const i = (e) => 45 === e.charCodeAt(1),
  a = (e) => null != e && 'boolean' != typeof e,
  l = t((e) => (i(e) ? e : e.replace(r, '-$&').toLowerCase()))
let c = (e, t) => {
  switch (e) {
    case 'animation':
    case 'animationName':
      if ('string' == typeof t)
        return t.replace(
          s,
          (e, o, t) => ((d = { name: o, styles: t, next: d }), o)
        )
  }
  return 1 === o[e] || i(e) || 'number' != typeof t || 0 === t ? t : t + 'px'
}
if ('production' !== process.env.NODE_ENV) {
  let e = /(attr|calc|counters?|url)\(/,
    o = [
      'normal',
      'none',
      'counter',
      'open-quote',
      'close-quote',
      'no-open-quote',
      'no-close-quote',
      'initial',
      'inherit',
      'unset',
    ],
    t = c,
    n = /^-ms-/,
    r = /-(.)/g,
    s = {}
  c = (a, l) => {
    if (
      'content' === a &&
      ('string' != typeof l ||
        (-1 === o.indexOf(l) &&
          !e.test(l) &&
          (l.charAt(0) !== l.charAt(l.length - 1) ||
            ('"' !== l.charAt(0) && "'" !== l.charAt(0)))))
    )
      throw new Error(
        `You seem to be using a value for 'content' without quotes, try replacing it with \`content: '"${l}"'\``
      )
    const c = t(a, l)
    return (
      '' === c ||
        i(a) ||
        -1 === a.indexOf('-') ||
        void 0 !== s[a] ||
        ((s[a] = !0),
        console.error(
          `Using kebab-case for css properties in objects is not supported. Did you mean ${a
            .replace(n, 'ms-')
            .replace(r, (e, o) => o.toUpperCase())}?`
        )),
      c
    )
  }
}
function p(e, o, t) {
  if (null == t) return ''
  if (void 0 !== t.__emotion_styles) {
    if (
      'production' !== process.env.NODE_ENV &&
      'NO_COMPONENT_SELECTOR' === t.toString()
    )
      throw new Error(
        'Component selectors can only be used in conjunction with @emotion/babel-plugin.'
      )
    return t
  }
  switch (typeof t) {
    case 'boolean':
      return ''
    case 'object':
      if (1 === t.anim)
        return (d = { name: t.name, styles: t.styles, next: d }), t.name
      if (void 0 !== t.styles) {
        let e = t.next
        if (void 0 !== e)
          for (; void 0 !== e; )
            (d = { name: e.name, styles: e.styles, next: d }), (e = e.next)
        let o = `${t.styles};`
        return (
          'production' !== process.env.NODE_ENV &&
            void 0 !== t.map &&
            (o += t.map),
          o
        )
      }
      return (function (e, o, t) {
        let n = ''
        if (Array.isArray(t))
          for (let r = 0; r < t.length; r++) n += `${p(e, o, t[r])};`
        else
          for (let r in t) {
            let s = t[r]
            if ('object' != typeof s)
              null != o && void 0 !== o[s]
                ? (n += `${r}{${o[s]}}`)
                : a(s) && (n += `${l(r)}:${c(r, s)};`)
            else {
              if (
                'NO_COMPONENT_SELECTOR' === r &&
                'production' !== process.env.NODE_ENV
              )
                throw new Error(
                  'Component selectors can only be used in conjunction with @emotion/babel-plugin.'
                )
              if (
                !Array.isArray(s) ||
                'string' != typeof s[0] ||
                (null != o && void 0 !== o[s[0]])
              ) {
                const t = p(e, o, s)
                switch (r) {
                  case 'animation':
                  case 'animationName':
                    n += `${l(r)}:${t};`
                    break
                  default:
                    'production' !== process.env.NODE_ENV &&
                      'undefined' === r &&
                      console.error(
                        "You have passed in falsy value as style object's key (can happen when in example you pass unexported component as computed key)."
                      ),
                      (n += `${r}{${t}}`)
                }
              } else
                for (let e = 0; e < s.length; e++)
                  a(s[e]) && (n += `${l(r)}:${c(r, s[e])};`)
            }
          }
        return n
      })(e, o, t)
    case 'function':
      if (void 0 !== e) {
        let n = d,
          r = t(e)
        return (d = n), p(e, o, r)
      }
      'production' !== process.env.NODE_ENV &&
        console.error(
          "Functions that are interpolated in css calls will be stringified.\nIf you want to have a css call based on props, create a function that returns a css call like this\nlet dynamicStyle = (props) => css`color: ${props.color}`\nIt can be called directly with props or interpolated in a styled call like this\nlet SomeComponent = styled('div')`${dynamicStyle}`"
        )
      break
    case 'string':
      if ('production' !== process.env.NODE_ENV) {
        const e = [],
          o = t.replace(s, (o, t, n) => {
            const r = `animation${e.length}`
            return (
              e.push(
                `const ${r} = keyframes\`${n.replace(
                  /^@keyframes animation-\w+/,
                  ''
                )}\``
              ),
              `\${${r}}`
            )
          })
        e.length &&
          console.error(
            '`keyframes` output got interpolated into plain string, please wrap it with `css`.\n\nInstead of doing this:\n\n' +
              [...e, `\`${o}\``].join('\n') +
              '\n\nYou should wrap it with `css` like this:\n\n' +
              `css\`${o}\``
          )
      }
  }
  if (null == o) return t
  const n = o[t]
  return void 0 !== n ? n : t
}
let u,
  d,
  m = /label:\s*([^\s;\n{]+)\s*;/g
'production' !== process.env.NODE_ENV &&
  (u = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//g)
const f = function (o, t, r) {
  if (
    1 === o.length &&
    'object' == typeof o[0] &&
    null !== o[0] &&
    void 0 !== o[0].styles
  )
    return o[0]
  let s = !0,
    i = ''
  d = void 0
  let a,
    l = o[0]
  null == l || void 0 === l.raw
    ? ((s = !1), (i += p(r, t, l)))
    : ('production' !== process.env.NODE_ENV &&
        void 0 === l[0] &&
        console.error(n),
      (i += l[0]))
  for (let e = 1; e < o.length; e++)
    (i += p(r, t, o[e])),
      s &&
        ('production' !== process.env.NODE_ENV &&
          void 0 === l[e] &&
          console.error(n),
        (i += l[e]))
  'production' !== process.env.NODE_ENV &&
    (i = i.replace(u, (e) => ((a = e), ''))),
    (m.lastIndex = 0)
  let c,
    f = ''
  for (; null !== (c = m.exec(i)); ) f += '-' + c[1]
  let y = e(i) + f
  return 'production' !== process.env.NODE_ENV
    ? {
        name: y,
        styles: i,
        map: a,
        next: d,
        toString: () =>
          "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).",
      }
    : { name: y, styles: i, next: d }
}
export { f as serializeStyles }
//# sourceMappingURL=emotion-serialize.modern.js.map
