// @flow
import createEmotionServer from './create-instance'
import { cache } from '@emotion/css'

export const {
  extractCritical,
  extractCriticalToChunks,
  renderStylesToString,
  renderStylesToNodeStream,
  constructStyleTags
} = createEmotionServer(cache)
