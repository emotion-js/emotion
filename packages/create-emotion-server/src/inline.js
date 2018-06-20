// @flow
import type { Emotion } from 'create-emotion'

function generateStyleTag(
  cssKey: string,
  ids: string,
  styles: string,
  nonceString: string
) {
  return `<style data-emotion-${cssKey}="${ids.substring(
    1
  )}"${nonceString}>${styles}</style>`
}

const createRenderStylesToString = (emotion: Emotion, nonceString: string) => (
  html: string
): string => {
  const { inserted, key: cssKey, registered } = emotion.caches
  const regex = new RegExp(`<|${cssKey}-([a-zA-Z0-9-]+)`, 'gm')

  const seen = {}
  const order = {}

  let result = ''
  let globalIds = ''
  let globalStyles = ''

  let i = 0
  for (const id in inserted) {
    if (inserted.hasOwnProperty(id)) {
      const style = inserted[id]
      const key = `${cssKey}-${id}`
      if (style !== true && registered[key] === undefined) {
        globalStyles += style
        globalIds += ` ${id}`
      }
      order[id] = i++
    }
  }

  if (globalStyles !== '') {
    result = generateStyleTag(cssKey, globalIds, globalStyles, nonceString)
  }

  const styles = []
  let lastInsertionPoint = 0
  let match

  while ((match = regex.exec(html)) !== null) {
    if (match[0] === '<') {
      if (styles.length > 0) {
        let stylesString = ''
        let idsString = ''
        if (styles.length > 1) {
          styles.sort((a, b) => order[a.id] - order[b.id])
        }
        for (let j = 0; j < styles.length; j++) {
          stylesString += styles[j].style
          idsString += ` ${styles[j].id}`
        }
        result += generateStyleTag(cssKey, idsString, stylesString, nonceString)
        styles.length = 0
      }
      result += html.substring(lastInsertionPoint, match.index)
      lastInsertionPoint = match.index
      continue
    }

    const id = match[1]
    const style = inserted[id]
    if (style === true || seen[id]) {
      continue
    }

    seen[id] = true
    styles.push({ id, style })
  }

  result += html.substring(lastInsertionPoint)

  return result
}

export default createRenderStylesToString
