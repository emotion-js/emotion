// @flow
// https://github.com/thysultan/stylis.js/tree/master/plugins/rule-sheet
// inlined to avoid umd wrapper and peerDep warnings/installing stylis
// since we use stylis after closure compiler

import type { StylisPlugin } from './types'

const delimiter = '/*|*/'
const needle = delimiter + '}'

function toSheet(block) {
  if (block) {
    current.push(block + '}')
  }
}

let ruleSheet: StylisPlugin = (
  context,
  content,
  selectors,
  parents,
  line,
  column,
  length,
  ns,
  depth,
  at
) => {
  switch (context) {
    case -1: {
      current = []
      break
    }
    // property
    case 1: {
      switch (content.charCodeAt(0)) {
        case 64: {
          // @import
          if (depth === 0) {
            current.push(content + ';')
            return ''
          }
          break
        }
        // charcode for l
        case 108: {
          // charcode for b
          // this ignores label
          if (content.charCodeAt(2) === 98) {
            return ''
          }
        }
      }
      break
    }
    // selector
    case 2: {
      if (ns === 0) return content + delimiter
      break
    }
    // at-rule
    case 3: {
      switch (ns) {
        // @font-face, @page
        case 102:
        case 112: {
          current.push(selectors[0] + content)
          return ''
        }
        default: {
          return content + (at === 0 ? delimiter : '')
        }
      }
    }
    case -2: {
      content.split(needle).forEach(toSheet)
      return current
    }
  }
}

let current

export default ruleSheet
