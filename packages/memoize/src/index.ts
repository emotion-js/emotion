export default function memoize<Return>(
  fn: (arg: string) => Return
): (arg: string) => Return {
  const cache = Object.create(null)

  return (arg: string) => {
    if (cache[arg] === undefined) cache[arg] = fn(arg)
    return cache[arg]
  }
}
