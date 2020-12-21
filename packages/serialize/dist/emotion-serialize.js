var e = require('@emotion/hash'),
  n = require('@emotion/unitless'),
  o = require('@emotion/memoize')
function t(e) {
  return e && 'object' == typeof e && 'default' in e ? e : { default: e }
}
var r = t(e),
  s = t(n),
  i =
    "You have illegal escape sequence in your template literal, most likely inside content's property value.\nBecause you write your CSS inside a JavaScript string you actually have to do double escaping, so for example \"content: '\\00d7';\" should become \"content: '\\\\00d7';\".\nYou can read more about this here:\nhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences",
  a = /[A-Z]|^ms/g,
  c = /_EMO_([^_]+?)_([^]*?)_EMO_/g,
  l = function (e) {
    return 45 === e.charCodeAt(1)
  },
  u = function (e) {
    return null != e && 'boolean' != typeof e
  },
  p = t(o).default(function (e) {
    return l(e) ? e : e.replace(a, '-$&').toLowerCase()
  }),
  d = function (e, n) {
    switch (e) {
      case 'animation':
      case 'animationName':
        if ('string' == typeof n)
          return n.replace(c, function (e, n, o) {
            return (b = { name: n, styles: o, next: b }), n
          })
    }
    return 1 === s.default[e] || l(e) || 'number' != typeof n || 0 === n
      ? n
      : n + 'px'
  }
if ('production' !== process.env.NODE_ENV) {
  var f = /(attr|calc|counters?|url)\(/,
    v = [
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
    m = d,
    y = /^-ms-/,
    h = /-(.)/g,
    g = {}
  d = function (e, n) {
    if (
      'content' === e &&
      ('string' != typeof n ||
        (-1 === v.indexOf(n) &&
          !f.test(n) &&
          (n.charAt(0) !== n.charAt(n.length - 1) ||
            ('"' !== n.charAt(0) && "'" !== n.charAt(0)))))
    )
      throw new Error(
        "You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"" +
          n +
          '"\'`'
      )
    var o = m(e, n)
    return (
      '' === o ||
        l(e) ||
        -1 === e.indexOf('-') ||
        void 0 !== g[e] ||
        ((g[e] = !0),
        console.error(
          'Using kebab-case for css properties in objects is not supported. Did you mean ' +
            e.replace(y, 'ms-').replace(h, function (e, n) {
              return n.toUpperCase()
            }) +
            '?'
        )),
      o
    )
  }
}
function E(e, n, o) {
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
        return (b = { name: o.name, styles: o.styles, next: b }), o.name
      if (void 0 !== o.styles) {
        var t = o.next
        if (void 0 !== t)
          for (; void 0 !== t; )
            (b = { name: t.name, styles: t.styles, next: b }), (t = t.next)
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
          for (var r = 0; r < o.length; r++) t += E(e, n, o[r]) + ';'
        else
          for (var s in o) {
            var i = o[s]
            if ('object' != typeof i)
              null != n && void 0 !== n[i]
                ? (t += s + '{' + n[i] + '}')
                : u(i) && (t += p(s) + ':' + d(s, i) + ';')
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
                var a = E(e, n, i)
                switch (s) {
                  case 'animation':
                  case 'animationName':
                    t += p(s) + ':' + a + ';'
                    break
                  default:
                    'production' !== process.env.NODE_ENV &&
                      'undefined' === s &&
                      console.error(
                        "You have passed in falsy value as style object's key (can happen when in example you pass unexported component as computed key)."
                      ),
                      (t += s + '{' + a + '}')
                }
              } else
                for (var c = 0; c < i.length; c++)
                  u(i[c]) && (t += p(s) + ':' + d(s, i[c]) + ';')
            }
          }
        return t
      })(e, n, o)
    case 'function':
      if (void 0 !== e) {
        var s = b,
          i = o(e)
        return (b = s), E(e, n, i)
      }
      'production' !== process.env.NODE_ENV &&
        console.error(
          "Functions that are interpolated in css calls will be stringified.\nIf you want to have a css call based on props, create a function that returns a css call like this\nlet dynamicStyle = (props) => css`color: ${props.color}`\nIt can be called directly with props or interpolated in a styled call like this\nlet SomeComponent = styled('div')`${dynamicStyle}`"
        )
      break
    case 'string':
      if ('production' !== process.env.NODE_ENV) {
        var a = [],
          l = o.replace(c, function (e, n, o) {
            var t = 'animation' + a.length
            return (
              a.push(
                'const ' +
                  t +
                  ' = keyframes`' +
                  o.replace(/^@keyframes animation-\w+/, '') +
                  '`'
              ),
              '${' + t + '}'
            )
          })
        a.length &&
          console.error(
            '`keyframes` output got interpolated into plain string, please wrap it with `css`.\n\nInstead of doing this:\n\n' +
              [].concat(a, ['`' + l + '`']).join('\n') +
              '\n\nYou should wrap it with `css` like this:\n\ncss`' +
              l +
              '`'
          )
      }
  }
  if (null == n) return o
  var f = n[o]
  return void 0 !== f ? f : o
}
var N,
  b,
  _ = /label:\s*([^\s;\n{]+)\s*;/g
'production' !== process.env.NODE_ENV &&
  (N = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//g),
  (exports.serializeStyles = function (e, n, o) {
    if (
      1 === e.length &&
      'object' == typeof e[0] &&
      null !== e[0] &&
      void 0 !== e[0].styles
    )
      return e[0]
    var t = !0,
      s = ''
    b = void 0
    var a,
      c = e[0]
    null == c || void 0 === c.raw
      ? ((t = !1), (s += E(o, n, c)))
      : ('production' !== process.env.NODE_ENV &&
          void 0 === c[0] &&
          console.error(i),
        (s += c[0]))
    for (var l = 1; l < e.length; l++)
      (s += E(o, n, e[l])),
        t &&
          ('production' !== process.env.NODE_ENV &&
            void 0 === c[l] &&
            console.error(i),
          (s += c[l]))
    'production' !== process.env.NODE_ENV &&
      (s = s.replace(N, function (e) {
        return (a = e), ''
      })),
      (_.lastIndex = 0)
    for (var u, p = ''; null !== (u = _.exec(s)); ) p += '-' + u[1]
    var d = r.default(s) + p
    return 'production' !== process.env.NODE_ENV
      ? {
          name: d,
          styles: s,
          map: a,
          next: b,
          toString: function () {
            return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."
          },
        }
      : { name: d, styles: s, next: b }
  })
//# sourceMappingURL=emotion-serialize.js.map
