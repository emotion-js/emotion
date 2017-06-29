// @flow
import { StyleSheet } from './sheet'
import hashArray from './hash'

export const sheet = new StyleSheet()
sheet.inject()

export let inserted: { [string]: boolean | void } = {}

type inputVar = string | number

type vars = Array<inputVar>

function values (cls: string, vars: vars) {
  const hash = hashArray([cls, ...vars])
  const varCls = `vars-${hash}`
  if (inserted[hash]) {
    return varCls
  }
  let src = vars
    .map((val: inputVar, i: number) => `--${cls}-${i}: ${val}`)
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

export function fragment (vars: vars, content: () => string) {
  return content(...vars)
}

export function injectGlobal (vars: vars, content: () => string[]) {
  const src = content(...vars)
  const hash = hashArray(src)
  if (!inserted[hash]) {
    inserted[hash] = true
    src.forEach(r => sheet.insert(r))
  }
}

export const fontFace = injectGlobal

export function keyframes (kfm: string, vars: vars, content: () => string[]) {
  const src = content(...vars)
  const hash = hashArray(src)
  const animationName = `${kfm}-${hash}`
  if (!inserted[hash]) {
    inserted[hash] = true
    src.forEach(r => {
      sheet.insert(`@keyframes ${animationName} ${r}`)
    })
  }
  return animationName
}

export function hydrate (ids: string[]) {
  ids.forEach(id => (inserted[id] = true))
}
