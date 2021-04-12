// @flow
import type { EmotionCache } from '@emotion/utils'

const createExtractCritical2 = (cache: EmotionCache) => (html: string) => {
  // parse out ids from html
  // reconstruct css/rules/cache to pass
  let RGX = new RegExp(`${cache.key}-([a-zA-Z0-9-_]+)`, 'gm')

  let o = { html, styles: [] }
  let match
  let ids = {}
  while ((match = RGX.exec(html)) !== null) {
    // $FlowFixMe
    if (ids[match[1]] === undefined) {
      // $FlowFixMe
      ids[match[1]] = true
    }
  }

  const regularCssIds = []
  let regularCss = ''

  Object.keys(cache.inserted).forEach(id => {
    if (
      (ids[id] !== undefined ||
        cache.registered[`${cache.key}-${id}`] === undefined) &&
      cache.inserted[id] !== true
    ) {
      if (cache.registered[`${cache.key}-${id}`]) {
        // regular css can be added in one style tag
        regularCssIds.push(id)
        // $FlowFixMe
        regularCss += cache.inserted[id].toString()
      } else {
        // each global styles require a new entry so it can be independently flushed
        o.styles.push({ ids: [id], css: cache.inserted[id] })
      }
    }
  })

  // make sure that regular css is added after the global styles
  o.styles.push({ ids: regularCssIds, css: regularCss })

  return o
}

export default createExtractCritical2
