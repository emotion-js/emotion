export default function memoize<K extends PropertyKey, V>(
  fn: (arg: K) => V
): (arg: K) => V {
  const cache: Record<K, V> = Object.create(null)

  return (arg: K) => {
    if (cache[arg] === undefined) cache[arg] = fn(arg)
    return cache[arg]
  }
}
