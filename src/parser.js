// @flow
import parse from 'styled-components/lib/vendor/postcss-safe-parser/parse'
import postcssNested from 'styled-components/lib/vendor/postcss-nested'
import stringify from 'styled-components/lib/vendor/postcss/stringify'
import autoprefix from 'styled-components/lib/utils/autoprefix'
import stringifyRules from 'styled-components/lib/utils/stringifyRules'

export function parseCSS (css, options = {}) {
  // todo - handle errors
  const root = parse(css)
  if (options.nested !== false) postcssNested(root)
  autoprefix(root)

  return root.nodes.map((node, i) => {
    let str = ''
    stringify(node, x => {
      str += x
    })
    return str
  })
}

export function parseKeyframe (keyframeString: String, name: String): Array<mixed> {
  const generatedCSS = stringifyRules(keyframeString, name, '@keyframes')
  console.log(generatedCSS)
}
