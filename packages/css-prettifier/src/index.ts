import memoize from '@emotion/memoize'
import {
  compile,
  serialize,
  combine,
  tokenize,
  type Middleware,
  type Element
} from 'stylis'

// adjusted https://github.com/thysultan/stylis.js/blob/68b9043427c177b95a0fd6a2a13f5b636bf80236/src/Serializer.js#L26-L34
const prettyStringify = memoize(
  (indentation): Middleware =>
    (element, index, children, callback) => {
      switch (element.type) {
        case '@import':
          return (element.return = element.return || element.value) + '\n\n'
        case 'decl':
          return (element.return =
            element.return || `${element.props}: ${element.children};\n`)
        case 'comm':
          return ''
        case '@media':
        case '@supports':
          element.value = combine(
            tokenize(element.value),
            (value, index, children) => {
              // (
              if (value.charCodeAt(0) === 40 && children[index - 1] !== ' ') {
                return ' ' + value
              }
              return value
            }
          )
          break
        case 'rule':
          element.value = (element.props as string[]).join(
            element.root &&
              (element.root.type === '@keyframes' ||
                element.root.type === '@-webkit-keyframes')
              ? ', '
              : ',\n'
          )
      }

      const serialized = serialize(element.children as Element[], callback)
      return serialized.length
        ? (element.return =
            element.value +
            ' {\n' +
            serialized
              .trim()
              .replace(/^/gm, indentation)
              .replace(/^\s+$/gm, '') +
            '\n}\n\n')
        : ''
    }
)

export default function prettify(styles: string, indentation = '  ') {
  return serialize(compile(styles), prettyStringify(indentation)).trim()
}
