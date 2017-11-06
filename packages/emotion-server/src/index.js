import { sheet, inserted, registered } from 'emotion'

export * from 'emotion'

export function extractCritical(html) {
  // parse out ids from html
  // reconstruct css/rules/cache to pass
  const RGX = /css-([a-zA-Z0-9]+)/gm

  let o = { html, ids: [], css: '', rules: [] }
  let match
  let ids = {}
  while ((match = RGX.exec(html)) !== null) {
    if (!ids[match[1]]) {
      ids[match[1]] = true
    }
  }

  o.rules = sheet.sheet.slice().filter(x => {
    RGX.lastIndex = 0
    let match = RGX.exec(x)
    const ret = match == null || ids[match[1]] || false
    return ret
  })

  o.ids = Object.keys(inserted).filter(id => {
    return ids[id] === true || registered[`css-${id}`] === undefined
  })

  o.css = o.rules.join('')

  return o
}

export { default as extractCriticalToNodeStream } from './stream'
