import { inserted, registered, names } from 'emotion'

export * from 'emotion'

export function extractCritical(html) {
  // parse out ids from html
  // reconstruct css/rules/cache to pass
  const RGX = /css-([a-zA-Z0-9]+)/gm

  let o = { html, ids: [], css: '' }
  let match
  let ids = {}
  while ((match = RGX.exec(html)) !== null) {
    if (ids[match[1]] === undefined) {
      ids[match[1]] = true
    }
  }

  o.ids = Object.keys(inserted).filter(id => {
    if (ids[id] === true || registered[`css-${names[id]}`] === undefined) {
      o.css += inserted[id]
      return true
    }
  })

  return o
}

export { default as renderStylesToString } from './inline'

export { default as renderStylesToNodeStream } from './stream'
