import parseCSS from './parser'
import hashArray from './hash'

function getName (str) {
  let regex = /name\s*:\s*([A-Za-z0-9\-_]+)\s*/gm
  let match = regex.exec(str)
  if (match) {
    return match[1]
  }
}

export function inline (code, quasi) {
  let strs = quasi.quasis.map(x => x.value.cooked)
  let hash = hashArray([...strs]) // todo - add current filename?
  let name = getName(strs.join('xxx')) || 'css'

  let stubs = quasi.expressions.map(x =>
    code.substring(x.start, x.end)
  )

  let src = strs
    .reduce((arr, str, i) => {
      arr.push(str)
      if (i !== stubs.length) {
        // todo - test for preceding @apply
        let applyMatch = /@apply\s*$/gm.exec(str)
        if (applyMatch) {
          arr.push(`--${name}-${hash}-${i}`)
        } else arr.push(`var(--${name}-${hash}-${i})`)
      }
      return arr
    }, [])
    .join('')
    .trim()

  let rules = parseCSS(`.${name}-${hash} { ${src} }`)
  rules = rules.map(rule =>
    rule.replace(
      /@apply\s+--[A-Za-z0-9-_]+-([0-9]+)/gm,
      (match, p1) => `xxx${p1}xxx`
    )
  )
  rules = rules.map(rule =>
    rule.replace(
      /var\(--[A-Za-z0-9-_]+-([0-9]+)\)/gm,
      (match, p1) => `xxx${p1}xxx`
    )
  )
  return { hash, stubs, name, rules }
}

export function fragment (path) {
  let code = path.hub.file.code
  let strs = path.node.quasi.quasis.map(x => x.value.cooked)
  let hash = hashArray([...strs]) // todo - add current filename?
  let name = getName(strs.join('xxx')) || 'frag'

  let stubs = path.node.quasi.expressions.map(x =>
    code.substring(x.start, x.end)
  )

  let src = strs
    .reduce((arr, str, i) => {
      arr.push(str)
      if (i !== stubs.length) {
        // todo - test for preceding @apply
        let applyMatch = /@apply\s*$/gm.exec(str)
        if (applyMatch) {
          arr.push(`--${name}-${hash}-${i}`)
        } else arr.push(`var(--${name}-${hash}-${i})`)
      }
      return arr
    }, [])
    .join('')
    .trim()

  let rules = parseCSS(`.${name}-${hash} { ${src} }`)
  rules = rules.map(rule =>
    rule.replace(
      /@apply\s+--[A-Za-z0-9-_]+-([0-9]+)/gm,
      (match, p1) => `xxx${p1}xxx`
    )
  )
  rules = rules.map(rule =>
    rule.replace(
      /var\(--[A-Za-z0-9-_]+-([0-9]+)\)/gm,
      (match, p1) => `xxx${p1}xxx`
    )
  )

  return {hash, stubs, name, rules}
}
