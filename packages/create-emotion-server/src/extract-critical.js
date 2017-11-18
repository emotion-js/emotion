// @flow
import type { Emotion } from 'create-emotion'

const createExtractCritical = (emotion: Emotion) => (html: string) => {
  // parse out ids from html
  // reconstruct css/rules/cache to pass
  const RGX = /css-([a-zA-Z0-9-]+)/gm

  let o = { html, ids: [], css: '' }
  let match
  let ids = {}
  while ((match = RGX.exec(html)) !== null) {
    if (ids[match[1]] === undefined) {
      ids[match[1]] = true
    }
  }

  o.ids = Object.keys(emotion.caches.inserted).filter(id => {
    if (
      (ids[id] === true ||
        emotion.caches.registered[`css-${id}`] === undefined) &&
      emotion.caches.inserted[id] !== true
    ) {
      o.css += emotion.caches.inserted[id]
      return true
    }
  })

  return o
}

export default createExtractCritical
