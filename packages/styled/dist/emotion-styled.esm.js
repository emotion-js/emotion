import { useContext as e, createElement as o } from 'react'
import t from '@emotion/is-prop-valid'
import { withEmotionCache as r, ThemeContext as n } from '@emotion/react'
import { getRegisteredStyles as a, insertStyles as i } from '@emotion/utils'
import { serializeStyles as s } from '@emotion/serialize'
function l() {
  return (l =
    Object.assign ||
    function (e) {
      for (var o = 1; o < arguments.length; o++) {
        var t = arguments[o]
        for (var r in t)
          Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r])
      }
      return e
    }).apply(this, arguments)
}
var p = t,
  d = function (e) {
    return 'theme' !== e
  },
  u = function (e) {
    return 'string' == typeof e && e.charCodeAt(0) > 96 ? p : d
  },
  c = function (e, o, t) {
    var r
    if (o) {
      var n = o.shouldForwardProp
      r =
        e.__emotion_forwardProp && n
          ? function (o) {
              return e.__emotion_forwardProp(o) && n(o)
            }
          : n
    }
    return 'function' != typeof r && t && (r = e.__emotion_forwardProp), r
  },
  m =
    "You have illegal escape sequence in your template literal, most likely inside content's property value.\nBecause you write your CSS inside a JavaScript string you actually have to do double escaping, so for example \"content: '\\00d7';\" should become \"content: '\\\\00d7';\".\nYou can read more about this here:\nhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences",
  f = 'undefined' != typeof document,
  v = function t(p, d) {
    if ('production' !== process.env.NODE_ENV && void 0 === p)
      throw new Error(
        'You are trying to create a styled element with an undefined component.\nYou may have forgotten to import it.'
      )
    var v,
      _,
      y = p.__emotion_real === p,
      g = (y && p.__emotion_base) || p
    void 0 !== d && ((v = d.label), (_ = d.target))
    var b = c(p, d, y),
      N = b || u(g),
      w = !N('as')
    return function () {
      var E = arguments,
        O =
          y && void 0 !== p.__emotion_styles ? p.__emotion_styles.slice(0) : []
      if (
        (void 0 !== v && O.push('label:' + v + ';'),
        null == E[0] || void 0 === E[0].raw)
      )
        O.push.apply(O, E)
      else {
        'production' !== process.env.NODE_ENV &&
          void 0 === E[0][0] &&
          console.error(m),
          O.push(E[0][0])
        for (var P = E.length, k = 1; k < P; k++)
          'production' !== process.env.NODE_ENV &&
            void 0 === E[0][k] &&
            console.error(m),
            O.push(E[k], E[0][k])
      }
      var S = r(function (t, r, l) {
        var p = (w && t.as) || g,
          d = '',
          c = [],
          m = t
        if (null == t.theme) {
          for (var v in ((m = {}), t)) m[v] = t[v]
          m.theme = e(n)
        }
        'string' == typeof t.className
          ? (d = a(r.registered, c, t.className))
          : null != t.className && (d = t.className + ' ')
        var y = s(O.concat(c), r.registered, m),
          E = i(r, y, 'string' == typeof p)
        ;(d += r.key + '-' + y.name), void 0 !== _ && (d += ' ' + _)
        var P = w && void 0 === b ? u(p) : N,
          k = {}
        for (var S in t) (w && 'as' === S) || (P(S) && (k[S] = t[S]))
        ;(k.className = d), (k.ref = l)
        var x = o(p, k)
        if (!f && void 0 !== E) {
          for (var C, j = y.name, q = y.next; void 0 !== q; )
            (j += ' ' + q.name), (q = q.next)
          return h(
            Fragment,
            null,
            h(
              'style',
              (((C = {})['data-emotion'] = r.key + ' ' + j),
              (C.dangerouslySetInnerHTML = { __html: E }),
              (C.nonce = r.sheet.nonce),
              C)
            ),
            x
          )
        }
        return x
      })
      return (
        (S.displayName =
          void 0 !== v
            ? v
            : 'Styled(' +
              ('string' == typeof g
                ? g
                : g.displayName || g.name || 'Component') +
              ')'),
        (S.defaultProps = p.defaultProps),
        (S.__emotion_real = S),
        (S.__emotion_base = g),
        (S.__emotion_styles = O),
        (S.__emotion_forwardProp = b),
        Object.defineProperty(S, 'toString', {
          value: function () {
            return void 0 === _ && 'production' !== process.env.NODE_ENV
              ? 'NO_COMPONENT_SELECTOR'
              : '.' + _
          },
        }),
        (S.withComponent = function (e, o) {
          return t(e, l({}, d, o, { shouldForwardProp: c(S, o, !0) })).apply(
            void 0,
            O
          )
        }),
        S
      )
    }
  }.bind()
;[
  'a',
  'abbr',
  'address',
  'area',
  'article',
  'aside',
  'audio',
  'b',
  'base',
  'bdi',
  'bdo',
  'big',
  'blockquote',
  'body',
  'br',
  'button',
  'canvas',
  'caption',
  'cite',
  'code',
  'col',
  'colgroup',
  'data',
  'datalist',
  'dd',
  'del',
  'details',
  'dfn',
  'dialog',
  'div',
  'dl',
  'dt',
  'em',
  'embed',
  'fieldset',
  'figcaption',
  'figure',
  'footer',
  'form',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'head',
  'header',
  'hgroup',
  'hr',
  'html',
  'i',
  'iframe',
  'img',
  'input',
  'ins',
  'kbd',
  'keygen',
  'label',
  'legend',
  'li',
  'link',
  'main',
  'map',
  'mark',
  'marquee',
  'menu',
  'menuitem',
  'meta',
  'meter',
  'nav',
  'noscript',
  'object',
  'ol',
  'optgroup',
  'option',
  'output',
  'p',
  'param',
  'picture',
  'pre',
  'progress',
  'q',
  'rp',
  'rt',
  'ruby',
  's',
  'samp',
  'script',
  'section',
  'select',
  'small',
  'source',
  'span',
  'strong',
  'style',
  'sub',
  'summary',
  'sup',
  'table',
  'tbody',
  'td',
  'textarea',
  'tfoot',
  'th',
  'thead',
  'time',
  'title',
  'tr',
  'track',
  'u',
  'ul',
  'var',
  'video',
  'wbr',
  'circle',
  'clipPath',
  'defs',
  'ellipse',
  'foreignObject',
  'g',
  'image',
  'line',
  'linearGradient',
  'mask',
  'path',
  'pattern',
  'polygon',
  'polyline',
  'radialGradient',
  'rect',
  'stop',
  'svg',
  'text',
  'tspan',
].forEach(function (e) {
  v[e] = v(e)
})
export default v
//# sourceMappingURL=emotion-styled.esm.js.map
