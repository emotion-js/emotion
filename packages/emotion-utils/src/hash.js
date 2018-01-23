// @flow
// https://github.com/darkskyapp/string-hash

export function hashString(str: string) {
  return hash(str).toString(36)
}

function hash(str: string) {
  let hash = 5381
  let i = str.length
  while (i) {
    hash = (hash * 33) ^ str.charCodeAt(--i)
  }
  return hash >>> 0
}
