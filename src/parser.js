// @flow
import parse from 'styled-components/lib/vendor/postcss-safe-parser/parse'
import postcssNested from 'styled-components/lib/vendor/postcss-nested'
import stringify from 'styled-components/lib/vendor/postcss/stringify'
import autoprefix from 'styled-components/lib/utils/autoprefix'

export function parseCSS (
  css: string,
  options: { nested: boolean } = {
    nested: true
  }
): string[] {
  // todo - handle errors
  const root = parse(css)
  if (options.nested !== false) postcssNested(root)
  autoprefix(root)

  root.walkDecls(decl => {
    if (decl.prop === 'name') decl.remove()
  })

  return stringifyCSSRoot(root)
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
