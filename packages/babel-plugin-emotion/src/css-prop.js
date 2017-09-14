export default function(path, state, t) {
  let cssPath
  let classNamesPath

  path.get('attributes').forEach(openElPath => {
    if (t.isJSXSpreadAttribute(openElPath.node)) {
      return
    }

    const attrPath = openElPath.get('name')
    const name = attrPath.node.name

    if (name === state.importedNames.css) {
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
    cssTemplateExpression = t.callExpression(getCssIdentifer(), [cssPropValue])
  }

  if (!classNamesValue) {
    cssPath.parentPath.replaceWith(createClassNameAttr(cssTemplateExpression))
    return
  }

  cssPath.parentPath.remove()
  if (t.isJSXExpressionContainer(classNamesValue)) {
    classNamesPath.parentPath.replaceWith(
      createClassNameAttr(
        add(
          add(classNamesValue.expression, t.stringLiteral(' ')),
          cssTemplateExpression
        )
      )
    )
  } else {
    classNamesPath.parentPath.replaceWith(
      createClassNameAttr(
        add(
          add(
            t.stringLiteral(classNamesValue.value || ''),
            t.stringLiteral(' ')
          ),
          cssTemplateExpression
        )
      )
    )
  }

  function add(a, b) {
    return t.binaryExpression('+', a, b)
  }

  function createClassNameAttr(expression) {
    return t.jSXAttribute(
      t.jSXIdentifier('className'),
      t.JSXExpressionContainer(expression)
    )
  }

  function getCssIdentifer() {
    if (state.opts.autoImportCssProp !== false) {
      if (!state.cssPropIdentifier) {
        state.cssPropIdentifier = path.scope.generateUidIdentifier(
          state.importedNames.css
        )
      }
      return state.cssPropIdentifier
    } else {
      return t.identifier(state.importedNames.css)
    }
  }
  function createCssTemplateExpression(templateLiteral) {
    return t.taggedTemplateExpression(getCssIdentifer(), templateLiteral)
  }
}
