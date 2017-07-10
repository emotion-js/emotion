import filter from '@arr/filter'
import forEach from '@arr/foreach'
import { sheet, inserted } from './index'
import { keys } from './utils'

const RGX = /css(?:[a-zA-Z0-9-]*)-([a-zA-Z0-9]+)/gm

export function extractCritical (html) {
  // parse out ids from html
  // reconstruct css/rules/cache to pass
  let o = { html, ids: [], css: '', rules: [] }
  let match
  let ids = {}
  while ((match = RGX.exec(html)) !== null) {
    if (!ids[match[1] + '']) {
      ids[match[1] + ''] = true
    }
  }

  o.rules = sheet.sheet.cssRules.filter(x => {
    let match = RGX.exec(x.cssText)
    return match && ids[match[1] + ''] || !match || false;
  })

  o.ids = filter(keys(inserted), id => !!ids[id + ''])

  let css = ''
  forEach(o.rules, x => css += x.cssText)
  o.css = css;

  return o
}
