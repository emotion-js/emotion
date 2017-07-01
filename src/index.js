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

export function css (classes: string[], vars: vars, content: () => string[]) {
  if (content) {
    // inline mode
    let src = content(...vars) // returns an array
    let hash = hashArray(src)

    if (!inserted[hash]) {
      inserted[hash] = true
      src
        .map(r => r.replace(new RegExp(classes[0], 'gm'), `${classes[0]}-${hash}`))
        .forEach(r => sheet.insert(r))
    }
    return `${classes[0]}-${hash} ${classes.join(' ')}`
  }
  return classes.join(' ') + (vars && vars.length > 0 ? ' ' + values(classes[0], vars) : '')
}

export function injectGlobal (src: string[]) {
  const hash = hashArray(src)
  if (!inserted[hash]) {
    inserted[hash] = true
    src.forEach(r => sheet.insert(r))
  }
}

export const fontFace = injectGlobal

export function keyframes (kfm: string, src: string[]) {
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
