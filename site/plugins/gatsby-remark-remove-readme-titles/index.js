module.exports = ({ markdownNode, markdownAST }) => {
  if (
    markdownNode.fileAbsolutePath.includes('packages') &&
    markdownNode.fileAbsolutePath.includes('README.md') &&
    markdownAST.children[0].type === 'heading'
  ) {
    markdownAST.children.shift()
  }
}
