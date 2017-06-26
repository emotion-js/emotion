// @flow
import parse from 'styled-components/lib/vendor/postcss-safe-parser/parse'
import postcssNested from 'styled-components/lib/vendor/postcss-nested'
import stringify from 'styled-components/lib/vendor/postcss/stringify'
import autoprefix from 'styled-components/lib/utils/autoprefix'

export function parseCSS (
  css: string,
  options: { nested: boolean, extract: boolean } = {
    nested: true,
    extract: false
  }
) {
  // todo - handle errors
  const root = parse(css)
  if (options.nested !== false) postcssNested(root)
  autoprefix(root)

  root.walkDecls(decl => {
    if (decl.prop === 'name') decl.remove()
  })
  if (options.extract) {
    const staticRoot = root.clone()
    root.walkRules(rule => {
      rule.walkDecls(decl => {
        const value = decl.value
        if (!value.startsWith('var(--css-')) {
          decl.remove()
        }
      })
      if (rule.nodes.length === 0) {
        rule.remove()
      }
    })
    staticRoot.walkRules(rule => {
      rule.walkDecls(decl => {
        const value = decl.value
        if (value.startsWith('var(--css-')) {
          decl.remove()
        }
      })
      rule.walkAtRules((atRule) => {
        if (atRule.name === 'apply') {
          atRule.remove()
        }
      })
      if (rule.nodes.length === 0) {
        rule.remove()
      }
    })
    return {
      static: stringifyCSSRoot(staticRoot),
      dynamic: stringifyCSSRoot(root)
    }
  }

  return { dynamic: stringifyCSSRoot(root), static: [] }
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
