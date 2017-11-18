// @flow
import type { Emotion } from 'create-emotion'
import through from 'through'
import tokenize from 'html-tokenize'
import pipe from 'multipipe'

const createRenderStylesToNodeStream = (emotion: Emotion) => () => {
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
        let regex = /css-([a-zA-Z0-9-]+)/gm
        while ((match = regex.exec(fragment)) !== null) {
          if (match !== null && insed[match[1]] === undefined) {
            ids[match[1]] = true
          }
        }
        Object.keys(emotion.inserted).forEach(id => {
          if (
            insed[id] === undefined &&
            (ids[id] === true ||
              (emotion.registered[`css-${id}`] === undefined &&
                (ids[id] = true)))
          ) {
            insed[id] = true
            css += emotion.inserted[id]
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

export default createRenderStylesToNodeStream
