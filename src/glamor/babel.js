module.exports = function (babel) {
  const {types: t} = babel

  return {
    name: 'emotion-for-glam', // not required
    inherits: require('babel-plugin-syntax-jsx'),
    visitor: {
      JSXOpeningElement (path, state) {
        let cssPath

        path.get('attributes').forEach(openElPath => {
          const attrPath = openElPath.get('name')
          const name = attrPath.node.name

          if (name === 'css') {
            cssPath = attrPath
          }
        })

        if (!cssPath) return

        let cssPropValue = cssPath.container && cssPath.container.value

        if (t.isJSXExpressionContainer(cssPropValue)) {
          cssPropValue = cssPropValue.expression
        }

        let glamorCssFunction = t.callExpression(t.identifier('css'), [
          cssPropValue
        ])

        cssPath.parentPath.insertAfter(t.jSXSpreadAttribute(glamorCssFunction))
        cssPath.parentPath.remove()
      }
    }
  }
}
