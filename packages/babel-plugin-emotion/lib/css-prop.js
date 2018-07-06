'use strict';

exports.__esModule = true;

exports.default = function (path, state, t) {
  var cssPath = void 0;
  var classNamesPath = void 0;

  path.get('attributes').forEach(function (openElPath) {
    if (t.isJSXSpreadAttribute(openElPath.node)) {
      return;
    }

    var attrPath = openElPath.get('name');
    var name = attrPath.node.name;

    if (name === state.importedNames.css) {
      cssPath = attrPath;
    }

    if (name === 'className') {
      classNamesPath = attrPath;
    }
  });

  if (!cssPath) return;

  var cssPropValue = cssPath.container && cssPath.container.value;
  var classNamesValue = classNamesPath && classNamesPath.container && classNamesPath.container.value;

  if (t.isJSXExpressionContainer(cssPropValue)) {
    cssPropValue = cssPropValue.expression;
  }

  var cssTemplateExpression = void 0;
  if (t.isTemplateLiteral(cssPropValue)) {
    cssTemplateExpression = createCssTemplateExpression(cssPropValue);
  } else if (t.isStringLiteral(cssPropValue)) {
    cssTemplateExpression = createCssTemplateExpression(t.templateLiteral([t.templateElement({
      raw: cssPropValue.value,
      cooked: cssPropValue.value
    })], []));
  } else {
    var args = state.opts.sourceMap ? [cssPropValue, t.stringLiteral((0, _sourceMap.addSourceMaps)(cssPath.node.loc.start, state))] : [cssPropValue];
    cssTemplateExpression = t.callExpression(getCssIdentifer(), args);
  }
  if (!classNamesValue || t.isStringLiteral(classNamesValue) && !classNamesValue.value) {
    if (classNamesPath) classNamesPath.parentPath.remove();
    cssPath.parentPath.replaceWith(createClassNameAttr(cssTemplateExpression));
    return;
  }

  cssPath.parentPath.remove();
  if (classNamesPath && classNamesPath.parentPath) {
    if (t.isJSXExpressionContainer(classNamesValue)) {
      var _args = [add(cssTemplateExpression, add(t.stringLiteral(' '), classNamesValue.expression))];

      if (state.opts.sourceMap) {
        _args.push(t.stringLiteral((0, _sourceMap.addSourceMaps)(cssPath.node.loc.start, state)));
      }

      classNamesPath.parentPath.replaceWith(createClassNameAttr(t.callExpression(getMergeIdentifier(), _args)));
    } else {
      classNamesPath.parentPath.replaceWith(createClassNameAttr(add(cssTemplateExpression, t.stringLiteral(' ' + (classNamesValue.value || '')))));
    }
  }

  function add(a, b) {
    return t.binaryExpression('+', a, b);
  }

  function createClassNameAttr(expression) {
    return t.jSXAttribute(t.jSXIdentifier('className'), t.jSXExpressionContainer(expression));
  }

  function getCssIdentifer() {
    if (state.opts.autoImportCssProp !== false) {
      var cssImport = (0, _helperModuleImports.addNamed)(path, 'css', state.emotionImportPath);
      state.cssPropIdentifiers.push(cssImport);
      return cssImport;
    } else {
      return t.identifier(state.importedNames.css);
    }
  }
  function getMergeIdentifier() {
    if (state.opts.autoImportCssProp !== false) {
      return (0, _helperModuleImports.addNamed)(path, 'merge', state.emotionImportPath);
    } else {
      return t.identifier(state.importedNames.merge);
    }
  }
  function createCssTemplateExpression(templateLiteral) {
    return t.taggedTemplateExpression(getCssIdentifer(), templateLiteral);
  }
};

var _helperModuleImports = require('@babel/helper-module-imports');

var _sourceMap = require('./source-map');