// @flow
import { t } from 'babel-types'
import camelizeStyleName from 'fbjs/lib/camelizeStyleName'
import prefixAll from 'inline-style-prefixer/static'
import parse from 'styled-components/lib/vendor/postcss-safe-parser/parse'
import postcssNested from 'styled-components/lib/vendor/postcss-nested'
import stringify from 'styled-components/lib/vendor/postcss/stringify'
import autoprefix from 'styled-components/lib/utils/autoprefix'
import { objStyle } from './index'
import postcssJs from 'postcss-js'

type CSSDecl = {
  parent: { selector: string, nodes: Array<mixed> },
  prop: string,
  value: string,
  remove: () => {}
}

export function parseCSS (
  css: string
): {
  isStaticBlock: boolean,
  styles: { [string]: any },
  composesCount: number
} {
  // todo - handle errors
  let root = parse(css)
  let vars = 0
  let composes: number = 0

  root.walkDecls((decl: CSSDecl): void => {
    if (decl.prop === 'composes') {
      if (!/xxx(\d+)xxx/gm.exec(decl.value)) {
        throw new Error('composes must be a interpolation')
      }
      if (decl.parent.nodes[0] !== decl) {
        throw new Error('composes must be the first rule')
      }
      const composeMatches = decl.value.match(/xxx(\d+)xxx/gm)
      const numOfComposes: number = !composeMatches ? 0 : composeMatches.length
      composes += numOfComposes
      vars += numOfComposes
      decl.remove()
    }
  })

  autoprefix(root)

  const styles = postcssJs.objectify(root)

  return {
    styles,
    isStaticBlock: vars === 0,
    composesCount: composes
  }
}
