'use strict'

Object.defineProperty(exports, '__esModule', {
  value: !0
})

var syntaxJsx = require('@babel/plugin-syntax-jsx')

function _interopDefault(e) {
  return e && e.__esModule
    ? e
    : {
        default: e
      }
}

var syntaxJsx__default = _interopDefault(syntaxJsx),
  findLast = function(arr, predicate) {
    for (var i = arr.length - 1; i >= 0; i--)
      if (predicate(arr[i])) return arr[i]
  }

function jsxPragmatic(babel) {
  var t = babel.types
  return {
    inherits: syntaxJsx__default.default,
    pre: function() {
      if (!this.opts.module || !this.opts.import)
        throw new Error(
          '@emotion/babel-plugin-jsx-pragmatic: You must specify `module` and `import`'
        )
    },
    visitor: {
      Program: {
        exit: function(path, state) {
          state.get('jsxDetected') &&
            (function(path, state) {
              var importDeclar = t.importDeclaration(
                  [
                    t.importSpecifier(
                      t.identifier(state.opts.import),
                      t.identifier(state.opts.export || 'default')
                    )
                  ],
                  t.stringLiteral(state.opts.module)
                ),
                targetPath = findLast(path.get('body'), function(p) {
                  return p.isImportDeclaration()
                })
              targetPath
                ? targetPath.insertAfter([importDeclar])
                : path.unshiftContainer('body', importDeclar)
            })(path, state)
        }
      },
      JSXElement: function(path, state) {
        state.set('jsxDetected', !0)
      },
      JSXFragment: function(path, state) {
        state.set('jsxDetected', !0)
      }
    }
  }
}

exports.default = jsxPragmatic
