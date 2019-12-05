// @flow
import createEmotionServer from './create-instance'
import { cache } from '@emotion/css'

export const {
  extractCritical,
  renderStylesToString,
  renderStylesToNodeStream
} = createEmotionServer(cache)
