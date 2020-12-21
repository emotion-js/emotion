import e from 'through'
import r from 'html-tokenize'
import t from 'multipipe'
import { cache as n } from '@emotion/css'
var i = function (e) {
  return function (r) {
    for (
      var t,
        n = new RegExp(e.key + '-([a-zA-Z0-9-_]+)', 'gm'),
        i = { html: r, ids: [], css: '' },
        o = {};
      null !== (t = n.exec(r));

    )
      void 0 === o[t[1]] && (o[t[1]] = !0)
    return (
      (i.ids = Object.keys(e.inserted).filter(function (r) {
        if (
          (void 0 !== o[r] || void 0 === e.registered[e.key + '-' + r]) &&
          !0 !== e.inserted[r]
        )
          return (i.css += e.inserted[r]), !0
      })),
      i
    )
  }
}
function o(e, r, t, n) {
  return (
    '<style data-emotion="' +
    e +
    ' ' +
    r.substring(1) +
    '"' +
    n +
    '>' +
    t +
    '</style>'
  )
}
var s = function (e, r) {
    return function (t) {
      var n = e.inserted,
        i = e.key,
        s = e.registered,
        u = new RegExp('<|' + i + '-([a-zA-Z0-9-_]+)', 'gm'),
        c = {},
        d = '',
        a = '',
        f = ''
      for (var l in n)
        if (n.hasOwnProperty(l)) {
          var m = n[l]
          !0 !== m && void 0 === s[i + '-' + l] && ((f += m), (a += ' ' + l))
        }
      '' !== f && (d = o(i, a, f, r))
      for (var v, y = '', g = '', p = 0; null !== (v = u.exec(t)); )
        if ('<' !== v[0]) {
          var x = v[1],
            k = n[x]
          !0 === k ||
            void 0 === k ||
            c[x] ||
            ((c[x] = !0), (g += k), (y += ' ' + x))
        } else
          '' !== y && ((d += o(i, y, g, r)), (y = ''), (g = '')),
            (d += t.substring(p, v.index)),
            (p = v.index)
      return d + t.substring(p)
    }
  },
  u = function (n, i) {
    return function () {
      var o = {},
        s = r(),
        u = e(
          function (e) {
            var r = e[1]
            if ('open' === e[0]) {
              for (
                var t,
                  s = '',
                  u = {},
                  c = r.toString(),
                  d = new RegExp(n.key + '-([a-zA-Z0-9-_]+)', 'gm');
                null !== (t = d.exec(c));

              )
                null !== t && void 0 === o[t[1]] && (u[t[1]] = !0)
              Object.keys(n.inserted).forEach(function (e) {
                !0 !== n.inserted[e] &&
                  void 0 === o[e] &&
                  (!0 === u[e] ||
                    (void 0 === n.registered[n.key + '-' + e] &&
                      (u[e] = !0))) &&
                  ((o[e] = !0), (s += n.inserted[e]))
              }),
                '' !== s &&
                  this.queue(
                    '<style data-emotion="' +
                      n.key +
                      ' ' +
                      Object.keys(u).join(' ') +
                      '"' +
                      i +
                      '>' +
                      s +
                      '</style>'
                  )
            }
            this.queue(r)
          },
          function () {
            this.queue(null)
          }
        )
      return t(s, u)
    }
  },
  c = (function (e) {
    !0 !== e.compat && (e.compat = !0)
    var r = void 0 !== e.nonce ? ' nonce="' + e.nonce + '"' : ''
    return {
      extractCritical: i(e),
      renderStylesToString: s(e, r),
      renderStylesToNodeStream: u(e, r),
    }
  })(n),
  d = c.extractCritical,
  a = c.renderStylesToString,
  f = c.renderStylesToNodeStream
export {
  d as extractCritical,
  f as renderStylesToNodeStream,
  a as renderStylesToString,
}
//# sourceMappingURL=emotion-server.esm.js.map
