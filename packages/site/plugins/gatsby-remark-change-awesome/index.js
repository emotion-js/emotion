module.exports = ({ markdownNode, markdownAST }) => {
  if (
    markdownNode.internal.content.includes('Awesome Emotion') &&
    markdownAST.children[0].type === 'heading'
  ) {
    markdownAST.children.shift()
  }
}
