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

export function inline (
  quasi: any,
  identifierName?: string,
  prefix: string,
  inlineVars: boolean
): { hash: string, name: string, rules: string[], isStatic: boolean } {
  let strs = quasi.quasis.map(x => x.value.cooked)
  let hash = hashArray([...strs]) // todo - add current filename?
  let name = getName(
    extractNameFromProperty(strs.join('xxx')),
    identifierName,
    prefix
  )
  let hasApply
  let src = strs
    .reduce((arr, str, i) => {
      arr.push(str)
      if (i !== quasi.expressions.length) {
        // todo - test for preceding @apply
        let applyMatch = /@apply\s*$/gm.exec(str)
        if (applyMatch) {
          hasApply = true
          arr.push(`--${name}-${hash}-${i}`)
        } else arr.push(`var(--${name}-${hash}-${i})`)
      }
      return arr
    }, [])
    .join('')
    .trim()

  let rules = parseCSS(`.${name}-${hash} { ${src} }`)
  if (inlineVars || hasApply) {
    rules = replaceVarsWithPlaceholders(rules)
  }
  if (hasApply) {
    rules = replaceApplyWithPlaceholders(rules)
  }
  return { hash, name, rules, isStatic: !hasApply && !inlineVars }
}

export function keyframes (
  quasi: any,
  identifierName?: string,
  prefix: string
): { hash: string, name: string, rules: string[] } {
  let strs = quasi.quasis.map(x => x.value.cooked)
  let hash = hashArray([...strs])
  let name = getName(
    extractNameFromProperty(strs.join('xxx')),
    identifierName,
    prefix
  )

  return {
    hash,
    name,
    rules: [parseCSS(`{ ${strs.join('').trim()} }`).join('').trim()]
  }
}

export function fontFace (
  quasi: any,
  inlineVars: boolean
): { rules: string[], isStatic: boolean } {
  let strs = quasi.quasis.map(x => x.value.cooked)
  let hasVar
  let src = strs
    .reduce((arr, str, i) => {
      arr.push(str)
      if (i !== quasi.expressions.length) {
        hasVar = true
        arr.push(`var(--name-hash-${i})`)
      }
      return arr
    }, [])
    .join('')
    .trim()
  let rules = parseCSS(`@font-face {${src}}`)
  if (hasVar) {
    rules = replaceVarsWithPlaceholders(rules)
  }
  return { rules, isStatic: !inlineVars && !hasVar }
}

export function injectGlobal (
  quasi: any,
  inlineVars: boolean
): { rules: string[], isStatic: boolean } {
  let strs = quasi.quasis.map(x => x.value.cooked)
  let hasApplyOrVar = false
  let src = strs
    .reduce((arr, str, i) => {
      arr.push(str)
      if (i !== quasi.expressions.length) {
        hasApplyOrVar = true
        // todo - test for preceding @apply
        let applyMatch = /@apply\s*$/gm.exec(str)
        if (applyMatch) {
          arr.push(`--name-hash-${i}`)
        } else arr.push(`var(--name-hash-${i})`)
      }
      return arr
    }, [])
    .join('')
    .trim()
  let rules = parseCSS(src)
  if (hasApplyOrVar) {
    rules = replaceVarsWithPlaceholders(rules)
    rules = replaceApplyWithPlaceholders(rules)
  }
  return { rules, isStatic: !inlineVars && !hasApplyOrVar }
}
