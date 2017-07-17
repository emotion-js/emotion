const forEach = require('@arr/foreach')
const filter = require('@arr/filter.mutate')
import { sheet, inserted } from './index'
import { keys } from './utils'

const RGX = /css(?:[a-zA-Z0-9-]*)-([a-zA-Z0-9]+)/gm

export { flush, css, injectGlobal, fontFace, keyframes, hydrate, objStyle } from './index'

export function extractCritical (html) {
  // parse out ids from html
  // reconstruct css/rules/cache to pass
  let o = { html, ids: [], css: '', rules: [] }
  let match
  let ids = {}
  while ((match = RGX.exec(html)) !== null) {
    if (!ids[match[1]]) {
      ids[match[1]] = true
    }
  }

  o.rules = filter(sheet.sheet.cssRules.slice(), x => {
    let match = RGX.exec(x.cssText)
    return match == null || ids[match[1]] || false
  })

  o.ids = filter(keys(inserted), id => !!ids[id])

  let css = ''
  forEach(o.rules, x => css += x.cssText)
  o.css = css

  return o
}
