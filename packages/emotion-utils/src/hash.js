// @flow
// murmurhash2 via https://gist.github.com/raycmorgan/588423

export function hashString(str: string) {
  return hash(str, str.length).toString(36)
}

function hash(str: string) {
  if (str.length === 0 || str === undefined) {
    return 0
  }

  let hash = 5381
  let i = str.length

  while (i) {
    hash = (hash * 33) ^ str.charCodeAt(--i)
  }
  return hash >>> 0
}
