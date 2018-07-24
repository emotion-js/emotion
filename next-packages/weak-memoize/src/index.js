// @flow
let weakMemoize = function<Arg, Return>(func: Arg => Return): Arg => Return {
  let cache: WeakMap<Arg, Return> = new WeakMap()
  return arg => {
    if (cache.has(arg)) {
      // $FlowFixMe
      return cache.get(arg)
    }
    let ret = func(arg)
    cache.set(arg, ret)
    return ret
  }
}

export default weakMemoize
