'use strict'

Object.defineProperty(exports, '__esModule', { value: true })

var memoize = require('@emotion/memoize')
var stylis = require('stylis')

function _interopDefault(e) {
  return e && e.__esModule ? e : { default: e }
}

var memoize__default = /*#__PURE__*/ _interopDefault(memoize)

var prettyStringify = memoize__default['default'](function (indentation) {
  return function (element, index, children, callback) {
    switch (element.type) {
      case '@import':
        return (element['return'] = element['return'] || element.value) + '\n\n'

      case 'decl':
        return (element['return'] =
          element['return'] || element.props + ': ' + element.children + ';\n')

      case 'comm':
        return ''

      case '@media':
      case '@supports':
        element.value = stylis.combine(
          stylis.tokenize(element.value),
          function (value, index, children) {
            // (
            if (value.charCodeAt(0) === 40 && children[index - 1] !== ' ') {
              return ' ' + value
            }

            return value
          }
        )
        break

      case 'rule':
        element.value = element.props.join(
          element.root &&
            (element.root.type === '@keyframes' ||
              element.root.type === '@-webkit-keyframes')
            ? ', '
            : ',\n'
        )
    }

    return (children = stylis.serialize(element.children, callback)).length
      ? (element['return'] =
          element.value +
          ' {\n' +
          children.trim().replace(/^/gm, indentation).replace(/^\s+$/gm, '') +
          '\n}\n\n')
      : ''
  }
})
function prettify(styles, indentation) {
  if (indentation === void 0) {
    indentation = '  '
  }

  return stylis
    .serialize(stylis.compile(styles), prettyStringify(indentation))
    .trim()
}

exports.default = prettify
