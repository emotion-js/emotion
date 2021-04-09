// @flow
import { generateStyleTag } from './inline'

const createConstructStyleTags = (cache, nonceString) => criticalData => {
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
