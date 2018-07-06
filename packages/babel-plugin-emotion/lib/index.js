'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.hashArray = hashArray;
exports.hoistPureArgs = hoistPureArgs;
exports.replaceCssWithCallExpression = replaceCssWithCallExpression;
exports.buildStyledCallExpression = buildStyledCallExpression;
exports.buildStyledObjectCallExpression = buildStyledObjectCallExpression;

exports.default = function (babel) {
  var t = babel.types;


  return {
    name: 'emotion', // not required
    inherits: require('babel-plugin-syntax-jsx'),
    visitor: {
      Program: {
        enter: function enter(path, state) {
          var hasFilepath = path.hub.file.opts.filename && path.hub.file.opts.filename !== 'unknown';
          state.emotionImportPath = 'emotion';
          if (state.opts.primaryInstance !== undefined) {
            state.emotionImportPath = getInstancePathToImport(state.opts.primaryInstance, path.hub.file.opts.filename);
          }

          state.importedNames = _extends({}, defaultImportedNames, state.opts.importedNames);

          var imports = [];

          var isModule = false;

          for (var _iterator = path.node.body, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
              if (_i >= _iterator.length) break;
              _ref = _iterator[_i++];
            } else {
              _i = _iterator.next();
              if (_i.done) break;
              _ref = _i.value;
            }

            var _node = _ref;

            if (t.isModuleDeclaration(_node)) {
              isModule = true;
              break;
            }
          }

          if (isModule) {
            path.traverse({
              ImportDeclaration: {
                exit: function exit(path) {
                  var node = path.node;


                  var imported = [];
                  var specifiers = [];

                  imports.push({
                    source: node.source.value,
                    imported: imported,
                    specifiers: specifiers
                  });

                  for (var _iterator2 = path.get('specifiers'), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
                    var _ref2;

                    if (_isArray2) {
                      if (_i2 >= _iterator2.length) break;
                      _ref2 = _iterator2[_i2++];
                    } else {
                      _i2 = _iterator2.next();
                      if (_i2.done) break;
                      _ref2 = _i2.value;
                    }

                    var specifier = _ref2;

                    var local = specifier.node.local.name;

                    if (specifier.isImportDefaultSpecifier()) {
                      imported.push('default');
                      specifiers.push({
                        kind: 'named',
                        imported: 'default',
                        local: local
                      });
                    }

                    if (specifier.isImportSpecifier()) {
                      var importedName = specifier.node.imported.name;
                      imported.push(importedName);
                      specifiers.push({
                        kind: 'named',
                        imported: importedName,
                        local: local
                      });
                    }
                  }
                }
              }
            });
          }
          var emotionPaths = defaultEmotionPaths.concat((state.opts.instances || []).map(function (instancePath) {
            return getInstancePathToCompare(instancePath, process.cwd());
          }));
          var dirname = hasFilepath ? _path2.default.dirname(path.hub.file.opts.filename) : '';
          imports.forEach(function (_ref3) {
            var source = _ref3.source,
                imported = _ref3.imported,
                specifiers = _ref3.specifiers;

            if (emotionPaths.indexOf(getInstancePathToCompare(source, dirname)) !== -1) {
              var _importedNames = specifiers.filter(function (v) {
                return importedNameKeys.indexOf(v.imported) !== -1;
              }).reduce(function (acc, _ref4) {
                var _extends2;

                var imported = _ref4.imported,
                    local = _ref4.local;
                return _extends({}, acc, (_extends2 = {}, _extends2[imported === 'default' ? 'styled' : imported] = local, _extends2));
              }, defaultImportedNames);
              state.importedNames = _extends({}, _importedNames, state.opts.importedNames);
            }
          });
          state.cssPropIdentifiers = [];
          state.extractStatic =
          // path.hub.file.opts.filename !== 'unknown' ||
          state.opts.extractStatic;

          state.staticRules = [];

          state.insertStaticRules = function (staticRules) {
            var _state$staticRules;

            (_state$staticRules = state.staticRules).push.apply(_state$staticRules, staticRules);
          };
        },
        exit: function exit(path, state) {
          if (state.staticRules.length !== 0) {
            var toWrite = state.staticRules.join('\n').trim();
            var cssFilename = path.hub.file.opts.generatorOpts ? path.hub.file.opts.generatorOpts.sourceFileName : path.hub.file.opts.sourceFileName;
            var cssFileOnDisk = void 0;
            var importPath = void 0;

            var cssFilenameArr = cssFilename.split('.');
            // remove the extension
            cssFilenameArr.pop();
            // add emotion.css as an extension
            cssFilenameArr.push('emotion.css');

            cssFilename = cssFilenameArr.join('.');

            if (state.opts.outputDir) {
              var relativeToSourceDir = _path2.default.relative(_path2.default.dirname(cssFilename), state.opts.outputDir);
              importPath = _path2.default.join(relativeToSourceDir, cssFilename);
              cssFileOnDisk = _path2.default.resolve(cssFilename, '..', importPath);
            } else {
              importPath = './' + _path2.default.basename(cssFilename);
              cssFileOnDisk = _path2.default.resolve(cssFilename);
            }

            var exists = _fs2.default.existsSync(cssFileOnDisk);
            (0, _helperModuleImports.addSideEffect)(path, importPath);
            if (exists ? _fs2.default.readFileSync(cssFileOnDisk, 'utf8') !== toWrite : true) {
              if (!exists) {
                if (state.opts.outputDir) {
                  _mkdirp2.default.sync(_path2.default.dirname(cssFileOnDisk));
                }

                (0, _touch.touchSync)(cssFileOnDisk);
              }
              _fs2.default.writeFileSync(cssFileOnDisk, toWrite);
            }
          }
        }
      },
      JSXOpeningElement: function JSXOpeningElement(path, state) {
        (0, _cssProp2.default)(path, state, t);
        if (state.opts.hoist) {
          path.traverse({
            CallExpression: function CallExpression(callExprPath) {
              if (callExprPath.node.callee.name === state.importedNames.css || state.cssPropIdentifiers.indexOf(callExprPath.node.callee) !== -1) {
                hoistPureArgs(callExprPath);
              }
            }
          });
        }
      },

      CallExpression: {
        enter: function enter(path, state) {
          // $FlowFixMe
          if (path[visited]) {
            return;
          }
          try {
            if (t.isIdentifier(path.node.callee)) {
              switch (path.node.callee.name) {
                case state.importedNames.css:
                case state.importedNames.keyframes:
                  {
                    path.addComment('leading', '#__PURE__');
                    var label = (0, _babelUtils.getLabel)((0, _babelUtils.getIdentifierName)(path, t), state.opts.autoLabel, state.opts.labelFormat, state.file.opts.filename);
                    if (label) {
                      path.node.arguments.push(t.stringLiteral('label:' + label + ';'));
                    }
                  }
                // eslint-disable-next-line no-fallthrough
                case state.importedNames.injectGlobal:
                  if (state.opts.sourceMap === true && path.node.loc !== undefined) {
                    path.node.arguments.push(t.stringLiteral((0, _sourceMap.addSourceMaps)(path.node.loc.start, state)));
                  }
              }
            }

            if (t.isCallExpression(path.node.callee) && path.node.callee.callee.name === state.importedNames.styled || t.isMemberExpression(path.node.callee) && t.isIdentifier(path.node.callee.object) && path.node.callee.object.name === state.importedNames.styled) {
              var identifier = t.isCallExpression(path.node.callee) ? path.node.callee.callee : path.node.callee.object;
              path.replaceWith(buildStyledObjectCallExpression(path, state, identifier, t));

              if (state.opts.hoist) {
                hoistPureArgs(path);
              }
            }
          } catch (e) {
            throw path.buildCodeFrameError(e);
          }
          // $FlowFixMe
          path[visited] = true;
        },
        exit: function exit(path, state) {
          try {
            if (path.node.callee && path.node.callee.property && path.node.callee.property.name === 'withComponent') {
              if (path.node.arguments.length === 1) {
                path.node.arguments.push(t.objectExpression([buildTargetObjectProperty(path, state, t)]));
              }
            }
          } catch (e) {
            throw path.buildCodeFrameError(e);
          }
        }
      },
      TaggedTemplateExpression: function TaggedTemplateExpression(path, state) {
        // $FlowFixMe
        if (path[visited]) {
          return;
        }
        // $FlowFixMe
        path[visited] = true;
        if (
        // styled.h1`color:${color};`
        t.isMemberExpression(path.node.tag) && path.node.tag.object.name === state.importedNames.styled) {
          path.replaceWith(buildStyledCallExpression(path.node.tag.object, [t.stringLiteral(path.node.tag.property.name)], path, state, t));
        } else if (
        // styled('h1')`color:${color};`
        t.isCallExpression(path.node.tag) && path.node.tag.callee.name === state.importedNames.styled) {
          path.replaceWith(buildStyledCallExpression(path.node.tag.callee, path.node.tag.arguments, path, state, t));
        } else if (t.isIdentifier(path.node.tag)) {
          if (path.node.tag.name === state.importedNames.css || state.cssPropIdentifiers.indexOf(path.node.tag) !== -1) {
            replaceCssWithCallExpression(path, path.node.tag, state, t);
          } else if (path.node.tag.name === state.importedNames.keyframes) {
            replaceCssWithCallExpression(path, path.node.tag, state, t, function (src, name, hash) {
              return '@keyframes ' + name + '-' + hash + ' { ' + src + ' }';
            }, false, function () {
              return '';
            });
          } else if (path.node.tag.name === state.importedNames.injectGlobal) {
            replaceCssWithCallExpression(path, path.node.tag, state, t, undefined, true, function () {
              return '';
            });
          }
        }
      }
    }
  };
};

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _findRoot = require('find-root');

var _findRoot2 = _interopRequireDefault(_findRoot);

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _touch = require('touch');

var _helperModuleImports = require('@babel/helper-module-imports');

var _babelUtils = require('./babel-utils');

var _hash3 = require('@emotion/hash');

var _hash4 = _interopRequireDefault(_hash3);

var _stylis = require('@emotion/stylis');

var _stylis2 = _interopRequireDefault(_stylis);

var _memoize = require('@emotion/memoize');

var _memoize2 = _interopRequireDefault(_memoize);

var _sourceMap = require('./source-map');

var _cssProp = require('./css-prop');

var _cssProp2 = _interopRequireDefault(_cssProp);

var _babelUtils2 = require('@emotion/babel-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function hashArray(arr) {
  return (0, _hash4.default)(arr.join(''));
}

var staticStylis = new _stylis2.default({ keyframe: false });

function hoistPureArgs(path) {
  var args = path.get('arguments');

  if (args && Array.isArray(args)) {
    args.forEach(function (arg) {
      if (!arg.isIdentifier() && arg.isPure()) {
        arg.hoist();
      }
    });
  }
}

function replaceCssWithCallExpression(path, identifier, state, t) {
  var staticCSSSrcCreator = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : function (src) {
    return src;
  };
  var removePath = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
  var staticCSSSelectorCreator = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : function (name, hash) {
    return '.' + name + '-' + hash;
  };

  try {
    var _createRawStringFromT = (0, _babelUtils.createRawStringFromTemplateLiteral)(path.node.quasi),
        _hash = _createRawStringFromT.hash,
        _src = _createRawStringFromT.src;

    var identifierName = (0, _babelUtils.getIdentifierName)(path, t);
    var _name = (0, _babelUtils.getName)(identifierName, 'css');

    if (state.extractStatic && !path.node.quasi.expressions.length) {
      var staticCSSRules = staticStylis(staticCSSSelectorCreator(_name, _hash), staticCSSSrcCreator(_src, _name, _hash));
      state.insertStaticRules([staticCSSRules]);
      if (!removePath) {
        return path.replaceWith(t.stringLiteral(_name + '-' + _hash));
      }
      return path.replaceWith(t.identifier('undefined'));
    }

    if (!removePath) {
      path.addComment('leading', '#__PURE__');
    }

    var stringToAppend = '';
    if (state.opts.sourceMap === true && path.node.quasi.loc !== undefined) {
      stringToAppend += (0, _sourceMap.addSourceMaps)(path.node.quasi.loc.start, state);
    }

    var label = (0, _babelUtils.getLabel)(identifierName, state.opts.autoLabel, state.opts.labelFormat, state.file.opts.filename);

    if (label) {
      stringToAppend += 'label:' + label + ';';
    }

    path.replaceWith(t.callExpression(identifier, (0, _babelUtils.appendStringToExpressions)((0, _babelUtils2.getExpressionsFromTemplateLiteral)(path.node.quasi, t), stringToAppend, t)));

    if (state.opts.hoist) {
      hoistPureArgs(path);
    }

    return;
  } catch (e) {
    if (path) {
      throw path.buildCodeFrameError(e);
    }

    throw e;
  }
}

var unsafeRequire = require;

var getPackageRootPath = (0, _memoize2.default)(function (filename) {
  return (0, _findRoot2.default)(filename);
});

function buildTargetObjectProperty(path, state, t) {
  if (state.count === undefined) {
    state.count = 0;
  }

  var filename = state.file.opts.filename;

  // normalize the file path to ignore folder structure
  // outside the current node project and arch-specific delimiters
  var moduleName = '';
  var rootPath = filename;

  try {
    rootPath = getPackageRootPath(filename);
    moduleName = unsafeRequire(rootPath + '/package.json').name;
  } catch (err) {}

  var finalPath = filename === rootPath ? _path2.default.basename(filename) : filename.slice(rootPath.length);

  var positionInFile = state.count++;

  var stuffToHash = [moduleName];

  if (finalPath) {
    stuffToHash.push(_path2.default.normalize(finalPath));
  } else {
    stuffToHash.push(state.file.code);
  }

  var stableClassName = 'e' + hashArray(stuffToHash) + positionInFile;

  return t.objectProperty(t.identifier('target'), t.stringLiteral(stableClassName));
}

var buildFinalOptions = function buildFinalOptions(t, options) {
  for (var _len = arguments.length, newProps = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    newProps[_key - 2] = arguments[_key];
  }

  var existingProperties = [];

  if (options && !t.isObjectExpression(options)) {
    console.warn("Second argument to a styled call is not an object, it's going to be removed.");
  } else if (options) {
    // $FlowFixMe
    existingProperties = options.properties;
  }

  return t.objectExpression([].concat(existingProperties, newProps.filter(Boolean)));
};

function buildStyledCallExpression(identifier, args, path, state, t) {
  // unpacking "manually" to prevent array out of bounds access (deopt)
  var tag = args[0];
  var options = args.length >= 2 ? args[1] : null;
  var restArgs = args.slice(2);

  var identifierName = (0, _babelUtils.getIdentifierName)(path, t);

  var targetProperty = buildTargetObjectProperty(path, state, t);

  if (state.extractStatic && !path.node.quasi.expressions.length) {
    var _createRawStringFromT2 = (0, _babelUtils.createRawStringFromTemplateLiteral)(path.node.quasi),
        _hash2 = _createRawStringFromT2.hash,
        _src2 = _createRawStringFromT2.src;

    var staticClassName = 'css-' + _hash2;
    var staticCSSRules = staticStylis('.' + staticClassName, _src2);

    state.insertStaticRules([staticCSSRules]);

    var _finalOptions = buildFinalOptions(t, options, t.objectProperty(t.identifier('e'), t.stringLiteral(staticClassName)), targetProperty);

    return t.callExpression(
    // $FlowFixMe
    t.callExpression(identifier, [tag, _finalOptions].concat(restArgs)), []);
  }

  path.addComment('leading', '#__PURE__');

  var stringToAppend = '';

  if (state.opts.sourceMap === true && path.node.quasi.loc !== undefined) {
    stringToAppend += (0, _sourceMap.addSourceMaps)(path.node.quasi.loc.start, state);
  }

  var labelProperty = void 0;

  var label = (0, _babelUtils.getLabel)(identifierName, state.opts.autoLabel, state.opts.labelFormat, state.file.opts.filename);

  if (label) {
    labelProperty = t.objectProperty(t.identifier('label'), t.stringLiteral(label));
  }

  var finalOptions = buildFinalOptions(t, options, labelProperty, targetProperty);

  return t.callExpression(
  // $FlowFixMe
  t.callExpression(identifier, [tag, finalOptions].concat(restArgs)), (0, _babelUtils.appendStringToExpressions)((0, _babelUtils2.getExpressionsFromTemplateLiteral)(path.node.quasi, t), stringToAppend, t));
}

function buildStyledObjectCallExpression(path, state, identifier, t) {
  var targetProperty = buildTargetObjectProperty(path, state, t);
  var identifierName = (0, _babelUtils.getIdentifierName)(path, t);

  var tag = t.isCallExpression(path.node.callee) ? path.node.callee.arguments[0] : t.stringLiteral(path.node.callee.property.name);

  var styledOptions = null;
  var restStyledArgs = [];
  if (t.isCallExpression(path.node.callee)) {
    var styledArgs = path.node.callee.arguments;

    if (styledArgs.length >= 2) {
      styledOptions = styledArgs[1];
    }

    restStyledArgs = styledArgs.slice(2);
  }

  var args = path.node.arguments;
  if (state.opts.sourceMap === true && path.node.loc !== undefined) {
    args.push(t.stringLiteral((0, _sourceMap.addSourceMaps)(path.node.loc.start, state)));
  }

  var label = (0, _babelUtils.getLabel)(identifierName, state.opts.autoLabel, state.opts.labelFormat, state.file.opts.filename);

  var labelProperty = label ? t.objectProperty(t.identifier('label'), t.stringLiteral(label)) : null;

  path.addComment('leading', '#__PURE__');

  return t.callExpression(t.callExpression(identifier, [tag, buildFinalOptions(t, styledOptions, targetProperty, labelProperty)].concat(restStyledArgs)), args);
}

var visited = Symbol('visited');

var defaultImportedNames = {
  styled: 'styled',
  css: 'css',
  keyframes: 'keyframes',
  injectGlobal: 'injectGlobal',
  merge: 'merge'
};

var importedNameKeys = Object.keys(defaultImportedNames).map(function (key) {
  return key === 'styled' ? 'default' : key;
});

var defaultEmotionPaths = ['emotion', 'react-emotion', 'preact-emotion'];

function getRelativePath(filepath, absoluteInstancePath) {
  var relativePath = _path2.default.relative(_path2.default.dirname(filepath), absoluteInstancePath);

  return relativePath.charAt(0) === '.' ? relativePath : './' + relativePath;
}

function getAbsolutePath(instancePath, rootPath) {
  if (instancePath.charAt(0) === '.') {
    var absoluteInstancePath = _path2.default.resolve(rootPath, instancePath);
    return absoluteInstancePath;
  }
  return false;
}

function getInstancePathToImport(instancePath, filepath) {
  var absolutePath = getAbsolutePath(instancePath, process.cwd());
  if (absolutePath === false) {
    return instancePath;
  }
  return getRelativePath(filepath, absolutePath);
}

function getInstancePathToCompare(instancePath, rootPath) {
  var absolutePath = getAbsolutePath(instancePath, rootPath);
  if (absolutePath === false) {
    return instancePath;
  }
  return absolutePath;
}