// @flow
import type { EmotionCache } from '@emotion/utils'

const createExtractCritical2 = (cache: EmotionCache) => (html: string) => {
  // parse out ids from html
  // reconstruct css/rules/cache to pass
  let RGX = new RegExp(`${cache.key}-([a-zA-Z0-9-_]+)`, 'gm')

  let o = { html, ids: [], css: '', globalCss: [] }
  let match
  let ids = {}
  while ((match = RGX.exec(html)) !== null) {
    // $FlowFixMe
    if (ids[match[1]] === undefined) {
      // $FlowFixMe
      ids[match[1]] = true
    }
  }

  o.ids = Object.keys(cache.inserted).filter(id => {
    if (
      (ids[id] !== undefined ||
        cache.registered[`${cache.key}-${id}`] === undefined) &&
      cache.inserted[id] !== true
    ) {
      if (cache.registered[`${cache.key}-${id}`]) {
        o.css += cache.inserted[id]
      } else {
        o.globalCss.push(cache.inserted[id])
      }
      return true
    }
  })

  return o
}

export default createExtractCritical2
