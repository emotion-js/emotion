const postcss = require('postcss')
var loaderUtils = require('loader-utils')
const processCss = require('css-loader/lib/processCss')
const postcssNested = require('styled-components/lib/vendor/postcss-nested')

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
      mode: 'local',
      from: loaderUtils.getRemainingRequest(this).split('!').pop(),
      to: loaderUtils.getCurrentRequest(this).split('!').pop(),
      minimize: this.minimize,
      loaderContext: this,
      sourceMap: false,
      query: query
    },
    function (err, { source, exports }) {
      console.log(JSON.stringify(exports, null, 2))
      // console.log('src', source)
      let root = postcss.parse(source)
      postcssNested(root)

      let newSrc = `const css = require('emotion').css;`

      root.walkRules(rule => {
        let selector = rule.selector
        let inner = ''
        rule.walkDecls(decl => {
          inner += extract(content, decl.source.start, decl.source.end)
        })

        newSrc += '\n'
        newSrc += `${selector} = css\`\n${inner}\`;\n\n`
      })

  //     let rules = root.nodes.map(n => {
  //       // console.log(JSON.stringify(n, null, 2))
  //       return extract(content, n.source.start, n.source.end)
  //     })
  //     let newSrc = `const css = require('emotion').css;
  //
  //
  //   ${rules
  //     .map(rule => {
  //       return `css\`\n${rule}\`;`
  //     })
  //     .join('\n\n')}
  // `
      console.log(exports)
      Object.keys(exports).map(name => {
        const cls = exports[name]
        console.log(name, ':', cls)
      })
      this.callback(err, newSrc)
    }.bind(this)
  )
  // let ast = postcss.parse(content)
  //
  // let rules = ast.nodes.map(n => {
  //   // console.log(JSON.stringify(n, null, 2))
  //   return extract(content, n.source.start, n.source.end)
  // })
  // let newSrc = `const css = require('emotion').css;
  //   ${rules
  //     .map(rule => {
  //       return `css\`\n${rule}\`;`
  //     })
  //     .join('\n\n')}
  // `
  // // return newSrc
}
