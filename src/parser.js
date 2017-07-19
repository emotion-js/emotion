// @flow
import { t } from 'babel-types'
import parse from 'styled-components/lib/vendor/postcss-safe-parser/parse'
import postcssNested from 'styled-components/lib/vendor/postcss-nested'
import stringify from 'styled-components/lib/vendor/postcss/stringify'
import autoprefix from 'styled-components/lib/utils/autoprefix'
// import camelizeStyleName from 'fbjs/lib/camelizeStyleName'
import postcssJs from 'postcss-js'
import { objStyle } from './index'

let prefixer = postcssJs.sync([autoprefix ]);

type Rule = {
  parent: { selector: string, nodes: Array<mixed> },
  selector: string,
  remove: () => {}
}

type Decl = {
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

  postcssNested(root)

  root.walkRules((rule: Rule) => {
    // TODO: do this everywhere except `,xxx9xxx`
    if (/\bxxx\d+xxx/.exec(rule.selector)) {
      rule.selector = `.${rule.selector}`
    }
  })

  root.walkDecls((decl: Decl): void => {
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

  const styles = prefixer(postcssJs.objectify(root))

  return {
    styles,
    isStaticBlock: vars === 0,
    composesCount: composes
  }
}

