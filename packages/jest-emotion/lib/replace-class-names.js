'use strict';

exports.__esModule = true;
function defaultClassNameReplacer(className, index) {
  return 'emotion-' + index;
}

var componentSelectorClassNamePattern = /e[a-zA-Z0-9-]+[0-9]+/;

var replaceClassNames = exports.replaceClassNames = function replaceClassNames(classNames, styles, code, key) {
  var replacer = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : defaultClassNameReplacer;

  var index = 0;

  return classNames.reduce(function (acc, className) {
    if (className.indexOf(key + '-') === 0 || componentSelectorClassNamePattern.test(className)) {
      var escapedRegex = new RegExp(className.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'g');
      return acc.replace(escapedRegex, replacer(className, index++));
    }
    return acc;
  }, '' + styles + (styles ? '\n\n' : '') + code);
};