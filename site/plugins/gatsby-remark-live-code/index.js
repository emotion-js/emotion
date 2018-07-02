const visit = require('unist-util-visit')
const escapeGoat = require('escape-goat')
const Babel = require('babel-standalone')

module.exports = ({ markdownAST }) => {
  visit(markdownAST, `code`, node => {
    if (node.lang === 'jsx live') {
      node.type = `html`
      node.value = escapeGoat.escapeTag`<live-code code="${
        node.value
      }" compiled="${
        Babel.transform(node.value, {
          presets: ['es2015', 'react', 'stage-1'],
          plugins: [require('babel-plugin-emotion').default]
        }).code
      }"></live-code>`
    }
  })
}
