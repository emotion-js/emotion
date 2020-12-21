'use strict'

Object.defineProperty(exports, '__esModule', {
  value: !0
})

var memoize = require('@emotion/memoize'),
  stylis = require('stylis')

function _interopDefault(e) {
  return e && e.__esModule
    ? e
    : {
        default: e
      }
}

var memoize__default = _interopDefault(memoize),
  prettyStringify = memoize__default.default(function(indentation) {
    return function(element, index, children, callback) {
      switch (element.type) {
        case '@import':
          return (element.return = element.return || element.value) + '\n\n'

        case 'decl':
          return (element.return =
            element.return || element.props + ': ' + element.children + ';\n')

        case 'comm':
          return ''

        case '@media':
        case '@supports':
          element.value = stylis.combine(
            stylis.tokenize(element.value),
            function(value, index, children) {
              return 40 === value.charCodeAt(0) && ' ' !== children[index - 1]
                ? ' ' + value
                : value
            }
          )
          break

        case 'rule':
          element.value = element.props.join(
            !element.root ||
            ('@keyframes' !== element.root.type &&
              '@-webkit-keyframes' !== element.root.type)
              ? ',\n'
              : ', '
          )
      }
      return (children = stylis.serialize(element.children, callback)).length
        ? (element.return =
            element.value +
            ' {\n' +
            children
              .trim()
              .replace(/^/gm, indentation)
              .replace(/^\s+$/gm, '') +
            '\n}\n\n')
        : ''
    }
  })

function prettify(styles, indentation) {
  return (
    void 0 === indentation && (indentation = '  '),
    stylis
      .serialize(stylis.compile(styles), prettyStringify(indentation))
      .trim()
  )
}

exports.default = prettify
