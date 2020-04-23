import { compile, serialize, combine, tokenize } from '@emotion/stylis'

// adjusted https://github.com/thysultan/stylis.js/blob/68b9043427c177b95a0fd6a2a13f5b636bf80236/src/Serializer.js#L26-L34
function prettyStringify(element, index, children, callback) {
  switch (element.type) {
    case '@import':
    case 'decl':
      return (
        (element.return =
          element.return ||
          element.value.slice(0, element.length + 1) +
            ' ' +
            element.value.slice(element.length + 1)) + '\n'
      )
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
      element.value = element.props.join(
        element.root &&
        (element.root.type === '@keyframes' ||
          element.root.type === '@-webkit-keyframes')
          ? ', '
          : ',\n'
      )
  }

  return (children = serialize(element.children, callback)).length
    ? (element.return =
        element.value +
        ' {\n' +
        children
          .trim()
          .replace(/^/gm, '  ')
          .replace(/^\s+$/gm, '') +
        '\n}\n\n')
    : ''
}

export default function prettify(styles) {
  return serialize(compile(styles), prettyStringify).trim()
}
