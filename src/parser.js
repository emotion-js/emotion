// @flow
import parse from 'styled-components/lib/vendor/postcss-safe-parser/parse'
import postcssNested from 'styled-components/lib/vendor/postcss-nested'
import stringify from 'styled-components/lib/vendor/postcss/stringify'
import autoprefix from 'styled-components/lib/utils/autoprefix'

export function parseCSS (
  css: string,
  options: {
    nested?: boolean,
    inlineMode: boolean,
    otherMatches: number,
    name: string,
    hash: string
  } = {
    nested: true,
    inlineMode: true,
    otherMatches: 0,
    name: 'name',
    hash: 'hash'
  }
): { rules: string[], hasOtherMatch: boolean, hasVar: boolean } {
  // todo - handle errors
  const root = parse(css)
  if (options.nested !== false) postcssNested(root)

  let vars = 0

  root.walkDecls(decl => {
    if (decl.prop === 'name') decl.remove()
    if (!options.inlineMode) {
      const re = /xxx(\S)xxx/gm
      const match = re.exec(decl.value)
      if (match) {
        vars++
        decl.value = decl.value.replace(match[0], `var(--${options.name}-${options.hash}-${match[1]})`)
      }
    }
  })

  autoprefix(root)

  return {
    rules: stringifyCSSRoot(root),
    hasOtherMatch: vars !== options.otherMatches,
    hasVar: !!vars || !!(options.inlineMode && options.otherMatches)
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
