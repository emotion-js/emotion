// @flow
import { parseCSS } from './parser'
import hashArray from './hash'

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

function replaceApplyWithPlaceholders (rules: string[]): string[] {
  return rules.map(rule =>
    rule.replace(
      /@apply\s+--[A-Za-z0-9-_]+-([0-9]+)/gm,
      (match, p1) => `xxx${p1}xxx`
    )
  )
}

function createSrc (
  strs: string[],
  name: string,
  hash: string
): { src: string, hasApply: boolean, otherMatches: number } {
  let hasApply = false
  let otherMatches = 0
  const src = strs
    .reduce((arr, str, i) => {
      arr.push(str)
      if (i !== strs.length - 1) {
        // todo - test for preceding @apply
        let applyMatch = /@apply\s*$/gm.exec(str)
        if (applyMatch) {
          hasApply = true
          arr.push(`--${name}-${hash}-${i}`)
        } else {
          otherMatches++
          arr.push(`xxx${i}xxx`)
        }
      }
      return arr
    }, [])
    .join('')
    .trim()
  return { src, hasApply, otherMatches }
}

export function inline (
  quasi: any,
  identifierName?: string,
  prefix: string,
  inlineMode: boolean
): {
  hash: string,
  name: string,
  rules: string[],
  hasApply: boolean,
  hasVar: boolean,
  hasOtherMatch: boolean
} {
  let strs = quasi.quasis.map(x => x.value.cooked)
  let hash = hashArray([...strs]) // todo - add current filename?
  let name = getName(
    extractNameFromProperty(strs.join('xxx')),
    identifierName,
    prefix
  )
  let { src, hasApply, otherMatches } = createSrc(strs, name, hash)

  let { rules, hasVar, hasOtherMatch } = parseCSS(`.${name}-${hash} { ${src} }`, {
    inlineMode: inlineMode || hasApply,
    otherMatches,
    name,
    hash
  })

  if (hasApply) {
    rules = replaceApplyWithPlaceholders(rules)
  }
  return { hash, name, rules, hasApply, hasVar, hasOtherMatch }
}

export function keyframes (
  quasi: any,
  identifierName?: string,
  prefix: string
): {
  hash: string,
  name: string,
  rules: string[],
  hasInterpolation: boolean
} {
  const strs = quasi.quasis.map(x => x.value.cooked)
  const hash = hashArray([...strs])
  const name = getName(
    extractNameFromProperty(strs.join('xxx')),
    identifierName,
    prefix
  )
  const { src, hasApply, otherMatches } = createSrc(strs, name, hash)
  let { rules, hasVar, hasOtherMatch } = parseCSS(`{ ${src} }`, {
    nested: false,
    inlineMode: true,
    otherMatches,
    name,
    hash
  })
  if (hasApply) {
    rules = replaceApplyWithPlaceholders(rules)
  }
  return { hash, name, rules, hasInterpolation: hasVar || hasApply || hasOtherMatch }
}

export function fontFace (
  quasi: any
): { rules: string[], hasInterpolation: boolean } {
  let strs = quasi.quasis.map(x => x.value.cooked)
  const { src, hasApply, otherMatches } = createSrc(strs, 'name', 'hash')
  let { rules, hasVar, hasOtherMatch } = parseCSS(`@font-face {${src}}`, { otherMatches, inlineMode: true, name: 'name', hash: 'hash' })
  if (hasApply) {
    rules = replaceApplyWithPlaceholders(rules)
  }
  return { rules, hasInterpolation: hasVar || hasApply || hasOtherMatch }
}

export function injectGlobal (
  quasi: any
): { rules: string[], hasInterpolation: boolean } {
  let strs = quasi.quasis.map(x => x.value.cooked)
  const { src, otherMatches, hasApply } = createSrc(strs, 'name', 'hash')
  let { rules, hasVar, hasOtherMatch } = parseCSS(src, { otherMatches, inlineMode: true, name: 'name', hash: 'hash' })
  if (hasApply) {
    rules = replaceApplyWithPlaceholders(rules)
  }
  return { rules, hasInterpolation: hasVar || hasApply || hasOtherMatch }
}
