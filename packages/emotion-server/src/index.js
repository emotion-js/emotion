// @flow
import createEmotionServer from 'create-emotion-server'
import { cache } from 'emotion'

export const {
  extractCritical,
  renderStylesToString,
  renderStylesToNodeStream
} = createEmotionServer(cache)
