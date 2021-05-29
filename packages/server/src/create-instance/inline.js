// @flow
import type { EmotionCache } from '@emotion/utils'
import { generateStyleTag } from './utils'

const createRenderStylesToString =
  (cache: EmotionCache, nonceString: string) =>
  (html: string): string => {
    const { inserted, key: cssKey, registered } = cache
    const regex = new RegExp(`<|${cssKey}-([a-zA-Z0-9-_]+)`, 'gm')

    const seen = {}

    let result = ''
    let globalIds = ''
    let globalStyles = ''

    for (const id in inserted) {
      // eslint-disable-next-line no-prototype-builtins
      if (inserted.hasOwnProperty(id)) {
        const style = inserted[id]
        const key = `${cssKey}-${id}`
        if (style !== true && registered[key] === undefined) {
          globalStyles += style
          globalIds += ` ${id}`
        }
      }
    }

    if (globalStyles !== '') {
      result = generateStyleTag(
        cssKey,
        globalIds.substring(1),
        globalStyles,
        nonceString
      )
    }

    let ids = ''
    let styles = ''
    let lastInsertionPoint = 0
    let match

    while ((match = regex.exec(html)) !== null) {
      // $FlowFixMe
      if (match[0] === '<') {
        if (ids !== '') {
          result += generateStyleTag(
            cssKey,
            ids.substring(1),
            styles,
            nonceString
          )
          ids = ''
          styles = ''
        }
        // $FlowFixMe
        result += html.substring(lastInsertionPoint, match.index)
        // $FlowFixMe
        lastInsertionPoint = match.index
        continue
      }
      // $FlowFixMe
      const id = match[1]
      const style = inserted[id]
      if (style === true || style === undefined || seen[id]) {
        continue
      }

      seen[id] = true
      styles += style
      ids += ` ${id}`
    }

    result += html.substring(lastInsertionPoint)

    return result
  }

export default createRenderStylesToString
