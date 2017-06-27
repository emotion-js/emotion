// @flow
import { StyleSheet } from './sheet'
import hashArray from './hash'

export const sheet = new StyleSheet()
sheet.inject()

let inserted: { [string]: boolean | void } = {}

type inputVar = string | number

type vars = Array<inputVar>

function values (cls: string, vars: vars) {
  const hash = hashArray([cls, ...vars])
  const varCls = `vars-${hash}`
  if (inserted[hash]) {
    return varCls
  }
  let src = vars
    .map(
      (val: inputVar, i: number) =>
        `--${cls}-${i}: ${val}`
    )
    .join('; ')
  sheet.insert(`.${varCls} {${src}}`)
  inserted[hash] = true

  return varCls
}

export function flush () {
  sheet.flush()
  inserted = {}
  sheet.inject()
}

export function css (cls: string, vars: vars, content: () => string[]) {
  if (content) {
    // inline mode
    let src = content(...vars) // returns an array
    let hash = hashArray(src)

    if (!inserted[hash]) {
      inserted[hash] = true
      src
        .map(r => r.replace(new RegExp(cls, 'gm'), `${cls}-${hash}`))
        .forEach(r => sheet.insert(r))
    }
    return `${cls}-${hash}`
  }
  return cls + (vars && vars.length > 0 ? ' ' + values(cls, vars) : '')
}

export function fragment (
  vars: vars,
  content: () => string[]
) {
  return content(...vars)
}

export function keyframes (
  kfm: string,
  vars: vars,
  content: () => string[]
) {
  let src = content(...vars)
  let hash = hashArray(src)
  if (!inserted[hash]) {
    inserted[hash] = true
    src.forEach(r => {
      return sheet.insert(`@keyframes ${kfm}-${hash} {${r}}`)
    })
  }
  return `${kfm}-${hash}`
}

export function fontFace (
  fontRules: string,
  vars: vars,
  content: () => string[]
) {
  let src = content(...vars)
  let hash = hashArray(src)
  if (!inserted[hash]) {
    inserted[hash] = true
    src.forEach(r => {
      return sheet.insert(r)
    })
  }
  return `${fontRules}-${hash}`
}

export function hydrate (ids: string[]) {
  ids.forEach(id => (inserted[id] = true))
}
