// @flow
import parse from 'styled-components/lib/vendor/postcss-safe-parser/parse'
import postcssNested from 'styled-components/lib/vendor/postcss-nested'
import stringify from 'styled-components/lib/vendor/postcss/stringify'
import autoprefix from 'styled-components/lib/utils/autoprefix'

type CSSDecl = {
  parent: { selector: string, nodes: Array<mixed> },
  prop: string,
  value: string,
  remove: () => {},
}

export function parseCSS(
  css: string,
  options: {
    nested?: boolean,
    inlineMode: boolean,
    matches: number,
    name: string,
    hash: string,
    canCompose?: boolean,
    extractStatic?: boolean,
  } = {
    nested: true,
    inlineMode: true,
    matches: 0,
    name: 'name',
    hash: 'hash',
    canCompose: false,
    extractStatic: false,
  },
): {
  rules: string[],
  hasOtherMatch: boolean,
  hasVar: boolean,
  composes: number,
  hasCssFunction: boolean,
} {
  // todo - handle errors
  const root = parse(css)
  if (options.nested !== false) postcssNested(root)

  let vars = 0
  let composes: number = 0
  let hasCssFunction = false
  const staticRoot = root.clone()
  root.walkDecls((decl: CSSDecl): void => {
    if (decl.prop === 'name') decl.remove()
    if (decl.value.match(/attr/)) {
      hasCssFunction = true
    }
    if (options.canCompose) {
      if (decl.prop === 'composes') {
        if (decl.parent.selector !== `.${options.name}-${options.hash}`) {
          throw new Error('composes cannot be on nested selectors')
        }
        if (!/xxx(\d+)xxx/gm.exec(decl.value)) {
          throw new Error('composes must be a interpolation')
        }
        if (decl.parent.nodes[0] !== decl) {
          throw new Error('composes must be the first rule')
        }
        // Update the selector to increase specificity
        decl.parent.selector = decl.parent.selector + decl.parent.selector
        const composeMatches = decl.value.match(/xxx(\d+)xxx/gm)
        const numOfComposes: number = !composeMatches ? 0 : composeMatches.length
        composes += numOfComposes
        vars += numOfComposes
        decl.remove()
        return
      }
    }
    if (!options.inlineMode) {
      const match = /xxx(\d+)xxx/gm.exec(decl.value)
      if (match) {
        vars++
      }
    }
  })
  if (!options.inlineMode && vars === options.matches && !hasCssFunction) {
    root.walkDecls(decl => {
      decl.value = decl.value.replace(/xxx(\d+)xxx/gm, (match, p1) => {
        return `var(--${options.name}-${options.hash}-${p1})`
      })
    })
  }

  root.walkRules(rule => {
    if (rule.nodes.length === 0) {
      rule.remove()
    }
  })

  if (options.extractStatic) {
    staticRoot.walkDecls((decl: CSSDecl): void => {
      if (decl.prop === 'name') decl.remove()
      debugger
      if (decl.prop === 'composes') {
        decl.parent.selector = decl.parent.selector + decl.parent.selector
        decl.remove()
      }
      if (/xxx(\d+)xxx/gm.exec(decl.value)) decl.remove()
    })
    staticRoot.walkRules(rule => {
      if (rule.nodes.length === 0) rule.remove()
    })
  }

  autoprefix(root)
  autoprefix(staticRoot)
  return {
    rules: stringifyCSSRoot(root),
    hasOtherMatch: vars !== options.matches,
    hasVar: (!!vars && vars !== composes) || !!(options.inlineMode && options.matches),
    composes,
    hasCssFunction,
    staticRules: stringifyCSSRoot(staticRoot),
  }
}

function stringifyCSSRoot(root) {
  return root.nodes.map((node, i) => {
    let str = ''
    stringify(node, x => {
      str += x
    })
    return str
  })
}
