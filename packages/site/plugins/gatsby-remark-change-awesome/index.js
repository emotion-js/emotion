module.exports = ({ markdownNode, markdownAST }) => {
  if (
    markdownNode.internal.content.includes('Awesome Emotion') &&
    markdownAST.children[0].type === 'heading'
  ) {
    markdownAST.children.shift()
    let index = markdownAST.children.findIndex(
      item =>
        item.type === 'heading' &&
        item.children.length === 1 &&
        item.children[0].type === 'text' &&
        item.children[0].value === 'Contribute'
    )
    markdownAST.children = markdownAST.children.filter((item, i) => {
      return i < index
    })
  }
}
