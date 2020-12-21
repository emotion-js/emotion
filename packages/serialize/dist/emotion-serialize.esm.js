import e from '@emotion/hash'
import n from '@emotion/unitless'
import o from '@emotion/memoize'
var t =
    "You have illegal escape sequence in your template literal, most likely inside content's property value.\nBecause you write your CSS inside a JavaScript string you actually have to do double escaping, so for example \"content: '\\00d7';\" should become \"content: '\\\\00d7';\".\nYou can read more about this here:\nhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences",
  r = /[A-Z]|^ms/g,
  s = /_EMO_([^_]+?)_([^]*?)_EMO_/g,
  i = function (e) {
    return 45 === e.charCodeAt(1)
  },
  a = function (e) {
    return null != e && 'boolean' != typeof e
  },
  c = o(function (e) {
    return i(e) ? e : e.replace(r, '-$&').toLowerCase()
  }),
  l = function (e, o) {
    switch (e) {
      case 'animation':
      case 'animationName':
        if ('string' == typeof o)
          return o.replace(s, function (e, n, o) {
            return (g = { name: n, styles: o, next: g }), n
          })
    }
    return 1 === n[e] || i(e) || 'number' != typeof o || 0 === o ? o : o + 'px'
  }
if ('production' !== process.env.NODE_ENV) {
  var u = /(attr|calc|counters?|url)\(/,
    p = [
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
    d = l,
    f = /^-ms-/,
    v = /-(.)/g,
    m = {}
  l = function (e, n) {
    if (
      'content' === e &&
      ('string' != typeof n ||
        (-1 === p.indexOf(n) &&
          !u.test(n) &&
          (n.charAt(0) !== n.charAt(n.length - 1) ||
            ('"' !== n.charAt(0) && "'" !== n.charAt(0)))))
    )
      throw new Error(
        "You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"" +
          n +
          '"\'`'
      )
    var o = d(e, n)
    return (
      '' === o ||
        i(e) ||
        -1 === e.indexOf('-') ||
        void 0 !== m[e] ||
        ((m[e] = !0),
        console.error(
          'Using kebab-case for css properties in objects is not supported. Did you mean ' +
            e.replace(f, 'ms-').replace(v, function (e, n) {
              return n.toUpperCase()
            }) +
            '?'
        )),
      o
    )
  }
}
function y(e, n, o) {
  if (null == o) return ''
  if (void 0 !== o.__emotion_styles) {
    if (
      'production' !== process.env.NODE_ENV &&
      'NO_COMPONENT_SELECTOR' === o.toString()
    )
      throw new Error(
        'Component selectors can only be used in conjunction with @emotion/babel-plugin.'
      )
    return o
  }
  switch (typeof o) {
    case 'boolean':
      return ''
    case 'object':
      if (1 === o.anim)
        return (g = { name: o.name, styles: o.styles, next: g }), o.name
      if (void 0 !== o.styles) {
        var t = o.next
        if (void 0 !== t)
          for (; void 0 !== t; )
            (g = { name: t.name, styles: t.styles, next: g }), (t = t.next)
        var r = o.styles + ';'
        return (
          'production' !== process.env.NODE_ENV &&
            void 0 !== o.map &&
            (r += o.map),
          r
        )
      }
      return (function (e, n, o) {
        var t = ''
        if (Array.isArray(o))
          for (var r = 0; r < o.length; r++) t += y(e, n, o[r]) + ';'
        else
          for (var s in o) {
            var i = o[s]
            if ('object' != typeof i)
              null != n && void 0 !== n[i]
                ? (t += s + '{' + n[i] + '}')
                : a(i) && (t += c(s) + ':' + l(s, i) + ';')
            else {
              if (
                'NO_COMPONENT_SELECTOR' === s &&
                'production' !== process.env.NODE_ENV
              )
                throw new Error(
                  'Component selectors can only be used in conjunction with @emotion/babel-plugin.'
                )
              if (
                !Array.isArray(i) ||
                'string' != typeof i[0] ||
                (null != n && void 0 !== n[i[0]])
              ) {
                var u = y(e, n, i)
                switch (s) {
                  case 'animation':
                  case 'animationName':
                    t += c(s) + ':' + u + ';'
                    break
                  default:
                    'production' !== process.env.NODE_ENV &&
                      'undefined' === s &&
                      console.error(
                        "You have passed in falsy value as style object's key (can happen when in example you pass unexported component as computed key)."
                      ),
                      (t += s + '{' + u + '}')
                }
              } else
                for (var p = 0; p < i.length; p++)
                  a(i[p]) && (t += c(s) + ':' + l(s, i[p]) + ';')
            }
          }
        return t
      })(e, n, o)
    case 'function':
      if (void 0 !== e) {
        var i = g,
          u = o(e)
        return (g = i), y(e, n, u)
      }
      'production' !== process.env.NODE_ENV &&
        console.error(
          "Functions that are interpolated in css calls will be stringified.\nIf you want to have a css call based on props, create a function that returns a css call like this\nlet dynamicStyle = (props) => css`color: ${props.color}`\nIt can be called directly with props or interpolated in a styled call like this\nlet SomeComponent = styled('div')`${dynamicStyle}`"
        )
      break
    case 'string':
      if ('production' !== process.env.NODE_ENV) {
        var p = [],
          d = o.replace(s, function (e, n, o) {
            var t = 'animation' + p.length
            return (
              p.push(
                'const ' +
                  t +
                  ' = keyframes`' +
                  o.replace(/^@keyframes animation-\w+/, '') +
                  '`'
              ),
              '${' + t + '}'
            )
          })
        p.length &&
          console.error(
            '`keyframes` output got interpolated into plain string, please wrap it with `css`.\n\nInstead of doing this:\n\n' +
              [].concat(p, ['`' + d + '`']).join('\n') +
              '\n\nYou should wrap it with `css` like this:\n\ncss`' +
              d +
              '`'
          )
      }
  }
  if (null == n) return o
  var f = n[o]
  return void 0 !== f ? f : o
}
var h,
  g,
  E = /label:\s*([^\s;\n{]+)\s*;/g
'production' !== process.env.NODE_ENV &&
  (h = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//g)
var N = function (n, o, r) {
  if (
    1 === n.length &&
    'object' == typeof n[0] &&
    null !== n[0] &&
    void 0 !== n[0].styles
  )
    return n[0]
  var s = !0,
    i = ''
  g = void 0
  var a,
    c = n[0]
  null == c || void 0 === c.raw
    ? ((s = !1), (i += y(r, o, c)))
    : ('production' !== process.env.NODE_ENV &&
        void 0 === c[0] &&
        console.error(t),
      (i += c[0]))
  for (var l = 1; l < n.length; l++)
    (i += y(r, o, n[l])),
      s &&
        ('production' !== process.env.NODE_ENV &&
          void 0 === c[l] &&
          console.error(t),
        (i += c[l]))
  'production' !== process.env.NODE_ENV &&
    (i = i.replace(h, function (e) {
      return (a = e), ''
    })),
    (E.lastIndex = 0)
  for (var u, p = ''; null !== (u = E.exec(i)); ) p += '-' + u[1]
  var d = e(i) + p
  return 'production' !== process.env.NODE_ENV
    ? {
        name: d,
        styles: i,
        map: a,
        next: g,
        toString: function () {
          return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."
        },
      }
    : { name: d, styles: i, next: g }
}
export { N as serializeStyles }
//# sourceMappingURL=emotion-serialize.esm.js.map
