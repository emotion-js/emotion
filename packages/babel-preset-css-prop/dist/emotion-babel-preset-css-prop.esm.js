import _extends from '@babel/runtime/helpers/esm/extends';
import _objectWithoutPropertiesLoose from '@babel/runtime/helpers/esm/objectWithoutPropertiesLoose';
import jsx from '@babel/plugin-transform-react-jsx';
import pragmatic from '@emotion/babel-plugin-jsx-pragmatic';
import emotion from '@emotion/babel-plugin';

var pragmaName = '___EmotionJSX'; // pull out the emotion options and pass everything else to the jsx transformer
// this means if @babel/plugin-transform-react-jsx adds more options, it'll just work
// and if @emotion/babel-plugin adds more options we can add them since this lives in
// the same repo as @emotion/babel-plugin

var index = (function (api, _temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      pragma = _ref.pragma,
      sourceMap = _ref.sourceMap,
      autoLabel = _ref.autoLabel,
      labelFormat = _ref.labelFormat,
      importMap = _ref.importMap,
      options = _objectWithoutPropertiesLoose(_ref, ["pragma", "sourceMap", "autoLabel", "labelFormat", "importMap"]);

  if (options.runtime) {
    throw new Error('The `runtime` option has been removed. If you want to configure `runtime: "automatic"`, replace `@emotion/babel-preset-css-prop` with `@babel/preset-react` and `@emotion/babel-plugin`. You can find out how to configure things properly here: https://emotion.sh/docs/css-prop#babel-preset');
  }

  return {
    plugins: [[pragmatic, {
      "export": 'jsx',
      module: '@emotion/react',
      "import": pragmaName
    }], [jsx, _extends({
      pragma: pragmaName,
      pragmaFrag: 'React.Fragment'
    }, options)], [emotion, {
      sourceMap: sourceMap,
      autoLabel: autoLabel,
      labelFormat: labelFormat,
      cssPropOptimization: true,
      importMap: importMap
    }]]
  };
});

export default index;
