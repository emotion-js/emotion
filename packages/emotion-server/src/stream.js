import through from 'through'
import tokenize from 'html-tokenize'
import pipe from 'multipipe'
import { inserted, registered } from 'emotion'

export default function extractCriticalToNodeStream() {
  let insed = {}
  const tokenStream = tokenize()
  let globalInserted = false

  const inlineStream = through(
    function write([type, data]) {
      if (type === 'open') {
        let css = ''
        let ids = {}

        if (globalInserted === false) {
          Object.keys(inserted)
            .filter(id => registered[`css-${id}`] === undefined)
            .forEach(id => {
              ids[id] = true
              css += inserted[id]
            })
          globalInserted = true
        }

        let match
        let fragment = data.toString()
        let regex = /css-([a-zA-Z0-9]+)/gm
        while ((match = regex.exec(fragment)) !== null) {
          if (insed[match[1]] === undefined) {
            ids[match[1]] = insed[match[1]] = true
          }
        }
        const keys = Object.keys(ids)
        keys.forEach(id => {
          css += inserted[id]
        })

        if (css !== '') {
          this.queue(
            `<style data-emotion-chunk="${keys.join(' ')}">${css}</style>`
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
