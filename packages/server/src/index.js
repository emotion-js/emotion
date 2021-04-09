// @flow
import createEmotionServer from './create-instance'
import { cache } from '@emotion/css'

export const {
  extractCritical,
  extractCritical2,
  renderStylesToString,
  renderStylesToNodeStream,
  constructStyleTags
} = createEmotionServer(cache)
