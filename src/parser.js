const parse = require('styled-components/lib/vendor/postcss-safe-parser/parse')
const postcssNested = require('styled-components/lib/vendor/postcss-nested')
const stringify = require('styled-components/lib/vendor/postcss/stringify')
const autoprefix = require('styled-components/lib/utils/autoprefix')


module.exports = function parser (css, options = {}) {
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
