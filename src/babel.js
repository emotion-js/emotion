module.exports = function (babel) {
  const {types: t} = babel

  function createClassNameAttr (expression) {
    return t.jSXAttribute(
      t.jSXIdentifier('className'),
      t.JSXExpressionContainer(expression)
    )
  }

  function createCssTemplateExpression (templateLiteral) {
    return t.taggedTemplateExpression(t.identifier('css'), templateLiteral)
  }

  return {
    name: 'emotion-for-glam', // not required
    inherits: require('babel-plugin-syntax-jsx'),
    visitor: {
      CallExpression (path) {
        if (path.node.callee.name === 'css') {
          const parentPath = path.parentPath
          if (
            parentPath.isCallExpression() &&
            parentPath.node.callee &&
            parentPath.node.callee.name === 'emotion'
          ) {
            path.replaceWithMultiple(t.arrayExpression(path.node.arguments))
          }
        }
      },
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

        let cssTemplateExpression
        if (t.isTemplateLiteral(cssPropValue)) {
          cssTemplateExpression = createCssTemplateExpression(cssPropValue)
        } else if (t.isStringLiteral(cssPropValue)) {
          cssTemplateExpression = createCssTemplateExpression(
            t.templateLiteral(
              [
                t.templateElement({
                  raw: cssPropValue.value,
                  cooked: cssPropValue.value
                })
              ],
              []
            )
          )
        } else {
          throw path.buildCodeFrameError(
            `${cssPropValue.value} is not a string or template literal`
          )
        }

        if (!classNamesValue) {
          cssPath.parentPath.replaceWith(
            createClassNameAttr(cssTemplateExpression)
          )
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
                cssTemplateExpression
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
                cssTemplateExpression
              )
            )
          )
        }
      },
      TaggedTemplateExpression (path) {
        if (
          t.isMemberExpression(path.node.tag) &&
          path.node.tag.object.name === 'emotion' &&
          t.isTemplateLiteral(path.node.quasi)
        ) {
          path.replaceWith(
            t.callExpression(t.identifier(path.node.tag.object.name), [
              t.stringLiteral(path.node.tag.property.name),
              t.taggedTemplateExpression(t.identifier('css'), path.node.quasi)
            ])
          )
        } else if (
          t.isCallExpression(path.node.tag) &&
          path.node.tag.callee.name === 'emotion' &&
          t.isTemplateLiteral(path.node.quasi)
        ) {
          path.replaceWith(
            t.callExpression(t.identifier(path.node.tag.callee.name), [
              path.node.tag.arguments[0],
              t.taggedTemplateExpression(t.identifier('css'), path.node.quasi)
            ])
          )
        }
      }
    }
  }
}
