// @flow
import { hashArray } from './hash'

function extractNameFromProperty (str: string) {
  let regex = /name\s*:\s*([A-Za-z0-9\-_]+)\s*/gm
  let match = regex.exec(str)
  if (match) {
    return match[1]
  }
}

function getName (
  extracted?: string,
  identifierName?: string,
  prefix: string
): string {
  const parts = []
  parts.push(prefix)
  if (extracted) {
    parts.push(extracted)
  } else if (identifierName) {
    parts.push(identifierName)
  }
  return parts.join('-')
}

function createRawStringFromQuasi (
  strs: string[]
): { src: string, dynamicValueCount: number } {
  let dynamicValueCount = 0
  const src = strs
    .reduce((arr, str, i) => {
      arr.push(str)
      if (i !== strs.length - 1) {
        dynamicValueCount++
        arr.push(`xxx${i}xxx`)
      }
      return arr
    }, [])
    .join('')
    .trim()
  return { src, dynamicValueCount }
}

export function inline (
  quasi: any,
  identifierName?: string,
  prefix: string
): {
  name: string,
  hash: string,
  src: string
} {
  let strs = quasi.quasis.map(x => x.value.cooked)
  let hash = hashArray([...strs])
  let name = getName(
    extractNameFromProperty(strs.join('xxx')),
    identifierName,
    prefix
  )
  let { src } = createRawStringFromQuasi(strs)

  return {
    name,
    hash,
    src
  }
}
