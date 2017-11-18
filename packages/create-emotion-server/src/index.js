// @flow
import type { Emotion } from 'create-emotion'
import createExtractCritical from './extract-critical'
import createRenderStylesToString from './inline'
import createRenderStylesToStream from './stream'

module.exports = function(emotion: Emotion) {
  return {
    extractCritical: createExtractCritical(emotion),
    renderStylesToString: createRenderStylesToString(emotion),
    renderStylesToNodeStream: createRenderStylesToStream(emotion)
  }
}
