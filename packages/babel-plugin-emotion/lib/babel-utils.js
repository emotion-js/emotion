'use strict';

exports.__esModule = true;
exports.appendStringToExpressions = undefined;
exports.getIdentifierName = getIdentifierName;
exports.getRuntimeImportPath = getRuntimeImportPath;
exports.buildMacroRuntimeNode = buildMacroRuntimeNode;
exports.addRuntimeImports = addRuntimeImports;
exports.getName = getName;
exports.getLabel = getLabel;
exports.createRawStringFromTemplateLiteral = createRawStringFromTemplateLiteral;
exports.omit = omit;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _index = require('./index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getDeclaratorName(path, t) {
  // $FlowFixMe
  var parent = path.findParent(function (p) {
    return p.isVariableDeclarator();
  });
  return parent && t.isIdentifier(parent.node.id) ? parent.node.id.name : '';
}

function getIdentifierName(path, t) {
  var classParent = void 0;
  if (path) {
    // $FlowFixMe
    classParent = path.findParent(function (p) {
      return t.isClass(p);
    });
  }
  if (classParent && classParent.node.id) {
    return t.isIdentifier(classParent.node.id) ? classParent.node.id.name : '';
  } else if (classParent && classParent.node.superClass && classParent.node.superClass.name) {
    return getDeclaratorName(path, t) + '(' + classParent.node.superClass.name + ')';
  }

  return getDeclaratorName(path, t);
}

function getRuntimeImportPath(path, t) {
  // $FlowFixMe
  var binding = path.scope.getBinding(path.node.name);
  if (!t.isImportDeclaration(binding.path.parentPath)) {
    throw binding.path.buildCodeFrameError('the emotion macro must be imported with es modules');
  }
  var importPath = binding.path.parentPath.node.source.value;
  return importPath.match(/(.*)\/macro/)[1];
}

function buildMacroRuntimeNode(path, state, importName, t) {
  var runtimeImportPath = getRuntimeImportPath(path, t);
  if (state.emotionImports === undefined) state.emotionImports = {};
  if (state.emotionImports[runtimeImportPath] === undefined) {
    state.emotionImports[runtimeImportPath] = {};
  }
  if (state.emotionImports[runtimeImportPath][importName] === undefined) {
    // $FlowFixMe
    state.emotionImports[runtimeImportPath][importName] = path.scope.generateUidIdentifier(path.node.name);
  }
  return state.emotionImports[runtimeImportPath][importName];
}

function addRuntimeImports(state, t) {
  if (state.emotionImports) {
    var _emotionImports = state.emotionImports;
    Object.keys(_emotionImports).forEach(function (importPath) {
      var importSpecifiers = [];
      Object.keys(_emotionImports[importPath]).forEach(function (importName) {
        var identifier = _emotionImports[importPath][importName];
        if (importName === 'default') {
          importSpecifiers.push(t.importDefaultSpecifier(identifier));
        } else {
          importSpecifiers.push(t.importSpecifier(identifier, t.identifier(importName)));
        }
      });
      // $FlowFixMe
      state.file.path.node.body.unshift(t.importDeclaration(importSpecifiers, t.stringLiteral(importPath)));
    });
    state.emotionImports = undefined;
  }
}
function getName(identifierName, prefix) {
  var parts = [];
  parts.push(prefix);
  if (identifierName) {
    parts.push(identifierName);
  }
  return parts.join('-');
}

function getLabel(identifierName, autoLabel, labelFormat, filename) {
  if (!identifierName || !autoLabel) return null;
  if (!labelFormat) return identifierName.trim();

  var parsedPath = _path2.default.parse(filename);
  var normalizedFilename = parsedPath.name.replace('.', '-');
  return labelFormat.replace(/\[local\]/gi, identifierName.trim()).replace(/\[filename\]/gi, normalizedFilename);
}

function createRawStringFromTemplateLiteral(quasi) {
  var strs = quasi.quasis.map(function (x) {
    return x.value.cooked;
  });
  var hash = (0, _index.hashArray)([].concat(strs));

  var src = strs.reduce(function (arr, str, i) {
    arr.push(str);
    if (i !== strs.length - 1) {
      arr.push('xxx' + i + 'xxx');
    }
    return arr;
  }, []).join('').trim();
  return { src: src, hash: hash };
}

function omit(obj, testFn) {
  var target = {};
  var i = void 0;
  for (i in obj) {
    if (!testFn(i, obj)) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }
  return target;
}

var appendStringToExpressions = exports.appendStringToExpressions = function appendStringToExpressions(expressions, string, t) {
  if (!string) {
    return expressions;
  }
  if (t.isStringLiteral(expressions[expressions.length - 1])) {
    expressions[expressions.length - 1].value += string;
  } else {
    expressions.push(t.stringLiteral(string));
  }
  return expressions;
};