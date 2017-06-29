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

function replaceVarsWithPlaceholders (rules: string[]): string[] {
  return rules.map(rule =>
    rule.replace(
      /var\(--[A-Za-z0-9-_]+-([0-9]+)\)/gm,
      (match, p1) => `xxx${p1}xxx`
    )
  )
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
  hash: string,
  expressionLength: number
): { src: string, hasApply: boolean, hasVar: boolean } {
  let hasApply = false
  let hasVar = false
  const src = strs
    .reduce((arr, str, i) => {
      arr.push(str)
      if (i !== expressionLength) {
        // todo - test for preceding @apply
        let applyMatch = /@apply\s*$/gm.exec(str)
        if (applyMatch) {
          hasApply = true
          arr.push(`--${name}-${hash}-${i}`)
        } else {
          hasVar = true
          arr.push(`var(--${name}-${hash}-${i})`)
        }
      }
      return arr
    }, [])
    .join('')
    .trim()
  return { src, hasApply, hasVar }
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
  hasVar: boolean
} {
  let strs = quasi.quasis.map(x => x.value.cooked)
  let hash = hashArray([...strs]) // todo - add current filename?
  let name = getName(
    extractNameFromProperty(strs.join('xxx')),
    identifierName,
    prefix
  )
  let { src, hasApply, hasVar } = createSrc(
    strs,
    name,
    hash,
    quasi.expressions.length
  )

  let rules = parseCSS(`.${name}-${hash} { ${src} }`)
  if (inlineMode || hasApply) {
    rules = replaceVarsWithPlaceholders(rules)
  }
  if (hasApply) {
    rules = replaceApplyWithPlaceholders(rules)
  }
  return { hash, name, rules, hasApply, hasVar }
}

export function keyframes (
  quasi: any,
  identifierName?: string,
  prefix: string
): {
  hash: string,
  name: string,
  rules: string[],
  hasApply: boolean,
  hasVar: boolean
} {
  const strs = quasi.quasis.map(x => x.value.cooked)
  const hash = hashArray([...strs])
  const name = getName(
    extractNameFromProperty(strs.join('xxx')),
    identifierName,
    prefix
  )
  const { src, hasApply, hasVar } = createSrc(
    strs,
    name,
    hash,
    quasi.expressions.length
  )
  let rules = parseCSS(`{ ${src} }`, { nested: false })
  if (hasApply) {
    rules = replaceApplyWithPlaceholders(rules)
  }
  if (hasVar) {
    rules = replaceVarsWithPlaceholders(rules)
  }
  return { hash, name, rules, hasApply, hasVar }
}

export function fontFace (
  quasi: any
): { rules: string[], hasApply: boolean, hasVar: boolean } {
  let strs = quasi.quasis.map(x => x.value.cooked)
  const { src, hasApply, hasVar } = createSrc(
    strs,
    'name',
    'hash',
    quasi.expressions.length
  )
  let rules = parseCSS(`@font-face {${src}}`)
  if (hasVar) {
    rules = replaceVarsWithPlaceholders(rules)
  }
  return { rules, hasApply, hasVar }
}

export function injectGlobal (
  quasi: any
): { rules: string[], hasApply: boolean, hasVar: boolean } {
  let strs = quasi.quasis.map(x => x.value.cooked)
  const { src, hasVar, hasApply } = createSrc(
    strs,
    'name',
    'hash',
    quasi.expressions.length
  )
  let rules = parseCSS(src)
  if (hasApply) {
    rules = replaceApplyWithPlaceholders(rules)
  }
  if (hasVar) {
    rules = replaceVarsWithPlaceholders(rules)
  }
  return { rules, hasApply, hasVar }
}
