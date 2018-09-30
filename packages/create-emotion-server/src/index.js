// @flow
import type { EmotionCache } from '@emotion/utils'
import createExtractCritical from './extract-critical'
import createRenderStylesToString from './inline'
import createRenderStylesToStream from './stream'

export default function(cache: EmotionCache) {
  if (cache.compat !== true) {
    // is this good? should we do this automatically?
    // this is only for when using the new apis (not emotion or create-emotion)
    cache.compat = true
  }
  const nonceString = cache.nonce !== undefined ? ` nonce="${cache.nonce}"` : ''
  return {
    extractCritical: createExtractCritical(cache),
    renderStylesToString: createRenderStylesToString(cache, nonceString),
    renderStylesToNodeStream: createRenderStylesToStream(cache, nonceString)
  }
}
