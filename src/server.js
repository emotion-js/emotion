import forEach from '@arr/foreach'
import filter from '@arr/filter.mutate'
import { sheet, inserted } from './index'
import { keys } from './utils'

const RGX = /(?:css|vars)(?:[a-zA-Z0-9-]*)-([a-zA-Z0-9]+)/gm
const VAR_RGX = /(?:vars)(?:[a-zA-Z0-9-]*)-([a-zA-Z0-9]+)/gm

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
    // check for vars match first because it is a different format
    // e.g. .vars-176qc2r {--css-Home-1wjhkv7-0: 0; --css-Home-1wjhkv7-1: 1}
    const varMatch = VAR_RGX.exec(x.cssText)

    if (varMatch == null) {
      // no vars, proceed with normal css check
      const cssMatch = RGX.exec(x.cssText)

      return cssMatch == null || ids[cssMatch[1]] || false
    }

    return ids[varMatch[1]] || false
  })

  o.ids = filter(keys(inserted), id => !!ids[id])

  let css = ''
  forEach(o.rules, x => css += x.cssText)
  o.css = css

  return o
}
