'use strict'

Object.defineProperty(exports, '__esModule', {
  value: !0
})

var _extends = require('@babel/runtime/helpers/extends'),
  _objectWithoutPropertiesLoose = require('@babel/runtime/helpers/objectWithoutPropertiesLoose'),
  jsx = require('@babel/plugin-transform-react-jsx'),
  pragmatic = require('@emotion/babel-plugin-jsx-pragmatic'),
  emotion = require('@emotion/babel-plugin')

function _interopDefault(e) {
  return e && e.__esModule
    ? e
    : {
        default: e
      }
}

var _extends__default = _interopDefault(_extends),
  _objectWithoutPropertiesLoose__default = _interopDefault(
    _objectWithoutPropertiesLoose
  ),
  jsx__default = _interopDefault(jsx),
  pragmatic__default = _interopDefault(pragmatic),
  emotion__default = _interopDefault(emotion),
  pragmaName = '___EmotionJSX',
  index = function(api, _temp) {
    var _ref = void 0 === _temp ? {} : _temp,
      sourceMap = (_ref.pragma, _ref.sourceMap),
      autoLabel = _ref.autoLabel,
      labelFormat = _ref.labelFormat,
      importMap = _ref.importMap,
      options = _objectWithoutPropertiesLoose__default.default(_ref, [
        'pragma',
        'sourceMap',
        'autoLabel',
        'labelFormat',
        'importMap'
      ])
    if (options.runtime)
      throw new Error(
        'The `runtime` option has been removed. If you want to configure `runtime: "automatic"`, replace `@emotion/babel-preset-css-prop` with `@babel/preset-react` and `@emotion/babel-plugin`. You can find out how to configure things properly here: https://emotion.sh/docs/css-prop#babel-preset'
      )
    return {
      plugins: [
        [
          pragmatic__default.default,
          {
            export: 'jsx',
            module: '@emotion/react',
            import: pragmaName
          }
        ],
        [
          jsx__default.default,
          _extends__default.default(
            {
              pragma: pragmaName,
              pragmaFrag: 'React.Fragment'
            },
            options
          )
        ],
        [
          emotion__default.default,
          {
            sourceMap: sourceMap,
            autoLabel: autoLabel,
            labelFormat: labelFormat,
            cssPropOptimization: !0,
            importMap: importMap
          }
        ]
      ]
    }
  }

exports.default = index
