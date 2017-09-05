// @flow
import Input from 'postcss/lib/input'
import Declaration from 'postcss/lib/declaration'
import Parser from 'postcss/lib/parser'
import postcssNested from 'postcss-nested'
import postcssJs from 'postcss-js'
import objParse from 'postcss-js/parser'
import autoprefixer from 'autoprefixer'
import { processStyleName } from 'emotion-utils'

export const staticProcessor = postcssJs.sync([autoprefixer, postcssNested])

export const processor = postcssJs.sync([autoprefixer])

type Decl = {
  parent: { selector: string, nodes: Array<mixed> },
  prop: string,
  value: string,
  remove: () => {}
}

export function parseCSS(
  css: string,
  extractStatic: boolean,
  filename: string
): {
  staticCSSRules: Array<string>,
  styles: { [string]: any },
  composesCount: number
} {
  // todo - handle errors
  let root
  if (typeof css === 'object') {
    root = objParse(css, { from: filename })
  } else {
    root = parse(css, { from: filename })
  }
  let vars = 0
  let composes: number = 0

  root.walkDecls((decl: Decl): void => {
    if (decl.prop === 'composes') {
      if (!/xxx(\d+)xxx/gm.exec(decl.value)) {
        throw new Error('composes must be a interpolation')
      }
      if (decl.parent.nodes[0] !== decl) {
        throw new Error('composes must be the first rule')
      }
      if (decl.parent.type !== 'root') {
        throw new Error('composes cannot be on nested selectors')
      }
      const composeMatches = decl.value.match(/xxx(\d+)xxx/gm)
      const numOfComposes: number = !composeMatches ? 0 : composeMatches.length
      composes += numOfComposes
      vars += numOfComposes
      decl.remove()
    }
  })

  const styles = expandCSSFallbacks(
    extractStatic ? staticProcessor(root) : processor(root)
  )

  return {
    styles,
    staticCSSRules:
      vars === 0 && extractStatic
        ? stringifyCSSRoot(postcssJs.parse(styles))
        : [],
    composesCount: composes
  }
}

function stringifyCSSRoot(root) {
  return root.nodes.map(node => node.toString())
}

export function expandCSSFallbacks(style: { [string]: any }) {
  let flattened = Object.keys(style).reduce((accum, key) => {
    if (Array.isArray(style[key])) {
      accum[key] = style[key].join(`; ${processStyleName(key)}: `)
    } else if (
      Object.prototype.toString.call(style[key]) === '[object Object]'
    ) {
      accum[key] = expandCSSFallbacks(style[key])
    } else {
      accum[key] = style[key]
    }
    return accum
  }, {})
  // todo -
  // flatten arrays which haven't been flattened yet
  return flattened
}

// Parser
export function parse(css: string, opts: Object) {
  let input = new Input(css, opts)

  let parser = new EmotionParser(input)
  parser.parse()

  return parser.root
}

export class EmotionParser extends Parser {
  unknownWord(tokens: Array<Array<any>>) {
    if (tokens[0][0] === 'word') {
      const match = /xxx(\d+)xxx/gm.exec(tokens[0][1])
      if (match) {
        this.init(
          new Declaration(
            { prop: `$${match[1]}`, value: tokens[0][1] },
            tokens[0][2],
            tokens[0][3]
          )
        )
        return
      }
    }
    this.spaces += tokens.map(i => i[1]).join('')
  }
}
