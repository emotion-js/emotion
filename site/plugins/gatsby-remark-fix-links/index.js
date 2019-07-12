const visit = require('unist-util-visit')
const packages = require('../../docs-yaml').getPackagesDirs()

module.exports = ({ markdownAST }) => {
  visit(markdownAST, 'link', node => {
    node.url = node.url.replace(/^https?:\/\/emotion.sh/, '')
    if (!node.url.startsWith('//') && !node.url.startsWith('http')) {
      node.url = node.url
        .replace(/\.md(#.*)?$/, (match, hash) => {
          return hash || ''
        })
        .replace(/^\/packages\/(.+)(?:\/)/, (match, p1) => {
          return `/docs/${
            require(path.join(packages[p1], 'package.json')).name
          }`
        })
    }
  })
}
