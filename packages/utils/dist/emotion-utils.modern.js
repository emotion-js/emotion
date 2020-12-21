const e = 'undefined' != typeof document
function t(e, t, i) {
  let n = ''
  return (
    i.split(' ').forEach((i) => {
      void 0 !== e[i] ? t.push(`${e[i]};`) : (n += `${i} `)
    }),
    n
  )
}
const i = (t, i, n) => {
  let o = `${t.key}-${i.name}`
  if (
    ((!1 === n || (!1 === e && void 0 !== t.compat)) &&
      void 0 === t.registered[o] &&
      (t.registered[o] = i.styles),
    void 0 === t.inserted[i.name])
  ) {
    let n = '',
      d = i
    do {
      let r = t.insert(i === d ? `.${o}` : '', d, t.sheet, !0)
      e || void 0 === r || (n += r), (d = d.next)
    } while (void 0 !== d)
    if (!e && 0 !== n.length) return n
  }
}
export { t as getRegisteredStyles, i as insertStyles }
//# sourceMappingURL=emotion-utils.modern.js.map
