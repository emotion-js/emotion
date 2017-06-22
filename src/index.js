import { StyleSheet } from './sheet'
import hashArray from './hash'

export const sheet = new StyleSheet()
sheet.inject()

let inserted = {}

function values (cls, vars) {
  let hash = hashArray([cls, ...vars])
  if (inserted[hash]) {
    return `vars-${hash}`
  }
  let fragvarcls = []
  let src = vars
    .map(
      (val, i) =>
        `--${cls}-${i}: ${/^frag-/.exec(val)
          ? (fragvarcls.push(val), 'var(--' + val.split(' ')[0] + ')')
          : val}`
    )
    .join('; ')
  sheet.insert(`.vars-${hash} {${src}}`)
  inserted[hash] = true

  if (fragvarcls.length > 0) {
    return `vars-${hash} ${fragvarcls.join(' ')}`
  }
  return `vars-${hash}`
}

export function flush () {
  sheet.flush()
  inserted = {}
  sheet.inject()
}

export function css (cls, vars, content) {
  if (content) {
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
  return cls + (vars && vars.length > 0 ? ' ' + values(cls, vars) : '')
}

const fragments = {}

export function fragment (frag, vars, content) {
  if (content) {
    let fragvarcls = []
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
  return frag + (vars && vars.length > 0 ? ' ' + values(frag, vars) : '')
}

export function hydrate (ids) {
  ids.forEach(id => (inserted[id] = true))
}
