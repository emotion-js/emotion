import { sheet, inserted } from 'emotion'
import { keys, forEach } from 'emotion-utils'

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

  o.rules = sheet.sheet.cssRules.slice().filter(x => {
    RGX.lastIndex = 0
    let match = RGX.exec(x.cssText)
    const ret = match == null || ids[match[1]] || false
    return ret
  })

  o.ids = keys(inserted).filter(
    id =>
      !!ids[id] ||
      sheet.registered[id].type === 'raw' ||
      sheet.registered[id].type === 'keyframes'
  )

  let css = ''
  forEach(o.rules, x => (css += x.cssText))
  o.css = css

  return o
}
