const postcss = require('postcss')
var loaderUtils = require('loader-utils')
const processCss = require('css-loader/lib/processCss')

function toIndex (str, { line, column }) {
  let regex = /\n/gm,
    index = 0
  for (let i = 0; i < line - 1; i++) {
    index = regex.exec(str).index
  }
  return index + column
}

function extract (css, start, end) {
  return css.substring(toIndex(css, start) - 1, toIndex(css, end) + 1).trim()
}

module.exports = function (content) {
  const query = loaderUtils.getOptions(this) || {}
  const moduleMode = query.modules || query.module
  const callback = this.async()

  processCss(
    content,
    null,
    {
      mode: moduleMode ? 'local' : 'global',
      from: loaderUtils.getRemainingRequest(this).split('!').pop(),
      to: loaderUtils.getCurrentRequest(this).split('!').pop(),
      minimize: this.minimize,
      loaderContext: this,
      sourceMap: false,
      query: query
    },
    function (err, { source, exports }) {
      let ast = postcss.parse(source)
      let newSrc = `const css = require('emotion').css;`
  //   ${rules
  //       .map(rule => {
  //         return `css\`\n${rule}\`;`
  //       })
  //       .join('\n\n')}
  // `
  //
  //     Object.keys(exports).map((name) => {
  //       const cls = exports[name]
  //
  //     })
      this.callback(err, newSrc)
    }.bind(this)
  )
  let ast = postcss.parse(content)

  let rules = ast.nodes.map(n => {
    // console.log(JSON.stringify(n, null, 2))
    return extract(content, n.source.start, n.source.end)
  })
  let newSrc = `const css = require('emotion').css;
    ${rules
      .map(rule => {
        return `css\`\n${rule}\`;`
      })
      .join('\n\n')}
  `
  // return newSrc
}
