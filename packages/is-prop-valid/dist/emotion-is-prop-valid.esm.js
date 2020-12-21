import e from '@emotion/memoize'
var o = codegen.require('./props'),
  r = e(function (e) {
    return (
      o.test(e) ||
      (111 === e.charCodeAt(0) &&
        110 === e.charCodeAt(1) &&
        e.charCodeAt(2) < 91)
    )
  })
export default r
//# sourceMappingURL=emotion-is-prop-valid.esm.js.map
