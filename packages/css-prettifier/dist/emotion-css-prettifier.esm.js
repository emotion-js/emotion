import memoize from '@emotion/memoize';
import { serialize, compile, combine, tokenize } from 'stylis';

var prettyStringify = memoize(function (indentation) {
  return function (element, index, children, callback) {
    switch (element.type) {
      case '@import':
        return (element["return"] = element["return"] || element.value) + '\n\n';

      case 'decl':
        return element["return"] = element["return"] || element.props + ": " + element.children + ";\n";

      case 'comm':
        return '';

      case '@media':
      case '@supports':
        element.value = combine(tokenize(element.value), function (value, index, children) {
          // (
          if (value.charCodeAt(0) === 40 && children[index - 1] !== ' ') {
            return ' ' + value;
          }

          return value;
        });
        break;

      case 'rule':
        element.value = element.props.join(element.root && (element.root.type === '@keyframes' || element.root.type === '@-webkit-keyframes') ? ', ' : ',\n');
    }

    return (children = serialize(element.children, callback)).length ? element["return"] = element.value + ' {\n' + children.trim().replace(/^/gm, indentation).replace(/^\s+$/gm, '') + '\n}\n\n' : '';
  };
});
function prettify(styles, indentation) {
  if (indentation === void 0) {
    indentation = '  ';
  }

  return serialize(compile(styles), prettyStringify(indentation)).trim();
}

export default prettify;
