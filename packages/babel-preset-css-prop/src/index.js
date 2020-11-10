import jsx from '@babel/plugin-transform-react-jsx'
import jsxDev from '@babel/plugin-transform-react-jsx-development'
import pragmatic from '@emotion/babel-plugin-jsx-pragmatic'
import emotion from 'babel-plugin-emotion'

let pragmaName = '___EmotionJSX'

// pull out the emotion options and pass everything else to the jsx transformer
// this means if @babel/plugin-transform-react-jsx adds more options, it'll just work
// and if babel-plugin-emotion adds more options we can add them since this lives in
// the same repo as babel-plugin-emotion

export default (
  api,
  {
    pragma,
    sourceMap,
    autoLabel,
    labelFormat,
    instances,
    development = false,
    ...options
  } = {}
) => {
  if (options.runtime) {
    console.warn(
      '`runtime` option has been deprecated. It still works and will continue to work in Emotion 10 but we have found out that including JSX plugin twice in the Babel configuration leads to hard to debug problems and it\'s not always obvious that some presets include it. If you want to configure `runtime: "automatic"` just replace `@emotion/babel-preset-css-prop` with `@babel/preset-react` and `babel-plugin-emotion`. You can find out how to configure things properly here: https://emotion.sh/docs/css-prop#babel-preset'
    )
  }

  return {
    plugins: [
      options.runtime !== 'automatic' && [
        pragmatic,
        { export: 'jsx', module: '@emotion/core', import: pragmaName }
      ],
      options.runtime === 'automatic'
        ? [
            development ? jsxDev : jsx,
            { importSource: '@emotion/core', ...options }
          ]
        : [
            jsx,
            { pragma: pragmaName, pragmaFrag: 'React.Fragment', ...options }
          ],
      [
        emotion,
        {
          sourceMap,
          autoLabel,
          labelFormat,
          instances,
          cssPropOptimization: true
        }
      ]
    ].filter(Boolean)
  }
}
