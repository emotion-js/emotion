module.exports = function (babel) {
  const {types: t} = babel

  function createClassNameAttr (expression) {
    return t.jSXAttribute(
      t.jSXIdentifier('className'),
      t.JSXExpressionContainer(expression)
    )
  }

  return {
    name: 'emotion-for-cxs', // not required
    inherits: require('babel-plugin-syntax-jsx'),
    visitor: {
      JSXOpeningElement (path, state) {
        let cssPath
        let classNamesPath

        path.get('attributes').forEach(openElPath => {
          const attrPath = openElPath.get('name')
          const name = attrPath.node.name

          if (name === 'css') {
            cssPath = attrPath
          }

          if (name === 'className') {
            classNamesPath = attrPath
          }
        })

        if (!cssPath) return

        let cssPropValue = cssPath.container && cssPath.container.value
        let classNamesValue =
          classNamesPath &&
          classNamesPath.container &&
          classNamesPath.container.value

        if (t.isJSXExpressionContainer(cssPropValue)) {
          cssPropValue = cssPropValue.expression
        }

        let cxsCssFunction = t.callExpression(t.identifier('cxs'), [
          cssPropValue
        ])

        if (!classNamesValue) {
          cssPath.parentPath.replaceWith(createClassNameAttr(cxsCssFunction))
          return
        }

        cssPath.parentPath.remove()
        if (t.isJSXExpressionContainer(classNamesValue)) {
          classNamesPath.parentPath.replaceWith(
            createClassNameAttr(
              t.binaryExpression(
                '+',
                t.binaryExpression(
                  '+',
                  classNamesValue.expression,
                  t.stringLiteral(' ')
                ),
                cxsCssFunction
              )
            )
          )
        } else {
          classNamesPath.parentPath.replaceWith(
            createClassNameAttr(
              t.binaryExpression(
                '+',
                t.binaryExpression(
                  '+',
                  t.stringLiteral(classNamesValue.value || ''),
                  t.stringLiteral(' ')
                ),
                cxsCssFunction
              )
            )
          )
        }
      }
    }
  }
}
