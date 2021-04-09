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
  let result = ''

  // insert global styles first
  criticalData.styles.forEach(item => {
    result += generateStyleTag(
      cache.key,
      item.ids.join(' '),
      item.css,
      nonceString
    )
  })

  return result
}

export default createConstructStyleTags
