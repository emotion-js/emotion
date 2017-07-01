// @flow
import parse from 'styled-components/lib/vendor/postcss-safe-parser/parse'
import postcssNested from 'styled-components/lib/vendor/postcss-nested'
import stringify from 'styled-components/lib/vendor/postcss/stringify'
import autoprefix from 'styled-components/lib/utils/autoprefix'
import { PLACEHOLDER_REGEX } from './utils'

export function parseCSS (
  css: string,
  options: {
    nested?: boolean,
    inlineMode: boolean,
    matches: number,
    name: string,
    hash: string,
    canCompose: boolean
  } = {
    nested: true,
    inlineMode: true,
    matches: 0,
    name: 'name',
    hash: 'hash',
    canCompose: false
  }
): { rules: string[], hasOtherMatch: boolean, hasVar: boolean, composes: number } {
  // todo - handle errors
  const root = parse(css)
  if (options.nested !== false) postcssNested(root)

  let vars = 0
  let composes = 0
  root.walkDecls(decl => {
    if (decl.prop === 'name') decl.remove()
    if (options.canCompose) {
      if (decl.prop === 'composes') {
        if (decl.parent.selector !== `.${options.name}-${options.hash}`) {
          throw new Error('composes cannot be on nested selectors')
        }
        if (!PLACEHOLDER_REGEX.exec(decl.value)) {
          throw new Error('composes must be a interpolation')
        }
        if (decl.parent.nodes[0] !== decl) {
          throw new Error('composes must be the first rule')
        }
        const numOfComposes = decl.value.match(PLACEHOLDER_REGEX).length
        composes += numOfComposes
        vars += numOfComposes
        return decl.remove()
      }
    }
    if (!options.inlineMode) {
      const match = PLACEHOLDER_REGEX.exec(decl.value)
      if (match) {
        vars++
      }
    }
  })
  if (!options.inlineMode && vars === options.matches) {
    root.walkDecls((decl) => {
      decl.value = decl.value.replace(PLACEHOLDER_REGEX, (match, p1) => {
        return `var(--${options.name}-${options.hash}-${p1})`
      })
    })
  }

  autoprefix(root)
  return {
    rules: stringifyCSSRoot(root),
    hasOtherMatch: vars !== options.matches,
    hasVar: (!!vars && vars !== composes) || !!(options.inlineMode && options.matches),
    composes
  }
}

function stringifyCSSRoot (root) {
  return root.nodes.map((node, i) => {
    let str = ''
    stringify(node, x => {
      str += x
    })
    return str
  })
}
