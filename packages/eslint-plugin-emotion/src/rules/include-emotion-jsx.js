const JSX_ANNOTATION_REGEX = /\*?\s*@jsx\s+([^\s]+)/

module.exports = {
  meta: {
    fixable: 'code'
  },
  create(context) {
    return {
      JSXAttribute(node) {
        if (node.name.name !== 'css') {
          return
        }
        let hasJsxImport = false
        let emotionCoreNode = null
        let local = null
        let sourceCode = context.getSourceCode()
        sourceCode.ast.body.forEach(x => {
          if (
            x.type === 'ImportDeclaration' &&
            (x.source.value === '@emotion/core' ||
              x.source.value === '@emotion/preact-core')
          ) {
            // TODO: maybe handle namespace specifiers, not high priority though
            let jsxSpecifier = x.specifiers.find(x => x.imported.name === 'jsx')
            if (jsxSpecifier) {
              hasJsxImport = true
              local = jsxSpecifier.local.name
            } else {
              emotionCoreNode = x
            }
          }
        })
        let hasSetPragma = false
        if (context.settings.react && context.settings.react.pragma === 'jsx') {
          hasSetPragma = true
        }
        let pragma = sourceCode
          .getAllComments()
          .find(node => JSX_ANNOTATION_REGEX.test(node.value))

        if (pragma === local) {
          hasSetPragma = true
        }

        if (!hasJsxImport || !hasSetPragma) {
          context.report({
            node,
            message:
              'The css prop can only be used if jsx from @emotion/core is imported and it is set as the jsx pragma',
            fix:
              !hasSetPragma && hasJsxImport
                ? function(fixer) {
                    fixer.insertTextBefore(emotionCoreNode, `/** @jsx */\n`)
                  }
                : undefined
          })
        }
      }
    }
  }
}
