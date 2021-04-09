// @flow
import type { EmotionCache } from '@emotion/utils'
import { generateStyleTag } from './inline'

const createConstructStyleTags = (
  cache: EmotionCache,
  nonceString: string
) => (criticalData: {
  html: string,
  styles: Array<{ ids: Array<string>, css: string }>
}) => {
  return criticalData.styles.reduce((acc, item) => {
    return (
      acc +
      generateStyleTag(cache.key, item.ids.join(' '), item.css, nonceString)
    )
  }, '')
}

export default createConstructStyleTags
