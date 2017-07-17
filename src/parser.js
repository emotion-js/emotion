// @flow
import { t } from 'babel-types'
import camelizeStyleName from 'fbjs/lib/camelizeStyleName'
import prefixAll from 'inline-style-prefixer/static'
import parse from 'styled-components/lib/vendor/postcss-safe-parser/parse'
import postcssNested from 'styled-components/lib/vendor/postcss-nested'
import stringify from 'styled-components/lib/vendor/postcss/stringify'
import autoprefix from 'styled-components/lib/utils/autoprefix'
import { objStyle } from './index'

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

  const objStyles = {}

  root.walkRules((rule, i) => {
    if (rule.nodes.length === 0) {
      rule.remove()
    }

    const { selector } = rule
    const style = (objStyles[selector] = objStyles[selector] || {})

    rule.walkDecls((decl: CSSDecl): void => {
      const match = /xxx(\d+)xxx/gm.exec(decl.value)
      if (match) {
        vars++
      }

      style[camelizeStyleName(decl.prop)] = decl.value
    })
  })

  root.walkAtRules((atRule, i) => {
    const { name, params } = atRule
    const key = `@${name} ${params}`.trim()
    const atRuleStyle = (objStyles[key] = objStyles[key] || {})

    atRule.walkRules((rule, i) => {
      if (rule.nodes.length === 0) {
        rule.remove()
      }

      // console.log(JSON.stringify(rule, null, 2))
      const { selector } = rule
      const style = (atRuleStyle[selector] = atRuleStyle[selector] || {})

      rule.walkDecls((decl: CSSDecl): void => {
        const match = /xxx(\d+)xxx/gm.exec(decl.value)
        if (match) {
          vars++
        }

        style[camelizeStyleName(decl.prop)] = decl.value
      })
    })
  })

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

  const prefixedObjStyles = prefixAll(objStyles)
  console.log(prefixedObjStyles)

  return {
    styles: prefixedObjStyles,
    isStaticBlock: vars === 0,
    composesCount: composes
  }
}
