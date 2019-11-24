const visit = require('unist-util-visit')

module.exports = ({ markdownAST }) => {
  visit(markdownAST, 'link', node => {
    node.url = node.url.replace(/^https?:\/\/emotion.sh/, '')
    if (!node.url.startsWith('//') && !node.url.startsWith('http')) {
      node.url = node.url
        .replace(/\.mdx?(#.*)?$/, (match, hash) => {
          return hash || ''
        })
        .replace(/^\/packages\//, '/docs/')
    }
  })
}
