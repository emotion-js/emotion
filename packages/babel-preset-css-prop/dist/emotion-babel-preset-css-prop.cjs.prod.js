'use strict'

Object.defineProperty(exports, '__esModule', { value: true })

var _extends = require('@babel/runtime/helpers/extends')
var _objectWithoutPropertiesLoose = require('@babel/runtime/helpers/objectWithoutPropertiesLoose')
var jsx = require('@babel/plugin-transform-react-jsx')
var pragmatic = require('@emotion/babel-plugin-jsx-pragmatic')
var emotion = require('@emotion/babel-plugin')

function _interopDefault(e) {
  return e && e.__esModule ? e : { default: e }
}

var _extends__default = /*#__PURE__*/ _interopDefault(_extends)
var _objectWithoutPropertiesLoose__default = /*#__PURE__*/ _interopDefault(
  _objectWithoutPropertiesLoose
)
var jsx__default = /*#__PURE__*/ _interopDefault(jsx)
var pragmatic__default = /*#__PURE__*/ _interopDefault(pragmatic)
var emotion__default = /*#__PURE__*/ _interopDefault(emotion)

var pragmaName = '___EmotionJSX' // pull out the emotion options and pass everything else to the jsx transformer
// this means if @babel/plugin-transform-react-jsx adds more options, it'll just work
// and if @emotion/babel-plugin adds more options we can add them since this lives in
// the same repo as @emotion/babel-plugin

var index = function (api, _temp) {
  var _ref = _temp === void 0 ? {} : _temp,
    pragma = _ref.pragma,
    sourceMap = _ref.sourceMap,
    autoLabel = _ref.autoLabel,
    labelFormat = _ref.labelFormat,
    importMap = _ref.importMap,
    options = _objectWithoutPropertiesLoose__default['default'](_ref, [
      'pragma',
      'sourceMap',
      'autoLabel',
      'labelFormat',
      'importMap',
    ])

  if (options.runtime) {
    throw new Error(
      'The `runtime` option has been removed. If you want to configure `runtime: "automatic"`, replace `@emotion/babel-preset-css-prop` with `@babel/preset-react` and `@emotion/babel-plugin`. You can find out how to configure things properly here: https://emotion.sh/docs/css-prop#babel-preset'
    )
  }

  return {
    plugins: [
      [
        pragmatic__default['default'],
        {
          export: 'jsx',
          module: '@emotion/react',
          import: pragmaName,
        },
      ],
      [
        jsx__default['default'],
        _extends__default['default'](
          {
            pragma: pragmaName,
            pragmaFrag: 'React.Fragment',
          },
          options
        ),
      ],
      [
        emotion__default['default'],
        {
          sourceMap: sourceMap,
          autoLabel: autoLabel,
          labelFormat: labelFormat,
          cssPropOptimization: true,
          importMap: importMap,
        },
      ],
    ],
  }
}

exports.default = index
