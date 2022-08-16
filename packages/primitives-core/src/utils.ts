export function interleave(
  vals: [TemplateStringsArray, ...unknown[]]
): unknown[] {
  let strings = vals[0]
  let finalArray: unknown[] = [strings[0]]
  for (let i = 1, len = vals.length; i < len; i++) {
    finalArray.push(vals[i])
    if (strings[i] !== undefined) {
      finalArray.push(strings[i])
    }
  }
  return finalArray
}
