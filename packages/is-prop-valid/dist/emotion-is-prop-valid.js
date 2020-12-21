function e(e) {
  return e && 'object' == typeof e && 'default' in e ? e : { default: e }
}
var t = e(require('@emotion/memoize')),
  o = codegen.require('./props')
module.exports = t.default(function (e) {
  return (
    o.test(e) ||
    (111 === e.charCodeAt(0) && 110 === e.charCodeAt(1) && e.charCodeAt(2) < 91)
  )
})
//# sourceMappingURL=emotion-is-prop-valid.js.map
