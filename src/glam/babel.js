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
          classNamesPath && classNamesPath.container && classNamesPath.container.value

        if (!cssPropValue) return

        if (t.isJSXExpressionContainer(cssPropValue)) {
          cssPropValue = cssPropValue.expression
        }

        let cssTemplateExpression
        if (t.isTemplateLiteral(cssPropValue)) {
          cssTemplateExpression = createCssTemplateExpression(cssPropValue)
        } else if (t.isStringLiteral(cssPropValue)) {
          cssPath.remove()
          cssTemplateExpression = createCssTemplateExpression(
            t.templateLiteral(
              [t.templateElement({raw: cssPropValue.value})],
              []
            )
          )
        } else if (t.isJSXExpressionContainer(cssPropValue)) {
          cssPath.remove()
          cssTemplateExpression = createCssTemplateExpression(
            t.templateLiteral(
              [t.templateElement({raw: cssPropValue.expression.value})],
              []
            )
          )
        } else {
          console.log(cssPropValue)
          throw path.buildCodeFrameError('I have no idea what you gave me')
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

        // path.traverse({
        //   JSXAttribute (path, state) {
        //     const name = path.node.name.name
        //     if (name === 'className' && nextClassName) {
        //       path.replaceWith(nextClassName)
        //     }
        //
        //     if (name === 'css') {
        //       if (!classNames) {
        //         path.replaceWith(nextClassName)
        //       } else {
        //         path.remove()
        //       }
        //     }
        //   }
        // })
      }
    }
  }
}
