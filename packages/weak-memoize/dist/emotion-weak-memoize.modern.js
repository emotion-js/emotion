export default function (e) {
  let t = new WeakMap()
  return (r) => {
    if (t.has(r)) return t.get(r)
    let n = e(r)
    return t.set(r, n), n
  }
}
//# sourceMappingURL=emotion-weak-memoize.modern.js.map
