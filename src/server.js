import { sheet, inserted } from './index'

export function extractCritical (html) {
  // parse out ids from html
  // reconstruct css/rules/cache to pass
  let o = { html, ids: [], css: '', rules: [] }
  let regex = /css(?:[a-zA-Z0-9-]*)-([a-zA-Z0-9]+)/gm
  let match
  let ids = {}
  while ((match = regex.exec(html)) !== null) {
    if (!ids[match[1] + '']) {
      ids[match[1] + ''] = true
    }
  }

  o.rules = sheet.sheet.cssRules.filter(x => {
    let regex = /css(?:[a-zA-Z0-9-]*)-([a-zA-Z0-9]+)/gm
    let match = regex.exec(x.cssText)
    if (match && ids[match[1] + '']) {
      return true
    }
    if (!match) {
      return true
    }
    return false
  })
  o.ids = Object.keys(inserted).filter(id => !!ids[id + ''])
  o.css = o.rules.map(x => x.cssText).join('')

  return o
}
