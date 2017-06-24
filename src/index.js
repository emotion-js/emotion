import { StyleSheet } from './sheet'
import hashArray from './hash'

export const sheet = new StyleSheet()
sheet.inject()

let inserted = {}

export function flush () {
  sheet.flush()
  inserted = {}
  sheet.inject()
}

export function css (cls, vars, content) {
  // inline mode
  vars = vars.map(v => (/^frag-/.exec(v) ? fragments[v] : v))
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

const fragments = {}

export function fragment (frag, vars, content) {
  vars = vars.map(v => (/^frag-/.exec(v) ? fragments[v] : v))
  let src = content(...vars) // return array?
  if (src.length > 1) {
    throw new Error('what up!')
  }

  let hash = hashArray(src)
  src = src.join('')
  fragments[`${frag}-${hash}`] = src.substring(
    src.indexOf('{') + 1,
    src.length - 1
  )
  return `${frag}-${hash}`
}

export function hydrate (ids) {
  ids.forEach(id => (inserted[id] = true))
}
