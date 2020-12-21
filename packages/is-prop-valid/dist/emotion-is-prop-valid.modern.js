import e from '@emotion/memoize'
const o = codegen.require('./props'),
  t = e(
    (e) =>
      o.test(e) ||
      (111 === e.charCodeAt(0) &&
        110 === e.charCodeAt(1) &&
        e.charCodeAt(2) < 91)
  )
export default t
//# sourceMappingURL=emotion-is-prop-valid.modern.js.map
