// @flow
import type { EmotionCache } from '@emotion/utils'

const createExtractCritical = (cache: EmotionCache) => (html: string) => {
  // parse out ids from html
  // reconstruct css/rules/cache to pass
  const RGX = new RegExp(`${cache.key}-([a-zA-Z0-9-_]+)`, 'gm')

  const o = { html, ids: [], css: '' }
  let match
  const idsInHtml = {}
  while ((match = RGX.exec(html)) !== null) {
    // $FlowFixMe
    if (idsInHtml[match[1]] === undefined) {
      // $FlowFixMe
      idsInHtml[match[1]] = true
    }
  }

  o.ids = Object.keys(cache.inserted).filter(id => {
    const idIsDirectlyInHtml = typeof idsInHtml[id] !== 'undefined'
    const idIsGlobal =
      typeof cache.registered[`${cache.key}-${id}`] === 'undefined'

    if (idIsDirectlyInHtml || idIsGlobal) {
      // cache.inserted contains either strings or 'true'.
      // The latter should be ignored, and the type system requires this check to be inline.
      const valueToInsert = cache.inserted[id]
      if (valueToInsert !== true) {
        o.css += valueToInsert
        return true
      }
    }
  })

  return o
}

export default createExtractCritical
