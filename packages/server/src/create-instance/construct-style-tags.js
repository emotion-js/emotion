// @flow
import type { EmotionCache } from '@emotion/utils'
import { generateStyleTag } from './utils'

const createConstructStyleTags = (
  cache: EmotionCache,
  nonceString: string
) => (criticalData: {
  html: string,
  styles: Array<{ ids: Array<string>, css: string }>
}) => {
  let styleTagsString = ''

  criticalData.styles.forEach(item => {
    styleTagsString += generateStyleTag(
      item.key || cache.key,
      item.ids.join(' '),
      item.css,
      nonceString
    )
  })

  return styleTagsString
}

export default createConstructStyleTags
