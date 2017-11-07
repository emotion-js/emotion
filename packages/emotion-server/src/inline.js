import { inserted, registered, names } from 'emotion'

function toTag(ids, thing) {
  let idhash = ids.reduce((o, x) => {
    o[x + ''] = true
    return o
  }, {})
  let styles = ''
  let idHydration = ''
  thing.keys = thing.keys.filter(id => {
    if (idhash[names[id]] !== undefined) {
      styles += inserted[id]
      idHydration += ` ${id}`
    }
    return true
  })

  return `<style data-emotion-chunk="${idHydration.substring(
    1
  )}">${styles}</style>`
}

export default function inline(html) {
  let regex = /<|css-([a-zA-Z0-9-]+)/gm

  let match
  let lastBackIndex = 0
  let idBuffer = []
  let result = []
  let insed = {}
  let keys = Object.keys(inserted)
  let globalStyles = ''
  let globalIds = ''
  keys = keys.filter(id => {
    if (registered[`css-${names[id]}`] === undefined) {
      globalStyles += inserted[id]
      globalIds += ` ${id}`
      return false
    }
    return true
  })
  if (globalStyles !== '') {
    result.push(
      `<style data-emotion-chunk="${globalIds.substring(
        1
      )}">${globalStyles}</style>`
    )
  }
  const thing = { keys }
  while ((match = regex.exec(html)) !== null) {
    if (match[0] === '<') {
      idBuffer = idBuffer.filter(x => !insed[x])
      idBuffer.length > 0 && result.push(toTag(idBuffer, thing))
      result.push(html.substring(lastBackIndex, match.index))
      lastBackIndex = match.index
      idBuffer.forEach(x => {
        insed[x] = true
      })
      idBuffer = []
    } else {
      idBuffer.push(match[1])
    }
  }
  result.push(html.substring(lastBackIndex, html.length))
  return result.join('')
}
