import { sheet, inserted, registered } from 'emotion'

export * from 'emotion'

export function extractCritical(html) {
  // parse out ids from html
  // reconstruct css/rules/cache to pass
  const RGX = /css(?:[a-zA-Z0-9-]*)-([a-zA-Z0-9]+)/gm

  let o = { html, ids: [], css: '', rules: [] }
  let match
  let ids = {}
  while ((match = RGX.exec(html)) !== null) {
    if (!ids[match[1]]) {
      ids[match[1]] = true
    }
  }
  
  o.rules = sheet.sheet.filter(x => {
    const match = x.match(RGX)
    return !match || ids[match[0]]
  })

  o.ids = Object.keys(inserted).filter(id => {
    return !!ids[id] || !registered[`css-${id}`]
  })

  o.css = o.rules.join('')

  return o
}
