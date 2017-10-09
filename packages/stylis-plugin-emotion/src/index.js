let queue = []
let parentQueue = []

export default insertRule =>
  function insertionPlugin(
    context,
    content,
    selectors,
    parents,
    line,
    column,
    length,
    id
  ) {
    switch (context) {
      case -2: {
        queue.forEach(insertRule)
        queue = []
        parentQueue = []
        break
      }

      case 2: {
        if (id === 0) {
          const selector = selectors.join(',')
          let parent = parents.join(',')
          const rule = `${selector}{${content}}`
          let index = parentQueue.indexOf(selector)
          if (index === -1) {
            index = parentQueue.length
          } else {
            let length = queue.length
            while (length--) {
              if (parentQueue[length] === selector) {
                parentQueue[length] = undefined
              }
            }
          }
          queue.splice(index, 0, rule)
          parentQueue.splice(index, 0, parent)
        }
        break
      }
      // after an at rule block
      case 3: {
        let parent = parents.join(',')
        parentQueue.push(parent)
        let chars = selectors.join('')
        const second = chars.charCodeAt(1)
        let child = content
        switch (second) {
          // s upports
          case 115:
          // d ocument
          // eslint-disable-next-line no-fallthrough
          case 100:
          // m edia
          // eslint-disable-next-line no-fallthrough
          case 109: {
            queue.push(chars + '{' + child + '}')
            break
          }
          // k eyframes
          case 107: {
            chars = chars.substring(1)
            child = chars + '{' + child + '}'
            queue.push('@-webkit-' + child)
            queue.push('@' + child)
            parentQueue.push(parent)
            break
          }
          default: {
            queue.push(chars + child)
            break
          }
        }
      }
    }
  }
