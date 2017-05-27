module.exports = function (babel) {
  const {types: t} = babel

  function createClassNameAttr (expression) {
    return t.jSXAttribute(
      t.jSXIdentifier('className'),
      t.JSXExpressionContainer(
        expression
      )
    )
  }

  return {
    name: 'emotion-for-glam', // not required
    inherits: require('babel-plugin-syntax-jsx'),
    visitor: {
      JSXOpeningElement (path, state) {
        const node = path.node
        const attrs = node.attributes
        const css = attrs.find(node => node.name.name === 'css')

        if (!css) return

        const cxs = attrs.find(node => node.name.name === 'className')
        const cssTemplateLiteral = t.taggedTemplateExpression(
          t.identifier('css'),
          css.value.expression
        )
        let nextClassName = ''

        if (!cxs) {
          nextClassName = createClassNameAttr(cssTemplateLiteral)
        } else if (t.isJSXExpressionContainer(cxs.value)) {
          nextClassName = createClassNameAttr(t.binaryExpression(
            '+',
            t.binaryExpression(
              '+',
              cxs.value.expression,
              t.stringLiteral(' ')
            ),
            cssTemplateLiteral
          ))
        } else {
          nextClassName = createClassNameAttr(t.binaryExpression(
            '+',
            t.binaryExpression(
              '+',
              t.stringLiteral(cxs.value.value || ''),
              t.stringLiteral(' ')
            ),
            cssTemplateLiteral
          ))
        }

        path.traverse({
          JSXAttribute (path, state) {
            const name = path.node.name.name
            if (name === 'className' && nextClassName) {
              path.replaceWith(nextClassName)
            }

            if (name === 'css') {
              if (!cxs) {
                path.replaceWith(nextClassName)
              } else {
                path.remove()
              }
            }
          }
        })
      }
    }
  }
}
