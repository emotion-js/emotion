// @flow
import type { EmotionCache } from '@emotion/utils'

const createExtractCritical = (cache: EmotionCache) => (html: string) => {
  // parse out ids from html
  // reconstruct css/rules/cache to pass
  let RGX = new RegExp(`${cache.key}-([a-zA-Z0-9-_]+)`, 'gm')

  let o = { html, css: '' }
  let match
  let ids = {}
  while ((match = RGX.exec(html)) !== null) {
    // $FlowFixMe
    if (ids[match[1]] === undefined) {
      // $FlowFixMe
      ids[match[1]] = true
    }
  }

  Object.keys(cache.inserted).forEach(id => {
    if (
      (ids[id] !== undefined ||
        cache.registered[`${cache.key}-${id}`] === undefined) &&
      cache.inserted[id] !== true
    ) {
      o.css += cache.inserted[id]
    }
  })

  return o
}

export default createExtractCritical
