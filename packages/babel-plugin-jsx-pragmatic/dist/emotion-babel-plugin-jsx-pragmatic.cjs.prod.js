'use strict'

Object.defineProperty(exports, '__esModule', { value: true })

var syntaxJsx = require('@babel/plugin-syntax-jsx')

function _interopDefault(e) {
  return e && e.__esModule ? e : { default: e }
}

var syntaxJsx__default = /*#__PURE__*/ _interopDefault(syntaxJsx)

var findLast = function findLast(arr, predicate) {
  for (var i = arr.length - 1; i >= 0; i--) {
    if (predicate(arr[i])) {
      return arr[i]
    }
  }
}

function jsxPragmatic(babel) {
  var t = babel.types

  function addPragmaImport(path, state) {
    var importDeclar = t.importDeclaration(
      [
        t.importSpecifier(
          t.identifier(state.opts['import']),
          t.identifier(state.opts['export'] || 'default')
        ),
      ],
      t.stringLiteral(state.opts.module)
    )
    var targetPath = findLast(path.get('body'), function (p) {
      return p.isImportDeclaration()
    })

    if (targetPath) {
      targetPath.insertAfter([importDeclar])
    } else {
      // Apparently it's now safe to do this even if Program begins with directives.
      path.unshiftContainer('body', importDeclar)
    }
  }

  return {
    inherits: syntaxJsx__default['default'],
    pre: function pre() {
      if (!(this.opts.module && this.opts['import'])) {
        throw new Error(
          '@emotion/babel-plugin-jsx-pragmatic: You must specify `module` and `import`'
        )
      }
    },
    visitor: {
      Program: {
        exit: function exit(path, state) {
          if (!state.get('jsxDetected')) return
          addPragmaImport(path, state)
        },
      },
      JSXElement: function JSXElement(path, state) {
        state.set('jsxDetected', true)
      },
      JSXFragment: function JSXFragment(path, state) {
        state.set('jsxDetected', true)
      },
    },
  }
}

exports.default = jsxPragmatic
