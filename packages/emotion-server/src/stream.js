import through from 'through'
import tokenize from 'html-tokenize'
import pipe from 'multipipe'
import { inserted, registered, names } from 'emotion'

export default function renderStylesToNodeStream() {
  let insed = {}
  const tokenStream = tokenize()

  const inlineStream = through(
    function write(thing) {
      let [type, data] = thing
      if (type === 'open') {
        let css = ''
        let ids = {}

        let match
        let fragment = data.toString()
        let regex = /css-([a-zA-Z0-9]+)/gm
        while ((match = regex.exec(fragment)) !== null) {
          if (match !== null && insed[match[1]] === undefined) {
            ids[match[1]] = true
          }
        }
        Object.keys(inserted).forEach(id => {
          if (
            insed[id] === undefined &&
            (ids[id] === true ||
              (registered[`css-${names[id]}`] === undefined &&
                (ids[id] = true)))
          ) {
            insed[id] = true
            css += inserted[id]
          }
        })

        if (css !== '') {
          this.queue(
            `<style data-emotion-chunk="${Object.keys(ids).join(
              ' '
            )}">${css}</style>`
          )
        }
      }
      this.queue(data)
    },
    function end() {
      this.queue(null)
    }
  )

  return pipe(tokenStream, inlineStream)
}
