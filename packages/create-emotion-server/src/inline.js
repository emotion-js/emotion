// @flow
import type { Emotion } from 'create-emotion'

function toTag(
  emotion: Emotion,
  ids: Array<string>,
  thing: { keys: Array<string> },
  nonceString: string
) {
  let idhash = ids.reduce((o, x) => {
    o[x] = true
    return o
  }, {})
  let styles = ''
  let idHydration = ''
  thing.keys = thing.keys.filter(id => {
    if (idhash[id] !== undefined && emotion.caches.inserted[id] !== true) {
      styles += emotion.caches.inserted[id]
      idHydration += ` ${id}`
    }
    return true
  })
  return `<style data-emotion-${emotion.caches.key}="${idHydration.substring(
    1
  )}"${nonceString}>${styles}</style>`
}

const createRenderStylesToString = (emotion: Emotion, nonceString: string) => (
  html: string
): string => {
  let regex = new RegExp(`<|${emotion.caches.key}-([a-zA-Z0-9-]+)`, 'gm')

  let match
  let lastBackIndex = 0
  let idBuffer = []
  let result = ''
  let insed = {}
  let keys = Object.keys(emotion.caches.inserted)
  let globalStyles = ''
  let globalIds = ''
  keys = keys.filter(id => {
    if (
      emotion.caches.registered[`${emotion.caches.key}-${id}`] === undefined &&
      emotion.caches.inserted[id] !== true
    ) {
      globalStyles += emotion.caches.inserted[id]
      globalIds += ` ${id}`
      return false
    }
    return true
  })
  if (globalStyles !== '') {
    result += `<style data-emotion-${emotion.caches.key}="${globalIds.substring(
      1
    )}"${nonceString}>${globalStyles}</style>`
  }
  const thing = { keys }
  while ((match = regex.exec(html)) !== null) {
    if (match[0] === '<') {
      idBuffer = idBuffer.filter(x => !insed[x])
      if (idBuffer.length > 0) {
        result += toTag(emotion, idBuffer, thing, nonceString)
      }
      result += html.substring(lastBackIndex, match.index)
      lastBackIndex = match.index
      idBuffer.forEach(x => {
        insed[x] = true
      })
      idBuffer = []
    } else {
      idBuffer.push(match[1])
    }
  }
  result += html.substring(lastBackIndex, html.length)
  return result
}

export default createRenderStylesToString
