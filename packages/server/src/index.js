// @flow
import createEmotionServer from './create-instance'
import { cache } from 'emotion'

export const {
  extractCritical,
  renderStylesToString,
  renderStylesToNodeStream
} = createEmotionServer(cache)
